import type { DragState } from "../../hooks/useEditorTools.types";

interface Props {
  drag: DragState;
  canvasSize: { w: number; h: number };
}

export function DragPreview({ drag, canvasSize }: Props) {
  if (canvasSize.w === 0) return null;

  const x1 = (Math.min(drag.startX, drag.currentX) / canvasSize.w) * 100;
  const y1 = (Math.min(drag.startY, drag.currentY) / canvasSize.h) * 100;
  const w = (Math.abs(drag.currentX - drag.startX) / canvasSize.w) * 100;
  const h = (Math.abs(drag.currentY - drag.startY) / canvasSize.h) * 100;

  if (drag.tool === "arrow") {
    const sx = (drag.startX / canvasSize.w) * 100;
    const sy = (drag.startY / canvasSize.h) * 100;
    const ex = (drag.currentX / canvasSize.w) * 100;
    const ey = (drag.currentY / canvasSize.h) * 100;
    return (
      <svg
        className="absolute inset-0 pointer-events-none w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          x1={sx}
          y1={sy}
          x2={ex}
          y2={ey}
          stroke="#6c5ce7"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  if (drag.tool === "blur" || drag.tool === "crop") {
    const borderColor = drag.tool === "crop" ? "#4a90d9" : "#6c5ce7";
    return (
      <div
        className="absolute pointer-events-none border-2"
        style={{
          left: `${x1}%`,
          top: `${y1}%`,
          width: `${w}%`,
          height: `${h}%`,
          borderColor,
          background: `${borderColor}22`,
        }}
      />
    );
  }

  return null;
}
