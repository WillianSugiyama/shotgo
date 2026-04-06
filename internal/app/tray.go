package app

import (
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

func (a *App) emitAction(action string) {
	if a.ctx != nil {
		wailsRuntime.EventsEmit(a.ctx, "tray:action", action)
	}
}
