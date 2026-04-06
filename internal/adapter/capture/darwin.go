//go:build darwin

package capture

import (
	"fmt"
	"image/png"
	"os"
	"os/exec"
	"path/filepath"
	"time"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

type DarwinCapturer struct{}

func NewDarwinCapturer() *DarwinCapturer { return &DarwinCapturer{} }

func (c *DarwinCapturer) CaptureFullscreen() (*entity.Screenshot, error) {
	return c.run(entity.SourceFullscreen, []string{"-x", "-t", "png"})
}

func (c *DarwinCapturer) CaptureRegion(region entity.Region) (*entity.Screenshot, error) {
	args := []string{"-x", "-t", "png", "-R",
		fmt.Sprintf("%d,%d,%d,%d", region.X, region.Y, region.Width, region.Height)}
	return c.run(entity.SourceRegion, args)
}

// CaptureInteractive uses macOS native region selector (-i flag).
func (c *DarwinCapturer) CaptureInteractive() (*entity.Screenshot, error) {
	return c.run(entity.SourceRegion, []string{"-i", "-t", "png"})
}

func (c *DarwinCapturer) CaptureWindow(windowID string) (*entity.Screenshot, error) {
	return nil, fmt.Errorf("CaptureWindow not yet implemented")
}

func (c *DarwinCapturer) ListWindows() ([]port.WindowInfo, error) {
	return nil, fmt.Errorf("ListWindows not yet implemented")
}

func (c *DarwinCapturer) run(
	source entity.CaptureSource, args []string,
) (*entity.Screenshot, error) {
	tmp := filepath.Join(os.TempDir(), fmt.Sprintf("shotgo-%d.png", time.Now().UnixNano()))
	defer func() { _ = os.Remove(tmp) }()

	fullArgs := append(args, tmp)
	if err := exec.Command("screencapture", fullArgs...).Run(); err != nil {
		return nil, fmt.Errorf("screencapture failed: %w", err)
	}
	return readScreenshot(tmp, source)
}

func readScreenshot(path string, source entity.CaptureSource) (*entity.Screenshot, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open screenshot: %w", err)
	}
	defer func() { _ = f.Close() }()

	img, err := png.Decode(f)
	if err != nil {
		return nil, fmt.Errorf("decode png: %w", err)
	}

	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read screenshot: %w", err)
	}

	bounds := img.Bounds()
	return &entity.Screenshot{
		ID:        fmt.Sprintf("scr-%d", time.Now().UnixNano()),
		Data:      data,
		Width:     bounds.Dx(),
		Height:    bounds.Dy(),
		Format:    entity.FormatPNG,
		Source:    source,
		CreatedAt: time.Now(),
	}, nil
}
