# ShotGo

Open-source, cross-platform screenshot and screen recording tool built with Go and Wails.

## Features (MVP)

- Screenshot: fullscreen, region selection, window capture
- Screen recording: MP4 and GIF (max 5 min)
- Simple editor: crop, arrows, text, blur
- Global hotkeys (configurable)
- System tray
- Auto-update

## Platforms

- macOS (primary)
- Windows

## Tech Stack

- **Backend**: Go + Wails v2
- **Frontend**: React + TypeScript + Zustand + Vite
- **Recording**: Embedded ffmpeg

## Development

```bash
wails dev
```

## Build

```bash
wails build
```

## Architecture

See [ADR documents](docs/adr/) for architectural decisions.

## License

MIT
