package usecase

import (
	"errors"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// SaveScreenshot persists a screenshot to disk.
type SaveScreenshot struct {
	storage port.FileStorage
}

// NewSaveScreenshot creates a new SaveScreenshot use case.
func NewSaveScreenshot(s port.FileStorage) *SaveScreenshot {
	return &SaveScreenshot{storage: s}
}

// Execute saves the screenshot to the given path.
// If path is empty, uses the default directory.
func (uc *SaveScreenshot) Execute(shot *entity.Screenshot, path string) error {
	if shot == nil {
		return errors.New("screenshot is nil")
	}
	if path == "" {
		path = uc.storage.DefaultDirectory()
	}
	return uc.storage.SaveScreenshot(shot, path)
}
