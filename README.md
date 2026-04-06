# ShotGo

Open-source screenshot and screen recording tool for macOS and Windows, built with Go and Wails.

Inspired by CleanShot X and Lightshot — fast, lightweight, and free.

## Features

- **Screenshot** — fullscreen, region selection (native macOS crosshair), window capture
- **Screen recording** — MP4 and GIF output, max 5 minutes, ffmpeg-powered
- **Editor** — annotate with arrows, text, blur; crop; copy to clipboard or save
- **Global hotkeys** — configurable, system-wide shortcuts
- **System tray** — macOS menu bar icon with quick actions
- **Permissions** — guided onboarding for macOS Screen Recording permission

## Default Hotkeys

| Shortcut | Action |
|---|---|
| `Ctrl+Shift+1` | Capture fullscreen |
| `Ctrl+Shift+2` | Capture region |
| `Ctrl+Shift+3` | Start recording |
| `Ctrl+Shift+4` | Stop recording |

Hotkeys are configurable in Settings.

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Go 1.24, Wails v2 |
| Frontend | React 18, TypeScript, Zustand, Vite |
| Icons | Lucide React |
| Recording | Embedded ffmpeg |
| Tray (macOS) | CGo + NSStatusItem |
| Hotkeys | golang.design/x/hotkey |
| Linting | golangci-lint v2, oxlint, oxfmt, tsgo |
| Git hooks | Lefthook |

## Architecture

Clean Architecture with a strict **100 lines per file** rule.

```
internal/
├── domain/
│   ├── entity/      # Screenshot, Recording, Region, HotkeyConfig
│   └── port/        # Interfaces: Capturer, Recorder, Clipboard, etc.
├── usecase/         # CaptureFullscreen, StartRecording, SaveConfig, etc.
├── adapter/         # Platform-specific (darwin/windows) implementations
│   ├── capture/     # screencapture CLI (macOS), BitBlt (Windows stub)
│   ├── recorder/    # screencapture -v (macOS), DXGI (Windows stub)
│   ├── clipboard/   # pbcopy/osascript (macOS)
│   ├── hotkey/      # golang.design/x/hotkey + keymap
│   └── permissions/ # CGo CGPreflightScreenCaptureAccess (macOS)
├── infrastructure/
│   ├── ffmpeg/      # Encode MP4/GIF, extract binary from PATH
│   ├── storage/     # JSON config, file save to ~/Pictures/ShotGo
│   └── updater/     # GitHub Releases auto-update (stub)
└── app/             # Wails bindings, lifecycle, menu, tray
```

Frontend:

```
frontend/src/
├── stores/          # Zustand: app, capture, recording, settings, toast
├── hooks/           # useCapture, useRecording, useSettings, useEditorTools
├── components/
│   ├── editor/      # InteractiveCanvas, Toolbar, tools (arrow, text, blur, crop)
│   ├── recorder/    # RecorderControls with timer and pulsing dot
│   ├── settings/    # Grouped settings with inline hotkey re-binding
│   └── onboarding/  # Welcome screen with permission check
└── styles/          # Design tokens, button presets, layout helpers
```

## Prerequisites

- Go 1.24+
- Node.js 20+
- Wails CLI: `go install github.com/wailsapp/wails/v2/cmd/wails@latest`
- ffmpeg in PATH (for recording)
- macOS: Xcode Command Line Tools (`xcode-select --install`)

## Development

```bash
wails dev
```

Opens the app with hot reload. Frontend changes reflect instantly; Go changes trigger a rebuild.

## Build

```bash
wails build
```

Output: `build/bin/ShotGo.app` (macOS) or `build/bin/shotgo.exe` (Windows).

To sign and run on macOS:

```bash
codesign --force --deep --sign - build/bin/ShotGo.app
xattr -cr build/bin/ShotGo.app
open build/bin/ShotGo.app
```

## Pre-commit Hooks

Lefthook runs automatically on `git commit`:

| Hook | What it checks |
|---|---|
| `oxfmt` | TypeScript/TSX formatting |
| `oxlint` | TypeScript/TSX linting |
| `tsgo` | Type checking (Go-based TS compiler) |
| `golangci-lint` | Go linting (errcheck, govet, staticcheck) |
| `gofmt` | Go formatting |
| `file-size` | All files ≤ 100 lines |

Setup: `npm install && npx lefthook install`

## Configuration

Config is stored at `~/Library/Application Support/ShotGo/config.json` (macOS) or `%APPDATA%/ShotGo/config.json` (Windows).

Screenshots save to `~/Pictures/ShotGo/` by default.

## Platforms

| Platform | Status |
|---|---|
| macOS (arm64/amd64) | Working — capture, record, tray, hotkeys |
| Windows | Scaffolded — adapters are stubs |
| Linux | Not in MVP |

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Follow [Conventional Commits](https://www.conventionalcommits.org/)
4. Every file must be ≤ 100 lines
5. Pre-commit hooks must pass
6. Open a PR

## License

MIT — see [LICENSE](LICENSE).
