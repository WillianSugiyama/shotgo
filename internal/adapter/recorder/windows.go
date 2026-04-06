//go:build windows

package recorder

import (
	"fmt"
	"sync"

	"shotgo/internal/domain/entity"
)

// WindowsRecorder implements port.Recorder using DXGI Desktop Duplication.
type WindowsRecorder struct {
	mu        sync.Mutex
	recording bool
	paused    bool
}

// NewWindowsRecorder returns a new WindowsRecorder.
func NewWindowsRecorder() *WindowsRecorder {
	return &WindowsRecorder{}
}

func (r *WindowsRecorder) Start(region *entity.Region, format entity.OutputFormat) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.recording {
		return fmt.Errorf("already recording")
	}
	// TODO: implement DXGI Desktop Duplication frame capture loop
	// TODO: encode frames to MP4/GIF using ffmpeg or native encoder
	r.recording = true
	return fmt.Errorf("Start not yet implemented for windows")
}

func (r *WindowsRecorder) Stop() (*entity.Recording, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.recording {
		return nil, fmt.Errorf("not recording")
	}
	// TODO: stop DXGI capture loop, finalize output file
	r.recording = false
	r.paused = false
	return nil, fmt.Errorf("Stop not yet implemented for windows")
}

func (r *WindowsRecorder) Pause() error {
	r.mu.Lock()
	defer r.mu.Unlock()
	// TODO: implement pause (stop frame capture but keep encoder open)
	return fmt.Errorf("Pause not yet implemented for windows")
}

func (r *WindowsRecorder) Resume() error {
	r.mu.Lock()
	defer r.mu.Unlock()
	// TODO: implement resume
	return fmt.Errorf("Resume not yet implemented for windows")
}

func (r *WindowsRecorder) IsRecording() bool {
	r.mu.Lock()
	defer r.mu.Unlock()
	return r.recording
}
