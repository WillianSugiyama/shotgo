#!/usr/bin/env bash
set -euo pipefail

# Build ShotGo for macOS (universal binary: arm64 + amd64)
# Usage: ./scripts/build-darwin.sh [--sign] [--notarize]

SIGN=false
NOTARIZE=false
VERSION=${VERSION:-"dev"}

for arg in "$@"; do
  case $arg in
    --sign) SIGN=true ;;
    --notarize) NOTARIZE=true ;;
  esac
done

echo "==> Building ShotGo $VERSION for macOS (universal)..."
wails build -platform darwin/universal -ldflags "-X main.version=$VERSION"

if [ "$SIGN" = true ]; then
  echo "==> Signing..."
  codesign --deep --force --verify --verbose \
    --sign "${APPLE_SIGN_ID:-Developer ID Application}" \
    --options runtime build/bin/ShotGo.app
fi

echo "==> Creating DMG..."
hdiutil create -volname "ShotGo" -srcfolder build/bin/ShotGo.app \
  -ov -format UDZO "build/bin/ShotGo-macOS-universal.dmg"

if [ "$NOTARIZE" = true ]; then
  echo "==> Notarizing..."
  xcrun notarytool submit "build/bin/ShotGo-macOS-universal.dmg" \
    --keychain-profile "shotgo-notarize" --wait
  xcrun stapler staple "build/bin/ShotGo-macOS-universal.dmg"
fi

echo "==> Done: build/bin/ShotGo-macOS-universal.dmg"
