import { Shield, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { color, space } from "../../styles/tokens";
import { btnPrimary, btnSecondary, btnGhost } from "../../styles/buttons";
import { card, rowCenter, label } from "../../styles/layout";

interface Props {
  screenOk: boolean;
  checkFailed: boolean;
  onRequest: () => void;
  onOpenSettings: () => void;
  onRecheck: () => void;
}

const hint: React.CSSProperties = {
  fontSize: 12,
  color: color.textMuted,
  margin: `0 0 ${space.md}px`,
  lineHeight: 1.5,
};

export function PermissionCard(p: Props) {
  const icon = p.screenOk ? (
    <CheckCircle size={20} color={color.success} />
  ) : p.checkFailed ? (
    <AlertTriangle size={20} color={color.warning} />
  ) : (
    <Shield size={20} color={color.accent} />
  );

  const title = p.screenOk
    ? "Permission granted"
    : p.checkFailed
      ? "Could not check permissions"
      : "Screen Recording Access";

  return (
    <div style={card}>
      <div style={{ ...rowCenter, alignItems: "center", marginBottom: space.md }}>
        {icon}
        <span style={label}>{title}</span>
      </div>
      {p.checkFailed && (
        <p style={hint}>
          Permission check unavailable. You can continue and grant access later from System
          Settings.
        </p>
      )}
      {!p.screenOk && !p.checkFailed && (
        <>
          <p style={hint}>ShotGo needs screen recording access to capture your screen.</p>
          <div style={rowCenter}>
            <button onClick={p.onRequest} style={btnPrimary}>
              Grant Access
            </button>
            <button onClick={p.onOpenSettings} style={btnSecondary}>
              Open Settings
            </button>
            <button onClick={p.onRecheck} style={btnGhost}>
              <RefreshCw size={13} /> Re-check
            </button>
          </div>
        </>
      )}
      {p.screenOk && (
        <p style={{ fontSize: 12, color: color.success, margin: 0 }}>
          You're all set. Screen recording is enabled.
        </p>
      )}
    </div>
  );
}
