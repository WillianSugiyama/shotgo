import { Check } from "lucide-react";
import type { Perm, Status } from "./permissionList";

interface Props {
  perm: Perm;
  status: Status;
  onGrant: () => void;
}

export function PermRow({ perm, status, onGrant }: Props) {
  const granted = status === "granted";
  return (
    <div className="flex items-center gap-[12px] px-[16px] py-[12px] border-b border-white/8 last:border-b-0">
      <div className={granted ? "text-accent" : "text-white/40"}>{perm.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-bold text-white uppercase tracking-tight flex items-center gap-[8px]">
          {perm.label}
          {perm.required && <span className="text-[9px] text-accent font-mono">REQUIRED</span>}
        </div>
        <div className="text-[10px] text-white/50 truncate mt-[2px]">{perm.description}</div>
      </div>
      {granted ? (
        <div className="w-[24px] h-[24px] bg-accent flex items-center justify-center shrink-0">
          <Check size={14} className="text-black" strokeWidth={3} />
        </div>
      ) : (
        <button
          onClick={onGrant}
          className="text-[10px] font-bold text-black bg-accent px-[10px] py-[5px] uppercase tracking-tight border-none cursor-pointer shrink-0 hover:bg-white"
        >
          Grant
        </button>
      )}
    </div>
  );
}
