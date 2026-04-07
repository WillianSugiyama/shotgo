package app

import (
	"log"

	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

const (
	barWidth   = 288
	barHeight  = 208
	mainWidth  = 812
	mainHeight = 612
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

// SetWindowAsOverlay expands the window to cover the entire primary screen,
// for region selection overlays.
func (a *App) SetWindowAsOverlay() {
	screens, err := wailsRuntime.ScreenGetAll(a.ctx)
	if err != nil || len(screens) == 0 {
		return
	}
	primary := screens[0]
	wailsRuntime.WindowSetAlwaysOnTop(a.ctx, true)
	wailsRuntime.WindowSetSize(a.ctx, primary.Size.Width, primary.Size.Height)
	wailsRuntime.WindowSetPosition(a.ctx, 0, 0)
	wailsRuntime.WindowShow(a.ctx)
}
