package app

// ListWindows returns available windows for capture.
func (a *App) ListWindows() ([]WindowInfo, error) {
	windows, err := a.listWindows.Execute()
	if err != nil {
		return nil, err
	}

	result := make([]WindowInfo, len(windows))
	for i, w := range windows {
		result[i] = WindowInfo{ID: w.ID, Title: w.Title, App: w.App}
	}
	return result, nil
}

// WindowInfo is the frontend-facing window metadata struct.
type WindowInfo struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	App   string `json:"app"`
}
