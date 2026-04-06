//go:build windows

package permissions

import (
	"shotgo/internal/domain/port"
)

// WindowsPermissions implements port.PermissionsChecker for Windows.
// Windows does not require explicit user permissions for screen capture,
// so all checks return PermissionGranted.
type WindowsPermissions struct{}

// NewWindowsPermissions returns a new WindowsPermissions.
func NewWindowsPermissions() *WindowsPermissions {
	return &WindowsPermissions{}
}

func (p *WindowsPermissions) CheckScreenCapture() port.PermissionStatus {
	return port.PermissionGranted
}

func (p *WindowsPermissions) CheckAccessibility() port.PermissionStatus {
	return port.PermissionGranted
}

func (p *WindowsPermissions) RequestScreenCapture() error {
	// No-op on Windows: screen capture is always allowed.
	return nil
}

func (p *WindowsPermissions) RequestAccessibility() error {
	// No-op on Windows: accessibility APIs are always available.
	return nil
}

func (p *WindowsPermissions) OpenPermissionsSettings() error {
	// No-op on Windows: no equivalent permissions panel needed.
	return nil
}
