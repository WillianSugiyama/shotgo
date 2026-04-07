import { Crop, Monitor, ScrollText, Video, Settings } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { useCaptureStore } from "../stores/captureStore";
import { useCapture } from "../hooks/useCapture";
import { useScrollCapture } from "../hooks/useScrollCapture";
import { ShotGoLogo } from "./ShotGoLogo";
import { HeroAction } from "./idle/HeroAction";
import { ChipAction } from "./idle/ChipAction";
import { CapturingOverlay } from "./idle/CapturingOverlay";

export function IdleView() {
  const { setView } = useAppStore();
  const { captureFullscreen, captureRegion } = useCapture();
  const { startScrollCapture } = useScrollCapture();
  const isCapturing = useCaptureStore((s) => s.isCapturing);

  return (
    <div className="view-transition view-pad relative flex flex-col items-center justify-center h-full gap-[28px] bg-black">
      {isCapturing && <CapturingOverlay />}
      <div className="flex items-center gap-[14px]">
        <ShotGoLogo size={44} />
        <span className="text-[24px] font-black text-white leading-none tracking-tight">
          ShotGo
        </span>
      </div>

      <HeroAction
        icon={<Crop size={22} />}
        label="Capture Area"
        sub="Drag to select a region"
        shortcut={["⌘", "⇧", "4"]}
        onClick={captureRegion}
      />

      <div className="flex items-stretch gap-[10px] w-full max-w-[380px]">
        <ChipAction
          icon={<Monitor size={16} />}
          label="Fullscreen"
          shortcut="⌘⇧3"
          onClick={captureFullscreen}
        />
        <ChipAction
          icon={<ScrollText size={16} />}
          label="Long Page"
          shortcut="⌘⇧5"
          onClick={startScrollCapture}
        />
        <ChipAction
          icon={<Video size={16} />}
          label="Record"
          shortcut="⌘⇧6"
          onClick={() => setView("recorder")}
        />
      </div>

      <button
        onClick={() => setView("settings")}
        className="inline-flex items-center gap-[6px] text-[10px] text-white/40 hover:text-[#6c5ce7] uppercase tracking-[0.1em] font-mono bg-transparent border-none cursor-pointer mt-[4px]"
      >
        <Settings size={11} /> Preferences
      </button>
    </div>
  );
}
