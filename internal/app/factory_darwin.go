//go:build darwin

package app

import (
	"shotgo/internal/adapter/capture"
	"shotgo/internal/adapter/clipboard"
	"shotgo/internal/adapter/hotkey"
	"shotgo/internal/adapter/permissions"
	"shotgo/internal/adapter/recorder"
	"shotgo/internal/infrastructure/ffmpeg"
	"shotgo/internal/infrastructure/storage"
	"shotgo/internal/usecase"
)

// New creates a new App with macOS-specific adapters.
func New() *App {
	capturer := capture.NewDarwinCapturer()
	scrollCap := capture.NewScrollableCapturer(capturer)
	ffmpegPath, _ := ffmpeg.ExtractBinary("/tmp/shotgo")
	configStore, _ := storage.NewJSONConfigStore("")
	cfg := configStore.Default()
	rec := recorder.NewDarwinRecorder(ffmpegPath, cfg.SaveDirectory)
	clip := clipboard.NewDarwinClipboard()
	hotkeyMgr := hotkey.NewDarwinHotkeyManager()
	perms := permissions.NewDarwinPermissions()
	fileStore := storage.NewLocalFileStorage("")
	ffmpegClient := ffmpeg.NewClient(ffmpegPath)

	return &App{
		interactiveCapturer: capturer,
		scrollCapturer:      scrollCap,
		permissionsChecker:  perms,
		hotkeyMgr:           hotkeyMgr,
		ffmpegPath:          ffmpegPath,
		ffmpegClient:        ffmpegClient,
		captureFullscreen:   usecase.NewCaptureFullscreen(capturer),
		captureRegion:       usecase.NewCaptureRegion(capturer),
		captureWindow:       usecase.NewCaptureWindow(capturer),
		listWindows:         usecase.NewListWindows(capturer),
		startRecording:      usecase.NewStartRecording(rec),
		stopRecording:       usecase.NewStopRecording(rec),
		copyToClipboard:     usecase.NewCopyToClipboard(clip),
		saveScreenshot:      usecase.NewSaveScreenshot(fileStore),
		checkPermissions:    usecase.NewCheckPermissions(perms),
		loadConfig:          usecase.NewLoadConfig(configStore),
		saveConfig:          usecase.NewSaveConfig(configStore),
		configureHotkeys:    usecase.NewConfigureHotkeys(hotkeyMgr, configStore),
	}
}
