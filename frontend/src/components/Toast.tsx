import { useToastStore } from "../stores/toastStore";

const borderColors = {
  success: "border-l-success",
  error: "border-l-danger",
  info: "border-l-accent",
};

export function ToastContainer() {
  const { toasts, dismiss } = useToastStore();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => dismiss(t.id)}
          className={`px-4 py-2 bg-surface border-l-[3px] ${borderColors[t.type]} rounded-sm text-text text-[13px] cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)] animate-[fadeIn_0.2s_ease]`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
