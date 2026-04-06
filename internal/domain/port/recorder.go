package port

import "shotgo/internal/domain/entity"

// Recorder defines the interface for screen recording operations.
type Recorder interface {
	// Start begins recording the given region (nil = fullscreen).
	Start(region *entity.Region, format entity.OutputFormat) error

	// Stop ends the recording and returns the result.
	Stop() (*entity.Recording, error)

	// Pause pauses an active recording.
	Pause() error

	// Resume resumes a paused recording.
	Resume() error

	// IsRecording returns true if a recording is active.
	IsRecording() bool
}
