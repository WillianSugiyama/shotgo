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
		log.Printf("[shotgo] config load error: %v", err)
		return
	}

	log.Printf("[shotgo] loaded %d hotkey bindings", len(cfg.Hotkeys.Bindings))
	for _, b := range cfg.Hotkeys.Bindings {
		log.Printf("[shotgo]   %s -> %v + %s", b.Action, b.Combo.Modifiers, b.Combo.Key)
	}

	if len(cfg.Hotkeys.Bindings) == 0 {
		return
	}

	err = a.hotkeyMgr.Register(cfg.Hotkeys, func(action entity.HotkeyAction) {
		log.Printf("[shotgo] hotkey fired: %s", action)
		runtime.EventsEmit(a.ctx, "hotkey:action", string(action))
	})
	if err != nil {
		log.Printf("[shotgo] hotkey register FAILED: %v", err)
	} else {
		log.Printf("[shotgo] hotkeys registered successfully")
	}
}

// Shutdown is called when the Wails app is closing.
func (a *App) Shutdown(_ context.Context) {
	if a.hotkeyMgr != nil {
		_ = a.hotkeyMgr.Unregister()
	}
}
