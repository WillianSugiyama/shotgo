package entity

// HotkeyAction represents an action triggered by a hotkey.
type HotkeyAction string

const (
	ActionCaptureFullscreen HotkeyAction = "capture_fullscreen"
	ActionCaptureRegion     HotkeyAction = "capture_region"
	ActionCaptureWindow     HotkeyAction = "capture_window"
	ActionStartRecording    HotkeyAction = "start_recording"
	ActionStopRecording     HotkeyAction = "stop_recording"
)

// KeyCombo represents a keyboard shortcut.
type KeyCombo struct {
	Modifiers []string `json:"modifiers"`
	Key       string   `json:"key"`
}

// HotkeyBinding maps one action to one key combination.
type HotkeyBinding struct {
	Action HotkeyAction `json:"action"`
	Combo  KeyCombo     `json:"combo"`
}

// HotkeyConfig holds all user-configured hotkey bindings.
type HotkeyConfig struct {
	Bindings []HotkeyBinding `json:"bindings"`
}

// FindBinding returns the binding for a given action, if any.
func (c HotkeyConfig) FindBinding(action HotkeyAction) *HotkeyBinding {
	for i := range c.Bindings {
		if c.Bindings[i].Action == action {
			return &c.Bindings[i]
		}
	}
	return nil
}
