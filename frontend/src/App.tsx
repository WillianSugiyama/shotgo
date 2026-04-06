import { useAppStore } from "./stores/appStore";
import { SelectionOverlay } from "./components/overlay/SelectionOverlay";
import { EditorCanvas } from "./components/editor/EditorCanvas";
import { RecorderControls } from "./components/recorder/RecorderControls";
import { SettingsWindow } from "./components/settings/SettingsWindow";
import { Welcome } from "./components/onboarding/Welcome";
import { useTrayEvents } from "./hooks/useTrayEvents";
import { useCapture } from "./hooks/useCapture";

function App() {
  const { view, isFirstLaunch } = useAppStore();
  useTrayEvents();

  if (isFirstLaunch) {
    return <Welcome />;
  }

  switch (view) {
    case "overlay":
      return <SelectionOverlay />;
    case "editor":
      return <EditorCanvas />;
    case "recorder":
      return <RecorderControls />;
    case "settings":
      return <SettingsWindow />;
    default:
      return <IdleView />;
  }
}

function IdleView() {
  const { setView } = useAppStore();
  const { captureFullscreen, startRegionSelect } = useCapture();

  return (
    <div style={{ padding: 48, textAlign: "center", color: "#fff" }}>
      <h1 style={{ marginBottom: 8 }}>ShotGo</h1>
      <p style={{ color: "#aaa", marginBottom: 32 }}>Screenshot & Recording Tool</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button onClick={captureFullscreen} style={btnStyle}>
          Fullscreen
        </button>
        <button onClick={startRegionSelect} style={btnStyle}>
          Region
        </button>
        <button onClick={() => setView("recorder")} style={btnStyle}>
          Record
        </button>
        <button onClick={() => setView("settings")} style={btnSecondary}>
          Settings
        </button>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "#4A90D9",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 14,
};

const btnSecondary: React.CSSProperties = {
  ...btnStyle,
  background: "#2d2d44",
};

export default App;
