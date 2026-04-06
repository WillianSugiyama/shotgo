import { color, radius, transition } from "./tokens";

export const btnBase: React.CSSProperties = {
  padding: "10px 20px",
  fontSize: 14,
  fontWeight: 500,
  border: "none",
  borderRadius: radius.md,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  transition: transition.fast,
  outline: "none",
};

export const btnPrimary: React.CSSProperties = {
  ...btnBase,
  background: color.accent,
  color: "#fff",
};

export const btnSecondary: React.CSSProperties = {
  ...btnBase,
  background: color.surface,
  color: color.text,
  border: `1px solid ${color.border}`,
};

export const btnDanger: React.CSSProperties = {
  ...btnBase,
  background: color.danger,
  color: "#fff",
};

export const btnGhost: React.CSSProperties = {
  ...btnBase,
  background: "transparent",
  color: color.textMuted,
  padding: "8px 12px",
};
