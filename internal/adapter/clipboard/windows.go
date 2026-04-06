//go:build windows

package clipboard

import (
	"fmt"
	"syscall"
	"unsafe"
)

var (
	user32          = syscall.NewLazyDLL("user32.dll")
	kernel32        = syscall.NewLazyDLL("kernel32.dll")
	pOpenClipboard  = user32.NewProc("OpenClipboard")
	pCloseClipboard = user32.NewProc("CloseClipboard")
	pEmptyClipboard = user32.NewProc("EmptyClipboard")
	pSetClipData    = user32.NewProc("SetClipboardData")
	pGlobalAlloc    = kernel32.NewProc("GlobalAlloc")
	pGlobalLock     = kernel32.NewProc("GlobalLock")
	pGlobalUnlock   = kernel32.NewProc("GlobalUnlock")
)

const (
	cfUnicodeText = 13
	cfDIB         = 8
	gmemMoveable  = 0x0002
)

type WindowsClipboard struct{}

func NewWindowsClipboard() *WindowsClipboard { return &WindowsClipboard{} }

func (c *WindowsClipboard) CopyImage(data []byte) error {
	// TODO: convert PNG data to DIB format for CF_DIB clipboard
	return fmt.Errorf("CopyImage: PNG to DIB conversion not yet implemented")
}

func (c *WindowsClipboard) CopyText(text string) error {
	pOpenClipboard.Call(0)
	defer pCloseClipboard.Call()
	pEmptyClipboard.Call()

	u := syscall.StringToUTF16(text)
	size := len(u) * 2
	h, _, _ := pGlobalAlloc.Call(gmemMoveable, uintptr(size))
	if h == 0 {
		return fmt.Errorf("GlobalAlloc failed")
	}

	p, _, _ := pGlobalLock.Call(h)
	if p == 0 {
		return fmt.Errorf("GlobalLock failed")
	}

	src := unsafe.Slice((*byte)(unsafe.Pointer(&u[0])), size)
	dst := unsafe.Slice((*byte)(unsafe.Pointer(p)), size)
	copy(dst, src)
	pGlobalUnlock.Call(h)

	pSetClipData.Call(cfUnicodeText, h)
	return nil
}
