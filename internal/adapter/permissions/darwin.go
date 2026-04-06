//go:build darwin

package permissions

/*
#cgo LDFLAGS: -framework CoreGraphics
#include <CoreGraphics/CoreGraphics.h>
*/
import "C"

import (
	"os/exec"

	"shotgo/internal/domain/port"
)

type DarwinPermissions struct{}

func NewDarwinPermissions() *DarwinPermissions { return &DarwinPermissions{} }

func (p *DarwinPermissions) CheckScreenCapture() port.PermissionStatus {
	if C.CGPreflightScreenCaptureAccess() {
		return port.PermissionGranted
	}
	return port.PermissionDenied
}

func (p *DarwinPermissions) CheckAccessibility() port.PermissionStatus {
	// Stub — full check requires AXIsProcessTrusted via Accessibility framework
	return port.PermissionGranted
}

func (p *DarwinPermissions) RequestScreenCapture() error {
	C.CGRequestScreenCaptureAccess()
	return nil
}

func (p *DarwinPermissions) RequestAccessibility() error {
	return nil
}

func (p *DarwinPermissions) OpenPermissionsSettings() error {
	return exec.Command("open",
		"x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture").Run()
}
