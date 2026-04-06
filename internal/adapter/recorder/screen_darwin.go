//go:build darwin

package recorder

import (
	"os/exec"
	"strings"
)

// findScreenIndex detects the avfoundation index for "Capture screen 0".
func findScreenIndex(ffmpegPath string) string {
	out, _ := exec.Command(ffmpegPath,
		"-f", "avfoundation", "-list_devices", "true", "-i", "").
		CombinedOutput()
	for _, line := range strings.Split(string(out), "\n") {
		if strings.Contains(line, "Capture screen 0") {
			parts := strings.Split(line, "[")
			for _, p := range parts {
				if idx := strings.Index(p, "]"); idx > 0 {
					return strings.TrimSpace(p[:idx])
				}
			}
		}
	}
	return "0"
}
