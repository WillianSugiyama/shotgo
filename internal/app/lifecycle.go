package app

import (
	"context"
	"log"

	"github.com/wailsapp/wails/v2/pkg/runtime"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// Startup is called when the Wails app starts.
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	globalApp = a

	go setupTray()

	perms := a.checkPermissions.Execute()
	if perms.AllGranted {
		log.Printf("[shotgo] permissions OK — hiding to tray")
		hideFromDock()
	} else {
		log.Printf("[shotgo] permissions missing — showing onboarding")
		runtime.WindowShow(a.ctx)
	}

	a.registerHotkeys()
}

func (a *App) registerHotkeys() {
	cfg, err := a.loadConfig.Execute()
	if err != nil {
		log.Printf("[shotgo] config load error: %v", err)
		return
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
		log.Printf("[shotgo] hotkeys registered OK")
	}
}

// HideWindow hides the Wails window and removes from Dock.
// Called from frontend after onboarding completes.
func (a *App) HideWindow() {
	hideFromDock()
	if a.ctx != nil {
		runtime.WindowHide(a.ctx)
	}
}

// PermissionsReady returns whether screen capture permission is granted.
func (a *App) PermissionsReady() bool {
	return a.permissionsChecker.CheckScreenCapture() == port.PermissionGranted
}

// Shutdown is called when the Wails app is closing.
func (a *App) Shutdown(_ context.Context) {
	teardownTray()
	if a.hotkeyMgr != nil {
		_ = a.hotkeyMgr.Unregister()
	}
}
