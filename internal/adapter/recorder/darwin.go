//go:build darwin

package recorder

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"sync"
	"syscall"
	"time"

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
	startTime time.Time
}

func NewDarwinRecorder() *DarwinRecorder { return &DarwinRecorder{} }

func (r *DarwinRecorder) Start(region *entity.Region, format entity.OutputFormat) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.recording {
		return fmt.Errorf("already recording")
	}

	r.format = format
	r.outPath = filepath.Join(os.TempDir(), fmt.Sprintf("shotgo-rec-%d.mov", time.Now().UnixNano()))
	r.cmd = exec.Command("screencapture", "-v", r.outPath)
	if err := r.cmd.Start(); err != nil {
		return fmt.Errorf("start recording: %w", err)
	}
	r.recording = true
	r.startTime = time.Now()
	return nil
}

func (r *DarwinRecorder) Stop() (*entity.Recording, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.recording {
		return nil, fmt.Errorf("not recording")
	}

	if r.cmd != nil && r.cmd.Process != nil {
		_ = r.cmd.Process.Signal(syscall.SIGINT)
		_ = r.cmd.Wait()
	}

	duration := time.Since(r.startTime)
	r.recording = false
	r.paused = false

	return &entity.Recording{
		ID:         fmt.Sprintf("rec-%d", time.Now().UnixNano()),
		State:      entity.RecordingStopped,
		Format:     r.format,
		OutputPath: r.outPath,
		StartedAt:  r.startTime,
		Duration:   duration,
	}, nil
}

func (r *DarwinRecorder) Pause() error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.recording || r.paused {
		return fmt.Errorf("cannot pause")
	}
	r.paused = true
	return nil
}

func (r *DarwinRecorder) Resume() error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.paused {
		return fmt.Errorf("not paused")
	}
	r.paused = false
	return nil
}

func (r *DarwinRecorder) IsRecording() bool {
	r.mu.Lock()
	defer r.mu.Unlock()
	return r.recording
}
