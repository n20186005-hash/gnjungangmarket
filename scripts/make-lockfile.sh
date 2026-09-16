#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
corepack enable
corepack prepare pnpm@12.4.1 --activate
pnpm install --lockfile-only
