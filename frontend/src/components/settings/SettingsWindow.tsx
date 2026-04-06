import { useEffect, useState } from "react";
import { ArrowLeft, Monitor, Keyboard, Check } from "lucide-react";
import { useSettings } from "../../hooks/useSettings";
import { useAppStore } from "../../stores/appStore";
import { btnPrimary, btnGhost } from "../../styles/buttons";
import { color } from "../../styles/tokens";
import { HotkeyConfig } from "./HotkeyConfig";
import { OutputSection } from "./OutputSection";
import { container, header, section, sectionTitle, checkboxLabel } from "./settingsStyles";

const backBtn: React.CSSProperties = {
  ...btnGhost,
  color: color.text,
  fontSize: 14,
  fontWeight: 500,
};

export function SettingsWindow() {
  const { setView } = useAppStore();
  const s = useSettings();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    s.loadSettings();
  }, []);

  const onSave = async () => {
    await s.saveSettings();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setView("idle");
    }, 800);
  };

  return (
    <div style={container} className="view-transition">
      <div style={header}>
        <button onClick={() => setView("idle")} style={backBtn}>
          <ArrowLeft size={18} /> Back
        </button>
        <div style={{ flex: 1 }} />
        <h2 style={{ fontSize: 20, fontWeight: 600, color: color.text }}>Settings</h2>
        <div style={{ flex: 1 }} />
      </div>
      <OutputSection
        saveDirectory={s.saveDirectory}
        setSaveDirectory={s.setSaveDirectory}
        imageFormat={s.imageFormat}
        setImageFormat={s.setImageFormat}
        recordFormat={s.recordFormat}
        setRecordFormat={s.setRecordFormat}
      />
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
        {saved ? (
          <>
            <Check size={14} /> Saved!
          </>
        ) : (
          "Save"
        )}
      </button>
    </div>
  );
}
