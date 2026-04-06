import { useCallback } from "react";
import { useSettingsStore, HotkeyBinding } from "../stores/settingsStore";

// TODO: Import from wailsjs/go/app/App when bindings are generated

export function useSettings() {
  const store = useSettingsStore();

  const loadSettings = useCallback(async () => {
    // TODO: const config = await App.LoadConfig();
    // store.setSaveDirectory(config.saveDirectory);
    // store.setImageFormat(config.imageFormat);
    // store.setHotkeys(config.hotkeys);
  }, []);

  const saveSettings = useCallback(async () => {
    // TODO: await App.SaveConfig({ ... });
  }, [store]);

  const updateHotkeys = useCallback(
    async (hotkeys: HotkeyBinding[]) => {
      store.setHotkeys(hotkeys);
      // TODO: await App.ConfigureHotkeys(hotkeys);
    },
    [store]
  );

  return { ...store, loadSettings, saveSettings, updateHotkeys };
}
