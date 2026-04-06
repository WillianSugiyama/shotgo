import { useCallback, useEffect, useRef } from "react";
import { useRecordingStore } from "../stores/recordingStore";
import type { SelectedSource } from "../stores/recordingStore";
import { StartRecording, StopRecording } from "../../wailsjs/go/app/App";

export function useRecording() {
  const store = useRecordingStore();
  const { state, format, elapsedSeconds, maxSeconds, selectedSource } = store;
  const { setState, setElapsedSeconds, setSelectedSource, reset } = store;
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

  const start = useCallback(
    async (source?: SelectedSource) => {
      try {
        if (source) setSelectedSource(source);
        await StartRecording(format);
        setState("recording");
        setElapsedSeconds(0);
      } catch (err) {
        console.error("Start recording failed:", err);
      }
    },
    [format, setState, setElapsedSeconds, setSelectedSource],
  );

  const stop = useCallback(async () => {
    try {
      await StopRecording();
      setState("stopped");
    } catch (err) {
      console.error("Stop recording failed:", err);
    }
  }, [setState]);

  const pause = useCallback(() => setState("paused"), [setState]);
  const resume = useCallback(() => setState("recording"), [setState]);

  return {
    state,
    elapsedSeconds,
    maxSeconds,
    selectedSource,
    start,
    stop,
    pause,
    resume,
    reset,
  };
}
