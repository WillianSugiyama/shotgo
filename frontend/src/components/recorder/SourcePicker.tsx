import { useEffect, useState } from "react";
import { Monitor, Play } from "lucide-react";
import { ListRecordingSources, CapturePreview } from "../../../wailsjs/go/app/App";
import type { SelectedSource } from "../../stores/recordingStore";

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
    <div className="flex flex-col items-center gap-4">
      {thumb ? (
        <img src={thumb} alt="Preview" className="max-w-[280px] rounded-md border border-border" />
      ) : (
        <div className="w-[280px] h-[160px] flex items-center justify-center bg-surface rounded-md border border-border">
          <Monitor size={32} className="text-text-muted" />
        </div>
      )}
      <select
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
        className="w-[280px] px-4 py-2 text-sm font-body bg-surface text-text border border-border rounded-md cursor-pointer"
      >
        {sources.map((s, i) => (
          <option key={s.id + s.type} value={i}>
            {s.type === "screen" ? `Screen: ${s.name}` : `Window: ${s.name}`}
          </option>
        ))}
      </select>
      <button onClick={() => onSelect(sources[selected])} className="btn-primary px-8 py-3">
        <Play size={16} fill="white" /> Start Recording
      </button>
    </div>
  );
}
