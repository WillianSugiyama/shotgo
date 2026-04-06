//go:build darwin

package recorder

import (
	"fmt"
	"os/exec"
	"sync"

	"shotgo/internal/domain/entity"
)

// DarwinRecorder implements port.Recorder using screencapture -v on macOS.
type DarwinRecorder struct {
	mu        sync.Mutex
	cmd       *exec.Cmd
	recording bool
	paused    bool
	format    entity.OutputFormat
	outPath   string
}

// NewDarwinRecorder returns a new DarwinRecorder.
func NewDarwinRecorder() *DarwinRecorder {
	return &DarwinRecorder{}
}

func (r *DarwinRecorder) Start(region *entity.Region, format entity.OutputFormat) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.recording {
		return fmt.Errorf("already recording")
	}
	// TODO: build output path from config; use -v flag for video capture
	// TODO: support region parameter via -R flag
	r.format = format
	r.outPath = fmt.Sprintf("/tmp/shotgo-rec.%s", format)
	r.cmd = exec.Command("screencapture", "-v", r.outPath)
	if err := r.cmd.Start(); err != nil {
		return fmt.Errorf("start recording: %w", err)
	}
	r.recording = true
	return nil
}

func (r *DarwinRecorder) Stop() (*entity.Recording, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.recording {
		return nil, fmt.Errorf("not recording")
	}
	// TODO: send interrupt signal to stop screencapture gracefully
	if r.cmd != nil && r.cmd.Process != nil {
		_ = r.cmd.Process.Kill()
	}
	r.recording = false
	r.paused = false
	return &entity.Recording{
		State:      entity.RecordingStopped,
		Format:     r.format,
		OutputPath: r.outPath,
	}, nil
}

func (r *DarwinRecorder) Pause() error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.recording || r.paused {
		return fmt.Errorf("cannot pause: not actively recording")
	}
	// TODO: implement pause via signal or AVFoundation
	r.paused = true
	return nil
}

func (r *DarwinRecorder) Resume() error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.paused {
		return fmt.Errorf("not paused")
	}
	// TODO: implement resume via signal or AVFoundation
	r.paused = false
	return nil
}

func (r *DarwinRecorder) IsRecording() bool {
	r.mu.Lock()
	defer r.mu.Unlock()
	return r.recording
}
