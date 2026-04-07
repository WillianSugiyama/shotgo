import { useRef, useEffect, useCallback, useState, type RefObject } from "react";
import type { Annotation } from "./useEditorTools.types";
import { drawArrow, type ArrowData } from "../components/editor/tools/ArrowTool";
import { drawText, type TextData } from "../components/editor/tools/TextTool";
import { applyBlur, type BlurData } from "../components/editor/tools/BlurTool";

export function useCanvasRender(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  imageData: string | null,
  annotations: Annotation[],
) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = img.width;
    canvas.height = img.height;
    setSize({ w: img.width, h: img.height });
    ctx.drawImage(img, 0, 0);
    for (const ann of annotations) {
      if (ann.type === "blur") applyBlur(ctx, ann.data as BlurData);
    }
    for (const ann of annotations) {
      if (ann.type === "arrow") drawArrow(ctx, ann.data as ArrowData);
      if (ann.type === "text") drawText(ctx, ann.data as TextData);
    }
  }, [annotations, canvasRef]);

  useEffect(() => {
    if (!imageData) return;
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      redraw();
    };
    img.src = imageData;
  }, [imageData, redraw]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  return size;
}
