#!/usr/bin/env bash
set -euo pipefail

# Files to scan (add more extensions if needed)
GLOB='**/*.{js,jsx,ts,tsx,html,md,mdx,json,yaml,yml,css,scss,sass,vue,svelte,txt}'

echo "==> Converting Ethereum/ETH references to Solana/SOL ..."

# Use ripgrep or fallback to grep -rl
if command -v rg >/dev/null 2>&1; then
  FILES=$(rg -uuu -g "$GLOB" -l . || true)
else
  # macOS/BSD find compatible pattern (may be slower)
  FILES=$(find . -type f \( \
    -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o \
    -name "*.html" -o -name "*.md" -o -name "*.mdx" -o -name "*.json" -o \
    -name "*.yaml" -o -name "*.yml" -o -name "*.css" -o -name "*.scss" -o \
    -name "*.sass" -o -name "*.vue" -o -name "*.svelte" -o -name "*.txt" \
  \) )
fi

# Temp file for sed portability
TMP=$(mktemp)

changed=0

for f in $FILES; do
  cp "$f" "$TMP"

  # Specific phrases first
  # ETH cashback -> SOL cashback
  sed -E 's/ETH[[:space:]]+cashback/SOL cashback/g' "$TMP" > "$TMP.1" && mv "$TMP.1" "$TMP"

  # ERC-20 -> SPL
  sed -E 's/ERC-?20/SPL/g' "$TMP" > "$TMP.1" && mv "$TMP.1" "$TMP"

  # Ethereum -> Solana (case sensitive first, then case-insensitive)
  sed -E 's/Ethereum/Solana/g' "$TMP" > "$TMP.1" && mv "$TMP.1" "$TMP"
  sed -E 's/ethereum/solana/g' "$TMP" > "$TMP.1" && mv "$TMP.1" "$TMP"

  # ETH -> SOL (avoid matching inside words like METHOD, TEA, etc.)
  # Use word boundaries where supported; additionally protect common false-positives.
  sed -E 's/\bETH\b/SOL/g' "$TMP" > "$TMP.1" && mv "$TMP.1" "$TMP"

  # etherscan -> solscan
  sed -E 's/etherscan\.io/solscan.io/g' "$TMP" > "$TMP.1" && mv "$TMP.1" "$TMP"

  # If file changed, overwrite
  if ! cmp -s "$f" "$TMP"; then
    mv "$TMP" "$f"
    changed=$((changed+1))
    # recreate TMP for next iteration
    TMP=$(mktemp)
  fi
done

rm -f "$TMP" "$TMP.1" 2>/dev/null || true

echo "==> Done. Updated $changed files."
echo "    Review your diffs: git status && git diff --stat"
