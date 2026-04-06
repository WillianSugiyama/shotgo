package app

import (
	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// LoadConfig returns the current application configuration.
func (a *App) LoadConfig() (*port.AppConfig, error) {
	return a.loadConfig.Execute()
}

// SaveConfig persists the application configuration.
func (a *App) SaveConfig(config *port.AppConfig) error {
	return a.saveConfig.Execute(config)
}

// ConfigureHotkeys updates the global hotkey bindings.
func (a *App) ConfigureHotkeys(bindings []HotkeyBindingInput) error {
	hotkeyBindings := make([]entity.HotkeyBinding, len(bindings))
	for i, b := range bindings {
		hotkeyBindings[i] = entity.HotkeyBinding{
			Action: entity.HotkeyAction(b.Action),
			Combo: entity.KeyCombo{
				Modifiers: b.Modifiers,
				Key:       b.Key,
			},
		}
	}
	config := entity.HotkeyConfig{Bindings: hotkeyBindings}
	return a.configureHotkeys.Execute(config)
}

// HotkeyBindingInput is the frontend-facing hotkey binding struct.
type HotkeyBindingInput struct {
	Action    string   `json:"action"`
	Modifiers []string `json:"modifiers"`
	Key       string   `json:"key"`
}
