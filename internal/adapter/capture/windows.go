//go:build windows

package capture

import (
	"fmt"
	"time"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

type WindowsCapturer struct{}

func NewWindowsCapturer() *WindowsCapturer { return &WindowsCapturer{} }

func (c *WindowsCapturer) CaptureFullscreen() (*entity.Screenshot, error) {
	w, h := getScreenSize()
	return c.capture(0, 0, w, h, entity.SourceFullscreen)
}

func (c *WindowsCapturer) CaptureRegion(r entity.Region) (*entity.Screenshot, error) {
	return c.capture(r.X, r.Y, r.Width, r.Height, entity.SourceRegion)
}

func (c *WindowsCapturer) CaptureInteractive() (*entity.Screenshot, error) {
	return c.CaptureFullscreen()
}

func (c *WindowsCapturer) CaptureWindow(_ string) (*entity.Screenshot, error) {
	return nil, fmt.Errorf("CaptureWindow not yet implemented")
}

func (c *WindowsCapturer) ListWindows() ([]port.WindowInfo, error) {
	return nil, fmt.Errorf("ListWindows not yet implemented")
}

func (c *WindowsCapturer) capture(
	x, y, w, h int, source entity.CaptureSource,
) (*entity.Screenshot, error) {
	raw, err := captureRect(x, y, w, h)
	if err != nil {
		return nil, fmt.Errorf("capture screen: %w", err)
	}

	data, err := encodePNG(raw, w, h)
	if err != nil {
		return nil, fmt.Errorf("encode png: %w", err)
	}

	return &entity.Screenshot{
		ID:        fmt.Sprintf("scr-%d", time.Now().UnixNano()),
		Data:      data,
		Width:     w,
		Height:    h,
		Format:    entity.FormatPNG,
		Source:    source,
		CreatedAt: time.Now(),
	}, nil
}
