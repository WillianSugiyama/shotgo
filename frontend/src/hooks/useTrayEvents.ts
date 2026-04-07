import { useEffect } from "react";
import { EventsOn } from "../../wailsjs/runtime/runtime";
import { SetWindowAsMain } from "../../wailsjs/go/app/App";
import { useCapture } from "./useCapture";
import { useScrollCapture } from "./useScrollCapture";
import { useAppStore } from "../stores/appStore";

export function useTrayEvents() {
  const { captureFullscreen, captureRegion } = useCapture();
  const { startScrollCapture } = useScrollCapture();
  const { setView } = useAppStore();

  useEffect(() => {
    if (!window.runtime) return;
    const unsubscribe = EventsOn("tray:action", (action: string) => {
      switch (action) {
        case "open-main":
          SetWindowAsMain().catch(() => {});
          setView("idle");
          break;
        case "capture-fullscreen":
          captureFullscreen();
          break;
        case "capture-region":
          captureRegion();
          break;
        case "scroll-capture":
          SetWindowAsMain().catch(() => {});
          setView("idle");
          startScrollCapture();
          break;
        case "record-screen":
          SetWindowAsMain().catch(() => {});
          setView("recorder");
          break;
        case "settings":
          SetWindowAsMain().catch(() => {});
          setView("settings");
          break;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [captureFullscreen, captureRegion, startScrollCapture, setView]);
}
