package port

import "shotgo/internal/domain/entity"

// HotkeyCallback is invoked when a registered hotkey is pressed.
type HotkeyCallback func(action entity.HotkeyAction)

// HotkeyManager defines the interface for global hotkey registration.
type HotkeyManager interface {
	// Register registers all hotkey bindings with a single callback.
	Register(config entity.HotkeyConfig, cb HotkeyCallback) error

	// Unregister removes all registered hotkeys.
	Unregister() error

	// Update re-registers hotkeys with a new configuration.
	Update(config entity.HotkeyConfig) error
}
