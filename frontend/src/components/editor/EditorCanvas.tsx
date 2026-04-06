import { useCallback } from "react";
import { Toolbar } from "./Toolbar";
import { InteractiveCanvas } from "./InteractiveCanvas";
import { useAppStore } from "../../stores/appStore";
import { useCaptureStore } from "../../stores/captureStore";
import { useEditorTools } from "../../hooks/useEditorTools";
import { useToastStore } from "../../stores/toastStore";
import { CopyLastToClipboard, SaveLastScreenshot } from "../../../wailsjs/go/app/App";

export function EditorCanvas() {
  const { setView } = useAppStore();
  const { imageData, reset } = useCaptureStore();
  const tools = useEditorTools();
  const toast = useToastStore((s) => s.show);

  const handleSave = useCallback(async () => {
    try {
      await SaveLastScreenshot("");
      toast("Screenshot saved", "success");
    } catch {
      toast("Save failed", "error");
    }
    reset();
    setView("idle");
  }, [reset, setView, toast]);

  const handleCopy = useCallback(async () => {
    try {
      await CopyLastToClipboard();
      toast("Copied to clipboard", "success");
    } catch {
      toast("Copy failed", "error");
    }
  }, [toast]);

  const handleCancel = useCallback(() => {
    reset();
    setView("idle");
  }, [reset, setView]);

  return (
    <div className="flex flex-col h-screen">
      <Toolbar
        activeTool={tools.activeTool}
        onSelectTool={tools.setActiveTool}
        onUndo={tools.undo}
        onSave={handleSave}
        onCopy={handleCopy}
        onCancel={handleCancel}
      />
      <div className="flex-1 overflow-auto bg-bg">
        <InteractiveCanvas
          imageData={imageData}
          annotations={tools.annotations}
          onMouseDown={tools.handleMouseDown}
          onMouseUp={tools.handleMouseUp}
        />
      </div>
    </div>
  );
}
