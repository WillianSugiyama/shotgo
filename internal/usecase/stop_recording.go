package usecase

import (
	"errors"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// StopRecording ends an active screen recording session.
type StopRecording struct {
	recorder port.Recorder
}

// NewStopRecording creates a new StopRecording use case.
func NewStopRecording(r port.Recorder) *StopRecording {
	return &StopRecording{recorder: r}
}

// Execute stops the recording and returns the result.
func (uc *StopRecording) Execute() (*entity.Recording, error) {
	if !uc.recorder.IsRecording() {
		return nil, errors.New("no recording in progress")
	}
	return uc.recorder.Stop()
}
