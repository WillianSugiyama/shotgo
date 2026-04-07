import { useEffect, useRef, useState } from "react";
import type { PendingText } from "../../hooks/useEditorTools.types";

interface Props {
  pos: PendingText;
  canvasSize: { w: number; h: number };
  onCommit: (text: string) => void;
  onCancel: () => void;
}

export function TextInputOverlay({ pos, canvasSize, onCommit, onCancel }: Props) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  if (canvasSize.w === 0) return null;

  const left = (pos.x / canvasSize.w) * 100;
  const top = (pos.y / canvasSize.h) * 100;

  return (
    <input
      ref={ref}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onCommit(value);
        else if (e.key === "Escape") onCancel();
      }}
      onBlur={() => onCommit(value)}
      placeholder="Type…"
      className="absolute px-2 py-1 bg-black/60 text-[#6c5ce7] border-2 border-[#6c5ce7] rounded outline-none text-xl font-semibold"
      style={{ left: `${left}%`, top: `${top}%`, transform: "translateY(-50%)", minWidth: "120px" }}
    />
  );
}
