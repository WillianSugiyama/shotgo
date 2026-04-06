package usecase

import "shotgo/internal/domain/port"

// ListWindows retrieves all available windows for capture.
type ListWindows struct {
	capturer port.Capturer
}

// NewListWindows creates a new ListWindows use case.
func NewListWindows(c port.Capturer) *ListWindows {
	return &ListWindows{capturer: c}
}

// Execute returns the list of capturable windows.
func (uc *ListWindows) Execute() ([]port.WindowInfo, error) {
	return uc.capturer.ListWindows()
}
