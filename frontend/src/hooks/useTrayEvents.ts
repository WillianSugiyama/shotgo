import { useEffect } from "react";
import { EventsOn } from "../../wailsjs/runtime/runtime";
import { useCapture } from "./useCapture";
import { useRecording } from "./useRecording";
import { useAppStore } from "../stores/appStore";

/**
 * Listens for system tray menu actions emitted from Go via Wails events
 * and dispatches them to the appropriate hooks/stores.
 */
export function useTrayEvents() {
  const { captureFullscreen, startRegionSelect } = useCapture();
  const { start: startRecording } = useRecording();
  const { setView } = useAppStore();

  useEffect(() => {
    const unsubscribe = EventsOn("tray:action", (action: string) => {
      switch (action) {
        case "capture-fullscreen":
          captureFullscreen();
          break;
        case "capture-region":
          startRegionSelect();
          break;
        case "record-screen":
          setView("recorder");
          startRecording();
          break;
        case "settings":
          setView("settings");
          break;
        case "quit":
          // Wails handles the actual quit on the Go side
          break;
        default:
          console.warn("Unknown tray action:", action);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [captureFullscreen, startRegionSelect, startRecording, setView]);
}
