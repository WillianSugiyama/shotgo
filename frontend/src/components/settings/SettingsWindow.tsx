import { useSettings } from "../../hooks/useSettings";
import { HotkeyConfig } from "./HotkeyConfig";

export function SettingsWindow() {
  const {
    saveDirectory,
    imageFormat,
    recordFormat,
    launchAtStartup,
    setSaveDirectory,
    setImageFormat,
    setRecordFormat,
    setLaunchAtStartup,
    saveSettings,
  } = useSettings();

  return (
    <div style={{ padding: 24, color: "#fff", maxWidth: 480 }}>
      <h2>Settings</h2>

      <label>Save Directory</label>
      <input
        value={saveDirectory}
        onChange={(e) => setSaveDirectory(e.target.value)}
        style={inputStyle}
      />

      <label>Image Format</label>
      <select
        value={imageFormat}
        onChange={(e) => setImageFormat(e.target.value as "png" | "jpeg")}
        style={inputStyle}
      >
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
      </select>

      <label>Recording Format</label>
      <select
        value={recordFormat}
        onChange={(e) => setRecordFormat(e.target.value as "mp4" | "gif")}
        style={inputStyle}
      >
        <option value="mp4">MP4</option>
        <option value="gif">GIF</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={launchAtStartup}
          onChange={(e) => setLaunchAtStartup(e.target.checked)}
        />{" "}
        Launch at startup
      </label>

      <HotkeyConfig />

      <button onClick={saveSettings} style={btnStyle}>Save</button>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: 8,
  marginBottom: 12,
  background: "#2d2d44",
  color: "#fff",
  border: "1px solid #444",
  borderRadius: 4,
};

const btnStyle: React.CSSProperties = {
  marginTop: 16,
  padding: "8px 24px",
  background: "#4A90D9",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};
