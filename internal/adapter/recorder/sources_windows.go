//go:build windows

package recorder

// ScreenSource represents a capturable screen/monitor.
type ScreenSource struct {
	Index int    `json:"index"`
	Name  string `json:"name"`
}

// WindowSource represents a capturable application window.
type WindowSource struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	App   string `json:"app"`
}

// ListScreens returns available screens (stub on Windows).
func ListScreens(_ string) []ScreenSource {
	return nil
}

// ListRecordableWindows returns recordable windows (stub on Windows).
func ListRecordableWindows() []WindowSource {
	return nil
}
