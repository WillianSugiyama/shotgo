import { create } from "zustand";

export type RecordingState = "idle" | "recording" | "paused" | "stopped";
export type OutputFormat = "mp4" | "gif";

export interface SelectedSource {
  type: "screen" | "window";
  id: string;
  name: string;
}

interface RecordingStoreState {
  state: RecordingState;
  format: OutputFormat;
  elapsedSeconds: number;
  maxSeconds: number;
  selectedSource: SelectedSource | null;
  outputPath: string | null;
  setState: (state: RecordingState) => void;
  setFormat: (format: OutputFormat) => void;
  setElapsedSeconds: (seconds: number) => void;
  setSelectedSource: (source: SelectedSource | null) => void;
  setOutputPath: (path: string | null) => void;
  reset: () => void;
}

export const useRecordingStore = create<RecordingStoreState>((set) => ({
  state: "idle",
  format: "mp4",
  elapsedSeconds: 0,
  maxSeconds: 300,
  selectedSource: null,
  outputPath: null,
  setState: (state) => set({ state }),
  setFormat: (format) => set({ format }),
  setElapsedSeconds: (elapsedSeconds) => set({ elapsedSeconds }),
  setSelectedSource: (selectedSource) => set({ selectedSource }),
  setOutputPath: (outputPath) => set({ outputPath }),
  reset: () => set({ state: "idle", elapsedSeconds: 0, selectedSource: null, outputPath: null }),
}));
