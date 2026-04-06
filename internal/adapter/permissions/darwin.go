//go:build darwin

package permissions

import (
	"fmt"
	"os/exec"
	"strings"

	"shotgo/internal/domain/port"
)

// DarwinPermissions implements port.PermissionsChecker for macOS TCC.
type DarwinPermissions struct{}

// NewDarwinPermissions returns a new DarwinPermissions.
func NewDarwinPermissions() *DarwinPermissions {
	return &DarwinPermissions{}
}

func (p *DarwinPermissions) CheckScreenCapture() port.PermissionStatus {
	// Heuristic: attempt a silent screencapture; if it fails, permission denied.
	cmd := exec.Command("screencapture", "-x", "-t", "png", "/dev/null")
	if err := cmd.Run(); err != nil {
		return port.PermissionDenied
	}
	return port.PermissionGranted
}

func (p *DarwinPermissions) CheckAccessibility() port.PermissionStatus {
	// TODO: use CGo to call AXIsProcessTrusted() for an accurate check.
	// Fallback: check via osascript.
	out, err := exec.Command("osascript", "-e",
		`tell application "System Events" to return name of first process`).CombinedOutput()
	if err != nil || strings.Contains(string(out), "error") {
		return port.PermissionDenied
	}
	return port.PermissionGranted
}

func (p *DarwinPermissions) RequestScreenCapture() error {
	// macOS doesn't have a programmatic prompt; opening a capture triggers TCC.
	_ = exec.Command("screencapture", "-x", "-t", "png", "/dev/null").Run()
	return nil
}

func (p *DarwinPermissions) RequestAccessibility() error {
	// TODO: call AXIsProcessTrustedWithOptions({kAXTrustedCheckOptionPrompt: true})
	return fmt.Errorf("RequestAccessibility: CGo integration pending")
}

func (p *DarwinPermissions) OpenPermissionsSettings() error {
	return exec.Command("open",
		"x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture").Run()
}
