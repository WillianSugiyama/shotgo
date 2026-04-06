package app

import (
	"context"
	"log"

	"github.com/wailsapp/wails/v2/pkg/runtime"

	"shotgo/internal/domain/entity"
)

// Startup is called when the Wails app starts.
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx

	cfg, err := a.loadConfig.Execute()
	if err != nil {
		log.Printf("config: failed to load: %v", err)
		return
	}

	if len(cfg.Hotkeys.Bindings) == 0 {
		return
	}

	err = a.hotkeyMgr.Register(cfg.Hotkeys, func(action entity.HotkeyAction) {
		runtime.EventsEmit(a.ctx, "hotkey:action", string(action))
	})
	if err != nil {
		log.Printf("hotkey: failed to register: %v", err)
	}
}

// Shutdown is called when the Wails app is closing.
func (a *App) Shutdown(_ context.Context) {
	if a.hotkeyMgr != nil {
		_ = a.hotkeyMgr.Unregister()
	}
}
