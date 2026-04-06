package ffmpeg

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
)

// ffmpegData is set by platform-specific embed files (embed_darwin.go, etc).
// In dev mode it may be empty — we fall back to PATH.
var ffmpegData []byte

func binaryName() string {
	name := "ffmpeg"
	if runtime.GOOS == "windows" {
		name += ".exe"
	}
	return name
}

// ExtractBinary extracts the embedded ffmpeg to targetDir and returns its path.
// Falls back to system PATH if no binary is embedded (dev mode).
func ExtractBinary(targetDir string) (string, error) {
	dest := filepath.Join(targetDir, binaryName())

	// Already extracted?
	if info, err := os.Stat(dest); err == nil && !info.IsDir() {
		return dest, nil
	}

	// Try embedded binary
	if len(ffmpegData) > 0 {
		if err := os.MkdirAll(targetDir, 0o755); err != nil {
			return "", fmt.Errorf("create dir: %w", err)
		}
		if err := os.WriteFile(dest, ffmpegData, 0o755); err != nil {
			return "", fmt.Errorf("write ffmpeg: %w", err)
		}
		return dest, nil
	}

	// Fallback: system PATH (dev mode)
	p, err := exec.LookPath("ffmpeg")
	if err != nil {
		return "", fmt.Errorf("ffmpeg not found (install it or run scripts/download-ffmpeg.sh): %w", err)
	}
	return p, nil
}
