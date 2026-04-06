//go:build darwin

package hotkey

import (
	"fmt"

	"golang.design/x/hotkey"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// DarwinHotkeyManager implements port.HotkeyManager using golang.design/x/hotkey.
type DarwinHotkeyManager struct {
	cb      port.HotkeyCallback
	hotkeys []*hotkey.Hotkey
	stopChs []chan struct{}
}

// NewDarwinHotkeyManager returns a new DarwinHotkeyManager.
func NewDarwinHotkeyManager() *DarwinHotkeyManager {
	return &DarwinHotkeyManager{}
}

func (m *DarwinHotkeyManager) Register(config entity.HotkeyConfig, cb port.HotkeyCallback) error {
	m.cb = cb
	for _, b := range config.Bindings {
		mods := parseModifiers(b.Combo.Modifiers)
		key, ok := parseKey(b.Combo.Key)
		if !ok {
			return fmt.Errorf("unknown key: %s", b.Combo.Key)
		}
		hk := hotkey.New(mods, key)
		if err := hk.Register(); err != nil {
			_ = m.Unregister() // clean up already registered
			return fmt.Errorf("register hotkey %s: %w", b.Action, err)
		}
		m.hotkeys = append(m.hotkeys, hk)

		stopCh := make(chan struct{})
		m.stopChs = append(m.stopChs, stopCh)
		action := b.Action
		go func() {
			for {
				select {
				case <-stopCh:
					return
				case <-hk.Keydown():
					if m.cb != nil {
						m.cb(action)
					}
				}
			}
		}()
	}
	return nil
}

func (m *DarwinHotkeyManager) Unregister() error {
	for _, ch := range m.stopChs {
		close(ch)
	}
	for _, hk := range m.hotkeys {
		_ = hk.Unregister()
	}
	m.hotkeys = nil
	m.stopChs = nil
	m.cb = nil
	return nil
}

func (m *DarwinHotkeyManager) Update(config entity.HotkeyConfig) error {
	cb := m.cb
	if err := m.Unregister(); err != nil {
		return fmt.Errorf("unregister during update: %w", err)
	}
	if cb == nil {
		return fmt.Errorf("no callback registered")
	}
	return m.Register(config, cb)
}
