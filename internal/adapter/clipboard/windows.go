//go:build windows

package clipboard

import "fmt"

// WindowsClipboard implements port.Clipboard using Win32 clipboard API.
type WindowsClipboard struct{}

// NewWindowsClipboard returns a new WindowsClipboard.
func NewWindowsClipboard() *WindowsClipboard {
	return &WindowsClipboard{}
}

func (c *WindowsClipboard) CopyImage(data []byte) error {
	// TODO: implement using OpenClipboard, EmptyClipboard, SetClipboardData
	// with CF_DIB format (convert PNG to BMP/DIB first)
	return fmt.Errorf("CopyImage not yet implemented for windows")
}

func (c *WindowsClipboard) CopyText(text string) error {
	// TODO: implement using OpenClipboard, EmptyClipboard, SetClipboardData
	// with CF_UNICODETEXT format
	return fmt.Errorf("CopyText not yet implemented for windows")
}
