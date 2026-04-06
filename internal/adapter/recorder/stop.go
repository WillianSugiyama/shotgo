package recorder

import (
	"io"
	"os/exec"
	"time"
)

// gracefulStop sends "q\n" to ffmpeg stdin and waits up to 5 seconds.
// If ffmpeg doesn't exit, it kills the process.
func gracefulStop(cmd *exec.Cmd, stdin io.WriteCloser) {
	if stdin != nil {
		_, _ = stdin.Write([]byte("q\n"))
		_ = stdin.Close()
	}
	if cmd == nil || cmd.Process == nil {
		return
	}

	done := make(chan error, 1)
	go func() { done <- cmd.Wait() }()

	select {
	case <-done:
		return
	case <-time.After(5 * time.Second):
		_ = cmd.Process.Kill()
		<-done
	}
}
