package hotkey

import "golang.design/x/hotkey"

var keyMap = map[string]hotkey.Key{
	"A": hotkey.KeyA, "B": hotkey.KeyB, "C": hotkey.KeyC, "D": hotkey.KeyD,
	"E": hotkey.KeyE, "F": hotkey.KeyF, "G": hotkey.KeyG, "H": hotkey.KeyH,
	"I": hotkey.KeyI, "J": hotkey.KeyJ, "K": hotkey.KeyK, "L": hotkey.KeyL,
	"M": hotkey.KeyM, "N": hotkey.KeyN, "O": hotkey.KeyO, "P": hotkey.KeyP,
	"Q": hotkey.KeyQ, "R": hotkey.KeyR, "S": hotkey.KeyS, "T": hotkey.KeyT,
	"U": hotkey.KeyU, "V": hotkey.KeyV, "W": hotkey.KeyW, "X": hotkey.KeyX,
	"Y": hotkey.KeyY, "Z": hotkey.KeyZ,
	"0": hotkey.Key0, "1": hotkey.Key1, "2": hotkey.Key2, "3": hotkey.Key3,
	"4": hotkey.Key4, "5": hotkey.Key5, "6": hotkey.Key6, "7": hotkey.Key7,
	"8": hotkey.Key8, "9": hotkey.Key9,
	"F1": hotkey.KeyF1, "F2": hotkey.KeyF2, "F3": hotkey.KeyF3, "F4": hotkey.KeyF4,
	"F5": hotkey.KeyF5, "F6": hotkey.KeyF6, "F7": hotkey.KeyF7, "F8": hotkey.KeyF8,
	"F9": hotkey.KeyF9, "F10": hotkey.KeyF10, "F11": hotkey.KeyF11, "F12": hotkey.KeyF12,
	"Space":  hotkey.KeySpace,
	"Return": hotkey.KeyReturn, "Enter": hotkey.KeyReturn,
	"Escape": hotkey.KeyEscape, "Esc": hotkey.KeyEscape,
	"Delete": hotkey.KeyDelete, "Backspace": hotkey.KeyDelete,
	"Tab": hotkey.KeyTab,
	"Up":  hotkey.KeyUp, "Down": hotkey.KeyDown,
	"Left": hotkey.KeyLeft, "Right": hotkey.KeyRight,
}

func parseModifiers(names []string) []hotkey.Modifier {
	mods := make([]hotkey.Modifier, 0, len(names))
	for _, n := range names {
		if m, ok := modifierMap[n]; ok {
			mods = append(mods, m)
		}
	}
	return mods
}

func parseKey(name string) (hotkey.Key, bool) {
	k, ok := keyMap[name]
	return k, ok
}
