//go:build windows

package capture

import (
	"syscall"
	"unsafe"
)

var (
	user32              = syscall.NewLazyDLL("user32.dll")
	gdi32               = syscall.NewLazyDLL("gdi32.dll")
	shcore              = syscall.NewLazyDLL("shcore.dll")
	pGetDC              = user32.NewProc("GetDC")
	pReleaseDC          = user32.NewProc("ReleaseDC")
	pGetSystemMetrics   = user32.NewProc("GetSystemMetrics")
	pSetDPIAwareness    = shcore.NewProc("SetProcessDpiAwareness")
	pCreateCompatibleDC = gdi32.NewProc("CreateCompatibleDC")
	pCreateCompatBmp    = gdi32.NewProc("CreateCompatibleBitmap")
	pSelectObject       = gdi32.NewProc("SelectObject")
	pBitBlt             = gdi32.NewProc("BitBlt")
	pGetDIBits          = gdi32.NewProc("GetDIBits")
	pDeleteObject       = gdi32.NewProc("DeleteObject")
	pDeleteDC           = gdi32.NewProc("DeleteDC")
)

const (
	smCxScreen = 0
	smCyScreen = 1
	srccopy    = 0x00CC0020
	biRGB      = 0
)

type bitmapInfoHeader struct {
	Size          uint32
	Width         int32
	Height        int32
	Planes        uint16
	BitCount      uint16
	Compression   uint32
	SizeImage     uint32
	XPelsPerMeter int32
	YPelsPerMeter int32
	ClrUsed       uint32
	ClrImportant  uint32
}

func init() {
	// Enable per-monitor DPI awareness to get real pixel coordinates.
	// Without this, GetSystemMetrics returns scaled (wrong) values.
	pSetDPIAwareness.Call(2) // PROCESS_PER_MONITOR_DPI_AWARE
}

func getScreenSize() (int, int) {
	w, _, _ := pGetSystemMetrics.Call(uintptr(smCxScreen))
	h, _, _ := pGetSystemMetrics.Call(uintptr(smCyScreen))
	return int(w), int(h)
}

func captureRect(x, y, w, h int) ([]byte, error) {
	hdc, _, _ := pGetDC.Call(0)
	defer pReleaseDC.Call(0, hdc)

	memDC, _, _ := pCreateCompatibleDC.Call(hdc)
	defer pDeleteDC.Call(memDC)

	bmp, _, _ := pCreateCompatBmp.Call(hdc, uintptr(w), uintptr(h))
	defer pDeleteObject.Call(bmp)

	pSelectObject.Call(memDC, bmp)
	pBitBlt.Call(memDC, 0, 0, uintptr(w), uintptr(h),
		hdc, uintptr(x), uintptr(y), srccopy)

	bi := bitmapInfoHeader{
		Size:     uint32(unsafe.Sizeof(bitmapInfoHeader{})),
		Width:    int32(w),
		Height:   -int32(h), // top-down
		Planes:   1,
		BitCount: 32,
	}

	stride := w * 4
	buf := make([]byte, stride*h)
	pGetDIBits.Call(memDC, bmp, 0, uintptr(h),
		uintptr(unsafe.Pointer(&buf[0])),
		uintptr(unsafe.Pointer(&bi)), biRGB)

	return buf, nil
}
