# Build ShotGo for Windows
# Usage: .\scripts\build-windows.ps1 [-Sign]

param(
    [switch]$Sign
)

$ErrorActionPreference = "Stop"

Write-Host "==> Building ShotGo for Windows..."
wails build -platform windows/amd64

if ($Sign) {
    Write-Host "==> Signing executable..."
    # TODO: Replace with actual certificate thumbprint
    signtool sign /fd SHA256 /tr http://timestamp.digicert.com `
        /td SHA256 /sha1 "YOUR_CERT_THUMBPRINT" `
        .\build\bin\shotgo.exe
}

Write-Host "==> Done! Output in build\bin\"
