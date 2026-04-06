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

function toolBtnClass(active: boolean) {
  return `btn-ghost p-2 rounded-md border ${
    active ? "bg-accent-subtle border-accent text-accent" : "border-transparent text-text-muted"
  }`;
}

export function Toolbar(props: Props) {
  const { activeTool, onSelectTool, onUndo, onSave, onCopy, onCancel } = props;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-surface border-b-2 border-border shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
      <button title="Cancel (Esc)" onClick={onCancel} className="btn-danger">
        <X size={14} /> Cancel
      </button>
      <div className="w-px h-6 bg-border mx-1" />
      {tools.map(({ id, label, key, Icon }) => (
        <button
          key={id}
          title={`${label} (${key})`}
          onClick={() => onSelectTool(activeTool === id ? null : id)}
          className={toolBtnClass(activeTool === id)}
        >
          <Icon size={18} />
        </button>
      ))}
      <div className="w-px h-6 bg-border mx-1" />
      <button title="Undo (Cmd+Z)" onClick={onUndo} className={toolBtnClass(false)}>
        <Undo2 size={18} />
      </button>
      <div className="flex-1" />
      <button title="Copy to clipboard (Cmd+C)" onClick={onCopy} className="btn-secondary">
        <Copy size={14} /> Copy
      </button>
      <button title="Save screenshot (Cmd+S)" onClick={onSave} className="btn-primary">
        <Download size={14} /> Save
      </button>
    </div>
  );
}
