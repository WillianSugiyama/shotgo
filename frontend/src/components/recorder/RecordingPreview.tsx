import { Play, FolderOpen, RefreshCw } from "lucide-react";
import { OpenFile, RevealFile } from "../../../wailsjs/go/app/App";
import { useRecordingStore } from "../../stores/recordingStore";
import { color, font, radius, space } from "../../styles/tokens";
import { btnPrimary, btnSecondary } from "../../styles/buttons";

export function RecordingPreview() {
  const outputPath = useRecordingStore((s) => s.outputPath);
  const reset = useRecordingStore((s) => s.reset);

  if (!outputPath) return null;

  const filename = outputPath.split("/").pop() ?? outputPath;

  return (
    <div style={container}>
      <p style={titleStyle}>Recording Complete</p>
      <p style={pathStyle} title={outputPath}>
        {filename}
      </p>
      <div style={btnRow}>
        <button onClick={() => OpenFile(outputPath)} style={btnPrimary}>
          <Play size={16} /> Open File
        </button>
        <button onClick={() => RevealFile(outputPath)} style={btnSecondary}>
          <FolderOpen size={16} /> Show in Finder
        </button>
      </div>
      <button onClick={reset} style={newRecBtn}>
        <RefreshCw size={14} /> New Recording
      </button>
    </div>
  );
}

const container: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: space.md,
};

const titleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  color: color.success,
};

const pathStyle: React.CSSProperties = {
  fontSize: 13,
  fontFamily: font.mono,
  color: color.textMuted,
  background: color.surface,
  padding: `${space.sm}px ${space.md}px`,
  borderRadius: radius.md,
  maxWidth: 280,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const btnRow: React.CSSProperties = {
  display: "flex",
  gap: space.sm,
  marginTop: space.sm,
};

const newRecBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: color.textMuted,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  fontSize: 13,
  marginTop: space.sm,
};
