import { useAppStore } from "../../stores/appStore";
import { HideWindow, Notify } from "../../../wailsjs/go/app/App";
import { ArrowRight } from "lucide-react";
import { PermissionCard } from "./PermissionCard";
import { useWelcomePermissions } from "../../hooks/useWelcomePermissions";

export function Welcome() {
  const { setView, setFirstLaunch } = useAppStore();
  const { statuses, checking, checkFailed, onGrant } = useWelcomePermissions();

  const handleContinue = () => {
    setFirstLaunch(false);
    if (statuses.screenCapture === "granted") {
      Notify("ShotGo is ready", "Find ShotGo in the menu bar — press ⌘⇧4 to capture").catch(
        () => {},
      );
      HideWindow().catch(() => {});
    }
    setView("idle");
  };

  const screenOk = statuses.screenCapture === "granted";

  return (
    <div className="view-transition view-pad flex flex-col items-center justify-center h-full bg-black">
      <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-accent mb-[6px]">
        ▶ Setup
      </div>
      <h1 className="text-[22px] font-black text-white tracking-tight uppercase">
        Welcome to ShotGo
      </h1>
      {!checking && (
        <PermissionCard
          statuses={statuses as Record<string, "granted" | "denied" | "undetermined">}
          checkFailed={checkFailed}
          onGrant={onGrant}
        />
      )}
      {checking && <p className="text-text-muted text-xs mt-[24px]">Checking permissions...</p>}
      <button
        onClick={handleContinue}
        className="btn-primary mt-[20px] mb-[12px]"
        disabled={!screenOk && !checkFailed}
      >
        {screenOk
          ? "Get Started"
          : checkFailed
            ? "Continue anyway"
            : "Grant screen recording first"}{" "}
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
