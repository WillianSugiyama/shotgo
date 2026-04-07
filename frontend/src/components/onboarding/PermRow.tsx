import { CheckCircle } from "lucide-react";
import type { Perm, Status } from "./permissionList";

interface Props {
  perm: Perm;
  status: Status;
  onGrant: () => void;
}

export function PermRow({ perm, status, onGrant }: Props) {
  const granted = status === "granted";
  return (
    <div className="flex items-center gap-[12px] p-[10px] rounded-md bg-bg/50">
      <div className={granted ? "text-success" : "text-text-muted"}>{perm.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-text flex items-center gap-[6px]">
          {perm.label}
          {perm.required && <span className="text-[10px] text-danger font-semibold">REQUIRED</span>}
        </div>
        <div className="text-[11px] text-text-muted truncate">{perm.description}</div>
      </div>
      {granted ? (
        <CheckCircle size={18} className="text-success shrink-0" />
      ) : (
        <button onClick={onGrant} className="btn-primary text-[11px] px-[12px] py-[6px] shrink-0">
          Grant
        </button>
      )}
    </div>
  );
}
