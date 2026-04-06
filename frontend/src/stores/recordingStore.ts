import { create } from "zustand";

export type RecordingState = "idle" | "recording" | "paused" | "stopped";
export type OutputFormat = "mp4" | "gif";

interface RecordingStoreState {
  state: RecordingState;
  format: OutputFormat;
  elapsedSeconds: number;
  maxSeconds: number;
  setState: (state: RecordingState) => void;
  setFormat: (format: OutputFormat) => void;
  setElapsedSeconds: (seconds: number) => void;
  reset: () => void;
}

export const useRecordingStore = create<RecordingStoreState>((set) => ({
  state: "idle",
  format: "mp4",
  elapsedSeconds: 0,
  maxSeconds: 300,
  setState: (state) => set({ state }),
  setFormat: (format) => set({ format }),
  setElapsedSeconds: (elapsedSeconds) => set({ elapsedSeconds }),
  reset: () => set({ state: "idle", elapsedSeconds: 0 }),
}));
