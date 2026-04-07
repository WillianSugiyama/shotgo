package app

import (
	"log"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

const (
	barWidth   = 288
	barHeight  = 208
	mainWidth  = 800
	mainHeight = 600
)

// SetWindowAsBar resizes the window to a small capture bar at bottom-center.
func (a *App) SetWindowAsBar() {
	screens, err := wailsRuntime.ScreenGetAll(a.ctx)
	if err != nil || len(screens) == 0 {
		log.Printf("[shotgo] ScreenGetAll failed: %v", err)
		return
	}

	primary := screens[0]
	x := primary.Size.Width - barWidth - 24
	y := primary.Size.Height - barHeight - 48

	wailsRuntime.WindowSetSize(a.ctx, barWidth, barHeight)
	wailsRuntime.WindowSetPosition(a.ctx, x, y)
	wailsRuntime.WindowSetAlwaysOnTop(a.ctx, true)
	wailsRuntime.WindowShow(a.ctx)
}

// SetWindowAsMain restores the window to its normal centered size.
func (a *App) SetWindowAsMain() {
	wailsRuntime.WindowSetAlwaysOnTop(a.ctx, false)
	wailsRuntime.WindowSetSize(a.ctx, mainWidth, mainHeight)
	wailsRuntime.WindowCenter(a.ctx)
	wailsRuntime.WindowShow(a.ctx)
}
