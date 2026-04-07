import { useAppStore } from "./stores/appStore";
import { EditorCanvas } from "./components/editor/EditorCanvas";
import { RecorderControls } from "./components/recorder/RecorderControls";
import { SettingsWindow } from "./components/settings/SettingsWindow";
import { Welcome } from "./components/onboarding/Welcome";
import { IdleView } from "./components/IdleView";
import { CaptureBar } from "./components/capture/CaptureBar";
import { ScrollRegionOverlay } from "./components/capture/ScrollRegionOverlay";
import { WindowFrame } from "./components/WindowFrame";
import { ToastContainer } from "./components/Toast";
import { useTrayEvents } from "./hooks/useTrayEvents";
import { useHotkeyEvents } from "./hooks/useHotkeyEvents";

function App() {
  const { view, isFirstLaunch } = useAppStore();
  useTrayEvents();
  useHotkeyEvents();

  if (view === "capture-bar") {
    return <CaptureBar />;
  }

  if (view === "scroll-region") {
    return <ScrollRegionOverlay />;
  }

  if (isFirstLaunch) {
    return (
      <WindowFrame title="ShotGo">
        <Welcome />
        <ToastContainer />
      </WindowFrame>
    );
  }

  return (
    <WindowFrame title={viewTitle(view)}>
      {view === "editor" && <EditorCanvas />}
      {view === "recorder" && <RecorderControls />}
      {view === "settings" && <SettingsWindow />}
      {view === "idle" && <IdleView />}
      <ToastContainer />
    </WindowFrame>
  );
}

function viewTitle(view: string) {
  switch (view) {
    case "editor":
      return "ShotGo — Editor";
    case "recorder":
      return "ShotGo — Recorder";
    case "settings":
      return "ShotGo — Settings";
    default:
      return "ShotGo";
  }
}

export default App;
