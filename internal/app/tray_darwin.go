//go:build darwin

package app

// #cgo LDFLAGS: -framework Cocoa
// void SetupTray(void);
// void RemoveTray(void);
import "C"

//export goTrayCallback
func goTrayCallback(action C.int) {
	handleTrayAction(int(action))
}

func setupNativeTray() {
	C.SetupTray()
}

func removeNativeTray() {
	C.RemoveTray()
}
