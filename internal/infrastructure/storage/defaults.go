package storage

import "shotgo/internal/domain/entity"

// DefaultHotkeys returns the default hotkey bindings.
func DefaultHotkeys() entity.HotkeyConfig {
	return entity.HotkeyConfig{
		Bindings: []entity.HotkeyBinding{
			{
				Action: entity.ActionCaptureFullscreen,
				Combo:  entity.KeyCombo{Modifiers: []string{"Cmd", "Shift"}, Key: "3"},
			},
			{
				Action: entity.ActionCaptureRegion,
				Combo:  entity.KeyCombo{Modifiers: []string{"Cmd", "Shift"}, Key: "4"},
			},
			{
				Action: entity.ActionStartRecording,
				Combo:  entity.KeyCombo{Modifiers: []string{"Cmd", "Shift"}, Key: "5"},
			},
			{
				Action: entity.ActionStopRecording,
				Combo:  entity.KeyCombo{Modifiers: []string{"Cmd", "Shift"}, Key: "6"},
			},
		},
	}
}
