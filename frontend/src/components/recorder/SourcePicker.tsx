import { useEffect, useState } from "react";
import { Monitor, Play } from "lucide-react";
import { ListRecordingSources, CapturePreview } from "../../../wailsjs/go/app/App";
import type { SelectedSource } from "../../stores/recordingStore";
import { color } from "../../styles/tokens";
import { btnPrimary } from "../../styles/buttons";
import { pickerWrap, selectStyle, thumbStyle, placeholder } from "./sourcePickerStyles";

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
  const [thumb, setThumb] = useState<string | null>(null);

  useEffect(() => {
    ListRecordingSources()
      .then((src) => {
        const list: Source[] = [{ type: "screen", id: "0", name: "Fullscreen" }];
        for (const s of src?.screens ?? []) {
          list.push({ type: "screen", id: String(s.index), name: s.name });
        }
        for (const w of src?.windows ?? []) {
          list.push({ type: "window", id: w.id, name: w.app });
        }
        setSources(list);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setThumb(null);
    CapturePreview()
      .then((res) => setThumb(res.imageBase64))
      .catch(() => {});
  }, [selected]);

  return (
    <div style={pickerWrap}>
      {thumb ? (
        <img src={thumb} alt="Preview" style={thumbStyle} />
      ) : (
        <div style={placeholder}>
          <Monitor size={32} color={color.textMuted} />
        </div>
      )}
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
      <button
        onClick={() => onSelect(sources[selected])}
        style={{ ...btnPrimary, padding: "12px 32px" }}
      >
        <Play size={16} fill="white" /> Start Recording
      </button>
    </div>
  );
}
