import { useAppStore } from "./stores/appStore";
import { EditorCanvas } from "./components/editor/EditorCanvas";
import { RecorderControls } from "./components/recorder/RecorderControls";
import { SettingsWindow } from "./components/settings/SettingsWindow";
import { Welcome } from "./components/onboarding/Welcome";
import { IdleView } from "./components/IdleView";
import { ToastContainer } from "./components/Toast";
import { useTrayEvents } from "./hooks/useTrayEvents";
import { useHotkeyEvents } from "./hooks/useHotkeyEvents";

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

export default App;
