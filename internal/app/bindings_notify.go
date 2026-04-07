package app

import (
	"fmt"
	"os/exec"
)

// Notify sends a native macOS notification with title and body.
// Uses osascript so it doesn't require a delegate or extra permissions.
func (a *App) Notify(title, body string) error {
	script := fmt.Sprintf(
		`display notification %q with title %q sound name "Pop"`,
		body, title,
	)
	return exec.Command("osascript", "-e", script).Run()
}
