package usecase

import "shotgo/internal/domain/port"

// LoadConfig reads the user's application configuration.
type LoadConfig struct {
	store port.ConfigStore
}

// NewLoadConfig creates a new LoadConfig use case.
func NewLoadConfig(s port.ConfigStore) *LoadConfig {
	return &LoadConfig{store: s}
}

// Execute loads the config, returning defaults if none exists.
func (uc *LoadConfig) Execute() (*port.AppConfig, error) {
	cfg, err := uc.store.Load()
	if err != nil {
		return uc.store.Default(), nil
	}
	return cfg, nil
}
