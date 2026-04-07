import { Pencil, Trash2, Upload, Pin } from "lucide-react";
import { useCaptureStore } from "../../stores/captureStore";
import { useCaptureBarActions } from "../../hooks/useCaptureBarActions";
import { useEscape } from "../../hooks/useEscape";

export function CaptureBar() {
  const imageData = useCaptureStore((s) => s.imageData);
  const { onSave, onCopy, onEdit, onDiscard } = useCaptureBarActions();
  useEscape(onDiscard);

  if (!imageData) return null;

  return (
    <div className="capture-bar-root w-full h-full animate-[slideUpSnap_0.22s_cubic-bezier(0.16,1,0.3,1)]">
      <div className="relative w-full h-full overflow-hidden border-2 border-accent bg-black">
        <img src={imageData} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 wails-drag" />
        <CornerBtn pos="top-[8px] left-[8px]" title="Pin" onClick={() => {}}>
          <Pin size={13} />
        </CornerBtn>
        <CornerBtn pos="top-[8px] right-[8px]" title="Delete" onClick={onDiscard}>
          <Trash2 size={13} />
        </CornerBtn>
        <CornerBtn pos="bottom-[8px] left-[8px]" title="Edit" onClick={onEdit}>
          <Pencil size={13} />
        </CornerBtn>
        <CornerBtn pos="bottom-[8px] right-[8px]" title="Upload" onClick={onSave}>
          <Upload size={13} />
        </CornerBtn>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[8px] pointer-events-none">
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
      className={`absolute ${p.pos} z-10 w-[28px] h-[28px] bg-black border border-white/40 hover:bg-accent hover:border-accent text-white flex items-center justify-center cursor-pointer`}
    >
      {p.children}
    </button>
  );
}

function PillBtn(p: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={p.onClick}
      className="pointer-events-auto px-[24px] py-[6px] bg-white hover:bg-accent text-black hover:text-white text-[11px] font-bold uppercase tracking-[0.05em] cursor-pointer border-none transition-colors"
    >
      {p.children}
    </button>
  );
}
