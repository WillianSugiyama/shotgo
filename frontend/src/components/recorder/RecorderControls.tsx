import { ArrowLeft, Pause, Play, Square } from "lucide-react";
import { useRecording } from "../../hooks/useRecording";
import { useAppStore } from "../../stores/appStore";
import { space } from "../../styles/tokens";
import { btnDanger, btnSecondary } from "../../styles/buttons";
import { SourcePicker } from "./SourcePicker";
import {
  recContainer,
  timerText,
  recRow,
  recDot,
  recBox,
  timerRow,
  timerSub,
  backBtnStyle,
} from "./recorderStyles";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const pulseCSS = "@keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:.3}}";

export function RecorderControls() {
  const { state, elapsedSeconds, maxSeconds, start, stop, pause, resume } = useRecording();
  const { setView } = useAppStore();
  const isRec = state === "recording";

  const backBtn = (
    <button title="Back" onClick={() => setView("idle")} style={backBtnStyle}>
      <ArrowLeft size={18} /> Back
    </button>
  );

  if (state === "idle") {
    return (
      <div style={recContainer}>
        {backBtn}
        <SourcePicker onSelect={(src) => start(src)} />
      </div>
    );
  }

  return (
    <div style={recContainer}>
      <style>{pulseCSS}</style>
      {backBtn}
      <div style={isRec ? recBox : { padding: space.lg }}>
        <div style={timerRow}>
          {isRec && <span style={recDot} />}
          <span style={timerText}>{formatTime(elapsedSeconds)}</span>
          <span style={timerSub}>/ {formatTime(maxSeconds)}</span>
        </div>
      </div>
      <div style={recRow}>
        {isRec && (
          <>
            <button onClick={pause} style={btnSecondary}>
              <Pause size={16} /> Pause
            </button>
            <button onClick={stop} style={btnDanger}>
              <Square size={16} fill="white" /> Stop
            </button>
          </>
        )}
        {state === "paused" && (
          <>
            <button onClick={resume} style={btnSecondary}>
              <Play size={16} /> Resume
            </button>
            <button onClick={stop} style={btnDanger}>
              <Square size={16} fill="white" /> Stop
            </button>
          </>
        )}
      </div>
    </div>
  );
}
