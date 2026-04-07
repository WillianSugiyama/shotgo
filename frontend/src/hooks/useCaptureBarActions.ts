import { useCallback } from "react";
import { useAppStore } from "../stores/appStore";
import { useCaptureStore } from "../stores/captureStore";
import { useToastStore } from "../stores/toastStore";
import {
  SaveLastScreenshot,
  CopyLastToClipboard,
  SetWindowAsMain,
  HideWindow,
} from "../../wailsjs/go/app/App";

export function useCaptureBarActions() {
  const { setView } = useAppStore();
  const reset = useCaptureStore((s) => s.reset);
  const toast = useToastStore((s) => s.show);

  const dismiss = useCallback(async () => {
    reset();
    setView("idle");
    await HideWindow().catch(() => {});
  }, [reset, setView]);

  const onSave = useCallback(async () => {
    try {
      await SaveLastScreenshot("");
      toast("Screenshot saved", "success");
    } catch {
      toast("Save failed", "error");
    }
    dismiss();
  }, [toast, dismiss]);

  const onCopy = useCallback(async () => {
    try {
      await CopyLastToClipboard();
      toast("Copied to clipboard", "success");
    } catch {
      toast("Copy failed", "error");
    }
    dismiss();
  }, [toast, dismiss]);

  const onEdit = useCallback(async () => {
    await SetWindowAsMain().catch(() => {});
    setView("editor");
  }, [setView]);

  const onDiscard = useCallback(() => {
    dismiss();
  }, [dismiss]);

  return { onSave, onCopy, onEdit, onDiscard };
}
