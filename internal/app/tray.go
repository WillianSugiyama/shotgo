package app

import (
	"fyne.io/systray"
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

var globalApp *App

func (a *App) emitAction(action string) {
	if a.ctx != nil {
		wailsRuntime.EventsEmit(a.ctx, "tray:action", action)
	}
}

func (a *App) showWindow() {
	if a.ctx != nil {
		wailsRuntime.WindowShow(a.ctx)
	}
}

func setupTray() {
	systray.Register(onTrayReady, func() {})
}

func onTrayReady() {
	systray.SetTitle("SG")
	systray.SetTooltip("ShotGo")

	mFull := systray.AddMenuItem("Capture Fullscreen", "Ctrl+Shift+1")
	mRegion := systray.AddMenuItem("Capture Region", "Ctrl+Shift+2")
	systray.AddSeparator()
	mRecord := systray.AddMenuItem("Record Screen", "Ctrl+Shift+3")
	systray.AddSeparator()
	mSettings := systray.AddMenuItem("Settings", "")
	mQuit := systray.AddMenuItem("Quit", "")

	go func() {
		for {
			select {
			case <-mFull.ClickedCh:
				if globalApp != nil {
					globalApp.emitAction("capture-fullscreen")
				}
			case <-mRegion.ClickedCh:
				if globalApp != nil {
					globalApp.emitAction("capture-region")
				}
			case <-mRecord.ClickedCh:
				if globalApp != nil {
					globalApp.showWindow()
					globalApp.emitAction("record-screen")
				}
			case <-mSettings.ClickedCh:
				if globalApp != nil {
					globalApp.showWindow()
					globalApp.emitAction("settings")
				}
			case <-mQuit.ClickedCh:
				if globalApp != nil {
					wailsRuntime.Quit(globalApp.ctx)
				}
				return
			}
		}
	}()
}
