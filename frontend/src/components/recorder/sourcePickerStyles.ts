import { color, radius, space, font, transition } from "../../styles/tokens";

export const card: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: space.sm,
  padding: `${space.sm}px ${space.md}px`,
  background: color.surface,
  border: `1px solid ${color.border}`,
  borderRadius: radius.md,
  cursor: "pointer",
  color: color.text,
  fontSize: 14,
  fontFamily: font.body,
  transition: transition.fast,
  width: "100%",
};

export const heading: React.CSSProperties = {
  color: color.textMuted,
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 1,
  margin: `${space.sm}px 0 ${space.xs}px`,
};

export const wrap: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: space.xs,
  width: 280,
  maxHeight: 340,
  overflowY: "auto",
};

export const ellipsis: React.CSSProperties = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
