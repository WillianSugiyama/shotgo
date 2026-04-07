import { useState, useEffect, useCallback } from "react";
import { useAppStore } from "../../stores/appStore";
import {
  CheckPermissions,
  RequestScreenCapture,
  RequestAccessibility,
  RequestMicrophone,
  RequestCamera,
  HideWindow,
} from "../../../wailsjs/go/app/App";
import { ArrowRight } from "lucide-react";
import { PermissionCard } from "./PermissionCard";

type PermKey = "screenCapture" | "accessibility" | "microphone" | "camera";

export function Welcome() {
  const { setView, setFirstLaunch } = useAppStore();
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [checking, setChecking] = useState(true);
  const [checkFailed, setCheckFailed] = useState(false);

  const check = useCallback(async () => {
    try {
      const r = await CheckPermissions();
      setStatuses({
        screenCapture: r.screenCapture,
        accessibility: r.accessibility,
        microphone: r.microphone,
        camera: r.camera,
      });
      setCheckFailed(false);
    } catch {
      setCheckFailed(true);
    }
    setChecking(false);
  }, []);

  useEffect(() => {
    if (!window.runtime) {
      setChecking(false);
      setCheckFailed(true);
      return;
    }
    check();
    const id = setInterval(check, 1500);
    return () => clearInterval(id);
  }, [check]);

  const onGrant = useCallback(
    async (key: PermKey) => {
      try {
        if (key === "screenCapture") await RequestScreenCapture();
        else if (key === "accessibility") await RequestAccessibility();
        else if (key === "microphone") await RequestMicrophone();
        else if (key === "camera") await RequestCamera();
      } catch {
        /* ignore */
      }
      setTimeout(check, 500);
    },
    [check],
  );

  const handleContinue = () => {
    setFirstLaunch(false);
    if (statuses.screenCapture === "granted") HideWindow().catch(() => {});
    setView("idle");
  };

  const screenOk = statuses.screenCapture === "granted";

  return (
    <div className="view-transition flex flex-col items-center justify-center h-full px-[32px] py-[24px]">
      <h1 className="text-[22px] font-semibold text-text tracking-tight">Welcome to ShotGo</h1>
      <p className="text-[13px] text-text-muted mt-[4px] mb-[8px] max-w-[300px] text-center">
        A fast, lightweight screenshot and recording tool.
      </p>
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
