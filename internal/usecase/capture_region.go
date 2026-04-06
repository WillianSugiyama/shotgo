package usecase

import (
	"errors"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// CaptureRegion takes a screenshot of a selected rectangular area.
type CaptureRegion struct {
	capturer port.Capturer
}

// NewCaptureRegion creates a new CaptureRegion use case.
func NewCaptureRegion(c port.Capturer) *CaptureRegion {
	return &CaptureRegion{capturer: c}
}

// Execute captures the given region and returns the screenshot.
func (uc *CaptureRegion) Execute(region entity.Region) (*entity.Screenshot, error) {
	if !region.IsValid() {
		return nil, errors.New("invalid region: width and height must be positive")
	}
	return uc.capturer.CaptureRegion(region)
}
