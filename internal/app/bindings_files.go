package app

import (
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
)

// OpenFile opens a file in the OS default app.
func (a *App) OpenFile(path string) error {
	if runtime.GOOS == "darwin" {
		return exec.Command("open", path).Start()
	}
	return exec.Command("cmd", "/c", "start", "", path).Start()
}

// RevealFile reveals a file in Finder/Explorer.
func (a *App) RevealFile(path string) error {
	log.Printf("[shotgo] RevealFile: %s", path)
	if runtime.GOOS == "darwin" {
		return exec.Command("open", "-R", path).Start()
	}
	return exec.Command("explorer", "/select,", path).Start()
}

// SaveDir returns the default save directory.
func (a *App) SaveDir() string {
	home, _ := os.UserHomeDir()
	dir := filepath.Join(home, "Pictures", "ShotGo")
	_ = os.MkdirAll(dir, 0o755)
	return dir
}
