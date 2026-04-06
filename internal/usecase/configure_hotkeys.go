package usecase

import (
	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

// ConfigureHotkeys updates the global hotkey bindings.
type ConfigureHotkeys struct {
	manager port.HotkeyManager
	store   port.ConfigStore
}

// NewConfigureHotkeys creates a new ConfigureHotkeys use case.
func NewConfigureHotkeys(m port.HotkeyManager, s port.ConfigStore) *ConfigureHotkeys {
	return &ConfigureHotkeys{manager: m, store: s}
}

// Execute applies the new hotkey configuration.
func (uc *ConfigureHotkeys) Execute(config entity.HotkeyConfig) error {
	if err := uc.manager.Update(config); err != nil {
		return err
	}

	cfg, err := uc.store.Load()
	if err != nil {
		cfg = uc.store.Default()
	}
	cfg.Hotkeys = config

	return uc.store.Save(cfg)
}
