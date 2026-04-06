import { useCallback } from "react";
import { useCaptureStore, Region } from "../stores/captureStore";
import { useAppStore } from "../stores/appStore";
import { CaptureFullscreen, CaptureRegion } from "../../wailsjs/go/app/App";

export function useCapture() {
  const { setCapturing, setImageData, setMode, reset } = useCaptureStore();
  const { setView } = useAppStore();

  const captureFullscreen = useCallback(async () => {
    setMode("fullscreen");
    setCapturing(true);
    try {
      const result = await CaptureFullscreen();
      setImageData(result.id);
      setView("editor");
    } catch (err) {
      console.error("Fullscreen capture failed:", err);
    } finally {
      setCapturing(false);
    }
  }, [setMode, setCapturing, setImageData, setView]);

  const captureRegion = useCallback(
    async (region: Region) => {
      setCapturing(true);
      try {
        const result = await CaptureRegion(region.x, region.y, region.width, region.height);
        setImageData(result.id);
        setView("editor");
      } catch (err) {
        console.error("Region capture failed:", err);
      } finally {
        setCapturing(false);
      }
    },
    [setCapturing, setImageData, setView],
  );

  const startRegionSelect = useCallback(() => {
    setMode("region");
    setView("overlay");
  }, [setMode, setView]);

  const cancelCapture = useCallback(() => {
    reset();
    setView("idle");
  }, [reset, setView]);

  return { captureFullscreen, captureRegion, startRegionSelect, cancelCapture };
}
