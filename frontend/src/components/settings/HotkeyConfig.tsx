import { useSettings } from "../../hooks/useSettings";
import { color, radius, space, font } from "../../styles/tokens";

const actionLabels: Record<string, string> = {
  capture_fullscreen: "Capture Fullscreen",
  capture_region: "Capture Region",
  capture_window: "Capture Window",
  start_recording: "Start Recording",
  stop_recording: "Stop Recording",
};

const kbd: React.CSSProperties = {
  padding: "2px 10px",
  fontSize: 12,
  fontFamily: font.mono,
  background: color.bg,
  border: `1px solid ${color.border}`,
  borderRadius: radius.sm,
  color: color.text,
};

const row: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${space.sm}px 0`,
  borderBottom: `1px solid ${color.border}`,
};

export function HotkeyConfig() {
  const { hotkeys } = useSettings();

  if (hotkeys.length === 0) {
    return (
      <p style={{ fontSize: 13, color: color.textMuted, lineHeight: 1.6 }}>
        No hotkeys configured yet. Edit <code style={kbd}>config.json</code> to set shortcuts.
      </p>
    );
  }

  return (
    <div>
      <p style={{ fontSize: 12, color: color.textMuted, marginBottom: space.sm }}>
        Hotkeys can be configured in <code style={kbd}>config.json</code>.
      </p>
      {hotkeys.map((b) => (
        <div key={b.action} style={row}>
          <span style={{ fontSize: 14 }}>{actionLabels[b.action] ?? b.action}</span>
          <kbd style={kbd}>{[...b.modifiers, b.key].join(" + ")}</kbd>
        </div>
      ))}
    </div>
  );
}
