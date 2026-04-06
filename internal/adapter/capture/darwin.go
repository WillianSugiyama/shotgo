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
	return c.runScreencapture(entity.SourceFullscreen, nil)
}

func (c *DarwinCapturer) CaptureRegion(region entity.Region) (*entity.Screenshot, error) {
	// TODO: pass -R x,y,w,h to screencapture for region selection
	return c.runScreencapture(entity.SourceRegion, &region)
}

func (c *DarwinCapturer) CaptureWindow(windowID string) (*entity.Screenshot, error) {
	// TODO: use -l <windowID> flag for window capture
	return nil, fmt.Errorf("CaptureWindow not yet implemented for darwin")
}

func (c *DarwinCapturer) ListWindows() ([]port.WindowInfo, error) {
	// TODO: use CGWindowListCopyWindowInfo via CGo or osascript
	return nil, fmt.Errorf("ListWindows not yet implemented for darwin")
}

func (c *DarwinCapturer) runScreencapture(source entity.CaptureSource, region *entity.Region) (*entity.Screenshot, error) {
	tmpFile := filepath.Join(os.TempDir(), fmt.Sprintf("shotgo-%d.png", time.Now().UnixNano()))
	defer os.Remove(tmpFile)

	args := []string{"-x", "-t", "png", tmpFile}
	cmd := exec.Command("screencapture", args...)
	if err := cmd.Run(); err != nil {
		return nil, fmt.Errorf("screencapture failed: %w", err)
	}

	f, err := os.Open(tmpFile)
	if err != nil {
		return nil, fmt.Errorf("open screenshot: %w", err)
	}
	defer f.Close()

	img, err := png.Decode(f)
	if err != nil {
		return nil, fmt.Errorf("decode png: %w", err)
	}
	bounds := img.Bounds()

	data, err := os.ReadFile(tmpFile)
	if err != nil {
		return nil, fmt.Errorf("read screenshot: %w", err)
	}

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
