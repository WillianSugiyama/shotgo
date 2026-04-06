package app

import (
	"encoding/base64"
	"fmt"

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

// CaptureFullscreen takes a screenshot of the entire screen.
func (a *App) CaptureFullscreen() (*CaptureResult, error) {
	shot, err := a.captureFullscreen.Execute()
	if err != nil {
		return nil, err
	}
	a.lastScreenshot = shot
	return toCaptureResult(shot), nil
}

// CaptureRegion takes a screenshot of the selected area.
func (a *App) CaptureRegion(x, y, width, height int) (*CaptureResult, error) {
	region := entity.Region{X: x, Y: y, Width: width, Height: height}
	shot, err := a.captureRegion.Execute(region)
	if err != nil {
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
