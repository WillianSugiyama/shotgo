import { useRef, useState, useCallback, useEffect } from "react";
import { Toolbar, EditorTool } from "./Toolbar";
import { useAppStore } from "../../stores/appStore";
import { useCaptureStore } from "../../stores/captureStore";
import { CopyLastToClipboard, SaveLastScreenshot } from "../../../wailsjs/go/app/App";

export function EditorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTool, setActiveTool] = useState<EditorTool>(null);
  const { setView } = useAppStore();
  const { imageData, reset } = useCaptureStore();

  useEffect(() => {
    if (!imageData || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageData;
  }, [imageData]);

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
        activeTool={activeTool}
        onSelectTool={setActiveTool}
        onSave={handleSave}
        onCopy={handleCopy}
        onCancel={handleCancel}
      />
      <div style={{ flex: 1, overflow: "auto", background: "#0d0d1a" }}>
        <canvas ref={canvasRef} style={{ display: "block", margin: "auto" }} />
      </div>
    </div>
  );
}
