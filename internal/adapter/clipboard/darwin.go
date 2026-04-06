//go:build darwin

package clipboard

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
)

// DarwinClipboard implements port.Clipboard using macOS pbcopy and osascript.
type DarwinClipboard struct{}

// NewDarwinClipboard returns a new DarwinClipboard.
func NewDarwinClipboard() *DarwinClipboard {
	return &DarwinClipboard{}
}

func (c *DarwinClipboard) CopyImage(data []byte) error {
	// Use osascript to set clipboard to image data via a temp file.
	// This is the simplest approach without CGo.
	script := `use framework "AppKit"
set pb to current application's NSPasteboard's generalPasteboard()
pb's clearContents()
set imgData to (current application's NSData's dataWithBytes:(item 1 of {%s}) length:%d)
set img to (current application's NSImage's alloc()'s initWithData:imgData)
pb's writeObjects:{img}`
	// TODO: the above script requires proper binary data passing;
	// for now, write a temp file and use osascript to load it.
	_ = script

	tmpFile := "/tmp/shotgo-clip.png"
	if err := writeTemp(tmpFile, data); err != nil {
		return err
	}
	cmd := exec.Command("osascript", "-e", fmt.Sprintf(
		`set the clipboard to (read (POSIX file "%s") as «class PNGf»)`, tmpFile))
	if out, err := cmd.CombinedOutput(); err != nil {
		return fmt.Errorf("osascript clipboard: %s: %w", string(out), err)
	}
	return nil
}

func (c *DarwinClipboard) CopyText(text string) error {
	cmd := exec.Command("pbcopy")
	cmd.Stdin = bytes.NewBufferString(text)
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("pbcopy: %w", err)
	}
	return nil
}

func writeTemp(path string, data []byte) error {
	return os.WriteFile(path, data, 0644)
}
