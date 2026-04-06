import { useEffect } from "react";
import { ArrowLeft, FolderOpen, Monitor, Keyboard } from "lucide-react";
import { useSettings } from "../../hooks/useSettings";
import { useAppStore } from "../../stores/appStore";
import { btnPrimary, btnGhost } from "../../styles/buttons";
import { HotkeyConfig } from "./HotkeyConfig";
import {
  container,
  header,
  section,
  sectionTitle,
  inputStyle,
  labelStyle,
  checkboxLabel,
} from "./settingsStyles";

export function SettingsWindow() {
  const { setView } = useAppStore();
  const s = useSettings();

  useEffect(() => {
    s.loadSettings();
  }, []);

  const onSave = async () => {
    await s.saveSettings();
    setView("idle");
  };

  return (
    <div style={container}>
      <div style={header}>
        <button onClick={() => setView("idle")} style={btnGhost}>
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Settings</h2>
      </div>
      <div style={section}>
        <div style={sectionTitle}>
          <FolderOpen size={15} /> Output
        </div>
        <label style={labelStyle}>Save Directory</label>
        <input
          style={inputStyle}
          value={s.saveDirectory}
          onChange={(e) => s.setSaveDirectory(e.target.value)}
        />
        <label style={labelStyle}>Image Format</label>
        <select
          style={inputStyle}
          value={s.imageFormat}
          onChange={(e) => s.setImageFormat(e.target.value as "png" | "jpeg")}
        >
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
        </select>
        <label style={labelStyle}>Recording Format</label>
        <select
          style={inputStyle}
          value={s.recordFormat}
          onChange={(e) => s.setRecordFormat(e.target.value as "mp4" | "gif")}
        >
          <option value="mp4">MP4</option>
          <option value="gif">GIF</option>
        </select>
      </div>
      <div style={section}>
        <div style={sectionTitle}>
          <Monitor size={15} /> System
        </div>
        <label style={checkboxLabel}>
          <input
            type="checkbox"
            checked={s.launchAtStartup}
            onChange={(e) => s.setLaunchAtStartup(e.target.checked)}
          />
          Launch at startup
        </label>
      </div>
      <div style={section}>
        <div style={sectionTitle}>
          <Keyboard size={15} /> Hotkeys
        </div>
        <HotkeyConfig />
      </div>
      <button onClick={onSave} style={{ ...btnPrimary, width: "100%", justifyContent: "center" }}>
        Save
      </button>
    </div>
  );
}
