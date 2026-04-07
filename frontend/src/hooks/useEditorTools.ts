import { useState, useCallback } from "react";
import type { EditorTool } from "../components/editor/Toolbar";
import type { TextData } from "../components/editor/tools/TextTool";
import { useEditorDrag } from "./useEditorDrag";
import type { Annotation, PendingText, CropRect } from "./useEditorTools.types";

export type { Annotation, DragState, PendingText, CropRect } from "./useEditorTools.types";

export function useEditorTools() {
  const [activeTool, setActiveTool] = useState<EditorTool>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [pendingText, setPendingText] = useState<PendingText | null>(null);
  const [cropRect, setCropRect] = useState<CropRect | null>(null);

  const { drag, onDown, onMove, onUp } = useEditorDrag({
    activeTool,
    setPendingText,
    setAnnotations,
    setCropRect,
  });

  const commitText = useCallback(
    (text: string) => {
      if (!pendingText || !text) {
        setPendingText(null);
        return;
      }
      const data: TextData = {
        x: pendingText.x,
        y: pendingText.y,
        content: text,
        fontSize: 22,
        color: "#6c5ce7",
        fontFamily: "sans-serif",
      };
      setAnnotations((p) => [...p, { type: "text", data }]);
      setPendingText(null);
    },
    [pendingText],
  );

  const cancelText = useCallback(() => setPendingText(null), []);
  const clearCrop = useCallback(() => setCropRect(null), []);
  const undo = useCallback(() => setAnnotations((p) => p.slice(0, -1)), []);

  return {
    activeTool,
    setActiveTool,
    annotations,
    drag,
    pendingText,
    cropRect,
    handleMouseDown: onDown,
    handleMouseMove: onMove,
    handleMouseUp: onUp,
    commitText,
    cancelText,
    clearCrop,
    undo,
  };
}
