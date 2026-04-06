package app

import "shotgo/internal/domain/entity"

// CaptureFullscreen takes a screenshot of the entire screen.
func (a *App) CaptureFullscreen() (*entity.Screenshot, error) {
	return a.captureFullscreen.Execute()
}

// CaptureRegion takes a screenshot of the selected area.
func (a *App) CaptureRegion(x, y, width, height int) (*entity.Screenshot, error) {
	region := entity.Region{X: x, Y: y, Width: width, Height: height}
	return a.captureRegion.Execute(region)
}

// CaptureWindow takes a screenshot of a specific window.
func (a *App) CaptureWindow(windowID string) (*entity.Screenshot, error) {
	return a.captureWindow.Execute(windowID)
}

// ListWindows returns available windows for capture.
func (a *App) ListWindows() ([]WindowInfo, error) {
	windows, err := a.listWindows.Execute()
	if err != nil {
		return nil, err
	}

	result := make([]WindowInfo, len(windows))
	for i, w := range windows {
		result[i] = WindowInfo{ID: w.ID, Title: w.Title, App: w.App}
	}
	return result, nil
}

// WindowInfo is the frontend-facing window metadata struct.
type WindowInfo struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	App   string `json:"app"`
}
