#!/usr/bin/env bash
# Installs git hooks for this repo.
# Run once after cloning: bash scripts/install-hooks.sh

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
HOOKS_DIR="$REPO_ROOT/.git/hooks"

install_hook() {
  local name="$1"
  local target="$HOOKS_DIR/$name"
  cat > "$target" <<EOF
#!/usr/bin/env bash
REPO_ROOT="\$(git rev-parse --show-toplevel)"
exec "\$REPO_ROOT/scripts/$name.sh"
EOF
  chmod +x "$target"
  echo "Installed $name hook."
}

install_hook pre-commit
echo "Done. All hooks installed."
