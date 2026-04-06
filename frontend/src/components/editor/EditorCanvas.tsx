import { useRef, useState, useCallback } from "react";
import { Toolbar, EditorTool } from "./Toolbar";
import { useAppStore } from "../../stores/appStore";

export function EditorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTool, setActiveTool] = useState<EditorTool>(null);
  const { setView } = useAppStore();

  const handleSave = useCallback(() => {
    // TODO: Export canvas to PNG, call Go SaveScreenshot
    setView("idle");
  }, [setView]);

  const handleCopy = useCallback(() => {
    // TODO: Export canvas to PNG, call Go CopyToClipboard
  }, []);

  const handleCancel = useCallback(() => {
    setView("idle");
  }, [setView]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Toolbar
        activeTool={activeTool}
        onSelectTool={setActiveTool}
        onSave={handleSave}
        onCopy={handleCopy}
        onCancel={handleCancel}
      />
      <div style={{ flex: 1, overflow: "auto", background: "#0d0d1a" }}>
        <canvas
          ref={canvasRef}
          style={{ display: "block", margin: "auto" }}
        />
      </div>
    </div>
  );
}
