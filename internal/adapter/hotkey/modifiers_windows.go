//go:build windows

package hotkey

import "golang.design/x/hotkey"

var modifierMap = map[string]hotkey.Modifier{
	"Ctrl":   hotkey.ModCtrl,
	"Shift":  hotkey.ModShift,
	"Alt":    hotkey.ModAlt,
	"Option": hotkey.ModAlt,
	"Cmd":    hotkey.ModWin,
	"Win":    hotkey.ModWin,
}
