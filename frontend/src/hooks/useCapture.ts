import { useCallback } from "react";
import { useCaptureStore } from "../stores/captureStore";
import { useAppStore } from "../stores/appStore";
import { CaptureFullscreen, CaptureInteractive } from "../../wailsjs/go/app/App";

export function useCapture() {
  const { setCapturing, setImageData, setMode, reset } = useCaptureStore();
  const { setView } = useAppStore();

  const captureFullscreen = useCallback(async () => {
    setMode("fullscreen");
    setCapturing(true);
    try {
      const result = await CaptureFullscreen();
      setImageData(result.imageBase64);
      setView("editor");
    } catch (err) {
      console.error("Fullscreen capture failed:", err);
    } finally {
      setCapturing(false);
    }
  }, [setMode, setCapturing, setImageData, setView]);

  const captureRegion = useCallback(async () => {
    setMode("region");
    setCapturing(true);
    try {
      const result = await CaptureInteractive();
      setImageData(result.imageBase64);
      setView("editor");
    } catch (err) {
      console.error("Region capture failed:", err);
    } finally {
      setCapturing(false);
    }
  }, [setMode, setCapturing, setImageData, setView]);

  const cancelCapture = useCallback(() => {
    reset();
    setView("idle");
  }, [reset, setView]);

  return { captureFullscreen, captureRegion, cancelCapture };
}
