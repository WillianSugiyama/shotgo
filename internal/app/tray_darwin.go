//go:build darwin

package app

// #cgo CFLAGS: -x objective-c
// #cgo LDFLAGS: -framework Cocoa
// void SGSetupTray(void);
// void SGRemoveTray(void);
import "C"

//export goTrayCallback
func goTrayCallback(action C.int) {
	handleTrayAction(int(action))
}

func setupNativeTray() {
	C.SGSetupTray()
}

func removeNativeTray() {
	C.SGRemoveTray()
}
