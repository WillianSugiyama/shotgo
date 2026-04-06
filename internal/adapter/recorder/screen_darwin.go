//go:build darwin

package recorder

import (
	"os/exec"
	"regexp"
	"strings"
)

var deviceIndexRe = regexp.MustCompile(`\[(\d+)\]\s+Capture screen`)

// findScreenIndex detects the avfoundation index for "Capture screen 0".
func findScreenIndex(ffmpegPath string) string {
	out, _ := exec.Command(ffmpegPath,
		"-f", "avfoundation", "-list_devices", "true", "-i", "").
		CombinedOutput()
	for _, line := range strings.Split(string(out), "\n") {
		if m := deviceIndexRe.FindStringSubmatch(line); len(m) > 1 {
			return m[1]
		}
	}
	return "0"
}
