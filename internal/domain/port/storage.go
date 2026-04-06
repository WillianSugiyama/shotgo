package port

import "shotgo/internal/domain/entity"

// FileStorage defines the interface for saving captures to disk.
type FileStorage interface {
	// SaveScreenshot writes a screenshot to the given path.
	SaveScreenshot(shot *entity.Screenshot, path string) error

	// SaveRecording writes a recording file to the given path.
	SaveRecording(rec *entity.Recording, path string) error

	// DefaultDirectory returns the default save directory.
	DefaultDirectory() string
}
