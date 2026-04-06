import { Shield, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  screenOk: boolean;
  checkFailed: boolean;
  onRequest: () => void;
  onOpenSettings: () => void;
  onRecheck: () => void;
}

export function PermissionCard(p: Props) {
  const icon = p.screenOk ? (
    <CheckCircle size={20} className="text-success" />
  ) : p.checkFailed ? (
    <AlertTriangle size={20} className="text-warning" />
  ) : (
    <Shield size={20} className="text-accent" />
  );

  const title = p.screenOk
    ? "Permission granted"
    : p.checkFailed
      ? "Could not check permissions"
      : "Screen Recording Access";

  return (
    <div className="bg-surface border border-border rounded-lg p-6 max-w-[340px] w-full mt-6 text-center">
      <div className="flex gap-2 items-center justify-center mb-4">
        {icon}
        <span className="text-sm font-medium text-text">{title}</span>
      </div>
      {p.checkFailed && (
        <p className="text-xs text-text-muted mb-4 leading-relaxed">
          Permission check unavailable. You can continue and grant access later from System
          Settings.
        </p>
      )}
      {!p.screenOk && !p.checkFailed && (
        <>
          <p className="text-xs text-text-muted mb-4 leading-relaxed">
            ShotGo needs screen recording access to capture your screen.
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            <button onClick={p.onRequest} className="btn-primary">
              Grant Access
            </button>
            <button onClick={p.onOpenSettings} className="btn-secondary">
              Open Settings
            </button>
            <button onClick={p.onRecheck} className="btn-ghost">
              <RefreshCw size={13} /> Re-check
            </button>
          </div>
        </>
      )}
      {p.screenOk && (
        <p className="text-xs text-success">You're all set. Screen recording is enabled.</p>
      )}
    </div>
  );
}
