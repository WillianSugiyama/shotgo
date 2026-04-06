import { useAppStore } from "./stores/appStore";
import { SelectionOverlay } from "./components/overlay/SelectionOverlay";
import { EditorCanvas } from "./components/editor/EditorCanvas";
import { RecorderControls } from "./components/recorder/RecorderControls";
import { SettingsWindow } from "./components/settings/SettingsWindow";
import { Welcome } from "./components/onboarding/Welcome";

function App() {
  const { view, isFirstLaunch } = useAppStore();

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

  return (
    <div style={{ padding: 24, textAlign: "center", color: "#fff" }}>
      <h1>ShotGo</h1>
      <p style={{ color: "#aaa" }}>Use hotkeys or the tray menu to capture.</p>
      <button onClick={() => setView("settings")} style={linkStyle}>
        Settings
      </button>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#4A90D9",
  cursor: "pointer",
  textDecoration: "underline",
};

export default App;
