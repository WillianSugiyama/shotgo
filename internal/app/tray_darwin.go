//go:build darwin

package app

// #cgo CFLAGS: -x objective-c
// #cgo LDFLAGS: -framework Cocoa
// #include <stdlib.h>
// void SGSetupTrayWithIcon(const void *iconBytes, int iconLen);
// void SGRemoveTray(void);
import "C"

import "unsafe"

//export goTrayCallback
func goTrayCallback(action C.int) {
	handleTrayAction(int(action))
}

func setupNativeTray() {
	var ptr unsafe.Pointer
	iconLen := len(trayIconPNG)
	if iconLen > 0 {
		ptr = C.CBytes(trayIconPNG)
		defer C.free(ptr)
	}
	C.SGSetupTrayWithIcon(ptr, C.int(iconLen))
}

func removeNativeTray() {
	C.SGRemoveTray()
}
