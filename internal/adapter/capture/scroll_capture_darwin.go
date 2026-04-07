//go:build darwin

package capture

import (
	"fmt"
	"time"

	imgpkg "shotgo/internal/adapter/image"
	"shotgo/internal/domain/entity"
)

// ScrollableCapturer captures scrollable content by repeatedly screenshotting
// a region while simulating scroll wheel events, then stitching the frames.
type ScrollableCapturer struct {
	base *DarwinCapturer
}

func NewScrollableCapturer(base *DarwinCapturer) *ScrollableCapturer {
	return &ScrollableCapturer{base: base}
}

const (
	maxFrames        = 30
	scrollDelta      = 5 // positive deltaY = scroll down on macOS natural scrolling
	settleDelay      = 250 * time.Millisecond
	stableFrameLimit = 2
)

// CaptureScrollable captures the given region, then auto-scrolls and re-captures
// until the content stops changing or maxFrames is reached. Returns a stitched PNG.
func (c *ScrollableCapturer) CaptureScrollable(region entity.Region) (*entity.Screenshot, error) {
	centerX := region.X + region.Width/2
	centerY := region.Y + region.Height/2
	MoveMouseTo(centerX, centerY)
	time.Sleep(150 * time.Millisecond)

	frames := make([][]byte, 0, maxFrames)
	stable := 0
	var prev []byte

	for i := 0; i < maxFrames; i++ {
		shot, err := c.base.CaptureRegion(region)
		if err != nil {
			return nil, fmt.Errorf("scroll capture frame %d: %w", i, err)
		}
		if prev != nil && imgpkg.FramesAreEqual(prev, shot.Data) {
			stable++
			if stable >= stableFrameLimit {
				break
			}
		} else {
			stable = 0
			frames = append(frames, shot.Data)
		}
		prev = shot.Data

		PostScrollWheel(scrollDelta)
		time.Sleep(settleDelay)
	}

	stitched, err := imgpkg.StitchVertical(frames, 0)
	if err != nil {
		return nil, fmt.Errorf("stitch frames: %w", err)
	}

	return &entity.Screenshot{
		ID:        fmt.Sprintf("scr-scroll-%d", time.Now().UnixNano()),
		Data:      stitched,
		Width:     region.Width,
		Height:    estimateHeight(stitched),
		Format:    entity.FormatPNG,
		Source:    entity.SourceRegion,
		CreatedAt: time.Now(),
	}, nil
}

func estimateHeight(_ []byte) int {
	// Filled in by frontend if needed; not critical for stitched bytes.
	return 0
}
