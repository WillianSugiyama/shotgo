import { useCallback, type RefObject } from "react";
import { useAppStore } from "../stores/appStore";
import { useCaptureStore } from "../stores/captureStore";
import {
  CopyLastToClipboard,
  SaveLastScreenshot,
  UpdateLastScreenshot,
  HideWindow,
  Notify,
} from "../../wailsjs/go/app/App";

export function useEditorActions(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const { setView } = useAppStore();
  const { reset } = useCaptureStore();

  const syncEdited = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL("image/png");
    await UpdateLastScreenshot(data).catch(() => {});
  }, [canvasRef]);

  const dismiss = useCallback(() => {
    reset();
    setView("idle");
    HideWindow().catch(() => {});
  }, [reset, setView]);

  const handleSave = useCallback(async () => {
    await syncEdited();
    try {
      await SaveLastScreenshot("");
      Notify("Screenshot saved", "Saved to your output folder").catch(() => {});
    } catch {
      Notify("Save failed", "Could not save screenshot").catch(() => {});
    }
    dismiss();
  }, [syncEdited, dismiss]);

  const handleCopy = useCallback(async () => {
    await syncEdited();
    try {
      await CopyLastToClipboard();
      Notify("Copied", "Screenshot copied to clipboard").catch(() => {});
    } catch {
      Notify("Copy failed", "Could not copy to clipboard").catch(() => {});
    }
  }, [syncEdited]);

  return { handleSave, handleCopy, handleCancel: dismiss };
}
