package app

import "context"

// Startup is called when the Wails app starts.
// It initializes config, checks permissions, and registers hotkeys.
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx

	// TODO: Load config and register hotkeys on startup
	// TODO: Check permissions and show onboarding if needed
}

// Shutdown is called when the Wails app is closing.
func (a *App) Shutdown(_ context.Context) {
	// TODO: Unregister hotkeys
	// TODO: Stop any active recording
}
