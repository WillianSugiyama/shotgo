import { color, radius, space, font } from "../../styles/tokens";

export const pickerWrap: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: space.md,
};

export const selectStyle: React.CSSProperties = {
  width: 280,
  padding: `${space.sm}px ${space.md}px`,
  fontSize: 14,
  fontFamily: font.body,
  background: color.surface,
  color: color.text,
  border: `1px solid ${color.border}`,
  borderRadius: radius.md,
  cursor: "pointer",
};

export const thumbStyle: React.CSSProperties = {
  maxWidth: 280,
  borderRadius: radius.md,
  border: `1px solid ${color.border}`,
};

export const placeholder: React.CSSProperties = {
  width: 280,
  height: 160,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: color.surface,
  borderRadius: radius.md,
  border: `1px solid ${color.border}`,
};
