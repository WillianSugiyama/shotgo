//go:build windows

package app

import (
	"os"

	"shotgo/internal/adapter/capture"
	"shotgo/internal/adapter/clipboard"
	"shotgo/internal/adapter/hotkey"
	"shotgo/internal/adapter/permissions"
	"shotgo/internal/adapter/recorder"
	"shotgo/internal/infrastructure/ffmpeg"
	"shotgo/internal/infrastructure/storage"
	"shotgo/internal/usecase"
)

// New creates a new App with Windows-specific adapters.
func New() *App {
	capturer := capture.NewWindowsCapturer()
	ffmpegPath, _ := ffmpeg.ExtractBinary(os.TempDir() + "/shotgo")
	rec := recorder.NewWindowsRecorder(ffmpegPath)
	clip := clipboard.NewWindowsClipboard()
	hotkeyMgr := hotkey.NewWindowsHotkeyManager()
	perms := permissions.NewWindowsPermissions()
	fileStore := storage.NewLocalFileStorage("")
	configStore, _ := storage.NewJSONConfigStore("")
	ffmpegClient := ffmpeg.NewClient(ffmpegPath)

	return &App{
		interactiveCapturer: capturer,
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
