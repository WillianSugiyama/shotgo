package app

import (
	"log"

	"github.com/ironpark/remotray"
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

var globalApp *App
var trayInstance *remotray.SysTray

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
	opts := []remotray.Option{
		remotray.WithTooltip("ShotGo"),
	}
	if len(trayIconPNG) > 0 {
		opts = append(opts, remotray.WithIcon(trayIconPNG))
	} else {
		opts = append(opts, remotray.WithTitle("SG"))
	}
	tray, err := remotray.Run("shotgo-tray", opts...)
	if err != nil {
		log.Printf("[shotgo] tray failed: %v", err)
		return
	}
	trayInstance = tray

	add := func(title string, fn func()) {
		item, err := tray.AddMenuItem(title, "")
		if err != nil {
			log.Printf("[shotgo] tray menu item '%s' failed: %v", title, err)
			return
		}
		item.OnClick(func(_ remotray.MenuItem) { fn() })
	}

	add("Open ShotGo", func() {
		if globalApp != nil {
			globalApp.showWindow()
			globalApp.emitAction("open-main")
		}
	})
	add("Capture Fullscreen", func() {
		if globalApp != nil {
			globalApp.emitAction("capture-fullscreen")
		}
	})
	add("Capture Region", func() {
		if globalApp != nil {
			globalApp.emitAction("capture-region")
		}
	})
	add("Scroll Capture", func() {
		if globalApp != nil {
			globalApp.showWindow()
			globalApp.emitAction("scroll-capture")
		}
	})
	add("Record Screen", func() {
		if globalApp != nil {
			globalApp.showWindow()
			globalApp.emitAction("record-screen")
		}
	})
	add("Settings", func() {
		if globalApp != nil {
			globalApp.showWindow()
			globalApp.emitAction("settings")
		}
	})
	add("Quit", func() {
		if globalApp != nil {
			wailsRuntime.Quit(globalApp.ctx)
		}
	})

	log.Printf("[shotgo] tray running (separate process via IPC)")
}

func teardownTray() {
	if trayInstance != nil {
		trayInstance.Quit()
	}
}
