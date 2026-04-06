package storage

import "shotgo/internal/domain/entity"

// DefaultHotkeys returns the default hotkey bindings.
// Uses Ctrl+Shift to avoid conflicting with macOS native shortcuts.
func DefaultHotkeys() entity.HotkeyConfig {
	return entity.HotkeyConfig{
		Bindings: []entity.HotkeyBinding{
			{
				Action: entity.ActionCaptureFullscreen,
				Combo:  entity.KeyCombo{Modifiers: []string{"Ctrl", "Shift"}, Key: "1"},
			},
			{
				Action: entity.ActionCaptureRegion,
				Combo:  entity.KeyCombo{Modifiers: []string{"Ctrl", "Shift"}, Key: "2"},
			},
			{
				Action: entity.ActionStartRecording,
				Combo:  entity.KeyCombo{Modifiers: []string{"Ctrl", "Shift"}, Key: "3"},
			},
			{
				Action: entity.ActionStopRecording,
				Combo:  entity.KeyCombo{Modifiers: []string{"Ctrl", "Shift"}, Key: "4"},
			},
		},
	}
}
