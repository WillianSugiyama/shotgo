//go:build windows

package hotkey

import (
	"fmt"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// WindowsHotkeyManager implements port.HotkeyManager using Win32 RegisterHotKey.
type WindowsHotkeyManager struct {
	cb       port.HotkeyCallback
	bindings []entity.HotkeyBinding
}

// NewWindowsHotkeyManager returns a new WindowsHotkeyManager.
func NewWindowsHotkeyManager() *WindowsHotkeyManager {
	return &WindowsHotkeyManager{}
}

func (m *WindowsHotkeyManager) Register(config entity.HotkeyConfig, cb port.HotkeyCallback) error {
	// TODO: implement via user32.dll RegisterHotKey
	// For each binding, map modifiers to MOD_ALT|MOD_CONTROL|MOD_SHIFT|MOD_WIN
	// and key to a virtual keycode, then call RegisterHotKey(hwnd, id, mods, vk).
	// Start a goroutine with GetMessage loop to receive WM_HOTKEY messages.
	m.cb = cb
	m.bindings = config.Bindings
	return fmt.Errorf("Register not yet implemented: Win32 API integration pending")
}

func (m *WindowsHotkeyManager) Unregister() error {
	// TODO: call UnregisterHotKey for each registered hotkey ID
	m.bindings = nil
	m.cb = nil
	return nil
}

func (m *WindowsHotkeyManager) Update(config entity.HotkeyConfig) error {
	if err := m.Unregister(); err != nil {
		return fmt.Errorf("unregister during update: %w", err)
	}
	if m.cb == nil {
		return fmt.Errorf("no callback registered")
	}
	return m.Register(config, m.cb)
}
