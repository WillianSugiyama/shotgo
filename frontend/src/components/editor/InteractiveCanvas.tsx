import { type MouseEvent, type RefObject } from "react";
import type {
  Annotation,
  DragState,
  PendingText,
  CropRect,
} from "../../hooks/useEditorTools.types";
import { useCanvasRender } from "../../hooks/useCanvasRender";
import { TextInputOverlay } from "./TextInputOverlay";
import { CropOverlay } from "./CropOverlay";
import { DragPreview } from "./DragPreview";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  imageData: string | null;
  annotations: Annotation[];
  drag: DragState | null;
  pendingText: PendingText | null;
  cropRect: CropRect | null;
  onMouseDown: (x: number, y: number) => void;
  onMouseMove: (x: number, y: number) => void;
  onMouseUp: (x: number, y: number) => void;
  onCommitText: (text: string) => void;
  onCancelText: () => void;
}

export function InteractiveCanvas(props: Props) {
  const { canvasRef, imageData, annotations, drag, pendingText, cropRect } = props;
  const size = useCanvasRender(canvasRef, imageData, annotations);

  const getPos = (e: MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const scaleX = (canvasRef.current?.width ?? 0) / rect.width;
    const scaleY = (canvasRef.current?.height ?? 0) / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  return (
    <div className="relative inline-block">
      <canvas
        ref={canvasRef as RefObject<HTMLCanvasElement>}
        className="block cursor-crosshair"
        onMouseDown={(e) => {
          const p = getPos(e);
          props.onMouseDown(p.x, p.y);
        }}
        onMouseMove={(e) => {
          const p = getPos(e);
          props.onMouseMove(p.x, p.y);
        }}
        onMouseUp={(e) => {
          const p = getPos(e);
          props.onMouseUp(p.x, p.y);
        }}
      />
      {drag && <DragPreview drag={drag} canvasSize={size} />}
      {pendingText && (
        <TextInputOverlay
          pos={pendingText}
          canvasSize={size}
          onCommit={props.onCommitText}
          onCancel={props.onCancelText}
        />
      )}
      {cropRect && <CropOverlay rect={cropRect} canvasSize={size} />}
    </div>
  );
}
