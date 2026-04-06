//go:build !darwin

package app

func hideFromDock() {
	// No-op on non-macOS platforms
}
