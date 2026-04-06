import { useEffect, useState } from "react";
import { Monitor, AppWindow } from "lucide-react";
import { ListRecordingSources } from "../../../wailsjs/go/app/App";
import type { SelectedSource } from "../../stores/recordingStore";
import { card, heading, wrap, ellipsis } from "./sourcePickerStyles";

interface Screen {
  index: number;
  name: string;
}
interface Window {
  id: string;
  title: string;
  app: string;
}

interface Props {
  onSelect: (source: SelectedSource) => void;
}

export function SourcePicker({ onSelect }: Props) {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [windows, setWindows] = useState<Window[]>([]);

  useEffect(() => {
    ListRecordingSources().then((src) => {
      setScreens(src?.screens ?? []);
      setWindows(src?.windows ?? []);
    });
  }, []);

  return (
    <div style={wrap}>
      <span style={heading}>Screens</span>
      <button
        style={card}
        onClick={() => onSelect({ type: "screen", id: "0", name: "Fullscreen" })}
      >
        <Monitor size={16} /> Fullscreen
      </button>
      {screens.map((s) => (
        <button
          key={s.index}
          style={card}
          onClick={() => onSelect({ type: "screen", id: String(s.index), name: s.name })}
        >
          <Monitor size={16} /> {s.name}
        </button>
      ))}

      {windows.length > 0 && (
        <>
          <span style={heading}>Windows</span>
          {windows.map((w) => (
            <button
              key={w.id}
              style={card}
              onClick={() => onSelect({ type: "window", id: w.id, name: `${w.app} — ${w.title}` })}
            >
              <AppWindow size={16} />
              <span style={ellipsis}>
                {w.app} — {w.title}
              </span>
            </button>
          ))}
        </>
      )}
    </div>
  );
}
