import { useToastStore } from "../stores/toastStore";
import { color, radius, space } from "../styles/tokens";

const typeColors = {
  success: color.success,
  error: color.danger,
  info: color.accent,
};

export function ToastContainer() {
  const { toasts, dismiss } = useToastStore();
  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: space.lg,
        right: space.lg,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        gap: space.sm,
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => dismiss(t.id)}
          style={{
            padding: `${space.sm}px ${space.md}px`,
            background: color.surface,
            borderLeft: `3px solid ${typeColors[t.type]}`,
            borderRadius: radius.sm,
            color: color.text,
            fontSize: 13,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
