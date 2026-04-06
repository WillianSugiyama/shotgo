package app

import (
	"github.com/wailsapp/wails/v2/pkg/menu"
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// CreateMenu builds the native application menu for ShotGo.
func (a *App) CreateMenu() *menu.Menu {
	appMenu := menu.NewMenu()

	captureMenu := appMenu.AddSubmenu("Capture")
	captureMenu.AddText("Capture Fullscreen", nil, func(_ *menu.CallbackData) {
		a.showWindow()
		a.emitAction("capture-fullscreen")
	})
	captureMenu.AddText("Capture Region", nil, func(_ *menu.CallbackData) {
		a.showWindow()
		a.emitAction("capture-region")
	})
	captureMenu.AddSeparator()
	captureMenu.AddText("Record Screen", nil, func(_ *menu.CallbackData) {
		a.showWindow()
		a.emitAction("record-screen")
	})

	shotgoMenu := appMenu.AddSubmenu("ShotGo")
	shotgoMenu.AddText("Settings", nil, func(_ *menu.CallbackData) {
		a.showWindow()
		a.emitAction("settings")
	})
	shotgoMenu.AddSeparator()
	shotgoMenu.AddText("Quit", nil, func(_ *menu.CallbackData) {
		wailsRuntime.Quit(a.ctx)
	})

	return appMenu
}
