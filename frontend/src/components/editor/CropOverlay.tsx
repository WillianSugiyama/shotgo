import type { CropRect } from "../../hooks/useEditorTools.types";

interface Props {
  rect: CropRect;
  canvasSize: { w: number; h: number };
}

export function CropOverlay({ rect, canvasSize }: Props) {
  if (canvasSize.w === 0) return null;

  const left = (rect.x / canvasSize.w) * 100;
  const top = (rect.y / canvasSize.h) * 100;
  const width = (rect.width / canvasSize.w) * 100;
  const height = (rect.height / canvasSize.h) * 100;

  return (
    <>
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      <div
        className="absolute border-2 border-[#4a90d9] pointer-events-none"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
        }}
      />
    </>
  );
}
