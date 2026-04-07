import { useToastStore } from "../stores/toastStore";

const tagColors = {
  success: { bg: "bg-accent", text: "text-black", label: "✓ SAVED" },
  error: { bg: "bg-warning", text: "text-black", label: "✗ ERROR" },
  info: { bg: "bg-white", text: "text-black", label: "▶ INFO" },
};

export function ToastContainer() {
  const { toasts, dismiss } = useToastStore();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-[16px] right-[16px] z-[10000] flex flex-col gap-[8px]">
      {toasts.map((t) => {
        const c = tagColors[t.type];
        return (
          <div
            key={t.id}
            onClick={() => dismiss(t.id)}
            className="bg-black border border-white/20 cursor-pointer animate-[slideUpSnap_0.25s_cubic-bezier(0.16,1,0.3,1)] flex items-stretch"
          >
            <div
              className={`${c.bg} ${c.text} px-[8px] flex items-center text-[9px] font-mono font-bold uppercase tracking-[0.1em]`}
            >
              {c.label}
            </div>
            <div className="px-[12px] py-[8px] text-white text-[12px] font-mono">{t.message}</div>
          </div>
        );
      })}
    </div>
  );
}
