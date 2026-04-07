import { Pencil, Trash2, Upload, Pin } from "lucide-react";
import { useCaptureStore } from "../../stores/captureStore";
import { useCaptureBarActions } from "../../hooks/useCaptureBarActions";

export function CaptureBar() {
  const imageData = useCaptureStore((s) => s.imageData);
  const { onSave, onCopy, onEdit, onDiscard } = useCaptureBarActions();

  if (!imageData) return null;

  return (
    <div className="capture-bar-root w-full h-full p-[4px] animate-[slideUp_0.25s_ease-out]">
      <div className="relative w-full h-full rounded-[16px] overflow-hidden">
        <img src={imageData} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <CornerBtn pos="top-[10px] left-[10px]" title="Pin" onClick={() => {}}>
          <Pin size={14} />
        </CornerBtn>
        <CornerBtn pos="top-[10px] right-[10px]" title="Delete" onClick={onDiscard}>
          <Trash2 size={14} />
        </CornerBtn>
        <CornerBtn pos="bottom-[10px] left-[10px]" title="Edit" onClick={onEdit}>
          <Pencil size={14} />
        </CornerBtn>
        <CornerBtn pos="bottom-[10px] right-[10px]" title="Upload" onClick={onSave}>
          <Upload size={14} />
        </CornerBtn>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[10px] pointer-events-none">
          <PillBtn onClick={onCopy}>Copy</PillBtn>
          <PillBtn onClick={onSave}>Save</PillBtn>
        </div>
      </div>
    </div>
  );
}

function CornerBtn(p: {
  pos: string;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      title={p.title}
      onClick={p.onClick}
      className={`absolute ${p.pos} z-10 w-[32px] h-[32px] rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 text-white/90 hover:text-white flex items-center justify-center cursor-pointer border-none shadow-lg hover:scale-110 active:scale-95`}
    >
      {p.children}
    </button>
  );
}

function PillBtn(p: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={p.onClick}
      className="pointer-events-auto px-[28px] py-[8px] rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-black/80 hover:text-black text-[14px] font-semibold cursor-pointer border-none shadow-lg hover:scale-105 active:scale-95"
    >
      {p.children}
    </button>
  );
}
