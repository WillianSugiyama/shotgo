import { useEffect, useState } from "react";
import { Monitor, Play } from "lucide-react";
import { ListRecordingSources } from "../../../wailsjs/go/app/App";
import type { SelectedSource } from "../../stores/recordingStore";
import { color, radius, space, font } from "../../styles/tokens";
import { btnPrimary } from "../../styles/buttons";

interface Source {
  type: "screen" | "window";
  id: string;
  name: string;
}

interface Props {
  onSelect: (source: SelectedSource) => void;
}

export function SourcePicker({ onSelect }: Props) {
  const [sources, setSources] = useState<Source[]>([
    { type: "screen", id: "0", name: "Fullscreen" },
  ]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    ListRecordingSources()
      .then((src) => {
        const list: Source[] = [{ type: "screen", id: "0", name: "Fullscreen" }];
        for (const s of src?.screens ?? []) {
          list.push({ type: "screen", id: String(s.index), name: s.name });
        }
        for (const w of src?.windows ?? []) {
          list.push({ type: "window", id: w.id, name: `${w.app}` });
        }
        setSources(list);
      })
      .catch(() => {});
  }, []);

  const current = sources[selected];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: space.lg }}>
      <Monitor size={40} color={color.accent} />
      <p style={{ color: color.textMuted, fontSize: 13 }}>Select what to record</p>
      <select
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        style={selectStyle}
      >
        {sources.map((s, i) => (
          <option key={s.id + s.type} value={i}>
            {s.type === "screen" ? `Screen: ${s.name}` : `Window: ${s.name}`}
          </option>
        ))}
      </select>
      <button onClick={() => onSelect(current)} style={{ ...btnPrimary, padding: "12px 32px" }}>
        <Play size={16} fill="white" /> Start Recording
      </button>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  width: 280,
  padding: `${space.sm}px ${space.md}px`,
  fontSize: 14,
  fontFamily: font.body,
  background: color.surface,
  color: color.text,
  border: `1px solid ${color.border}`,
  borderRadius: radius.md,
  outline: "none",
  cursor: "pointer",
};
