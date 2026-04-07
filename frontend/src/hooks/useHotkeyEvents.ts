import { useEffect } from "react";
import { EventsOn } from "../../wailsjs/runtime/runtime";
import { SetWindowAsMain } from "../../wailsjs/go/app/App";
import { useCapture } from "./useCapture";
import { useRecording } from "./useRecording";
import { useAppStore } from "../stores/appStore";

export function useHotkeyEvents() {
  const { captureFullscreen, captureRegion } = useCapture();
  const { stop: stopRecording } = useRecording();
  const { setView } = useAppStore();

  useEffect(() => {
    if (!window.runtime) return;
    const cancel = EventsOn("hotkey:action", (action: string) => {
      switch (action) {
        case "capture_fullscreen":
          captureFullscreen();
          break;
        case "capture_region":
          captureRegion();
          break;
        case "start_recording":
          SetWindowAsMain().catch(() => {});
          setView("recorder");
          break;
        case "stop_recording":
          stopRecording();
          break;
      }
    });

    return () => {
      cancel();
    };
  }, [captureFullscreen, captureRegion, stopRecording, setView]);
}
