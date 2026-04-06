import { Camera, Monitor, Crop, Video, Settings } from "lucide-react";
import { useAppStore } from "../stores/appStore";
import { useCapture } from "../hooks/useCapture";
import { HoverBtn } from "./HoverBtn";
import { color, space } from "../styles/tokens";
import { btnPrimary, btnSecondary } from "../styles/buttons";
import { centerScreen, iconBox, rowCenter, heading, subtext } from "../styles/layout";

const desc: React.CSSProperties = {
  fontSize: 11,
  color: color.textMuted,
  marginTop: 2,
};

const btnWrap: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export function IdleView() {
  const { setView } = useAppStore();
  const { captureFullscreen, captureRegion } = useCapture();

  return (
    <div style={centerScreen} className="view-transition">
      <div style={iconBox}>
        <Camera size={32} color={color.accent} />
      </div>
      <h1 style={{ ...heading, letterSpacing: -0.3 }}>ShotGo</h1>
      <p style={{ ...subtext, margin: `${space.xs}px 0 ${space.xl}px` }}>Screenshot & Recording</p>
      <div style={{ ...rowCenter, gap: space.md }}>
        <div style={btnWrap}>
          <HoverBtn onClick={captureFullscreen} style={btnPrimary} hoverBg={color.accentHover}>
            <Monitor size={15} /> Fullscreen
          </HoverBtn>
          <span style={desc}>Capture entire screen</span>
        </div>
        <div style={btnWrap}>
          <HoverBtn onClick={captureRegion} style={btnPrimary} hoverBg={color.accentHover}>
            <Crop size={15} /> Region
          </HoverBtn>
          <span style={desc}>Select an area</span>
        </div>
        <div style={btnWrap}>
          <HoverBtn
            onClick={() => setView("recorder")}
            style={btnPrimary}
            hoverBg={color.accentHover}
          >
            <Video size={15} /> Record
          </HoverBtn>
          <span style={desc}>Record your screen</span>
        </div>
      </div>
      <div style={{ marginTop: space.md }}>
        <HoverBtn
          onClick={() => setView("settings")}
          style={btnSecondary}
          hoverBg={color.surfaceHover}
        >
          <Settings size={15} /> Settings
        </HoverBtn>
      </div>
    </div>
  );
}
