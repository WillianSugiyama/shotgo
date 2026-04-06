package app

import "shotgo/internal/usecase"

// CheckPermissions verifies all required OS permissions.
func (a *App) CheckPermissions() *usecase.PermissionResult {
	return a.checkPermissions.Execute()
}

// CopyToClipboard copies image data to the system clipboard.
func (a *App) CopyToClipboard(data []byte) error {
	return a.copyToClipboard.Execute(data)
}

// SaveScreenshotToFile saves a screenshot to disk.
func (a *App) SaveScreenshotToFile(path string) error {
	// TODO: This needs the current screenshot from state
	// For now, stub — real implementation will pass the screenshot
	return nil
}
