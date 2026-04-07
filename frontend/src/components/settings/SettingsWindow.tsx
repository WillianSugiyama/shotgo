import { useEffect, useState, useCallback } from "react";
import { Monitor, Keyboard, Check } from "lucide-react";
import { useSettings } from "../../hooks/useSettings";
import { useAppStore } from "../../stores/appStore";
import { useEscape } from "../../hooks/useEscape";
import { HotkeyConfig } from "./HotkeyConfig";
import { OutputSection } from "./OutputSection";

export function SettingsWindow() {
  const { setView } = useAppStore();
  const s = useSettings();
  const [saved, setSaved] = useState(false);

  const goBack = useCallback(() => setView("idle"), [setView]);
  useEscape(goBack);

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
    <div className="view-transition view-pad max-w-[520px] mx-auto overflow-y-auto h-full bg-black">
      <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent mb-[6px]">
        ▶ Settings
      </div>
      <h1 className="text-[20px] font-black text-white tracking-tight uppercase mb-[20px]">
        Preferences
      </h1>
      <OutputSection
        saveDirectory={s.saveDirectory}
        setSaveDirectory={s.setSaveDirectory}
        imageFormat={s.imageFormat}
        setImageFormat={s.setImageFormat}
        recordFormat={s.recordFormat}
        setRecordFormat={s.setRecordFormat}
      />
      <Section title="System" icon={<Monitor size={13} />}>
        <label className="flex items-center gap-[10px] text-[12px] text-white cursor-pointer">
          <input
            type="checkbox"
            checked={s.launchAtStartup}
            onChange={(e) => s.setLaunchAtStartup(e.target.checked)}
          />
          Launch at startup
        </label>
      </Section>
      <Section title="Hotkeys" icon={<Keyboard size={13} />}>
        <HotkeyConfig />
      </Section>
      <button onClick={onSave} className="btn-primary w-full justify-center mt-[8px]">
        {saved ? (
          <>
            <Check size={14} /> Saved
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
    <div className="bg-black border border-white/15 mb-[12px]">
      <div className="px-[14px] py-[8px] border-b border-white/15 flex items-center gap-[8px]">
        <div className="text-accent">{icon}</div>
        <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/70">
          {title}
        </span>
      </div>
      <div className="px-[14px] py-[12px]">{children}</div>
    </div>
  );
}
