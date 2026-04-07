package app

import (
	"time"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"

	"shotgo/internal/domain/entity"
)

// CaptureScrollable captures scrolling content within the given region.
// Region coordinates come from the frontend region selector overlay.
func (a *App) CaptureScrollable(x, y, width, height int) (*CaptureResult, error) {
	if a.scrollCapturer == nil {
		return nil, nil
	}

	wailsRuntime.WindowHide(a.ctx)
	time.Sleep(400 * time.Millisecond)

	region := entity.Region{X: x, Y: y, Width: width, Height: height}
	shot, err := a.scrollCapturer.CaptureScrollable(region)
	if err != nil {
		wailsRuntime.WindowShow(a.ctx)
		return nil, err
	}
	a.lastScreenshot = shot
	return toCaptureResult(shot), nil
}
