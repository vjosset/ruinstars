#!/usr/bin/env bash
# Compresses staged PDFs in public/assets/ using Ghostscript, and replaces
# any dev.ruinstars.com links with ruinstars.com using qpdf.
# Called by .git/hooks/pre-commit — do not run directly during a commit.
#
# Usage: compress-pdfs.sh [--all]
#   --all   Process all PDFs in public/assets/ (for manual runs)
#   (none)  Only process staged PDFs (pre-commit mode)

set -euo pipefail

ASSETS_DIR="public/assets"
GS_SETTINGS="/ebook"
DEV_URL="dev.ruinstars.com"
PROD_URL="ruinstars.com"

# Replaces dev.ruinstars.com links with ruinstars.com in a PDF.
# Returns 0 if the file was modified, 1 if unchanged or skipped.
fix_pdf_urls() {
  local file="$1"

  if ! command -v qpdf &>/dev/null; then
    echo "    qpdf not found; skipping URL fix."
    return 1
  fi

  local qdf patched out
  qdf="$(mktemp --suffix=.qdf)"
  patched="$(mktemp --suffix=.qdf)"
  out="$(mktemp --suffix=.pdf)"

  # Decompress to QDF (plain-text editable format)
  if ! qpdf --qdf --object-streams=disable "$file" "$qdf" 2>/dev/null; then
    echo "    qpdf decompression failed, skipping URL fix."
    rm -f "$qdf" "$patched" "$out"
    return 1
  fi

  # Skip if no dev URLs present
  if ! grep -q "$DEV_URL" "$qdf"; then
    rm -f "$qdf" "$patched" "$out"
    return 1
  fi

  sed "s/$DEV_URL/$PROD_URL/g" "$qdf" > "$patched"

  # Exit code 0 = clean success; 3 = success with warnings (expected: sed shifts
  # byte offsets in the QDF, invalidating the xref table, which qpdf reconstructs).
  local qpdf_exit=0
  qpdf "$patched" "$out" 2>/dev/null || qpdf_exit=$?
  if [ $qpdf_exit -eq 0 ] || [ $qpdf_exit -eq 3 ]; then
    mv "$out" "$file"
    echo "    Replaced $DEV_URL -> $PROD_URL"
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
  local tmp
  tmp="$(mktemp --suffix=.pdf)"

  echo "  Compressing $file..."

  if gs -sDEVICE=pdfwrite \
        -dCompatibilityLevel=1.4 \
        -dPDFSETTINGS="$GS_SETTINGS" \
        -dNOPAUSE -dQUIET -dBATCH \
        -sOutputFile="$tmp" \
        "$file" 2>/dev/null; then

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
  shopt -s nullglob
  pdfs=("$ASSETS_DIR"/*.pdf)
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
    if [[ "$f" == "$ASSETS_DIR"/*.pdf ]]; then
      staged_pdfs+=("$f")
    fi
  done < <(git diff --cached --name-only --diff-filter=AM)

  if [ ${#staged_pdfs[@]} -eq 0 ]; then
    exit 0
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
