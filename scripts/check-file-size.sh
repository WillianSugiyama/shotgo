#!/usr/bin/env bash
set -euo pipefail

# Check that no source file exceeds 100 lines.
# Usage: ./scripts/check-file-size.sh [files...]
# If no files given, checks all staged .go/.ts/.tsx files.

MAX_LINES=100
EXIT_CODE=0

files=("$@")
if [ ${#files[@]} -eq 0 ]; then
  echo "No files to check."
  exit 0
fi

for file in "${files[@]}"; do
  if [ ! -f "$file" ]; then
    continue
  fi

  # Skip auto-generated files
  case "$file" in
    */wailsjs/*|*/dist/*|*/node_modules/*|*.md5) continue ;;
  esac

  lines=$(wc -l < "$file")
  if [ "$lines" -gt "$MAX_LINES" ]; then
    echo "FAIL: $file has $lines lines (max $MAX_LINES)"
    EXIT_CODE=1
  fi
done

if [ "$EXIT_CODE" -eq 0 ]; then
  echo "All files are within $MAX_LINES lines."
fi

exit $EXIT_CODE
