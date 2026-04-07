import { useCallback } from "react";
import { ArrowLeft, Pause, Play, Square } from "lucide-react";
import { useRecording } from "../../hooks/useRecording";
import { useAppStore } from "../../stores/appStore";
import { useEscape } from "../../hooks/useEscape";
import { SourcePicker } from "./SourcePicker";
import { RecordingPreview } from "./RecordingPreview";
import { RecBtn } from "./RecBtn";

function fmt(s: number) {
  return `${Math.floor(s / 60)
    .toString()
    .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}

export function RecorderControls() {
  const { state, elapsedSeconds, maxSeconds, start, stop, pause, resume } = useRecording();
  const { setView } = useAppStore();
  const isRec = state === "recording";
  const goBack = useCallback(() => setView("idle"), [setView]);
  useEscape(goBack, state === "idle" || state === "stopped");

  const backBtn = (
    <button
      title="Back"
      onClick={() => setView("idle")}
      className="absolute top-[12px] left-[12px] text-[10px] font-mono uppercase tracking-[0.12em] text-white/50 hover:text-accent bg-transparent border-none cursor-pointer inline-flex items-center gap-[5px]"
    >
      <ArrowLeft size={12} /> Back
    </button>
  );

  const wrap = "relative flex flex-col items-center justify-center h-full gap-[24px] bg-black";

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
      <div
        className={`border-2 p-[24px] min-w-[320px] ${isRec ? "border-accent" : "border-white/15"}`}
      >
        <div className="flex items-center gap-[12px] justify-center">
          {isRec && (
            <span className="w-[10px] h-[10px] bg-accent animate-[pulse-dot_1s_ease-in-out_infinite]" />
          )}
          <span className="font-mono text-[56px] font-black text-white tracking-tight leading-none">
            {fmt(elapsedSeconds)}
          </span>
        </div>
        <div className="mt-[14px] flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.12em] text-white/50">
          <span>Elapsed</span>
          <span>{fmt(maxSeconds)} max</span>
        </div>
        <div className="mt-[6px] h-[3px] w-full bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-accent transition-all"
            style={{ width: `${Math.min(100, (elapsedSeconds / maxSeconds) * 100)}%` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-[8px]">
        <RecBtn onClick={isRec ? pause : resume}>
          {isRec ? <Pause size={13} /> : <Play size={13} />} {isRec ? "Pause" : "Resume"}
        </RecBtn>
        <RecBtn onClick={stop} primary>
          <Square size={13} fill="currentColor" /> Stop
        </RecBtn>
      </div>
    </div>
  );
}
