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

// DarwinCapturer implements port.Capturer using macOS screencapture CLI.
type DarwinCapturer struct{}

// NewDarwinCapturer returns a new DarwinCapturer.
func NewDarwinCapturer() *DarwinCapturer {
	return &DarwinCapturer{}
}

func (c *DarwinCapturer) CaptureFullscreen() (*entity.Screenshot, error) {
	return c.capture(entity.SourceFullscreen, nil)
}

func (c *DarwinCapturer) CaptureRegion(region entity.Region) (*entity.Screenshot, error) {
	return c.capture(entity.SourceRegion, &region)
}

func (c *DarwinCapturer) CaptureWindow(windowID string) (*entity.Screenshot, error) {
	return nil, fmt.Errorf("CaptureWindow not yet implemented")
}

func (c *DarwinCapturer) ListWindows() ([]port.WindowInfo, error) {
	return nil, fmt.Errorf("ListWindows not yet implemented")
}

func (c *DarwinCapturer) capture(
	source entity.CaptureSource, region *entity.Region,
) (*entity.Screenshot, error) {
	tmp := filepath.Join(os.TempDir(), fmt.Sprintf("shotgo-%d.png", time.Now().UnixNano()))
	defer func() { _ = os.Remove(tmp) }()

	args := buildArgs(tmp, region)
	if err := exec.Command("screencapture", args...).Run(); err != nil {
		return nil, fmt.Errorf("screencapture failed: %w", err)
	}

	return readScreenshot(tmp, source, region)
}

func buildArgs(path string, region *entity.Region) []string {
	args := []string{"-x", "-t", "png"}
	if region != nil {
		args = append(args, "-R",
			fmt.Sprintf("%d,%d,%d,%d", region.X, region.Y, region.Width, region.Height))
	}
	return append(args, path)
}

func readScreenshot(
	path string, source entity.CaptureSource, region *entity.Region,
) (*entity.Screenshot, error) {
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
		Region:    region,
		CreatedAt: time.Now(),
	}, nil
}
