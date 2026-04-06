import { useCallback, useEffect, useRef } from "react";
import { useRecordingStore } from "../stores/recordingStore";

// TODO: Import from wailsjs/go/app/App when bindings are generated

export function useRecording() {
  const { state, elapsedSeconds, maxSeconds, setState, setElapsedSeconds, reset } =
    useRecordingStore();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state === "recording") {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(elapsedSeconds + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state, elapsedSeconds, setElapsedSeconds]);

  useEffect(() => {
    if (elapsedSeconds >= maxSeconds && state === "recording") {
      stop();
    }
  }, [elapsedSeconds, maxSeconds, state]);

  const start = useCallback(async () => {
    // TODO: await App.StartRecording(null, format);
    setState("recording");
    setElapsedSeconds(0);
  }, [setState, setElapsedSeconds]);

  const stop = useCallback(async () => {
    // TODO: await App.StopRecording();
    setState("stopped");
  }, [setState]);

  const pause = useCallback(() => setState("paused"), [setState]);
  const resume = useCallback(() => setState("recording"), [setState]);

  return { state, elapsedSeconds, maxSeconds, start, stop, pause, resume, reset };
}
