package port

import "shotgo/internal/domain/entity"

// Capturer defines the interface for screen capture operations.
type Capturer interface {
	// CaptureFullscreen captures the entire screen.
	CaptureFullscreen() (*entity.Screenshot, error)

	// CaptureRegion captures a specific rectangular region.
	CaptureRegion(region entity.Region) (*entity.Screenshot, error)

	// CaptureWindow captures a specific window by its ID.
	CaptureWindow(windowID string) (*entity.Screenshot, error)

	// ListWindows returns available windows for capture.
	ListWindows() ([]WindowInfo, error)
}

// WindowInfo holds metadata about a capturable window.
type WindowInfo struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	App   string `json:"app"`
}
