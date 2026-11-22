#!/usr/bin/env bash
# Compresses staged PDFs under public/assets/ (recursively) using Ghostscript,
# and replaces dev-server links (see DEV_URLS) with ruinstars.com using qpdf.
# Called by scripts/pre-commit.sh (via .git/hooks/pre-commit).
# Works on Linux and Windows Git Bash (finds gswin64c / qpdf under Program Files if not on PATH).
# In pre-commit mode, a missing gs or qpdf aborts the commit so unprocessed PDFs never get committed.
#
# Usage: compress-pdfs.sh [--all]
#   --all   Process all PDFs under public/assets/ (for manual runs)
#   (none)  Only process staged PDFs under public/assets/ (pre-commit mode)

set -euo pipefail

ASSETS_DIR="public/assets"
GS_SETTINGS="/printer" # ebook is smaller, but printer is more easily parseable. Negligible file size difference.
# Hosts the PDFs may have been exported from; all are rewritten to PROD_URL.
DEV_URLS=("dev.ruinstars.com" "node304:5000" "localhost:5000")
PROD_URL="ruinstars.com"

# Prints the first usable executable: a name on PATH, or a glob of install paths (highest version wins).
find_tool() {
  local name candidate match
  for name in "$@"; do
    if [[ "$name" == */* ]]; then
      match=""
      while IFS= read -r candidate; do
        [ -x "$candidate" ] && match="$candidate"
      done < <(compgen -G "$name" | sort -V)
      if [ -n "$match" ]; then echo "$match"; return 0; fi
    elif command -v "$name" &>/dev/null; then
      command -v "$name"
      return 0
    fi
  done
  return 1
}

# Native Windows binaries need Windows paths; no-op elsewhere. Calls to them also set
# MSYS_NO_PATHCONV=1 so Git Bash does not mangle args like -dPDFSETTINGS=/printer.
native_path() {
  if command -v cygpath &>/dev/null; then cygpath -w "$1"; else echo "$1"; fi
}

GS_BIN="$(find_tool gs gswin64c '/c/Program Files/gs/gs*/bin/gswin64c.exe' || true)"
QPDF_BIN="$(find_tool qpdf '/c/Program Files/qpdf*/bin/qpdf.exe' || true)"

# Build sed/grep patterns: "http(s)://dev" -> "https://prod", then bare "dev" -> "prod".
URL_SED=""
URL_GREP=""
for dev in "${DEV_URLS[@]}"; do
  esc="${dev//./\\.}"
  URL_SED+="s#https\\?://${esc}#https://${PROD_URL}#g;s#${esc}#${PROD_URL}#g;"
  URL_GREP+="${URL_GREP:+\\|}${esc}"
done
# Upgrade any remaining plain-http production links (with or without www.) to https.
prod_esc="${PROD_URL//./\\.}"
URL_SED+="s#http://\\(www\\.\\)\\?${prod_esc}#https://\\1${PROD_URL}#g;"
URL_GREP+="\\|http://\\(www\\.\\)\\?${prod_esc}"

# Replaces dev-server links with ruinstars.com in a PDF.
# Returns 0 if the file was modified, 1 if unchanged or skipped.
fix_pdf_urls() {
  local file="$1"

  if [ -z "$QPDF_BIN" ]; then
    echo "    qpdf not found; skipping URL fix."
    return 1
  fi

  local qdf patched out
  qdf="$(mktemp --suffix=.qdf)"
  patched="$(mktemp --suffix=.qdf)"
  out="$(mktemp --suffix=.pdf)"

  # Decompress to QDF (plain-text editable format)
  if ! MSYS_NO_PATHCONV=1 "$QPDF_BIN" --qdf --object-streams=disable "$(native_path "$file")" "$(native_path "$qdf")" 2>/dev/null; then
    echo "    qpdf decompression failed, skipping URL fix."
    rm -f "$qdf" "$patched" "$out"
    return 1
  fi

  # Skip if no dev URLs present
  if ! grep -aq "$URL_GREP" "$qdf"; then
    rm -f "$qdf" "$patched" "$out"
    return 1
  fi

  sed "$URL_SED" "$qdf" > "$patched"

  # Exit code 0 = clean success; 3 = success with warnings (expected: sed shifts
  # byte offsets in the QDF, invalidating the xref table, which qpdf reconstructs).
  local qpdf_exit=0
  MSYS_NO_PATHCONV=1 "$QPDF_BIN" "$(native_path "$patched")" "$(native_path "$out")" 2>/dev/null || qpdf_exit=$?
  if [ $qpdf_exit -eq 0 ] || [ $qpdf_exit -eq 3 ]; then
    mv "$out" "$file"
    echo "    Replaced dev links -> $PROD_URL"
    rm -f "$qdf" "$patched"
    return 0
  else
    echo "    qpdf recompression failed (exit $qpdf_exit), skipping URL fix."
    rm -f "$qdf" "$patched" "$out"
    return 1
  fi
}

compress_pdf() {
  local file="$1"

  echo "  Compressing $file..."

  if [ -z "$GS_BIN" ]; then
    echo "    Ghostscript not found, skipping."
    return 1
  fi

  local tmp
  tmp="$(mktemp --suffix=.pdf)"

  if MSYS_NO_PATHCONV=1 "$GS_BIN" -sDEVICE=pdfwrite \
        -dCompatibilityLevel=1.4 \
        -dPDFSETTINGS="$GS_SETTINGS" \
        -dNOPAUSE -dQUIET -dBATCH \
        -sOutputFile="$(native_path "$tmp")" \
        "$(native_path "$file")" 2>/dev/null; then

    local orig_size compressed_size
    orig_size=$(stat -c%s "$file")
    compressed_size=$(stat -c%s "$tmp")

    if [ "$compressed_size" -lt "$orig_size" ]; then
      local saved=$(( (orig_size - compressed_size) / 1024 ))
      mv "$tmp" "$file"
      echo "    Saved ~${saved}KB ($(( orig_size / 1024 ))KB -> $(( compressed_size / 1024 ))KB)"
      return 0  # file was replaced
    else
      echo "    Already optimal, skipping."
      rm -f "$tmp"
      return 1  # file was not replaced
    fi
  else
    echo "    gs failed, skipping."
    rm -f "$tmp"
    return 1
  fi
}

if [ "${1:-}" = "--all" ]; then
  # Manual mode: process all PDFs
  mapfile -d '' pdfs < <(find "$ASSETS_DIR" -name "*.pdf" -print0 | sort -z)
  if [ ${#pdfs[@]} -eq 0 ]; then
    echo "No PDFs found in $ASSETS_DIR."
    exit 0
  fi
  for pdf in "${pdfs[@]}"; do
    fix_pdf_urls "$pdf" || true
    compress_pdf "$pdf" || true
  done
else
  # Pre-commit mode: only process staged PDFs
  staged_pdfs=()
  while IFS= read -r f; do
    if [[ "$f" == "$ASSETS_DIR"/* && "$f" == *.pdf ]]; then
      staged_pdfs+=("$f")
    fi
  done < <(git diff --cached --name-only --diff-filter=AM)

  if [ ${#staged_pdfs[@]} -eq 0 ]; then
    exit 0
  fi

  missing=()
  [ -z "$GS_BIN" ] && missing+=("Ghostscript (gs / gswin64c)")
  [ -z "$QPDF_BIN" ] && missing+=("qpdf")
  if [ ${#missing[@]} -gt 0 ]; then
    echo "[pre-commit] Cannot process ${#staged_pdfs[@]} staged PDF(s) - missing: ${missing[*]}" >&2
    echo "[pre-commit] Install it (Windows: winget install QPDF.QPDF), or bypass once with: git commit --no-verify" >&2
    exit 1
  fi

  echo "[pre-commit] Processing ${#staged_pdfs[@]} staged PDF(s)..."

  for pdf in "${staged_pdfs[@]}"; do
    changed=false
    fix_pdf_urls "$pdf" && changed=true || true
    compress_pdf "$pdf" && changed=true || true
    if $changed; then
      git add "$pdf"
    fi
  done

  echo "[pre-commit] PDF processing done."
fi
