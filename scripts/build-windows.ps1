# Build ShotGo for Windows
# Usage: .\scripts\build-windows.ps1 [-Arch amd64|arm64] [-Sign]

param(
    [string]$Arch = "amd64",
    [switch]$Sign
)

$ErrorActionPreference = "Stop"

Write-Host "==> Building ShotGo for Windows ($Arch)..."
wails build -platform "windows/$Arch"

if ($Sign) {
    Write-Host "==> Signing..."
    signtool sign /fd SHA256 /tr http://timestamp.digicert.com `
        /td SHA256 /sha1 "$env:WIN_CERT_THUMBPRINT" `
        ".\build\bin\shotgo.exe"
}

$OutName = "ShotGo-Windows-$Arch.exe"
Copy-Item ".\build\bin\shotgo.exe" ".\build\bin\$OutName"
Write-Host "==> Done: build\bin\$OutName"
