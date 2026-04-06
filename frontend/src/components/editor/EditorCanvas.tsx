import { useCallback } from "react";
import { Toolbar } from "./Toolbar";
import { InteractiveCanvas } from "./InteractiveCanvas";
import { useAppStore } from "../../stores/appStore";
import { useCaptureStore } from "../../stores/captureStore";
import { useEditorTools } from "../../hooks/useEditorTools";
import { CopyLastToClipboard, SaveLastScreenshot } from "../../../wailsjs/go/app/App";

export function EditorCanvas() {
  const { setView } = useAppStore();
  const { imageData, reset } = useCaptureStore();
  const tools = useEditorTools();

  const handleSave = useCallback(async () => {
    try {
      await SaveLastScreenshot("");
    } catch (err) {
      console.error("Save failed:", err);
    }
    reset();
    setView("idle");
  }, [reset, setView]);

  const handleCopy = useCallback(async () => {
    try {
      await CopyLastToClipboard();
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }, []);

  const handleCancel = useCallback(() => {
    reset();
    setView("idle");
  }, [reset, setView]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Toolbar
        activeTool={tools.activeTool}
        onSelectTool={tools.setActiveTool}
        onSave={handleSave}
        onCopy={handleCopy}
        onCancel={handleCancel}
      />
      <div style={{ flex: 1, overflow: "auto", background: "#0d0d1a" }}>
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
