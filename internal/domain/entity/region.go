package entity

// Region represents a rectangular area on screen.
type Region struct {
	X      int `json:"x"`
	Y      int `json:"y"`
	Width  int `json:"width"`
	Height int `json:"height"`
}

// IsValid checks if the region has positive dimensions.
func (r Region) IsValid() bool {
	return r.Width > 0 && r.Height > 0
}

// IsFullscreen returns true if region starts at origin (used as hint).
func (r Region) IsFullscreen() bool {
	return r.X == 0 && r.Y == 0
}
