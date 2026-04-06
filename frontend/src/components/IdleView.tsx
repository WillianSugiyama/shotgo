import { Camera, Monitor, Crop, Video, Settings } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { useCapture } from "../hooks/useCapture";

export function IdleView() {
  const { setView } = useAppStore();
  const { captureFullscreen, captureRegion } = useCapture();

  return (
    <div className="view-transition flex flex-col items-center justify-center min-h-screen bg-bg p-8">
      <div className="w-16 h-16 rounded-lg bg-accent-subtle flex items-center justify-center mb-6">
        <Camera size={32} className="text-accent" />
      </div>
      <h1 className="text-[22px] font-semibold text-text tracking-tight">ShotGo</h1>
      <p className="text-[13px] text-text-muted mt-1 mb-8">Screenshot & Recording</p>
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
      </div>
      <div className="mt-4">
        <button onClick={() => setView("settings")} className="btn-secondary">
          <Settings size={15} /> Settings
        </button>
      </div>
    </div>
  );
}

function BtnWrap({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center">
      {children}
      <span className="text-[11px] text-text-muted mt-0.5">{label}</span>
    </div>
  );
}
