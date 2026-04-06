package app

import (
	"context"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
	"shotgo/internal/infrastructure/ffmpeg"
	"shotgo/internal/usecase"
)

// App is the main application struct exposed to Wails.
// It wires use cases to frontend bindings.
type App struct {
	ctx context.Context

	// Last captured screenshot (held for save/copy operations)
	lastScreenshot *entity.Screenshot

	// Platform adapters held for direct use
	interactiveCapturer port.InteractiveCapturer
	permissionsChecker  port.PermissionsChecker
	hotkeyMgr           port.HotkeyManager

	// FFmpeg path and client for video conversion
	ffmpegPath   string
	ffmpegClient *ffmpeg.Client

	// Use cases
	captureFullscreen *usecase.CaptureFullscreen
	captureRegion     *usecase.CaptureRegion
	captureWindow     *usecase.CaptureWindow
	listWindows       *usecase.ListWindows
	startRecording    *usecase.StartRecording
	stopRecording     *usecase.StopRecording
	copyToClipboard   *usecase.CopyToClipboard
	saveScreenshot    *usecase.SaveScreenshot
	checkPermissions  *usecase.CheckPermissions
	loadConfig        *usecase.LoadConfig
	saveConfig        *usecase.SaveConfig
	configureHotkeys  *usecase.ConfigureHotkeys
}
