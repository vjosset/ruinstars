#!/usr/bin/env bash
# Pre-commit entry point. Installed into .git/hooks/pre-commit by scripts/install-hooks.sh.
# Add further pre-commit steps here.

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

bash scripts/compress-pdfs.sh
