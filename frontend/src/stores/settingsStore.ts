import { create } from "zustand";

export interface HotkeyBinding {
  action: string;
  modifiers: string[];
  key: string;
}

interface SettingsState {
  saveDirectory: string;
  imageFormat: "png" | "jpeg";
  recordFormat: "mp4" | "gif";
  launchAtStartup: boolean;
  hotkeys: HotkeyBinding[];
  setSaveDirectory: (dir: string) => void;
  setImageFormat: (format: "png" | "jpeg") => void;
  setRecordFormat: (format: "mp4" | "gif") => void;
  setLaunchAtStartup: (value: boolean) => void;
  setHotkeys: (hotkeys: HotkeyBinding[]) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  saveDirectory: "",
  imageFormat: "png",
  recordFormat: "mp4",
  launchAtStartup: false,
  hotkeys: [],
  setSaveDirectory: (saveDirectory) => set({ saveDirectory }),
  setImageFormat: (imageFormat) => set({ imageFormat }),
  setRecordFormat: (recordFormat) => set({ recordFormat }),
  setLaunchAtStartup: (launchAtStartup) => set({ launchAtStartup }),
  setHotkeys: (hotkeys) => set({ hotkeys }),
}));
