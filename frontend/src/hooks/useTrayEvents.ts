import { useEffect } from "react";
import { EventsOn } from "../../wailsjs/runtime/runtime";
import { SetWindowAsMain } from "../../wailsjs/go/app/App";
import { useCapture } from "./useCapture";
import { useRecording } from "./useRecording";
import { useAppStore } from "../stores/appStore";

export function useTrayEvents() {
  const { captureFullscreen, captureRegion } = useCapture();
  const { start: startRecording } = useRecording();
  const { setView } = useAppStore();

  useEffect(() => {
    if (!window.runtime) return;
    const unsubscribe = EventsOn("tray:action", (action: string) => {
      switch (action) {
        case "capture-fullscreen":
          captureFullscreen();
          break;
        case "capture-region":
          captureRegion();
          break;
        case "record-screen":
          SetWindowAsMain().catch(() => {});
          setView("recorder");
          startRecording();
          break;
        case "settings":
          SetWindowAsMain().catch(() => {});
          setView("settings");
          break;
        case "quit":
          break;
        default:
          void action;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [captureFullscreen, captureRegion, startRecording, setView]);
}
