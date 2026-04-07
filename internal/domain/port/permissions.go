package port

// PermissionStatus represents the state of a system permission.
type PermissionStatus string

const (
	PermissionGranted      PermissionStatus = "granted"
	PermissionDenied       PermissionStatus = "denied"
	PermissionUndetermined PermissionStatus = "undetermined"
)

// PermissionsChecker defines the interface for OS permission checks.
type PermissionsChecker interface {
	CheckScreenCapture() PermissionStatus
	CheckAccessibility() PermissionStatus
	CheckMicrophone() PermissionStatus
	CheckCamera() PermissionStatus

	RequestScreenCapture() error
	RequestAccessibility() error
	RequestMicrophone() error
	RequestCamera() error

	OpenPermissionsSettings() error
}
