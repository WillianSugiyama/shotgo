import { useEffect } from "react";
import { EventsOn } from "../../wailsjs/runtime/runtime";
import { useCapture } from "./useCapture";
import { useRecording } from "./useRecording";

/**
 * Listens for global hotkey events emitted from the Go backend
 * and dispatches the corresponding capture/recording actions.
 */
export function useHotkeyEvents() {
  const { captureFullscreen, startRegionSelect } = useCapture();
  const { start: startRecording, stop: stopRecording } = useRecording();

  useEffect(() => {
    const cancel = EventsOn("hotkey:action", (action: string) => {
      switch (action) {
        case "capture_fullscreen":
          captureFullscreen();
          break;
        case "capture_region":
          startRegionSelect();
          break;
        case "start_recording":
          startRecording();
          break;
        case "stop_recording":
          stopRecording();
          break;
        default:
          console.warn("Unknown hotkey action:", action);
      }
    });

    return () => {
      cancel();
    };
  }, [captureFullscreen, startRegionSelect, startRecording, stopRecording]);
}
