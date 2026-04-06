package usecase

import (
	"errors"

	"shotgo/internal/domain/port"
)

// CopyToClipboard copies image data to the system clipboard.
type CopyToClipboard struct {
	clipboard port.Clipboard
}

// NewCopyToClipboard creates a new CopyToClipboard use case.
func NewCopyToClipboard(c port.Clipboard) *CopyToClipboard {
	return &CopyToClipboard{clipboard: c}
}

// Execute copies the given image bytes to clipboard.
func (uc *CopyToClipboard) Execute(data []byte) error {
	if len(data) == 0 {
		return errors.New("no image data to copy")
	}
	return uc.clipboard.CopyImage(data)
}
