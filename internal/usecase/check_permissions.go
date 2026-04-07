package usecase

import "shotgo/internal/domain/port"

// PermissionResult holds the status of all required permissions.
type PermissionResult struct {
	ScreenCapture port.PermissionStatus `json:"screenCapture"`
	Accessibility port.PermissionStatus `json:"accessibility"`
	Microphone    port.PermissionStatus `json:"microphone"`
	Camera        port.PermissionStatus `json:"camera"`
	AllGranted    bool                  `json:"allGranted"`
}

type CheckPermissions struct {
	checker port.PermissionsChecker
}

func NewCheckPermissions(c port.PermissionsChecker) *CheckPermissions {
	return &CheckPermissions{checker: c}
}

// Execute checks all permissions. Only ScreenCapture is strictly required.
// Accessibility/Microphone/Camera are optional and only block specific features.
func (uc *CheckPermissions) Execute() *PermissionResult {
	sc := uc.checker.CheckScreenCapture()
	return &PermissionResult{
		ScreenCapture: sc,
		Accessibility: uc.checker.CheckAccessibility(),
		Microphone:    uc.checker.CheckMicrophone(),
		Camera:        uc.checker.CheckCamera(),
		AllGranted:    sc == port.PermissionGranted,
	}
}
