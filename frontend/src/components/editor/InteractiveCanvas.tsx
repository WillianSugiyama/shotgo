import { useRef, useEffect, useCallback, type MouseEvent } from "react";
import { Annotation } from "../../hooks/useEditorTools";
import { drawArrow, ArrowData } from "./tools/ArrowTool";
import { drawText, TextData } from "./tools/TextTool";
import { applyBlur, BlurData } from "./tools/BlurTool";

interface Props {
  imageData: string | null;
  annotations: Annotation[];
  onMouseDown: (x: number, y: number) => void;
  onMouseUp: (x: number, y: number) => void;
}

export function InteractiveCanvas({ imageData, annotations, onMouseDown, onMouseUp }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageData) return;
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      redraw();
    };
    img.src = imageData;
  }, [imageData]);

  useEffect(() => {
    redraw();
  }, [annotations]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    for (const ann of annotations) {
      if (ann.type === "blur") applyBlur(ctx, ann.data as BlurData);
    }
    for (const ann of annotations) {
      if (ann.type === "arrow") drawArrow(ctx, ann.data as ArrowData);
      if (ann.type === "text") drawText(ctx, ann.data as TextData);
    }
  }, [annotations]);

  const getPos = (e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <canvas
      ref={canvasRef}
      className="block mx-auto cursor-crosshair"
      onMouseDown={(e) => {
        const p = getPos(e);
        onMouseDown(p.x, p.y);
      }}
      onMouseUp={(e) => {
        const p = getPos(e);
        onMouseUp(p.x, p.y);
      }}
    />
  );
}
