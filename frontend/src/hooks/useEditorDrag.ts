import { useState, useCallback, useRef } from "react";
import type { EditorTool } from "../components/editor/Toolbar";
import type { Annotation, DragState, CropRect, PendingText } from "./useEditorTools.types";
import type { ArrowData } from "../components/editor/tools/ArrowTool";
import type { BlurData } from "../components/editor/tools/BlurTool";

interface Args {
  activeTool: EditorTool;
  setPendingText: (p: PendingText | null) => void;
  setAnnotations: (fn: (p: Annotation[]) => Annotation[]) => void;
  setCropRect: (r: CropRect | null) => void;
}

export function useEditorDrag({ activeTool, setPendingText, setAnnotations, setCropRect }: Args) {
  const [drag, setDrag] = useState<DragState | null>(null);
  const ref = useRef<DragState | null>(null);

  const onDown = useCallback(
    (x: number, y: number) => {
      if (!activeTool) return;
      if (activeTool === "text") return setPendingText({ x, y });
      const s: DragState = { tool: activeTool, startX: x, startY: y, currentX: x, currentY: y };
      ref.current = s;
      setDrag(s);
    },
    [activeTool, setPendingText],
  );

  const onMove = useCallback((x: number, y: number) => {
    if (!ref.current) return;
    const s = { ...ref.current, currentX: x, currentY: y };
    ref.current = s;
    setDrag(s);
  }, []);

  const onUp = useCallback(
    (x: number, y: number) => {
      const s = ref.current;
      ref.current = null;
      setDrag(null);
      if (!s) return;
      const sx = s.startX;
      const sy = s.startY;
      if (s.tool === "arrow") {
        const data: ArrowData = {
          startX: sx,
          startY: sy,
          endX: x,
          endY: y,
          color: "#6c5ce7",
          width: 4,
        };
        setAnnotations((p) => [...p, { type: "arrow", data }]);
      } else if (s.tool === "blur") {
        const data: BlurData = {
          x: Math.min(sx, x),
          y: Math.min(sy, y),
          width: Math.abs(x - sx),
          height: Math.abs(y - sy),
          intensity: 12,
        };
        setAnnotations((p) => [...p, { type: "blur", data }]);
      } else if (s.tool === "crop") {
        setCropRect({
          x: Math.min(sx, x),
          y: Math.min(sy, y),
          width: Math.abs(x - sx),
          height: Math.abs(y - sy),
        });
      }
    },
    [setAnnotations, setCropRect],
  );

  return { drag, onDown, onMove, onUp };
}
