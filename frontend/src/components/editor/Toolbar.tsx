export type EditorTool = "arrow" | "text" | "blur" | "crop" | null;

interface Props {
  activeTool: EditorTool;
  onSelectTool: (tool: EditorTool) => void;
  onSave: () => void;
  onCopy: () => void;
  onCancel: () => void;
}

const tools: { id: EditorTool; label: string }[] = [
  { id: "arrow", label: "Arrow" },
  { id: "text", label: "Text" },
  { id: "blur", label: "Blur" },
  { id: "crop", label: "Crop" },
];

export function Toolbar({ activeTool, onSelectTool, onSave, onCopy, onCancel }: Props) {
  return (
    <div style={{ display: "flex", gap: 8, padding: 8, background: "#1a1a2e" }}>
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onSelectTool(activeTool === tool.id ? null : tool.id)}
          style={{
            padding: "6px 12px",
            background: activeTool === tool.id ? "#4A90D9" : "#2d2d44",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {tool.label}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button onClick={onCopy} style={actionStyle}>Copy</button>
      <button onClick={onSave} style={actionStyle}>Save</button>
      <button onClick={onCancel} style={{ ...actionStyle, background: "#6b2d2d" }}>
        Cancel
      </button>
    </div>
  );
}

const actionStyle: React.CSSProperties = {
  padding: "6px 12px",
  background: "#2d6b2d",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};
