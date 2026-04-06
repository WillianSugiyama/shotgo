import { create } from "zustand";

export interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type CaptureMode = "fullscreen" | "region" | "window";

interface CaptureState {
  mode: CaptureMode | null;
  region: Region | null;
  imageData: string | null;
  isCapturing: boolean;
  setMode: (mode: CaptureMode) => void;
  setRegion: (region: Region) => void;
  setImageData: (data: string | null) => void;
  setCapturing: (value: boolean) => void;
  reset: () => void;
}

export const useCaptureStore = create<CaptureState>((set) => ({
  mode: null,
  region: null,
  imageData: null,
  isCapturing: false,
  setMode: (mode) => set({ mode }),
  setRegion: (region) => set({ region }),
  setImageData: (imageData) => set({ imageData }),
  setCapturing: (isCapturing) => set({ isCapturing }),
  reset: () => set({ mode: null, region: null, imageData: null, isCapturing: false }),
}));
