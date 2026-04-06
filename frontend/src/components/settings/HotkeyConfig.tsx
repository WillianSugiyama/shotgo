import { useState, useCallback } from "react";
import { useSettings } from "../../hooks/useSettings";
import { HotkeyBinding } from "../../stores/settingsStore";

const actionLabels: Record<string, string> = {
  capture_fullscreen: "Fullscreen",
  capture_region: "Region",
  start_recording: "Start Record",
  stop_recording: "Stop Record",
};

export function HotkeyConfig() {
  const { hotkeys, updateHotkeys } = useSettings();
  const [editing, setEditing] = useState<string | null>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, action: string) => {
      e.preventDefault();
      if (e.key === "Escape") {
        setEditing(null);
        return;
      }
      const mods: string[] = [];
      if (e.metaKey) mods.push("Cmd");
      if (e.ctrlKey) mods.push("Ctrl");
      if (e.shiftKey) mods.push("Shift");
      if (e.altKey) mods.push("Alt");
      const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      if (mods.length === 0 || ["Meta", "Control", "Shift", "Alt"].includes(e.key)) return;

      const updated: HotkeyBinding[] = hotkeys.map((h) =>
        h.action === action ? { ...h, modifiers: mods, key } : h,
      );
      updateHotkeys(updated);
      setEditing(null);
    },
    [hotkeys, updateHotkeys],
  );

  return (
    <div>
      {hotkeys.map((b) => (
        <div
          key={b.action}
          className="flex justify-between items-center py-2 border-b border-border"
        >
          <span className="text-[13px] text-text">{actionLabels[b.action] ?? b.action}</span>
          {editing === b.action ? (
            <input
              autoFocus
              readOnly
              onKeyDown={(e) => handleKeyDown(e, b.action)}
              onBlur={() => setEditing(null)}
              placeholder="Press keys..."
              className="hotkey-input outline-2 outline-accent w-[140px] text-center"
            />
          ) : (
            <button onClick={() => setEditing(b.action)} className="hotkey-input">
              {[...b.modifiers, b.key].join(" + ")}
            </button>
          )}
        </div>
      ))}
      <p className="text-[11px] text-text-muted mt-2">
        Click a shortcut to re-bind. Press Escape to cancel.
      </p>
    </div>
  );
}
