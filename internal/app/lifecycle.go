package app

import (
	"context"
	"log"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"

	"shotgo/internal/domain/entity"
)

// Startup is called when the Wails app starts.
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	globalApp = a

	setupNativeTray()

	// Hide window after Wails finishes initializing
	go func() {
		time.Sleep(500 * time.Millisecond)
		runtime.WindowHide(a.ctx)
	}()

	cfg, err := a.loadConfig.Execute()
	if err != nil {
		log.Printf("[shotgo] config load error: %v", err)
		return
	}

	log.Printf("[shotgo] loaded %d hotkey bindings", len(cfg.Hotkeys.Bindings))
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
		log.Printf("[shotgo] hotkeys registered OK")
	}
}

// Shutdown is called when the Wails app is closing.
func (a *App) Shutdown(_ context.Context) {
	removeNativeTray()
	if a.hotkeyMgr != nil {
		_ = a.hotkeyMgr.Unregister()
	}
}
