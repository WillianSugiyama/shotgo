package app

import (
	"fmt"
	"os"
	"path/filepath"
	"time"

	"shotgo/internal/adapter/recorder"
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

// ListRecordingSources returns available screens and windows for recording.
func (a *App) ListRecordingSources() *RecordingSources {
	screens := recorder.ListScreens(a.ffmpegPath)
	si := make([]ScreenInfo, len(screens))
	for i, s := range screens {
		si[i] = ScreenInfo{Index: s.Index, Name: s.Name}
	}

	windows := recorder.ListRecordableWindows()
	wi := make([]RecWindowInfo, len(windows))
	for i, w := range windows {
		wi[i] = RecWindowInfo{ID: w.ID, Title: w.Title, App: w.App}
	}
	return &RecordingSources{Screens: si, Windows: wi}
}

// RecordingSources contains available recording targets.
type RecordingSources struct {
	Screens []ScreenInfo    `json:"screens"`
	Windows []RecWindowInfo `json:"windows"`
}

// ScreenInfo is a frontend-facing screen descriptor.
type ScreenInfo struct {
	Index int    `json:"index"`
	Name  string `json:"name"`
}

// RecWindowInfo is a frontend-facing window descriptor for recording.
type RecWindowInfo struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	App   string `json:"app"`
}
