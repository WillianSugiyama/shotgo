import { useState, useCallback, useRef } from "react";
import { EditorTool } from "../components/editor/Toolbar";
import { ArrowData } from "../components/editor/tools/ArrowTool";
import { TextData } from "../components/editor/tools/TextTool";
import { BlurData } from "../components/editor/tools/BlurTool";

export interface Annotation {
  type: "arrow" | "text" | "blur";
  data: ArrowData | TextData | BlurData;
}

export function useEditorTools() {
  const [activeTool, setActiveTool] = useState<EditorTool>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (x: number, y: number) => {
      if (!activeTool || activeTool === "crop") return;
      isDragging.current = true;
      dragStart.current = { x, y };

      if (activeTool === "text") {
        const text = prompt("Enter text:");
        if (text) {
          const data: TextData = {
            x,
            y,
            content: text,
            fontSize: 16,
            color: "#ff0000",
            fontFamily: "sans-serif",
          };
          setAnnotations((prev) => [...prev, { type: "text", data }]);
        }
        isDragging.current = false;
      }
    },
    [activeTool],
  );

  const handleMouseUp = useCallback(
    (x: number, y: number) => {
      if (!isDragging.current || !activeTool) return;
      isDragging.current = false;
      const sx = dragStart.current.x;
      const sy = dragStart.current.y;

      if (activeTool === "arrow") {
        const data: ArrowData = {
          startX: sx,
          startY: sy,
          endX: x,
          endY: y,
          color: "#ff0000",
          width: 3,
        };
        setAnnotations((prev) => [...prev, { type: "arrow", data }]);
      } else if (activeTool === "blur") {
        const data: BlurData = {
          x: Math.min(sx, x),
          y: Math.min(sy, y),
          width: Math.abs(x - sx),
          height: Math.abs(y - sy),
          intensity: 10,
        };
        setAnnotations((prev) => [...prev, { type: "blur", data }]);
      }
    },
    [activeTool],
  );

  const undo = useCallback(() => {
    setAnnotations((prev) => prev.slice(0, -1));
  }, []);

  return { activeTool, setActiveTool, annotations, handleMouseDown, handleMouseUp, undo };
}
