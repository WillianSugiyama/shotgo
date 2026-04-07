import { AlertCircle } from "lucide-react";
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
      <div className="bg-black border-2 border-warning p-[20px] max-w-[400px] w-full mt-[20px] text-center">
        <div className="flex gap-[10px] items-center justify-center mb-[12px]">
          <AlertCircle size={18} className="text-warning" />
          <span className="text-[12px] font-bold text-white uppercase tracking-tight">
            Could not check permissions
          </span>
        </div>
        <p className="text-[11px] text-white/60 leading-relaxed">
          Permission check unavailable. Continue and grant access later in System Settings.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black border border-white/15 max-w-[420px] w-full mt-[20px]">
      <div className="px-[16px] py-[10px] border-b border-white/15 flex items-center gap-[8px]">
        <div className="w-[6px] h-[6px] bg-accent" />
        <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/70">
          Required Permissions
        </span>
      </div>
      <div className="flex flex-col">
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
