package app

import (
	"context"
	"log"

	"fyne.io/systray"
	"github.com/wailsapp/wails/v2/pkg/runtime"

	"shotgo/internal/domain/entity"
)

// Startup is called when the Wails app starts.
// It initializes config, checks permissions, and registers hotkeys.
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx

	// Start system tray in a goroutine (systray.Run blocks)
	go a.setupTray()

	cfg, err := a.loadConfig.Execute()
	if err != nil {
		log.Printf("hotkey: failed to load config: %v", err)
		return
	}

	if len(cfg.Hotkeys.Bindings) == 0 {
		return
	}

	err = a.hotkeyMgr.Register(cfg.Hotkeys, func(action entity.HotkeyAction) {
		runtime.EventsEmit(a.ctx, "hotkey:action", string(action))
	})
	if err != nil {
		log.Printf("hotkey: failed to register hotkeys: %v", err)
	}
}

// Shutdown is called when the Wails app is closing.
func (a *App) Shutdown(_ context.Context) {
	systray.Quit()

	if a.hotkeyMgr != nil {
		if err := a.hotkeyMgr.Unregister(); err != nil {
			log.Printf("hotkey: failed to unregister: %v", err)
		}
	}
}
