#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf node_modules dist .astro
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
if [[ -f pnpm-workspace.yaml ]]; then
  grep -Eq "packages:[[:space:]]*(\['\.']|$)" pnpm-workspace.yaml || { echo "Invalid pnpm-workspace.yaml" >&2; exit 1; }
fi
if [[ -d dist ]]; then
  if grep -RInE 'example\.com|localhost|chrome-extension://' dist; then
    echo "Forbidden placeholder/extension content found in dist" >&2
    exit 1
  fi
  if [[ -f dist/sitemap-index.xml || -f dist/sitemap-0.xml ]]; then
    echo "Sitemap exists: verify SITE_URL is a real production domain before publishing."
    grep -RIn '<lastmod>' dist/sitemap*.xml && { echo "Unexpected lastmod found" >&2; exit 1; } || true
  else
    echo "No sitemap generated because SITE_URL is empty (expected)."
  fi
fi
