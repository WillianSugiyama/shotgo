package storage

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"time"

	"shotgo/internal/domain/entity"
)

// LocalFileStorage saves screenshots and recordings to the local filesystem.
type LocalFileStorage struct {
	baseDir string
}

// NewLocalFileStorage creates a file storage rooted at the given directory. If
// dir is empty, DefaultDirectory is used.
func NewLocalFileStorage(dir string) *LocalFileStorage {
	if dir == "" {
		dir = defaultSaveDir()
	}
	return &LocalFileStorage{baseDir: dir}
}

// SaveScreenshot writes the screenshot data to disk using a timestamped name.
func (fs *LocalFileStorage) SaveScreenshot(shot *entity.Screenshot, path string) error {
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return fmt.Errorf("create screenshot dir: %w", err)
	}
	if err := os.WriteFile(path, shot.Data, 0o644); err != nil {
		return fmt.Errorf("write screenshot: %w", err)
	}
	return nil
}

// SaveRecording copies the recording output file to the given path.
func (fs *LocalFileStorage) SaveRecording(rec *entity.Recording, path string) error {
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return fmt.Errorf("create recording dir: %w", err)
	}
	src, err := os.Open(rec.OutputPath)
	if err != nil {
		return fmt.Errorf("open recording source: %w", err)
	}
	defer src.Close()

	dst, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("create recording dest: %w", err)
	}
	defer dst.Close()

	if _, err := io.Copy(dst, src); err != nil {
		return fmt.Errorf("copy recording: %w", err)
	}
	return nil
}

// DefaultDirectory returns the default save directory (~/Pictures/ShotGo).
func (fs *LocalFileStorage) DefaultDirectory() string {
	return fs.baseDir
}

// TimestampFilename generates a filename like "ShotGo_20060102_150405.png".
func TimestampFilename(ext string) string {
	ts := time.Now().Format("20060102_150405")
	return fmt.Sprintf("ShotGo_%s.%s", ts, ext)
}

// defaultSaveDir returns ~/Pictures/ShotGo.
func defaultSaveDir() string {
	home, err := os.UserHomeDir()
	if err != nil {
		home = "."
	}
	return filepath.Join(home, "Pictures", "ShotGo")
}
