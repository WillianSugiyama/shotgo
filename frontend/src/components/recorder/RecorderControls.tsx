import { ArrowLeft, Circle, Pause, Play, Square } from "lucide-react";
import { useRecording } from "../../hooks/useRecording";
import { useAppStore } from "../../stores/appStore";
import { color, font, radius, space, transition } from "../../styles/tokens";
import { btnPrimary, btnDanger, btnGhost, btnSecondary } from "../../styles/buttons";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const pulseKeyframes = `@keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`;

const container: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  gap: space.lg,
  background: color.bg,
};

const timerStyle: React.CSSProperties = {
  fontFamily: font.mono,
  fontSize: 48,
  fontWeight: 700,
  color: color.text,
  letterSpacing: 2,
};

const row: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: space.md,
};

const dot: React.CSSProperties = {
  width: 12,
  height: 12,
  borderRadius: radius.pill,
  background: color.recording,
  animation: "pulse-dot 1s ease-in-out infinite",
};

export function RecorderControls() {
  const { state, elapsedSeconds, maxSeconds, start, stop, pause, resume } = useRecording();
  const { setView } = useAppStore();

  return (
    <div style={container}>
      <style>{pulseKeyframes}</style>

      <div style={{ display: "flex", alignItems: "center", gap: space.sm }}>
        {state === "recording" && <span style={dot} />}
        <span style={timerStyle}>{formatTime(elapsedSeconds)}</span>
        <span style={{ color: color.textMuted, fontSize: 16, fontFamily: font.mono }}>
          / {formatTime(maxSeconds)}
        </span>
      </div>

      <div style={row}>
        {state === "idle" && (
          <>
            <button title="Back" onClick={() => setView("idle")} style={btnGhost}>
              <ArrowLeft size={18} />
            </button>
            <button onClick={start} style={{ ...btnPrimary, background: color.recording }}>
              <Circle size={16} fill="white" /> Record
            </button>
          </>
        )}
        {state === "recording" && (
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
