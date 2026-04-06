//go:build windows

package recorder

import (
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"sync"
	"time"

	"shotgo/internal/domain/entity"
)

type WindowsRecorder struct {
	mu                sync.Mutex
	ffmpegPath        string
	cmd               *exec.Cmd
	stdin             io.WriteCloser
	recording, paused bool
	format            entity.OutputFormat
	outPath           string
	startTime         time.Time
}

func NewWindowsRecorder(ffmpegPath string) *WindowsRecorder {
	return &WindowsRecorder{ffmpegPath: ffmpegPath}
}

func (r *WindowsRecorder) Start(_ *entity.Region, format entity.OutputFormat) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.recording {
		return fmt.Errorf("already recording")
	}

	r.format = format
	r.outPath = filepath.Join(os.TempDir(),
		fmt.Sprintf("shotgo-rec-%d.mp4", time.Now().UnixNano()))

	r.cmd = exec.Command(r.ffmpegPath, "-y",
		"-f", "gdigrab", "-framerate", "30", "-i", "desktop",
		"-c:v", "libx264", "-preset", "ultrafast",
		"-pix_fmt", "yuv420p", r.outPath)

	var err error
	r.stdin, err = r.cmd.StdinPipe()
	if err != nil {
		return fmt.Errorf("stdin pipe: %w", err)
	}
	if err := r.cmd.Start(); err != nil {
		return fmt.Errorf("start ffmpeg: %w", err)
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
	gracefulStop(r.cmd, r.stdin)
	duration := time.Since(r.startTime)
	r.recording = false
	r.paused = false
	return &entity.Recording{
		ID:    fmt.Sprintf("rec-%d", time.Now().UnixNano()),
		State: entity.RecordingStopped, Format: r.format,
		OutputPath: r.outPath, StartedAt: r.startTime, Duration: duration,
	}, nil
}

func (r *WindowsRecorder) Pause() error  { return fmt.Errorf("pause not supported") }
func (r *WindowsRecorder) Resume() error { return fmt.Errorf("resume not supported") }

func (r *WindowsRecorder) IsRecording() bool {
	r.mu.Lock()
	defer r.mu.Unlock()
	return r.recording
}
