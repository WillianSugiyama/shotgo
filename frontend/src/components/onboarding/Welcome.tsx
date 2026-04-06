import { useState, useEffect } from "react";
import { useAppStore } from "../../stores/appStore";
import {
  CheckPermissions,
  RequestScreenCapture,
  OpenPermissionsSettings,
} from "../../../wailsjs/go/app/App";

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

  return (
    <div style={{ textAlign: "center", padding: 48, color: "#fff" }}>
      <h1>Welcome to ShotGo</h1>
      <p style={{ color: "#aaa", maxWidth: 400, margin: "16px auto" }}>
        A fast, lightweight screenshot and recording tool.
      </p>

      {!checking && !screenOk && (
        <div style={{ margin: "24px auto", maxWidth: 360 }}>
          <p style={{ color: "#e74c3c", marginBottom: 12 }}>
            Screen Recording permission is required.
          </p>
          <button onClick={handleRequest} style={btnStyle}>
            Request Permission
          </button>
          <button onClick={() => OpenPermissionsSettings()} style={btnSecondary}>
            Open Settings
          </button>
          <button onClick={check} style={btnSecondary}>
            Re-check
          </button>
        </div>
      )}

      {!checking && screenOk && (
        <p style={{ color: "#2ecc71", margin: "24px 0" }}>Screen Recording: Granted</p>
      )}

      <button onClick={handleContinue} style={{ ...btnStyle, marginTop: 24 }}>
        {screenOk ? "Get Started" : "Skip for now"}
      </button>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "10px 24px",
  fontSize: 14,
  background: "#4A90D9",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  margin: 4,
};

const btnSecondary: React.CSSProperties = {
  ...btnStyle,
  background: "#2d2d44",
};
