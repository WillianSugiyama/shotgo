//go:build windows

package capture

import (
	"bytes"
	"image"
	"image/png"
)

// bgraToRGBA converts BGRA pixel buffer to RGBA in place.
func bgraToRGBA(buf []byte) {
	for i := 0; i < len(buf); i += 4 {
		buf[i], buf[i+2] = buf[i+2], buf[i] // swap B and R
	}
}

// encodePNG converts raw RGBA pixels to PNG bytes.
func encodePNG(pixels []byte, w, h int) ([]byte, error) {
	bgraToRGBA(pixels)

	img := image.NewRGBA(image.Rect(0, 0, w, h))
	copy(img.Pix, pixels)

	var buf bytes.Buffer
	if err := png.Encode(&buf, img); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}
