import { create } from "zustand";

export type AppView =
  | "idle"
  | "overlay"
  | "editor"
  | "recorder"
  | "settings"
  | "onboarding"
  | "capture-bar"
  | "scroll-region";

interface AppState {
  view: AppView;
  isFirstLaunch: boolean;
  setView: (view: AppView) => void;
  setFirstLaunch: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: "idle",
  isFirstLaunch: true,
  setView: (view) => set({ view }),
  setFirstLaunch: (isFirstLaunch) => set({ isFirstLaunch }),
}));
