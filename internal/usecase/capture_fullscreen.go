package usecase

import (
	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// CaptureFullscreen takes a screenshot of the entire screen.
type CaptureFullscreen struct {
	capturer port.Capturer
}

// NewCaptureFullscreen creates a new CaptureFullscreen use case.
func NewCaptureFullscreen(c port.Capturer) *CaptureFullscreen {
	return &CaptureFullscreen{capturer: c}
}

// Execute captures the fullscreen and returns the screenshot.
func (uc *CaptureFullscreen) Execute() (*entity.Screenshot, error) {
	return uc.capturer.CaptureFullscreen()
}
