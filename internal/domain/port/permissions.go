package port

// PermissionStatus represents the state of a system permission.
type PermissionStatus string

const (
	PermissionGranted     PermissionStatus = "granted"
	PermissionDenied      PermissionStatus = "denied"
	PermissionUndetermined PermissionStatus = "undetermined"
)

// PermissionsChecker defines the interface for OS permission checks.
type PermissionsChecker interface {
	// CheckScreenCapture checks if screen capture is allowed.
	CheckScreenCapture() PermissionStatus

	// CheckAccessibility checks if accessibility access is granted.
	CheckAccessibility() PermissionStatus

	// RequestScreenCapture prompts or guides the user to grant permission.
	RequestScreenCapture() error

	// RequestAccessibility prompts or guides the user to grant permission.
	RequestAccessibility() error

	// OpenPermissionsSettings opens the OS permissions panel.
	OpenPermissionsSettings() error
}
