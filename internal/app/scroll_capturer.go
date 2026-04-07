package app

import "shotgo/internal/domain/entity"

// ScrollCapturer is the platform-agnostic interface for scrollable capture.
type ScrollCapturer interface {
	CaptureScrollable(region entity.Region) (*entity.Screenshot, error)
}
