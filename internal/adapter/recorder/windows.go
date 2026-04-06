//go:build windows

package recorder

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"sync"
	"time"

	"shotgo/internal/domain/entity"
)

type WindowsRecorder struct {
	mu                sync.Mutex
	cmd               *exec.Cmd
	recording, paused bool
	format            entity.OutputFormat
	outPath           string
	startTime         time.Time
}

func NewWindowsRecorder() *WindowsRecorder { return &WindowsRecorder{} }

func (r *WindowsRecorder) Start(_ *entity.Region, format entity.OutputFormat) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.recording {
		return fmt.Errorf("already recording")
	}

	r.format = format
	r.outPath = filepath.Join(os.TempDir(),
		fmt.Sprintf("shotgo-rec-%d.mp4", time.Now().UnixNano()))

	// Use ffmpeg gdigrab for screen capture on Windows
	r.cmd = exec.Command("ffmpeg", "-y",
		"-f", "gdigrab", "-framerate", "30", "-i", "desktop",
		"-c:v", "libx264", "-preset", "ultrafast", r.outPath)
	if err := r.cmd.Start(); err != nil {
		return fmt.Errorf("start recording: %w", err)
	}
	r.recording = true
	r.startTime = time.Now()
	return nil
}

func (r *WindowsRecorder) Stop() (*entity.Recording, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.recording {
		return nil, fmt.Errorf("not recording")
	}

	if r.cmd != nil && r.cmd.Process != nil {
		_ = r.cmd.Process.Kill()
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

func (r *WindowsRecorder) Pause() error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.recording || r.paused {
		return fmt.Errorf("cannot pause")
	}
	r.paused = true
	return nil
}

func (r *WindowsRecorder) Resume() error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.paused {
		return fmt.Errorf("not paused")
	}
	r.paused = false
	return nil
}

func (r *WindowsRecorder) IsRecording() bool {
	r.mu.Lock()
	defer r.mu.Unlock()
	return r.recording
}
