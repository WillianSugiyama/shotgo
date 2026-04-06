//go:build darwin

package hotkey

import (
	"fmt"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// DarwinHotkeyManager implements port.HotkeyManager using macOS Carbon API.
type DarwinHotkeyManager struct {
	cb       port.HotkeyCallback
	bindings []entity.HotkeyBinding
}

// NewDarwinHotkeyManager returns a new DarwinHotkeyManager.
func NewDarwinHotkeyManager() *DarwinHotkeyManager {
	return &DarwinHotkeyManager{}
}

func (m *DarwinHotkeyManager) Register(config entity.HotkeyConfig, cb port.HotkeyCallback) error {
	// TODO: implement via Carbon RegisterEventHotKey or CGEventTap via CGo
	// For each binding, map modifiers+key to a Carbon virtual keycode,
	// then register with InstallEventHandler + RegisterEventHotKey.
	m.cb = cb
	m.bindings = config.Bindings
	return fmt.Errorf("Register not yet implemented: Carbon API integration pending")
}

func (m *DarwinHotkeyManager) Unregister() error {
	// TODO: call UnregisterEventHotKey for each registered hotkey ID
	m.bindings = nil
	m.cb = nil
	return nil
}

func (m *DarwinHotkeyManager) Update(config entity.HotkeyConfig) error {
	if err := m.Unregister(); err != nil {
		return fmt.Errorf("unregister during update: %w", err)
	}
	if m.cb == nil {
		return fmt.Errorf("no callback registered")
	}
	return m.Register(config, m.cb)
}
