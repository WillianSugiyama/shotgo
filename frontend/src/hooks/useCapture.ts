import { useCallback } from "react";
import { useCaptureStore, Region } from "../stores/captureStore";
import { useAppStore } from "../stores/appStore";

// TODO: Import from wailsjs/go/app/App when bindings are generated

export function useCapture() {
  const { setCapturing, setImageData, setMode, reset } = useCaptureStore();
  const { setView } = useAppStore();

  const captureFullscreen = useCallback(async () => {
    setMode("fullscreen");
    setCapturing(true);
    try {
      // TODO: const result = await App.CaptureFullscreen();
      // setImageData(result);
      setView("editor");
    } finally {
      setCapturing(false);
    }
  }, [setMode, setCapturing, setView]);

  const captureRegion = useCallback(async (region: Region) => {
    setCapturing(true);
    try {
      // TODO: const result = await App.CaptureRegion(region);
      // setImageData(result);
      setView("editor");
    } finally {
      setCapturing(false);
    }
  }, [setCapturing, setView]);

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
