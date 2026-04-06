package app

import (
	"log"

	"shotgo/internal/adapter/recorder"
	"shotgo/internal/domain/entity"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// StartRecording begins a screen recording session.
func (a *App) StartRecording(format string) error {
	outputFormat := entity.OutputFormat(format)
	return a.startRecording.Execute(nil, outputFormat)
}

// StartRecordingRegion begins recording a specific region.
func (a *App) StartRecordingRegion(x, y, w, h int, format string) error {
	region := &entity.Region{X: x, Y: y, Width: w, Height: h}
	return a.startRecording.Execute(region, entity.OutputFormat(format))
}

// StopRecording signals stop and processes in background.
// Emits "recording:done" event when the file is ready.
func (a *App) StopRecording() error {
	go func() {
		rec, err := a.stopRecording.Execute()
		if err != nil {
			log.Printf("[shotgo] stop recording error: %v", err)
			wailsRuntime.EventsEmit(a.ctx, "recording:error", err.Error())
			return
		}
		log.Printf("[shotgo] recording stopped: %s", rec.OutputPath)
		wailsRuntime.EventsEmit(a.ctx, "recording:done", RecordingResult{
			ID: rec.ID, Format: string(rec.Format),
			Duration: rec.Duration.Seconds(), OutputPath: rec.OutputPath,
		})
	}()
	return nil
}

// RecordingResult is the frontend-facing recording response.
type RecordingResult struct {
	ID         string  `json:"id"`
	Format     string  `json:"format"`
	Duration   float64 `json:"duration"`
	OutputPath string  `json:"outputPath"`
}

// ListRecordingSources returns available screens and windows.
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

// RecWindowInfo is a frontend-facing window descriptor.
type RecWindowInfo struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	App   string `json:"app"`
}
