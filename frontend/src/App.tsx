import { useAppStore } from "./stores/appStore";
import { EditorCanvas } from "./components/editor/EditorCanvas";
import { RecorderControls } from "./components/recorder/RecorderControls";
import { SettingsWindow } from "./components/settings/SettingsWindow";
import { Welcome } from "./components/onboarding/Welcome";
import { ToastContainer } from "./components/Toast";
import { HoverBtn } from "./components/HoverBtn";
import { useTrayEvents } from "./hooks/useTrayEvents";
import { useHotkeyEvents } from "./hooks/useHotkeyEvents";
import { useCapture } from "./hooks/useCapture";
import { Camera, Monitor, Crop, Video, Settings } from "lucide-react";
import { color, space } from "./styles/tokens";
import { btnPrimary, btnSecondary } from "./styles/buttons";
import { centerScreen, iconBox, rowCenter, heading, subtext } from "./styles/layout";

function App() {
  const { view, isFirstLaunch } = useAppStore();
  useTrayEvents();
  useHotkeyEvents();
  if (isFirstLaunch) return <Welcome />;
  const content = (() => {
    switch (view) {
      case "editor":
        return <EditorCanvas />;
      case "recorder":
        return <RecorderControls />;
      case "settings":
        return <SettingsWindow />;
      default:
        return <IdleView />;
    }
  })();
  return (
    <>
      {content}
      <ToastContainer />
    </>
  );
}

function IdleView() {
  const { setView } = useAppStore();
  const { captureFullscreen, captureRegion } = useCapture();

  return (
    <div style={centerScreen}>
      <div style={iconBox}>
        <Camera size={32} color={color.accent} />
      </div>
      <h1 style={{ ...heading, letterSpacing: -0.3 }}>ShotGo</h1>
      <p style={{ ...subtext, margin: `${space.xs}px 0 ${space.xl}px` }}>Screenshot & Recording</p>
      <div style={rowCenter}>
        <HoverBtn onClick={captureFullscreen} style={btnPrimary} hoverBg={color.accentHover}>
          <Monitor size={15} /> Fullscreen
        </HoverBtn>
        <HoverBtn onClick={captureRegion} style={btnPrimary} hoverBg={color.accentHover}>
          <Crop size={15} /> Region
        </HoverBtn>
        <HoverBtn
          onClick={() => setView("recorder")}
          style={btnPrimary}
          hoverBg={color.accentHover}
        >
          <Video size={15} /> Record
        </HoverBtn>
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

export default App;
