#!/usr/bin/env bash
set -euo pipefail

# Copies the downloaded ffmpeg binary into the Go package directory
# so that go:embed can pick it up during release builds.
# Usage: ./scripts/prepare-ffmpeg-embed.sh [darwin|windows]

PLATFORM=${1:-$(uname -s | tr '[:upper:]' '[:lower:]')}
PKG_DIR="internal/infrastructure/ffmpeg"
EMBED_DIR="build/embedded"
TARGET="$PKG_DIR/ffmpeg-bin"

case "$PLATFORM" in
  darwin)
    SRC="$EMBED_DIR/ffmpeg-darwin"
    ;;
  windows)
    SRC="$EMBED_DIR/ffmpeg-windows.exe"
    ;;
  *)
    echo "Usage: $0 [darwin|windows]"
    exit 1
    ;;
esac

if [ ! -f "$SRC" ]; then
  echo "Error: $SRC not found. Run scripts/download-ffmpeg.sh first."
  exit 1
fi

cp "$SRC" "$TARGET"
echo "Copied $SRC → $TARGET ($(du -h "$TARGET" | cut -f1))"
echo "Build with: wails build -tags embedffmpeg"
