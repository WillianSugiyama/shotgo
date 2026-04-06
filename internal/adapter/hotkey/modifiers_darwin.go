//go:build darwin

package hotkey

import "golang.design/x/hotkey"

var modifierMap = map[string]hotkey.Modifier{
	"Ctrl":   hotkey.ModCtrl,
	"Shift":  hotkey.ModShift,
	"Alt":    hotkey.ModOption,
	"Option": hotkey.ModOption,
	"Cmd":    hotkey.ModCmd,
	"Win":    hotkey.ModCmd,
}
