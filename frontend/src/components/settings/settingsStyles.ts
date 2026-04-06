import { color, radius, space, font } from "../../styles/tokens";

export const section: React.CSSProperties = {
  padding: space.md,
  marginBottom: space.md,
  background: color.surface,
  borderRadius: radius.lg,
  border: `1px solid ${color.border}`,
};

export const sectionTitle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: space.sm,
  fontSize: 13,
  fontWeight: 600,
  color: color.textMuted,
  textTransform: "uppercase",
  letterSpacing: 1,
  marginBottom: space.md,
};

export const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "8px 12px",
  marginBottom: space.sm,
  background: color.bg,
  color: color.text,
  border: `1px solid ${color.border}`,
  borderRadius: radius.sm,
  fontFamily: font.body,
  fontSize: 14,
};

export const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  color: color.textMuted,
  marginBottom: space.xs,
};

export const container: React.CSSProperties = {
  padding: space.lg,
  color: color.text,
  maxWidth: 520,
  margin: "0 auto",
  overflowY: "auto",
  maxHeight: "100vh",
  animation: "fadeIn 0.2s ease",
};

export const header: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: space.sm,
  marginBottom: space.lg,
};

export const checkboxLabel: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: space.sm,
  fontSize: 14,
  cursor: "pointer",
};
