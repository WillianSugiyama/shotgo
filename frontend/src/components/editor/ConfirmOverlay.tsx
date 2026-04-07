import { useEffect } from "react";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmOverlay({ message, onConfirm, onCancel }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "y" || e.key === "Y" || e.key === "Enter") {
        e.preventDefault();
        onConfirm();
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        onCancel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onConfirm, onCancel]);

  return (
    <div className="absolute inset-0 z-50 bg-black/85 flex items-center justify-center animate-[fadeIn_0.1s_ease]">
      <div className="bg-black border-2 border-accent p-[24px] max-w-[320px] w-full">
        <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent mb-[8px]">
          ▶ Confirm
        </div>
        <div className="text-[14px] font-bold text-white uppercase tracking-tight mb-[20px]">
          {message}
        </div>
        <div className="flex gap-[8px]">
          <button
            onClick={onCancel}
            className="flex-1 px-[14px] py-[8px] bg-black text-white border border-white/30 hover:border-accent hover:text-accent text-[11px] font-bold uppercase tracking-[0.05em] cursor-pointer"
          >
            [N] Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-[14px] py-[8px] bg-accent text-black hover:bg-white text-[11px] font-bold uppercase tracking-[0.05em] cursor-pointer border-none"
          >
            [Y] Discard
          </button>
        </div>
      </div>
    </div>
  );
}
