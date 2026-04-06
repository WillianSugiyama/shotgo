import { useEffect, useState } from "react";
import { ArrowLeft, Monitor, Keyboard, Check } from "lucide-react";
import { useSettings } from "../../hooks/useSettings";
import { useAppStore } from "../../stores/appStore";
import { HotkeyConfig } from "./HotkeyConfig";
import { OutputSection } from "./OutputSection";

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
    <div className="view-transition p-6 text-text max-w-[520px] mx-auto overflow-y-auto max-h-screen animate-[fadeIn_0.2s_ease]">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => setView("idle")} className="btn-ghost text-text text-sm font-medium">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="flex-1" />
        <h2 className="text-xl font-semibold text-text">Settings</h2>
        <div className="flex-1" />
      </div>
      <OutputSection
        saveDirectory={s.saveDirectory}
        setSaveDirectory={s.setSaveDirectory}
        imageFormat={s.imageFormat}
        setImageFormat={s.setImageFormat}
        recordFormat={s.recordFormat}
        setRecordFormat={s.setRecordFormat}
      />
      <Section title="System" icon={<Monitor size={15} />}>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={s.launchAtStartup}
            onChange={(e) => s.setLaunchAtStartup(e.target.checked)}
          />
          Launch at startup
        </label>
      </Section>
      <Section title="Hotkeys" icon={<Keyboard size={15} />}>
        <HotkeyConfig />
      </Section>
      <button onClick={onSave} className="btn-primary w-full justify-center">
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

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 mb-4 bg-surface rounded-lg border border-border">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-text-muted uppercase tracking-wider mb-4">
        {icon} {title}
      </div>
      {children}
    </div>
  );
}
