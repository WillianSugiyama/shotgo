// Package ffmpeg wraps the ffmpeg binary for video and GIF encoding.
package ffmpeg

import (
	"fmt"
	"os/exec"
)

// Client calls the ffmpeg binary to encode media files.
type Client struct {
	binaryPath string
}

// NewClient creates a Client that uses the ffmpeg binary at the given path.
func NewClient(binaryPath string) *Client {
	return &Client{binaryPath: binaryPath}
}

// EncodeMP4 encodes a directory of frames into an MP4 video.
func (c *Client) EncodeMP4(inputFramesDir string, outputPath string, fps int) error {
	pattern := fmt.Sprintf("%s/frame_%%05d.png", inputFramesDir)
	cmd := exec.Command(c.binaryPath,
		"-y",
		"-framerate", fmt.Sprintf("%d", fps),
		"-i", pattern,
		"-c:v", "libx264",
		"-pix_fmt", "yuv420p",
		outputPath,
	)
	if out, err := cmd.CombinedOutput(); err != nil {
		return fmt.Errorf("ffmpeg EncodeMP4 failed: %w\noutput: %s", err, string(out))
	}
	return nil
}

// EncodeGIF converts an input video or image sequence to an animated GIF.
func (c *Client) EncodeGIF(inputPath string, outputPath string, fps int, width int) error {
	vf := fmt.Sprintf("fps=%d,scale=%d:-1:flags=lanczos", fps, width)
	cmd := exec.Command(c.binaryPath,
		"-y",
		"-i", inputPath,
		"-vf", vf,
		outputPath,
	)
	if out, err := cmd.CombinedOutput(); err != nil {
		return fmt.Errorf("ffmpeg EncodeGIF failed: %w\noutput: %s", err, string(out))
	}
	return nil
}

// ExtractFrames extracts individual frames from a video file into outputDir.
func (c *Client) ExtractFrames(videoPath string, outputDir string) error {
	pattern := fmt.Sprintf("%s/frame_%%05d.png", outputDir)
	cmd := exec.Command(c.binaryPath,
		"-y",
		"-i", videoPath,
		pattern,
	)
	if out, err := cmd.CombinedOutput(); err != nil {
		return fmt.Errorf("ffmpeg ExtractFrames failed: %w\noutput: %s", err, string(out))
	}
	return nil
}
