//go:build windows

package capture

import (
	"fmt"
	"time"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// WindowsCapturer implements port.Capturer using Win32 BitBlt API.
type WindowsCapturer struct{}

// NewWindowsCapturer returns a new WindowsCapturer.
func NewWindowsCapturer() *WindowsCapturer {
	return &WindowsCapturer{}
}

func (c *WindowsCapturer) CaptureFullscreen() (*entity.Screenshot, error) {
	// TODO: implement using Win32 GetDC(0) + BitBlt + CreateDIBSection
	return nil, fmt.Errorf("CaptureFullscreen not yet implemented for windows")
}

func (c *WindowsCapturer) CaptureRegion(region entity.Region) (*entity.Screenshot, error) {
	// TODO: implement using BitBlt with region coordinates
	return nil, fmt.Errorf("CaptureRegion not yet implemented for windows")
}

func (c *WindowsCapturer) CaptureWindow(windowID string) (*entity.Screenshot, error) {
	// TODO: implement using PrintWindow or BitBlt with window HDC
	return nil, fmt.Errorf("CaptureWindow not yet implemented for windows")
}

func (c *WindowsCapturer) ListWindows() ([]port.WindowInfo, error) {
	// TODO: implement using EnumWindows + GetWindowText
	return nil, fmt.Errorf("ListWindows not yet implemented for windows")
}

// Compile-time interface check.
var _ port.Capturer = (*WindowsCapturer)(nil)

// Suppress unused import warnings.
var _ = time.Now
