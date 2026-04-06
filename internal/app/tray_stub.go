//go:build !darwin

package app

func setupNativeTray() {
	// TODO: implement Windows tray via Win32 Shell_NotifyIcon
}

func removeNativeTray() {
	// no-op
}
