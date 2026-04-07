import type { LucideIcon } from "lucide-react";
import { MoveUpRight, Type, Droplets, Crop, Undo2, Download, Copy, ArrowLeft } from "lucide-react";

export type EditorTool = "arrow" | "text" | "blur" | "crop" | null;

interface Props {
  activeTool: EditorTool;
  onSelectTool: (tool: EditorTool) => void;
  onUndo: () => void;
  onSave: () => void;
  onCopy: () => void;
  onCancel: () => void;
}

const tools: { id: EditorTool; label: string; key: string; Icon: LucideIcon }[] = [
  { id: "arrow", label: "Arrow", key: "A", Icon: MoveUpRight },
  { id: "text", label: "Text", key: "T", Icon: Type },
  { id: "blur", label: "Blur", key: "B", Icon: Droplets },
  { id: "crop", label: "Crop", key: "C", Icon: Crop },
];

export function Toolbar(props: Props) {
  const { activeTool, onSelectTool, onUndo, onSave, onCopy, onCancel } = props;

  return (
    <div className="flex items-center gap-[2px] px-[12px] py-[8px] bg-black border-b border-white/15 shrink-0">
      {tools.map(({ id, label, key, Icon }) => (
        <ToolBtn
          key={id}
          title={`${label} (${key})`}
          active={activeTool === id}
          onClick={() => onSelectTool(activeTool === id ? null : id)}
        >
          <Icon size={15} />
        </ToolBtn>
      ))}
      <Sep />
      <ToolBtn title="Undo (Cmd+Z)" onClick={onUndo}>
        <Undo2 size={15} />
      </ToolBtn>
      <div className="flex-1" />
      <ToolBtn title="Copy (Cmd+C)" onClick={onCopy}>
        <Copy size={13} />
        <span className="text-[10px] font-bold uppercase tracking-tight">Copy</span>
      </ToolBtn>
      <ToolBtn title="Save (Cmd+S)" onClick={onSave} accent>
        <Download size={13} />
        <span className="text-[10px] font-bold uppercase tracking-tight">Save</span>
      </ToolBtn>
      <Sep />
      <ToolBtn title="Exit (Esc)" onClick={onCancel}>
        <ArrowLeft size={13} />
        <span className="text-[10px] font-bold uppercase tracking-tight">Exit</span>
      </ToolBtn>
    </div>
  );
}

function ToolBtn({
  title,
  active,
  accent,
  danger,
  onClick,
  children,
}: {
  title: string;
  active?: boolean;
  accent?: boolean;
  danger?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  let cls = "text-white/60 hover:text-white hover:bg-white/5";
  if (active) cls = "text-black bg-accent";
  if (accent) cls = "text-black bg-accent hover:bg-white";
  if (danger) cls = "text-accent hover:bg-accent hover:text-black";
  return (
    <button
      title={title}
      onClick={onClick}
      className={`inline-flex items-center gap-[5px] px-[10px] py-[6px] border-none cursor-pointer ${cls}`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-[18px] bg-white/15 mx-[4px]" />;
}
