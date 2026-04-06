package app

import (
	"fyne.io/systray"
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// setupTray initializes the system tray icon and menu.
// It blocks until systray.Quit is called, so run it in a goroutine.
func (a *App) setupTray() {
	systray.Run(a.onTrayReady, a.onTrayExit)
}

func (a *App) onTrayReady() {
	systray.SetIcon(trayIconPNG)
	systray.SetTitle("ShotGo")
	systray.SetTooltip("ShotGo — Screenshot & Recording")

	mCaptureFullscreen := systray.AddMenuItem("Capture Fullscreen", "Take a fullscreen screenshot")
	mCaptureRegion := systray.AddMenuItem("Capture Region", "Select a region to capture")
	systray.AddSeparator()
	mRecordScreen := systray.AddMenuItem("Record Screen", "Start screen recording")
	systray.AddSeparator()
	mSettings := systray.AddMenuItem("Settings", "Open settings")
	mQuit := systray.AddMenuItem("Quit", "Quit ShotGo")

	go func() {
		for {
			select {
			case <-mCaptureFullscreen.ClickedCh:
				a.emitTrayAction("capture-fullscreen")
			case <-mCaptureRegion.ClickedCh:
				a.emitTrayAction("capture-region")
			case <-mRecordScreen.ClickedCh:
				a.emitTrayAction("record-screen")
			case <-mSettings.ClickedCh:
				a.emitTrayAction("settings")
			case <-mQuit.ClickedCh:
				a.emitTrayAction("quit")
				systray.Quit()
				return
			}
		}
	}()
}

func (a *App) onTrayExit() {
	// Cleanup if needed
}

func (a *App) emitTrayAction(action string) {
	if a.ctx != nil {
		wailsRuntime.EventsEmit(a.ctx, "tray:action", action)
	}
}
