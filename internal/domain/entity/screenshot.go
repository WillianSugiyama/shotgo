package entity

import "time"

// CaptureSource indicates how the screenshot was taken.
type CaptureSource string

const (
	SourceFullscreen CaptureSource = "fullscreen"
	SourceRegion     CaptureSource = "region"
	SourceWindow     CaptureSource = "window"
)

// ImageFormat represents the output image format.
type ImageFormat string

const (
	FormatPNG  ImageFormat = "png"
	FormatJPEG ImageFormat = "jpeg"
)

// Screenshot holds captured image data and metadata.
type Screenshot struct {
	ID        string        `json:"id"`
	Data      []byte        `json:"-"`
	Width     int           `json:"width"`
	Height    int           `json:"height"`
	Format    ImageFormat   `json:"format"`
	Source    CaptureSource `json:"source"`
	Region    *Region       `json:"region,omitempty"`
	CreatedAt time.Time     `json:"createdAt"`
}
