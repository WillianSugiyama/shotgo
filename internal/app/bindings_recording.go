package app

import "shotgo/internal/domain/entity"

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

// StopRecording ends the active recording session.
func (a *App) StopRecording() (*entity.Recording, error) {
	return a.stopRecording.Execute()
}
