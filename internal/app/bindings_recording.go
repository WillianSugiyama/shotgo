package app

import (
	"log"

	"shotgo/internal/adapter/recorder"
	"shotgo/internal/domain/entity"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// StartRecording begins a screen recording session.
func (a *App) StartRecording(format string) error {
	return a.startRecording.Execute(nil, entity.OutputFormat(format))
}

// StopRecording signals stop, converts if needed, emits "recording:done".
func (a *App) StopRecording() error {
	go func() {
		rec, err := a.stopRecording.Execute()
		if err != nil {
			log.Printf("[shotgo] stop error: %v", err)
			wailsRuntime.EventsEmit(a.ctx, "recording:error", err.Error())
			return
		}
		finalPath := rec.OutputPath
		if rec.Format == entity.FormatGIF {
			gifPath := finalPath + ".gif"
			if e := a.ffmpegClient.EncodeGIF(finalPath, gifPath, 15, 640); e == nil {
				finalPath = gifPath
			}
		}
		log.Printf("[shotgo] recording saved: %s", finalPath)
		wailsRuntime.EventsEmit(a.ctx, "recording:done", RecordingResult{
			ID: rec.ID, Format: string(rec.Format),
			Duration: rec.Duration.Seconds(), OutputPath: finalPath,
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
