#!/usr/bin/env bash
set -euo pipefail

# Build ShotGo for macOS
# Usage: ./scripts/build-darwin.sh [--sign] [--notarize]

SIGN=false
NOTARIZE=false

for arg in "$@"; do
  case $arg in
    --sign) SIGN=true ;;
    --notarize) NOTARIZE=true ;;
  esac
done

echo "==> Building ShotGo for macOS..."
wails build -platform darwin/universal

if [ "$SIGN" = true ]; then
  echo "==> Signing application..."
  # TODO: Replace with actual Developer ID
  codesign --deep --force --verify --verbose \
    --sign "Developer ID Application: YOUR_NAME (TEAM_ID)" \
    --options runtime \
    build/bin/ShotGo.app
fi

if [ "$NOTARIZE" = true ]; then
  echo "==> Creating DMG..."
  hdiutil create -volname "ShotGo" -srcfolder build/bin/ShotGo.app \
    -ov -format UDZO build/bin/ShotGo.dmg

  echo "==> Submitting for notarization..."
  xcrun notarytool submit build/bin/ShotGo.dmg \
    --keychain-profile "shotgo-notarize" --wait

  echo "==> Stapling ticket..."
  xcrun stapler staple build/bin/ShotGo.dmg
fi

echo "==> Done! Output in build/bin/"
