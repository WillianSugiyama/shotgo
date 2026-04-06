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
