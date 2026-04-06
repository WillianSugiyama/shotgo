package app

import (
	"fmt"
	"os"
	"path/filepath"
	"time"

	"shotgo/internal/domain/entity"
)

// StartRecording begins a screen recording session.
func (a *App) StartRecording(format string) error {
	outputFormat := entity.OutputFormat(format)
	return a.startRecording.Execute(nil, outputFormat)
}

// StartRecordingRegion begins recording a specific region.
func (a *App) StartRecordingRegion(x, y, w, h int, format string) error {
	region := &entity.Region{X: x, Y: y, Width: w, Height: h}
	outputFormat := entity.OutputFormat(format)
	return a.startRecording.Execute(region, outputFormat)
}

// StopRecording ends the recording and converts output via ffmpeg.
func (a *App) StopRecording() (*RecordingResult, error) {
	rec, err := a.stopRecording.Execute()
	if err != nil {
		return nil, err
	}

	finalPath, err := a.convertRecording(rec)
	if err != nil {
		return nil, err
	}

	return &RecordingResult{
		ID:         rec.ID,
		Format:     string(rec.Format),
		Duration:   rec.Duration.Seconds(),
		OutputPath: finalPath,
	}, nil
}

func (a *App) convertRecording(rec *entity.Recording) (string, error) {
	dir := filepath.Join(os.TempDir(), "shotgo-output")
	_ = os.MkdirAll(dir, 0o755)

	ts := time.Now().Format("20060102_150405")
	outPath := filepath.Join(dir, fmt.Sprintf("ShotGo_%s.%s", ts, rec.Format))

	if rec.Format == entity.FormatGIF {
		return outPath, a.ffmpegClient.EncodeGIF(rec.OutputPath, outPath, 15, 640)
	}
	return outPath, a.ffmpegClient.ConvertToMP4(rec.OutputPath, outPath)
}

// RecordingResult is the frontend-facing recording response.
type RecordingResult struct {
	ID         string  `json:"id"`
	Format     string  `json:"format"`
	Duration   float64 `json:"duration"`
	OutputPath string  `json:"outputPath"`
}
