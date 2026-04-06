import { useState, useEffect } from "react";
import { useAppStore } from "../../stores/appStore";
import {
  CheckPermissions,
  RequestScreenCapture,
  OpenPermissionsSettings,
  HideWindow,
} from "../../../wailsjs/go/app/App";
import { ArrowRight } from "lucide-react";
import { color, space } from "../../styles/tokens";
import { btnPrimary } from "../../styles/buttons";
import { centerScreen, heading, subtext } from "../../styles/layout";
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
    if (screenOk) {
      HideWindow().catch(() => {});
    }
    setView("idle");
  };

  return (
    <div style={centerScreen} className="view-transition">
      <h1 style={heading}>Welcome to ShotGo</h1>
      <p style={{ ...subtext, margin: `${space.xs}px 0 0`, maxWidth: 300 }}>
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
      {checking && <p style={{ color: color.textMuted, fontSize: 12 }}>Checking permissions...</p>}
      <button onClick={handleContinue} style={{ ...btnPrimary, marginTop: space.lg }}>
        {screenOk ? "Get Started" : "Continue anyway"} <ArrowRight size={14} />
      </button>
    </div>
  );
}
