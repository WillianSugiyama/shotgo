package usecase

import (
	"errors"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// StartRecording begins a screen recording session.
type StartRecording struct {
	recorder port.Recorder
}

// NewStartRecording creates a new StartRecording use case.
func NewStartRecording(r port.Recorder) *StartRecording {
	return &StartRecording{recorder: r}
}

// Execute starts recording the given region in the specified format.
func (uc *StartRecording) Execute(region *entity.Region, format entity.OutputFormat) error {
	if uc.recorder.IsRecording() {
		return errors.New("a recording is already in progress")
	}
	if region != nil && !region.IsValid() {
		return errors.New("invalid region: width and height must be positive")
	}
	return uc.recorder.Start(region, format)
}
