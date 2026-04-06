//go:build darwin

package recorder

import (
	"os/exec"
	"strings"
)

// ScreenSource represents a capturable screen/monitor.
type ScreenSource struct {
	Index int    `json:"index"`
	Name  string `json:"name"`
}

// WindowSource represents a capturable application window.
type WindowSource struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	App   string `json:"app"`
}

// ListScreens parses ffmpeg avfoundation device list for screen entries.
func ListScreens(ffmpegPath string) []ScreenSource {
	out, _ := exec.Command(ffmpegPath,
		"-f", "avfoundation", "-list_devices", "true", "-i", "").
		CombinedOutput()

	var screens []ScreenSource
	for _, line := range strings.Split(string(out), "\n") {
		if !strings.Contains(line, "Capture screen") {
			continue
		}
		idx := parseDeviceIndex(line)
		name := parseDeviceName(line)
		if name != "" {
			screens = append(screens, ScreenSource{Index: idx, Name: name})
		}
	}
	return screens
}

// parseDeviceIndex extracts the numeric index from "[AVFoundation ...] [N]".
func parseDeviceIndex(line string) int {
	parts := strings.Split(line, "[")
	for _, p := range parts {
		if idx := strings.Index(p, "]"); idx > 0 {
			trimmed := strings.TrimSpace(p[:idx])
			n := 0
			for _, c := range trimmed {
				if c >= '0' && c <= '9' {
					n = n*10 + int(c-'0')
				} else {
					return 0
				}
			}
			return n
		}
	}
	return 0
}

func parseDeviceName(line string) string {
	parts := strings.SplitN(line, "] ", 2)
	if len(parts) < 2 {
		return ""
	}
	return strings.TrimSpace(parts[len(parts)-1])
}

// ListRecordableWindows uses osascript to list visible application windows.
func ListRecordableWindows() []WindowSource {
	script := `tell application "System Events" to get {name, title} of ` +
		`every process whose visible is true and background only is false`
	out, err := exec.Command("osascript", "-e", script).Output()
	if err != nil {
		return nil
	}
	return parseOsascriptWindows(string(out))
}

// parseOsascriptWindows parses "name1, name2, title1, title2" output.
func parseOsascriptWindows(raw string) []WindowSource {
	parts := strings.Split(strings.TrimSpace(raw), ", ")
	if len(parts) < 2 || len(parts)%2 != 0 {
		return nil
	}
	half := len(parts) / 2
	var windows []WindowSource
	for i := 0; i < half; i++ {
		app := strings.TrimSpace(parts[i])
		title := strings.TrimSpace(parts[half+i])
		if app == "" {
			continue
		}
		windows = append(windows, WindowSource{ID: app, Title: title, App: app})
	}
	return windows
}
