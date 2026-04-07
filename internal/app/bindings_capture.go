package app

import (
	"encoding/base64"
	"fmt"
	"time"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"

	"shotgo/internal/domain/entity"
)

// CaptureResult is the frontend-facing capture response with base64 image.
type CaptureResult struct {
	ID          string `json:"id"`
	ImageBase64 string `json:"imageBase64"`
	Width       int    `json:"width"`
	Height      int    `json:"height"`
	Format      string `json:"format"`
	Source      string `json:"source"`
}

// CaptureFullscreen hides the window, captures, returns result.
// The frontend decides how to show the window (bar or main).
func (a *App) CaptureFullscreen() (*CaptureResult, error) {
	wailsRuntime.WindowHide(a.ctx)
	time.Sleep(300 * time.Millisecond)

	shot, err := a.captureFullscreen.Execute()
	if err != nil {
		wailsRuntime.WindowShow(a.ctx)
		return nil, err
	}
	a.lastScreenshot = shot
	return toCaptureResult(shot), nil
}

// CaptureRegion hides the window, captures the region, returns result.
func (a *App) CaptureRegion(x, y, width, height int) (*CaptureResult, error) {
	wailsRuntime.WindowHide(a.ctx)
	time.Sleep(300 * time.Millisecond)

	region := entity.Region{X: x, Y: y, Width: width, Height: height}
	shot, err := a.captureRegion.Execute(region)
	if err != nil {
		wailsRuntime.WindowShow(a.ctx)
		return nil, err
	}
	a.lastScreenshot = shot
	return toCaptureResult(shot), nil
}

// CaptureWindow takes a screenshot of a specific window.
func (a *App) CaptureWindow(windowID string) (*CaptureResult, error) {
	shot, err := a.captureWindow.Execute(windowID)
	if err != nil {
		return nil, err
	}
	a.lastScreenshot = shot
	return toCaptureResult(shot), nil
}

// CapturePreview takes a silent screenshot without hiding the window.
// Used for thumbnails/previews in the recording source picker.
func (a *App) CapturePreview() (*CaptureResult, error) {
	shot, err := a.captureFullscreen.Execute()
	if err != nil {
		return nil, err
	}
	return toCaptureResult(shot), nil
}

func toCaptureResult(s *entity.Screenshot) *CaptureResult {
	b64 := base64.StdEncoding.EncodeToString(s.Data)
	return &CaptureResult{
		ID:          s.ID,
		ImageBase64: fmt.Sprintf("data:image/%s;base64,%s", s.Format, b64),
		Width:       s.Width,
		Height:      s.Height,
		Format:      string(s.Format),
		Source:      string(s.Source),
	}
}
