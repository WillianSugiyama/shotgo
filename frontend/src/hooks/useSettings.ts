import { useCallback } from "react";
import { useSettingsStore, HotkeyBinding } from "../stores/settingsStore";
import { LoadConfig, SaveConfig, ConfigureHotkeys } from "../../wailsjs/go/app/App";
import { port } from "../../wailsjs/go/models";

export function useSettings() {
  const store = useSettingsStore();

  const loadSettings = useCallback(async () => {
    try {
      const config = await LoadConfig();
      store.setSaveDirectory(config.saveDirectory);
      store.setImageFormat(config.imageFormat as "png" | "jpeg");
      store.setRecordFormat(config.recordFormat as "mp4" | "gif");
      store.setLaunchAtStartup(config.launchAtStartup);
      if (config.hotkeys?.bindings) {
        store.setHotkeys(
          config.hotkeys.bindings.map(
            (b: { action: string; combo: { modifiers: string[]; key: string } }) => ({
              action: b.action,
              modifiers: b.combo.modifiers || [],
              key: b.combo.key,
            }),
          ),
        );
      }
    } catch (err) {
      console.error("Load settings failed:", err);
    }
  }, [store]);

  const saveSettings = useCallback(async () => {
    try {
      const config = new port.AppConfig({
        saveDirectory: store.saveDirectory,
        imageFormat: store.imageFormat,
        recordFormat: store.recordFormat,
        launchAtStartup: store.launchAtStartup,
        showNotifications: true,
      });
      await SaveConfig(config);
    } catch (err) {
      console.error("Save settings failed:", err);
    }
  }, [store]);

  const updateHotkeys = useCallback(
    async (hotkeys: HotkeyBinding[]) => {
      store.setHotkeys(hotkeys);
      try {
        await ConfigureHotkeys(
          hotkeys.map((h) => ({ action: h.action, modifiers: h.modifiers, key: h.key })),
        );
      } catch (err) {
        console.error("Configure hotkeys failed:", err);
      }
    },
    [store],
  );

  return { ...store, loadSettings, saveSettings, updateHotkeys };
}
