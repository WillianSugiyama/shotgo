import { Shield, AlertCircle } from "lucide-react";
import { PERMS, type PermKey, type Status } from "./permissionList";
import { PermRow } from "./PermRow";

interface Props {
  statuses: Record<string, Status>;
  checkFailed: boolean;
  onGrant: (key: PermKey) => void;
}

export function PermissionCard({ statuses, checkFailed, onGrant }: Props) {
  if (checkFailed) {
    return (
      <div className="bg-surface border border-border rounded-lg p-[24px] max-w-[400px] w-full mt-[24px] text-center">
        <div className="flex gap-[8px] items-center justify-center mb-[16px]">
          <AlertCircle size={20} className="text-warning" />
          <span className="text-[14px] font-semibold text-text">Could not check permissions</span>
        </div>
        <p className="text-[12px] text-text-muted leading-relaxed">
          Permission check unavailable. You can continue and grant access later from System
          Settings.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-[24px] max-w-[420px] w-full mt-[24px]">
      <div className="flex gap-[8px] items-center justify-center mb-[20px]">
        <Shield size={18} className="text-accent" />
        <span className="text-[14px] font-semibold text-text">Required Permissions</span>
      </div>
      <div className="flex flex-col gap-[12px]">
        {PERMS.map((p) => (
          <PermRow
            key={p.key}
            perm={p}
            status={statuses[p.key] ?? "undetermined"}
            onGrant={() => onGrant(p.key)}
          />
        ))}
      </div>
    </div>
  );
}
