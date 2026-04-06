package usecase

import (
	"errors"

	"shotgo/internal/domain/port"
)

// SaveConfig persists the user's application configuration.
type SaveConfig struct {
	store port.ConfigStore
}

// NewSaveConfig creates a new SaveConfig use case.
func NewSaveConfig(s port.ConfigStore) *SaveConfig {
	return &SaveConfig{store: s}
}

// Execute saves the given configuration.
func (uc *SaveConfig) Execute(config *port.AppConfig) error {
	if config == nil {
		return errors.New("config is nil")
	}
	return uc.store.Save(config)
}
