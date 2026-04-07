import { ArrowLeft, Pause, Play, Square } from "lucide-react";
import { useRecording } from "../../hooks/useRecording";
import { useAppStore } from "../../stores/appStore";
import { SourcePicker } from "./SourcePicker";
import { RecordingPreview } from "./RecordingPreview";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function RecorderControls() {
  const { state, elapsedSeconds, maxSeconds, start, stop, pause, resume } = useRecording();
  const { setView } = useAppStore();
  const isRec = state === "recording";

  const backBtn = (
    <button
      title="Back"
      onClick={() => setView("idle")}
      className="btn-ghost absolute top-4 left-4"
    >
      <ArrowLeft size={18} /> Back
    </button>
  );

  const wrap = "relative flex flex-col items-center justify-center h-full gap-6";

  if (state === "idle") {
    return (
      <div className={wrap}>
        {backBtn}
        <SourcePicker onSelect={(src) => start(src)} />
      </div>
    );
  }

  if (state === "stopped") {
    return (
      <div className={wrap}>
        {backBtn}
        <RecordingPreview />
      </div>
    );
  }

  return (
    <div className={wrap}>
      {backBtn}
      <div className={isRec ? "rounded-lg border-2 border-recording p-6 bg-recording/5" : "p-6"}>
        <div className="flex items-center gap-2 justify-center">
          {isRec && (
            <span className="w-3 h-3 rounded-full bg-recording animate-[pulse-dot_1s_ease-in-out_infinite]" />
          )}
          <span className="font-mono text-5xl font-bold text-text tracking-wider">
            {formatTime(elapsedSeconds)}
          </span>
          <span className="text-text-muted text-base font-mono">/ {formatTime(maxSeconds)}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {isRec && (
          <>
            <button onClick={pause} className="btn-secondary">
              <Pause size={16} /> Pause
            </button>
            <button onClick={stop} className="btn-danger">
              <Square size={16} fill="white" /> Stop
            </button>
          </>
        )}
        {state === "paused" && (
          <>
            <button onClick={resume} className="btn-secondary">
              <Play size={16} /> Resume
            </button>
            <button onClick={stop} className="btn-danger">
              <Square size={16} fill="white" /> Stop
            </button>
          </>
        )}
      </div>
    </div>
  );
}
