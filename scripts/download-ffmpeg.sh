#!/usr/bin/env bash
set -euo pipefail

# Download platform-specific ffmpeg binary for embedding
# Usage: ./scripts/download-ffmpeg.sh [darwin|windows]

PLATFORM=${1:-$(uname -s | tr '[:upper:]' '[:lower:]')}
OUTPUT_DIR="build/embedded"

mkdir -p "$OUTPUT_DIR"

case "$PLATFORM" in
  darwin)
    echo "==> Downloading ffmpeg for macOS..."
    # TODO: Replace with actual static build URL
    echo "Download from: https://evermeet.cx/ffmpeg/"
    echo "Place binary at: $OUTPUT_DIR/ffmpeg-darwin"
    ;;
  windows)
    echo "==> Downloading ffmpeg for Windows..."
    # TODO: Replace with actual static build URL
    echo "Download from: https://www.gyan.dev/ffmpeg/builds/"
    echo "Place binary at: $OUTPUT_DIR/ffmpeg-windows.exe"
    ;;
  *)
    echo "Unsupported platform: $PLATFORM"
    exit 1
    ;;
esac
