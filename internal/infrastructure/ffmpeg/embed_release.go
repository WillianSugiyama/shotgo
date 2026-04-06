//go:build embedffmpeg

package ffmpeg

import (
	_ "embed"
)

// To embed ffmpeg, build with: go build -tags embedffmpeg
// The binary must exist at build/embedded/ffmpeg (or ffmpeg.exe on Windows).
// Run scripts/download-ffmpeg.sh first.

//go:embed ffmpeg-bin
var embeddedBin []byte

func init() {
	ffmpegData = embeddedBin
}
