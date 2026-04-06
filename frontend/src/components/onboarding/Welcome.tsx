import { useState, useEffect } from "react";
import { useAppStore } from "../../stores/appStore";
import {
  CheckPermissions,
  RequestScreenCapture,
  OpenPermissionsSettings,
} from "../../../wailsjs/go/app/App";
import { ArrowRight } from "lucide-react";
import { color, space } from "../../styles/tokens";
import { btnPrimary } from "../../styles/buttons";
import { centerScreen, card, heading, subtext } from "../../styles/layout";
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
    if (window.runtime) check();
    else {
      setChecking(false);
      setCheckFailed(true);
    }
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
    setView("idle");
    setFirstLaunch(false);
  };

  const hint: React.CSSProperties = {
    fontSize: 12,
    color: color.textMuted,
    margin: `0 0 ${space.md}px`,
    lineHeight: 1.5,
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
      {checking && (
        <div style={{ ...card, textAlign: "center" }}>
          <p style={hint}>Checking permissions...</p>
        </div>
      )}
      <button onClick={handleContinue} style={{ ...btnPrimary, marginTop: space.lg }}>
        {screenOk ? "Get Started" : "Continue anyway"} <ArrowRight size={14} />
      </button>
    </div>
  );
}
