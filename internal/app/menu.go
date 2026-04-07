package app

import (
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	wailsRuntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

// CreateMenu builds the native application menu for ShotGo.
func (a *App) CreateMenu() *menu.Menu {
	appMenu := menu.NewMenu()

	shotgoMenu := appMenu.AddSubmenu("ShotGo")
	shotgoMenu.AddText("About ShotGo", nil, func(_ *menu.CallbackData) {})
	shotgoMenu.AddSeparator()
	shotgoMenu.AddText("Settings…", keys.CmdOrCtrl(","), func(_ *menu.CallbackData) {
		a.showWindow()
		a.emitAction("settings")
	})
	shotgoMenu.AddSeparator()
	shotgoMenu.AddText("Hide ShotGo", keys.CmdOrCtrl("h"), func(_ *menu.CallbackData) {
		wailsRuntime.WindowHide(a.ctx)
	})
	shotgoMenu.AddSeparator()
	shotgoMenu.AddText("Quit ShotGo", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
		wailsRuntime.Quit(a.ctx)
	})

	captureMenu := appMenu.AddSubmenu("Capture")
	captureMenu.AddText("Capture Fullscreen", keys.Combo("3", keys.CmdOrCtrlKey, keys.ShiftKey), func(_ *menu.CallbackData) {
		a.showWindow()
		a.emitAction("capture-fullscreen")
	})
	captureMenu.AddText("Capture Region", keys.Combo("4", keys.CmdOrCtrlKey, keys.ShiftKey), func(_ *menu.CallbackData) {
		a.showWindow()
		a.emitAction("capture-region")
	})
	captureMenu.AddText("Capture Long Page", keys.Combo("5", keys.CmdOrCtrlKey, keys.ShiftKey), func(_ *menu.CallbackData) {
		a.showWindow()
		a.emitAction("scroll-capture")
	})
	captureMenu.AddSeparator()
	captureMenu.AddText("Record Screen", keys.Combo("6", keys.CmdOrCtrlKey, keys.ShiftKey), func(_ *menu.CallbackData) {
		a.showWindow()
		a.emitAction("record-screen")
	})

	editMenu := appMenu.AddSubmenu("Edit")
	editMenu.AddText("Undo", keys.CmdOrCtrl("z"), nil)
	editMenu.AddText("Copy", keys.CmdOrCtrl("c"), nil)
	editMenu.AddText("Paste", keys.CmdOrCtrl("v"), nil)

	return appMenu
}
