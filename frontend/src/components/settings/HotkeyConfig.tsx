import { useState, useCallback } from "react";
import { useSettings } from "../../hooks/useSettings";
import { HotkeyBinding } from "../../stores/settingsStore";
import { color, radius, space, font } from "../../styles/tokens";

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
        <div key={b.action} style={row}>
          <span style={{ fontSize: 13, color: color.text }}>
            {actionLabels[b.action] ?? b.action}
          </span>
          {editing === b.action ? (
            <input
              autoFocus
              readOnly
              onKeyDown={(e) => handleKeyDown(e, b.action)}
              onBlur={() => setEditing(null)}
              placeholder="Press keys..."
              style={inputKbd}
            />
          ) : (
            <button onClick={() => setEditing(b.action)} style={kbd}>
              {[...b.modifiers, b.key].join(" + ")}
            </button>
          )}
        </div>
      ))}
      <p style={{ fontSize: 11, color: color.textMuted, marginTop: space.sm }}>
        Click a shortcut to re-bind. Press Escape to cancel.
      </p>
    </div>
  );
}

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${space.sm}px 0`,
  borderBottom: `1px solid ${color.border}`,
};

const kbd: React.CSSProperties = {
  padding: "4px 12px",
  fontSize: 12,
  fontFamily: font.mono,
  background: color.bg,
  border: `1px solid ${color.border}`,
  borderRadius: radius.sm,
  color: color.text,
  cursor: "pointer",
};

const inputKbd: React.CSSProperties = {
  ...kbd,
  outline: `2px solid ${color.accent}`,
  width: 140,
  textAlign: "center",
};
