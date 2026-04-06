package port

import "shotgo/internal/domain/entity"

// AppConfig holds all user-configurable settings.
type AppConfig struct {
	SaveDirectory  string              `json:"saveDirectory"`
	ImageFormat    entity.ImageFormat  `json:"imageFormat"`
	RecordFormat   entity.OutputFormat `json:"recordFormat"`
	Hotkeys        entity.HotkeyConfig `json:"hotkeys"`
	LaunchAtStartup bool              `json:"launchAtStartup"`
	ShowNotifications bool            `json:"showNotifications"`
}

// ConfigStore defines the interface for reading/writing app config.
type ConfigStore interface {
	// Load reads the current configuration.
	Load() (*AppConfig, error)

	// Save persists the configuration.
	Save(config *AppConfig) error

	// Default returns the default configuration.
	Default() *AppConfig
}
