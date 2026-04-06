//go:build darwin

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

type DarwinRecorder struct {
	mu                sync.Mutex
	ffmpegPath        string
	cmd               *exec.Cmd
	stdin             io.WriteCloser
	recording, paused bool
	format            entity.OutputFormat
	outPath           string
	startTime         time.Time
}

func NewDarwinRecorder(ffmpegPath string) *DarwinRecorder {
	return &DarwinRecorder{ffmpegPath: ffmpegPath}
}

func (r *DarwinRecorder) Start(region *entity.Region, format entity.OutputFormat) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.recording {
		return fmt.Errorf("already recording")
	}

	r.format = format
	r.outPath = filepath.Join(os.TempDir(),
		fmt.Sprintf("shotgo-rec-%d.mp4", time.Now().UnixNano()))

	// ffmpeg with avfoundation captures screen on macOS
	input := "1:none" // screen index 1, no audio
	if region != nil {
		input = fmt.Sprintf("1:none -video_size %dx%d -offset_x %d -offset_y %d",
			region.Width, region.Height, region.X, region.Y)
	}
	_ = input // TODO: use region params in ffmpeg args

	r.cmd = exec.Command(r.ffmpegPath, "-y",
		"-f", "avfoundation", "-framerate", "30",
		"-capture_cursor", "1", "-i", "1:none",
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

func (r *DarwinRecorder) Stop() (*entity.Recording, error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if !r.recording {
		return nil, fmt.Errorf("not recording")
	}
	if r.stdin != nil {
		_, _ = r.stdin.Write([]byte("q"))
		_ = r.stdin.Close()
	}
	if r.cmd != nil {
		_ = r.cmd.Wait()
	}
	duration := time.Since(r.startTime)
	r.recording = false
	r.paused = false
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
