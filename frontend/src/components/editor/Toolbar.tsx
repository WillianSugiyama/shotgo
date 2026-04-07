import type { LucideIcon } from "lucide-react";
import { MoveUpRight, Type, Droplets, Crop, Undo2, Download, Copy, X } from "lucide-react";

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
    <div className="flex items-center gap-1 px-3 py-1.5 bg-surface border-b border-border shrink-0">
      {tools.map(({ id, label, key, Icon }) => (
        <ToolBtn
          key={id}
          title={`${label} (${key})`}
          active={activeTool === id}
          onClick={() => onSelectTool(activeTool === id ? null : id)}
        >
          <Icon size={16} />
        </ToolBtn>
      ))}
      <Sep />
      <ToolBtn title="Undo (Cmd+Z)" onClick={onUndo}>
        <Undo2 size={16} />
      </ToolBtn>
      <div className="flex-1" />
      <ToolBtn title="Copy (Cmd+C)" onClick={onCopy}>
        <Copy size={14} />
        <span className="text-xs">Copy</span>
      </ToolBtn>
      <ToolBtn title="Save (Cmd+S)" onClick={onSave} accent>
        <Download size={14} />
        <span className="text-xs">Save</span>
      </ToolBtn>
      <Sep />
      <ToolBtn title="Cancel (Esc)" onClick={onCancel} danger>
        <X size={14} />
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
  let cls = "text-text-muted hover:text-text hover:bg-surface-hover";
  if (active) cls = "text-accent bg-accent-subtle";
  if (accent) cls = "text-accent hover:bg-accent-subtle";
  if (danger) cls = "text-danger hover:bg-danger-subtle";

  return (
    <button
      title={title}
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-md border-none cursor-pointer bg-transparent ${cls}`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-5 bg-border mx-1" />;
}
