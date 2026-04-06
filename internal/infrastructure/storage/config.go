// Package storage provides filesystem-backed implementations of domain ports.
package storage

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"shotgo/internal/domain/entity"
	"shotgo/internal/domain/port"
)

const (
	appDirName = "ShotGo"
	configFile = "config.json"
)

// JSONConfigStore reads and writes AppConfig as JSON in the OS config directory.
type JSONConfigStore struct {
	dir string
}

// NewJSONConfigStore creates a config store. If dir is empty, the OS default
// config directory is used.
func NewJSONConfigStore(dir string) (*JSONConfigStore, error) {
	if dir == "" {
		base, err := os.UserConfigDir()
		if err != nil {
			return nil, fmt.Errorf("resolve config dir: %w", err)
		}
		dir = filepath.Join(base, appDirName)
	}
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return nil, fmt.Errorf("create config dir: %w", err)
	}
	return &JSONConfigStore{dir: dir}, nil
}

// Load reads the configuration from disk. If the file does not exist, Default
// values are returned.
func (s *JSONConfigStore) Load() (*port.AppConfig, error) {
	data, err := os.ReadFile(filepath.Join(s.dir, configFile))
	if os.IsNotExist(err) {
		return s.Default(), nil
	}
	if err != nil {
		return nil, fmt.Errorf("read config: %w", err)
	}
	var cfg port.AppConfig
	if err := json.Unmarshal(data, &cfg); err != nil {
		return nil, fmt.Errorf("parse config: %w", err)
	}
	if len(cfg.Hotkeys.Bindings) == 0 {
		cfg.Hotkeys = DefaultHotkeys()
	}
	return &cfg, nil
}

// Save persists the configuration to disk as formatted JSON.
func (s *JSONConfigStore) Save(cfg *port.AppConfig) error {
	data, err := json.MarshalIndent(cfg, "", "  ")
	if err != nil {
		return fmt.Errorf("marshal config: %w", err)
	}
	path := filepath.Join(s.dir, configFile)
	if err := os.WriteFile(path, data, 0o644); err != nil {
		return fmt.Errorf("write config: %w", err)
	}
	return nil
}

// Default returns sensible default configuration values.
func (s *JSONConfigStore) Default() *port.AppConfig {
	return &port.AppConfig{
		SaveDirectory:     defaultSaveDir(),
		ImageFormat:       entity.FormatPNG,
		RecordFormat:      entity.FormatMP4,
		Hotkeys:           DefaultHotkeys(),
		LaunchAtStartup:   false,
		ShowNotifications: true,
	}
}
