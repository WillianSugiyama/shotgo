import type { LucideIcon } from "lucide-react";
import { MoveUpRight, Type, Droplets, Crop, Undo2, Download, Copy, X } from "lucide-react";
import { color, radius, space, transition } from "../../styles/tokens";
import { btnGhost, btnPrimary, btnSecondary } from "../../styles/buttons";

export type EditorTool = "arrow" | "text" | "blur" | "crop" | null;

interface Props {
  activeTool: EditorTool;
  onSelectTool: (tool: EditorTool) => void;
  onUndo: () => void;
  onSave: () => void;
  onCopy: () => void;
  onCancel: () => void;
}

const tools: { id: EditorTool; label: string; Icon: LucideIcon }[] = [
  { id: "arrow", label: "Arrow", Icon: MoveUpRight },
  { id: "text", label: "Text", Icon: Type },
  { id: "blur", label: "Blur", Icon: Droplets },
  { id: "crop", label: "Crop", Icon: Crop },
];

const toolBtn = (active: boolean): React.CSSProperties => ({
  ...btnGhost,
  padding: space.sm,
  borderRadius: radius.md,
  background: active ? color.accentSubtle : "transparent",
  border: active ? `1px solid ${color.accent}` : "1px solid transparent",
  color: active ? color.accent : color.textMuted,
  transition: transition.fast,
});

const bar: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: space.sm,
  padding: `${space.sm}px ${space.md}px`,
  background: color.surface,
  borderBottom: `1px solid ${color.border}`,
};

export function Toolbar(props: Props) {
  const { activeTool, onSelectTool, onUndo, onSave, onCopy, onCancel } = props;

  return (
    <div style={bar}>
      {tools.map(({ id, label, Icon }) => (
        <button
          key={id}
          title={label}
          onClick={() => onSelectTool(activeTool === id ? null : id)}
          style={toolBtn(activeTool === id)}
        >
          <Icon size={18} />
        </button>
      ))}

      <div style={{ width: 1, height: 24, background: color.border, margin: `0 ${space.xs}px` }} />

      <button title="Undo" onClick={onUndo} style={toolBtn(false)}>
        <Undo2 size={18} />
      </button>

      <div style={{ flex: 1 }} />

      <button title="Copy to clipboard" onClick={onCopy} style={btnSecondary}>
        <Copy size={14} /> Copy
      </button>
      <button title="Save screenshot" onClick={onSave} style={btnPrimary}>
        <Download size={14} /> Save
      </button>
      <button title="Cancel" onClick={onCancel} style={{ ...btnGhost, color: color.danger }}>
        <X size={14} /> Cancel
      </button>
    </div>
  );
}
