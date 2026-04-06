import { useRecording } from "../../hooks/useRecording";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function RecorderControls() {
  const { state, elapsedSeconds, maxSeconds, start, stop, pause, resume } = useRecording();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12 }}>
      <span style={{ fontFamily: "monospace", fontSize: 18, color: "#fff" }}>
        {formatTime(elapsedSeconds)} / {formatTime(maxSeconds)}
      </span>

      {state === "idle" && (
        <button onClick={start} style={btnStyle}>
          Record
        </button>
      )}
      {state === "recording" && (
        <>
          <button onClick={pause} style={btnStyle}>
            Pause
          </button>
          <button onClick={stop} style={{ ...btnStyle, background: "#c0392b" }}>
            Stop
          </button>
        </>
      )}
      {state === "paused" && (
        <>
          <button onClick={resume} style={btnStyle}>
            Resume
          </button>
          <button onClick={stop} style={{ ...btnStyle, background: "#c0392b" }}>
            Stop
          </button>
        </>
      )}

      {state === "recording" && <span style={{ color: "#e74c3c", fontWeight: "bold" }}>REC</span>}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "8px 16px",
  background: "#2d6b2d",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};
