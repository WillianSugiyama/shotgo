import { useState, useEffect } from "react";
import { useAppStore } from "../../stores/appStore";
import {
  CheckPermissions,
  RequestScreenCapture,
  OpenPermissionsSettings,
  HideWindow,
} from "../../../wailsjs/go/app/App";
import { ArrowRight } from "lucide-react";
import { PermissionCard } from "./PermissionCard";

export function Welcome() {
  const { setView, setFirstLaunch } = useAppStore();
  const [screenOk, setScreenOk] = useState(false);
  const [checking, setChecking] = useState(true);
  const [checkFailed, setCheckFailed] = useState(false);

  const check = async () => {
    setChecking(true);
    try {
      const result = await CheckPermissions();
      setScreenOk(result.screenCapture === "granted");
      setCheckFailed(false);
    } catch {
      setCheckFailed(true);
    }
    setChecking(false);
  };

  useEffect(() => {
    if (!window.runtime) {
      setChecking(false);
      setCheckFailed(true);
      return;
    }
    CheckPermissions()
      .then((result) => {
        if (result.screenCapture === "granted") {
          setFirstLaunch(false);
          HideWindow().catch(() => {});
          setView("idle");
        } else {
          setScreenOk(false);
          setChecking(false);
        }
      })
      .catch(() => {
        setChecking(false);
        setCheckFailed(true);
      });
  }, []);

  const handleRequest = async () => {
    try {
      await RequestScreenCapture();
    } catch {
      /* ignore */
    }
    setTimeout(check, 1000);
  };

  const handleContinue = () => {
    setFirstLaunch(false);
    if (screenOk) HideWindow().catch(() => {});
    setView("idle");
  };

  return (
    <div className="view-transition flex flex-col items-center justify-center h-full px-[32px] py-[32px]">
      <h1 className="text-[22px] font-semibold text-text tracking-tight">Welcome to ShotGo</h1>
      <p className="text-[13px] text-text-muted mt-[4px] mb-[32px] max-w-[300px] text-center">
        A fast, lightweight screenshot and recording tool.
      </p>
      {!checking && (
        <PermissionCard
          screenOk={screenOk}
          checkFailed={checkFailed}
          onRequest={handleRequest}
          onOpenSettings={() => OpenPermissionsSettings()}
          onRecheck={check}
        />
      )}
      {checking && <p className="text-text-muted text-xs">Checking permissions...</p>}
      <button onClick={handleContinue} className="btn-primary mt-[24px]">
        {screenOk ? "Get Started" : "Continue anyway"} <ArrowRight size={14} />
      </button>
    </div>
  );
}
