//go:build darwin

package permissions

/*
#cgo LDFLAGS: -framework CoreGraphics -framework ApplicationServices -framework CoreFoundation
#include <CoreGraphics/CoreGraphics.h>
#include <ApplicationServices/ApplicationServices.h>
#include <CoreFoundation/CoreFoundation.h>

static bool checkAccessibilityTrusted(bool prompt) {
    const void *keys[] = { kAXTrustedCheckOptionPrompt };
    const void *values[] = { prompt ? kCFBooleanTrue : kCFBooleanFalse };
    CFDictionaryRef options = CFDictionaryCreate(
        NULL, keys, values, 1,
        &kCFCopyStringDictionaryKeyCallBacks,
        &kCFTypeDictionaryValueCallBacks
    );
    bool trusted = AXIsProcessTrustedWithOptions(options);
    CFRelease(options);
    return trusted;
}
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
	if bool(C.checkAccessibilityTrusted(C.bool(false))) {
		return port.PermissionGranted
	}
	return port.PermissionDenied
}

func (p *DarwinPermissions) RequestScreenCapture() error {
	C.CGRequestScreenCaptureAccess()
	return nil
}

func (p *DarwinPermissions) RequestAccessibility() error {
	C.checkAccessibilityTrusted(C.bool(true))
	return nil
}

func (p *DarwinPermissions) OpenPermissionsSettings() error {
	return exec.Command("open",
		"x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture").Run()
}

// OpenAccessibilitySettings opens the Accessibility privacy pane.
func (p *DarwinPermissions) OpenAccessibilitySettings() error {
	return exec.Command("open",
		"x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility").Run()
}
