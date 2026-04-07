package image

import (
	"bytes"
	"image"
	"image/draw"
	"image/png"
)

// StitchVertical concatenates PNG frames vertically into a single image.
// Frames must all have the same width. Returns PNG bytes.
func StitchVertical(frames [][]byte, overlap int) ([]byte, error) {
	if len(frames) == 0 {
		return nil, nil
	}
	if len(frames) == 1 {
		return frames[0], nil
	}

	imgs := make([]image.Image, 0, len(frames))
	for _, raw := range frames {
		im, err := png.Decode(bytes.NewReader(raw))
		if err != nil {
			return nil, err
		}
		imgs = append(imgs, im)
	}

	w := imgs[0].Bounds().Dx()
	totalH := imgs[0].Bounds().Dy()
	for i := 1; i < len(imgs); i++ {
		totalH += imgs[i].Bounds().Dy() - overlap
	}

	out := image.NewRGBA(image.Rect(0, 0, w, totalH))
	y := 0
	for i, im := range imgs {
		srcRect := im.Bounds()
		if i > 0 {
			srcRect.Min.Y += overlap
		}
		dstRect := image.Rect(0, y, w, y+srcRect.Dy())
		draw.Draw(out, dstRect, im, srcRect.Min, draw.Src)
		y += srcRect.Dy()
	}

	var buf bytes.Buffer
	if err := png.Encode(&buf, out); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}

// FramesAreEqual returns true when two PNG frames are byte-identical.
// Used as a cheap "scrolling stopped" signal.
func FramesAreEqual(a, b []byte) bool {
	return bytes.Equal(a, b)
}
