package app

import (
	"log"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// globalApp holds a reference for the CGo callback.
var globalApp *App

func (a *App) emitAction(action string) {
	if a.ctx != nil {
		wailsRuntime.EventsEmit(a.ctx, "tray:action", action)
	}
}

func (a *App) showWindow() {
	if a.ctx == nil {
		return
	}
	wailsRuntime.WindowShow(a.ctx)
}

var trayActions = map[int]string{
	1: "capture-fullscreen",
	2: "capture-region",
	3: "record-screen",
	4: "settings",
	5: "quit",
}

func handleTrayAction(tag int) {
	if globalApp == nil {
		return
	}
	action, ok := trayActions[tag]
	if !ok {
		return
	}
	log.Printf("[shotgo] tray action: %s", action)

	switch action {
	case "quit":
		wailsRuntime.Quit(globalApp.ctx)
	default:
		globalApp.showWindow()
		globalApp.emitAction(action)
	}
}
