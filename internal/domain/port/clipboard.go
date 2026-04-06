package port

// Clipboard defines the interface for clipboard operations.
type Clipboard interface {
	// CopyImage copies image bytes (PNG) to the system clipboard.
	CopyImage(data []byte) error

	// CopyText copies a text string to the system clipboard.
	CopyText(text string) error
}
