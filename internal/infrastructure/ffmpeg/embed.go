package ffmpeg

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
)

// embeddedBinaryName returns the expected embedded binary filename for the
// current platform. In production this would match an embed.FS entry.
func embeddedBinaryName() string {
	name := fmt.Sprintf("ffmpeg-%s-%s", runtime.GOOS, runtime.GOARCH)
	if runtime.GOOS == "windows" {
		name += ".exe"
	}
	return name
}

// ExtractBinary extracts the embedded ffmpeg binary into targetDir and returns
// the full path. Because the real binary (~30 MB) is not embedded during
// development, this function falls back to the system PATH if extraction is
// not possible.
func ExtractBinary(targetDir string) (string, error) {
	// Attempt to use an already-extracted binary in targetDir.
	name := embeddedBinaryName()
	dest := filepath.Join(targetDir, name)

	if info, err := os.Stat(dest); err == nil && !info.IsDir() {
		return dest, nil
	}

	// TODO: In release builds, read from embed.FS and write to dest.
	// For now, fall back to ffmpeg on the system PATH.
	systemPath, err := exec.LookPath("ffmpeg")
	if err != nil {
		return "", fmt.Errorf("embedded ffmpeg not available and ffmpeg not found in PATH: %w", err)
	}
	return systemPath, nil
}
