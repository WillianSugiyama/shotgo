package port

import "shotgo/internal/domain/entity"

// InteractiveCapturer captures using the OS native region selector.
type InteractiveCapturer interface {
	CaptureInteractive() (*entity.Screenshot, error)
}
