#!/usr/bin/env bash
set -euo pipefail

# Download platform-specific ffmpeg static binary for embedding.
# Usage: ./scripts/download-ffmpeg.sh [darwin|windows|all]

PLATFORM=${1:-$(uname -s | tr '[:upper:]' '[:lower:]')}
OUTPUT_DIR="build/embedded"
mkdir -p "$OUTPUT_DIR"

download_darwin() {
  local url="https://evermeet.cx/ffmpeg/ffmpeg-7.1.1.zip"
  echo "==> Downloading ffmpeg for macOS..."
  curl -L "$url" -o /tmp/ffmpeg-darwin.zip
  unzip -o /tmp/ffmpeg-darwin.zip -d /tmp/ffmpeg-darwin
  mv /tmp/ffmpeg-darwin/ffmpeg "$OUTPUT_DIR/ffmpeg-darwin"
  chmod +x "$OUTPUT_DIR/ffmpeg-darwin"
  rm -rf /tmp/ffmpeg-darwin /tmp/ffmpeg-darwin.zip
  echo "==> Saved: $OUTPUT_DIR/ffmpeg-darwin"
}

download_windows() {
  local url="https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip"
  echo "==> Downloading ffmpeg for Windows..."
  curl -L "$url" -o /tmp/ffmpeg-win.zip
  unzip -o -j /tmp/ffmpeg-win.zip "*/bin/ffmpeg.exe" -d "$OUTPUT_DIR"
  mv "$OUTPUT_DIR/ffmpeg.exe" "$OUTPUT_DIR/ffmpeg-windows.exe"
  rm -f /tmp/ffmpeg-win.zip
  echo "==> Saved: $OUTPUT_DIR/ffmpeg-windows.exe"
}

case "$PLATFORM" in
  darwin) download_darwin ;;
  windows) download_windows ;;
  all) download_darwin; download_windows ;;
  *) echo "Usage: $0 [darwin|windows|all]"; exit 1 ;;
esac
