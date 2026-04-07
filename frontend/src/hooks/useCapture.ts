import { useCallback } from "react";
import { useCaptureStore } from "../stores/captureStore";
import { useAppStore } from "../stores/appStore";
import { CaptureFullscreen, CaptureInteractive, SetWindowAsBar } from "../../wailsjs/go/app/App";

export function useCapture() {
  const { setCapturing, setImageData, setMode, reset } = useCaptureStore();
  const { setView } = useAppStore();

  const showBar = useCallback(
    async (result: { imageBase64: string }) => {
      setImageData(result.imageBase64);
      setView("capture-bar");
      await SetWindowAsBar().catch(() => {});
    },
    [setImageData, setView],
  );

  const captureFullscreen = useCallback(async () => {
    setMode("fullscreen");
    setCapturing(true);
    try {
      const result = await CaptureFullscreen();
      await showBar(result);
    } catch (err) {
      void err;
    } finally {
      setCapturing(false);
    }
  }, [setMode, setCapturing, showBar]);

  const captureRegion = useCallback(async () => {
    setMode("region");
    setCapturing(true);
    try {
      const result = await CaptureInteractive();
      await showBar(result);
    } catch (err) {
      void err;
    } finally {
      setCapturing(false);
    }
  }, [setMode, setCapturing, showBar]);

  const cancelCapture = useCallback(() => {
    reset();
    setView("idle");
  }, [reset, setView]);

  return { captureFullscreen, captureRegion, cancelCapture };
}
