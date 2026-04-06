import { color, space, radius } from "./tokens";

export const centerScreen: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: color.bg,
  padding: space.xl,
};

export const iconBox: React.CSSProperties = {
  width: 64,
  height: 64,
  borderRadius: radius.lg,
  background: color.accentSubtle,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: space.lg,
};

export const card: React.CSSProperties = {
  background: color.surface,
  border: `1px solid ${color.border}`,
  borderRadius: radius.lg,
  padding: space.lg,
  maxWidth: 340,
  width: "100%",
  marginTop: space.lg,
  textAlign: "center",
};

export const rowCenter: React.CSSProperties = {
  display: "flex",
  gap: space.sm,
  flexWrap: "wrap",
  justifyContent: "center",
};

export const heading: React.CSSProperties = {
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
  color: color.text,
};

export const subtext: React.CSSProperties = {
  fontSize: 13,
  color: color.textMuted,
};

export const label: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: color.text,
};
