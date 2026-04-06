package entity

import "time"

// RecordingState represents the current state of a recording session.
type RecordingState string

const (
	RecordingIdle    RecordingState = "idle"
	RecordingActive  RecordingState = "recording"
	RecordingPaused  RecordingState = "paused"
	RecordingStopped RecordingState = "stopped"
)

// OutputFormat represents the recording output format.
type OutputFormat string

const (
	FormatMP4 OutputFormat = "mp4"
	FormatGIF OutputFormat = "gif"
)

// MaxRecordingDuration is the maximum allowed recording time.
const MaxRecordingDuration = 5 * time.Minute

// Recording holds state and metadata for a screen recording session.
type Recording struct {
	ID         string         `json:"id"`
	State      RecordingState `json:"state"`
	Format     OutputFormat   `json:"format"`
	Region     *Region        `json:"region,omitempty"`
	StartedAt  time.Time      `json:"startedAt"`
	Duration   time.Duration  `json:"duration"`
	OutputPath string         `json:"outputPath"`
}

// IsActive returns true if the recording is in progress or paused.
func (r Recording) IsActive() bool {
	return r.State == RecordingActive || r.State == RecordingPaused
}
