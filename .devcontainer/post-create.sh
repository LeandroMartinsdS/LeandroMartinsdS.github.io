#!/usr/bin/env bash
set -euo pipefail

echo "[post-create] Dev Container Ready"

# Resolve this script's directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[post-create] Sanity check"
bash "$SCRIPT_DIR/sanity-check.sh"

echo "[post-create] SSH agent check"
if [[ -z "${SSH_AUTH_SOCK:-}" ]]; then
  echo "[warn] SSH_AUTH_SOCK is not set in container environment."
  echo "[warn] Git SSH auth may fail (push/pull to GitHub/GitLab over SSH)."
elif [[ ! -S "${SSH_AUTH_SOCK}" ]]; then
  echo "[warn] SSH_AUTH_SOCK is set but socket is not available at: ${SSH_AUTH_SOCK}"
  echo "[warn] Check devcontainer mount for host ssh-agent socket."
else
  if command -v ssh-add >/dev/null 2>&1; then
    if ! ssh-add -l >/dev/null 2>&1; then
      echo "[warn] ssh-agent reachable but no identities are loaded."
      echo "[warn] On host: run 'ssh-add <your_key>' before opening the container."
    else
      echo "[post-create] SSH agent forwarding looks healthy."
    fi
  else
    echo "[warn] ssh-add not found; cannot verify forwarded identities."
  fi
fi

echo "[post-create] Installing Bash prompt"
install -D -m 0644 \
  "$SCRIPT_DIR/setup-ps1.sh" \
  "$HOME/.bashrc.d/50-prompt.sh"

INPUTRC="$HOME/.inputrc"
if ! grep -q '^set completion-ignore-case on$' "$INPUTRC" 2>/dev/null; then
  echo 'set completion-ignore-case on' >> "$INPUTRC"
fi

# bash "bind "set completion-ignore-case on""

echo "[post-create] Done"
