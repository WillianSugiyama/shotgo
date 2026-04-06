//go:build darwin

package recorder

import (
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"sync"
	"time"

	"shotgo/internal/domain/entity"
)

type DarwinRecorder struct {
	mu         sync.Mutex
	ffmpegPath string
	saveDir    string
	cmd        *exec.Cmd
	stdin      io.WriteCloser
	recording  bool
	format     entity.OutputFormat
	outPath    string
	startTime  time.Time
}

func NewDarwinRecorder(ffmpegPath, saveDir string) *DarwinRecorder {
	return &DarwinRecorder{ffmpegPath: ffmpegPath, saveDir: saveDir}
}

func (r *DarwinRecorder) Start(_ *entity.Region, format entity.OutputFormat) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.recording {
		return fmt.Errorf("already recording")
	}

	screenIdx := findScreenIndex(r.ffmpegPath)
	r.format = format
	_ = os.MkdirAll(r.saveDir, 0o755)
	ts := time.Now().Format("20060102_150405")
	r.outPath = filepath.Join(r.saveDir, fmt.Sprintf("ShotGo_%s.mp4", ts))

	input := screenIdx + ":none"
	log.Printf("[shotgo] recording to %s (input=%s)", r.outPath, input)
	r.cmd = exec.Command(r.ffmpegPath, "-y",
		"-f", "avfoundation", "-framerate", "30",
		"-capture_cursor", "1", "-i", input,
		"-c:v", "libx264", "-preset", "ultrafast",
		"-pix_fmt", "yuv420p", r.outPath)
	r.cmd.Stderr = os.Stderr

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

func (r *DarwinRecorder) Stop() (*entity.Recording, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.recording {
		return nil, fmt.Errorf("not recording")
	}
	gracefulStop(r.cmd, r.stdin)
	duration := time.Since(r.startTime)
	r.recording = false
	return &entity.Recording{
		ID:    fmt.Sprintf("rec-%d", time.Now().UnixNano()),
		State: entity.RecordingStopped, Format: r.format,
		OutputPath: r.outPath, StartedAt: r.startTime, Duration: duration,
	}, nil
}

func (r *DarwinRecorder) Pause() error  { return fmt.Errorf("pause not supported") }
func (r *DarwinRecorder) Resume() error { return fmt.Errorf("resume not supported") }

func (r *DarwinRecorder) IsRecording() bool {
	r.mu.Lock()
	defer r.mu.Unlock()
	return r.recording
}
