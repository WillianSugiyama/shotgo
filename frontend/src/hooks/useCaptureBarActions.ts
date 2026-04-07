import { useCallback } from "react";
import { useAppStore } from "../stores/appStore";
import { useCaptureStore } from "../stores/captureStore";
import {
  SaveLastScreenshot,
  CopyLastToClipboard,
  SetWindowAsMain,
  HideWindow,
  Notify,
} from "../../wailsjs/go/app/App";

export function useCaptureBarActions() {
  const { setView } = useAppStore();
  const reset = useCaptureStore((s) => s.reset);

  const dismiss = useCallback(async () => {
    reset();
    setView("idle");
    await HideWindow().catch(() => {});
  }, [reset, setView]);

  const onSave = useCallback(async () => {
    try {
      await SaveLastScreenshot("");
      Notify("Screenshot saved", "Saved to your output folder").catch(() => {});
    } catch {
      Notify("Save failed", "Could not save screenshot").catch(() => {});
    }
    dismiss();
  }, [dismiss]);

  const onCopy = useCallback(async () => {
    try {
      await CopyLastToClipboard();
      Notify("Copied", "Screenshot copied to clipboard").catch(() => {});
    } catch {
      Notify("Copy failed", "Could not copy to clipboard").catch(() => {});
    }
    dismiss();
  }, [dismiss]);

  const onEdit = useCallback(async () => {
    await SetWindowAsMain().catch(() => {});
    setView("editor");
  }, [setView]);

  const onDiscard = useCallback(() => {
    dismiss();
  }, [dismiss]);

  return { onSave, onCopy, onEdit, onDiscard };
}
