package app

import "github.com/wailsapp/wails/v2/pkg/menu"

// CreateMenu builds the native application menu for ShotGo.
func (a *App) CreateMenu() *menu.Menu {
	appMenu := menu.NewMenu()

	captureMenu := appMenu.AddSubmenu("Capture")
	captureMenu.AddText("Capture Fullscreen", nil, func(_ *menu.CallbackData) {
		a.emitAction("capture-fullscreen")
	})
	captureMenu.AddText("Capture Region", nil, func(_ *menu.CallbackData) {
		a.emitAction("capture-region")
	})
	captureMenu.AddSeparator()
	captureMenu.AddText("Record Screen", nil, func(_ *menu.CallbackData) {
		a.emitAction("record-screen")
	})

	settingsMenu := appMenu.AddSubmenu("ShotGo")
	settingsMenu.AddText("Settings", nil, func(_ *menu.CallbackData) {
		a.emitAction("settings")
	})
	settingsMenu.AddSeparator()
	settingsMenu.AddText("Quit", nil, func(_ *menu.CallbackData) {
		a.emitAction("quit")
	})

	return appMenu
}
