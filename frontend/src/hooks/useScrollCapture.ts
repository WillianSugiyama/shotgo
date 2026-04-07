import { useCallback } from "react";
import {
  CaptureScrollable,
  SetWindowAsBar,
  SetWindowAsOverlay,
  SetWindowAsMain,
  RequestAccessibility,
} from "../../wailsjs/go/app/App";
import { useAppStore } from "../stores/appStore";
import { useCaptureStore } from "../stores/captureStore";

export function useScrollCapture() {
  const { setView } = useAppStore();
  const { setImageData, setCapturing } = useCaptureStore();

  const startScrollCapture = useCallback(async () => {
    await RequestAccessibility().catch(() => {});
    await SetWindowAsOverlay().catch(() => {});
    setView("scroll-region");
  }, [setView]);

  const captureScrollRegion = useCallback(
    async (x: number, y: number, width: number, height: number) => {
      setCapturing(true);
      try {
        const result = await CaptureScrollable(x, y, width, height);
        setImageData(result.imageBase64);
        setView("capture-bar");
        await SetWindowAsBar().catch(() => {});
      } catch (err) {
        void err;
        await SetWindowAsMain().catch(() => {});
        setView("idle");
      } finally {
        setCapturing(false);
      }
    },
    [setCapturing, setImageData, setView],
  );

  const cancelScrollCapture = useCallback(async () => {
    await SetWindowAsMain().catch(() => {});
    setView("idle");
  }, [setView]);

  return { startScrollCapture, captureScrollRegion, cancelScrollCapture };
}
