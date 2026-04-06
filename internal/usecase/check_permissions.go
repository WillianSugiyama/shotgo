package usecase

import "shotgo/internal/domain/port"

// PermissionResult holds the status of all required permissions.
type PermissionResult struct {
	ScreenCapture port.PermissionStatus `json:"screenCapture"`
	Accessibility port.PermissionStatus `json:"accessibility"`
	AllGranted    bool                  `json:"allGranted"`
}

// CheckPermissions verifies all required OS permissions.
type CheckPermissions struct {
	checker port.PermissionsChecker
}

// NewCheckPermissions creates a new CheckPermissions use case.
func NewCheckPermissions(c port.PermissionsChecker) *CheckPermissions {
	return &CheckPermissions{checker: c}
}

// Execute checks all permissions and returns their status.
func (uc *CheckPermissions) Execute() *PermissionResult {
	sc := uc.checker.CheckScreenCapture()
	acc := uc.checker.CheckAccessibility()

	return &PermissionResult{
		ScreenCapture: sc,
		Accessibility: acc,
		AllGranted:    sc == port.PermissionGranted && acc == port.PermissionGranted,
	}
}
