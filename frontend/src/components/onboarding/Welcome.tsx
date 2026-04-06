import { useState, useEffect } from "react";
import { useAppStore } from "../../stores/appStore";
import {
  CheckPermissions,
  RequestScreenCapture,
  OpenPermissionsSettings,
} from "../../../wailsjs/go/app/App";
import { Shield, CheckCircle, ArrowRight, RefreshCw } from "lucide-react";
import { color, space } from "../../styles/tokens";
import { btnPrimary, btnSecondary, btnGhost } from "../../styles/buttons";
import { centerScreen, card, rowCenter, heading, subtext, label } from "../../styles/layout";

export function Welcome() {
  const { setView, setFirstLaunch } = useAppStore();
  const [screenOk, setScreenOk] = useState(false);
  const [checking, setChecking] = useState(true);

  const check = async () => {
    try {
      const result = await CheckPermissions();
      setScreenOk(result.screenCapture === "granted");
    } catch {
      /* ignore */
    }
    setChecking(false);
  };

  useEffect(() => {
    if (window.runtime) check();
    else setChecking(false);
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
    <div style={centerScreen}>
      <h1 style={heading}>Welcome to ShotGo</h1>
      <p style={{ ...subtext, margin: `${space.xs}px 0 0`, maxWidth: 300 }}>
        A fast, lightweight screenshot and recording tool.
      </p>
      {!checking && (
        <div style={card}>
          <div style={{ ...rowCenter, alignItems: "center", marginBottom: space.md }}>
            {screenOk ? (
              <CheckCircle size={20} color={color.success} />
            ) : (
              <Shield size={20} color={color.accent} />
            )}
            <span style={label}>{screenOk ? "Permission granted" : "Screen Recording Access"}</span>
          </div>
          {!screenOk && (
            <>
              <p style={hint}>
                ShotGo needs screen recording access to capture your screen. You can grant it now or
                skip and do it later.
              </p>
              <div style={rowCenter}>
                <button onClick={handleRequest} style={btnPrimary}>
                  Grant Access
                </button>
                <button onClick={() => OpenPermissionsSettings()} style={btnSecondary}>
                  Open Settings
                </button>
                <button onClick={check} style={btnGhost}>
                  <RefreshCw size={13} /> Re-check
                </button>
              </div>
            </>
          )}
          {screenOk && (
            <p style={{ fontSize: 12, color: color.success, margin: 0 }}>
              You're all set. Screen recording is enabled.
            </p>
          )}
        </div>
      )}
      <button onClick={handleContinue} style={{ ...btnPrimary, marginTop: space.lg }}>
        {screenOk ? "Get Started" : "Skip for now"} <ArrowRight size={14} />
      </button>
    </div>
  );
}
