package usecase

import (
	"errors"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// CaptureWindow takes a screenshot of a specific window.
type CaptureWindow struct {
	capturer port.Capturer
}

// NewCaptureWindow creates a new CaptureWindow use case.
func NewCaptureWindow(c port.Capturer) *CaptureWindow {
	return &CaptureWindow{capturer: c}
}

// Execute captures the window with the given ID.
func (uc *CaptureWindow) Execute(windowID string) (*entity.Screenshot, error) {
	if windowID == "" {
		return nil, errors.New("window ID is required")
	}
	return uc.capturer.CaptureWindow(windowID)
}
