import { Camera, Monitor, Crop, Video, Settings, ScrollText } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { useCapture } from "../hooks/useCapture";
import { useScrollCapture } from "../hooks/useScrollCapture";

export function IdleView() {
  const { setView } = useAppStore();
  const { captureFullscreen, captureRegion } = useCapture();
  const { startScrollCapture } = useScrollCapture();

  return (
    <div className="view-transition flex flex-col items-center justify-center h-full p-8 gap-6">
      <div className="w-16 h-16 rounded-lg bg-accent-subtle flex items-center justify-center">
        <Camera size={32} className="text-accent" />
      </div>
      <div className="text-center">
        <h1 className="text-[22px] font-semibold text-text tracking-tight">ShotGo</h1>
        <p className="text-[13px] text-text-muted mt-1">Screenshot & Recording</p>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        <BtnWrap label="Capture entire screen">
          <button onClick={captureFullscreen} className="btn-primary">
            <Monitor size={15} /> Fullscreen
          </button>
        </BtnWrap>
        <BtnWrap label="Select an area">
          <button onClick={captureRegion} className="btn-primary">
            <Crop size={15} /> Region
          </button>
        </BtnWrap>
        <BtnWrap label="Record your screen">
          <button onClick={() => setView("recorder")} className="btn-primary">
            <Video size={15} /> Record
          </button>
        </BtnWrap>
        <BtnWrap label="Capture scrollable">
          <button onClick={startScrollCapture} className="btn-primary">
            <ScrollText size={15} /> Scroll
          </button>
        </BtnWrap>
      </div>
      <button onClick={() => setView("settings")} className="btn-secondary">
        <Settings size={15} /> Settings
      </button>
    </div>
  );
}

function BtnWrap({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {children}
      <span className="text-[11px] text-text-muted">{label}</span>
    </div>
  );
}
