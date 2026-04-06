package app

import (
	"time"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// CaptureInteractive uses the OS native region selector.
// On macOS this shows the crosshair cursor for area selection.
func (a *App) CaptureInteractive() (*CaptureResult, error) {
	wailsRuntime.WindowHide(a.ctx)
	time.Sleep(300 * time.Millisecond)

	shot, err := a.interactiveCapturer.CaptureInteractive()

	wailsRuntime.WindowShow(a.ctx)
	if err != nil {
		return nil, err
	}
	a.lastScreenshot = shot
	return toCaptureResult(shot), nil
}
