#!/usr/bin/env bash
set -euo pipefail

echo "[sanity] USER: $(whoami)"
git --version || true
node --version || true
npm --version || true
