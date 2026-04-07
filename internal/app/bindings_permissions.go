package app

import (
	"errors"

	"shotgo/internal/usecase"
)

// CheckPermissions verifies all required OS permissions.
func (a *App) CheckPermissions() *usecase.PermissionResult {
	return a.checkPermissions.Execute()
}

// RequestScreenCapture triggers the OS permission prompt.
func (a *App) RequestScreenCapture() error {
	return a.permissionsChecker.RequestScreenCapture()
}

// OpenPermissionsSettings opens the OS privacy settings panel.
func (a *App) OpenPermissionsSettings() error {
	return a.permissionsChecker.OpenPermissionsSettings()
}

// RequestAccessibility triggers the macOS Accessibility permission prompt.
// Required for scrollable capture (simulating scroll wheel events).
func (a *App) RequestAccessibility() error {
	return a.permissionsChecker.RequestAccessibility()
}

// RequestMicrophone triggers the microphone permission prompt (for audio recording).
func (a *App) RequestMicrophone() error {
	return a.permissionsChecker.RequestMicrophone()
}

// RequestCamera triggers the camera permission prompt (for webcam overlay).
func (a *App) RequestCamera() error {
	return a.permissionsChecker.RequestCamera()
}

// CopyLastToClipboard copies the last captured screenshot to clipboard.
func (a *App) CopyLastToClipboard() error {
	if a.lastScreenshot == nil {
		return errors.New("no screenshot to copy")
	}
	return a.copyToClipboard.Execute(a.lastScreenshot.Data)
}

// SaveLastScreenshot saves the last captured screenshot to disk.
func (a *App) SaveLastScreenshot(path string) error {
	if a.lastScreenshot == nil {
		return errors.New("no screenshot to save")
	}
	return a.saveScreenshot.Execute(a.lastScreenshot, path)
}
