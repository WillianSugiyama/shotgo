import { useSettings } from "../../hooks/useSettings";

const actionLabels: Record<string, string> = {
  capture_fullscreen: "Capture Fullscreen",
  capture_region: "Capture Region",
  capture_window: "Capture Window",
  start_recording: "Start Recording",
  stop_recording: "Stop Recording",
};

export function HotkeyConfig() {
  const { hotkeys } = useSettings();

  return (
    <div style={{ marginTop: 16 }}>
      <h3>Hotkeys</h3>
      {hotkeys.length === 0 && (
        <p style={{ color: "#888" }}>No hotkeys configured yet.</p>
      )}
      {hotkeys.map((binding) => (
        <div
          key={binding.action}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid #333",
          }}
        >
          <span>{actionLabels[binding.action] ?? binding.action}</span>
          <kbd style={kbdStyle}>
            {[...binding.modifiers, binding.key].join(" + ")}
          </kbd>
        </div>
      ))}
    </div>
  );
}

const kbdStyle: React.CSSProperties = {
  padding: "2px 8px",
  background: "#1a1a2e",
  border: "1px solid #555",
  borderRadius: 4,
  fontFamily: "monospace",
};
