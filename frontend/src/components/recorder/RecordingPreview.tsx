import { Play, FolderOpen, RefreshCw } from "lucide-react";
import { OpenFile, RevealFile } from "../../../wailsjs/go/app/App";
import { useRecordingStore } from "../../stores/recordingStore";

export function RecordingPreview() {
  const outputPath = useRecordingStore((s) => s.outputPath);
  const reset = useRecordingStore((s) => s.reset);

  if (!outputPath) return null;

  const filename = outputPath.split("/").pop() ?? outputPath;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg font-semibold text-success">Recording Complete</p>
      <p
        className="text-[13px] font-mono text-text-muted bg-surface px-4 py-2 rounded-md max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap"
        title={outputPath}
      >
        {filename}
      </p>
      <div className="flex gap-2 mt-2">
        <button onClick={() => OpenFile(outputPath)} className="btn-primary">
          <Play size={16} /> Open File
        </button>
        <button onClick={() => RevealFile(outputPath)} className="btn-secondary">
          <FolderOpen size={16} /> Show in Finder
        </button>
      </div>
      <button
        onClick={reset}
        className="inline-flex items-center gap-1.5 text-[13px] text-text-muted mt-2 bg-transparent border-none cursor-pointer"
      >
        <RefreshCw size={14} /> New Recording
      </button>
    </div>
  );
}
