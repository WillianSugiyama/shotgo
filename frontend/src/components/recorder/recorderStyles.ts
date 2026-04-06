import { color, font, radius, space } from "../../styles/tokens";
import { btnGhost } from "../../styles/buttons";

export const recContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  gap: space.lg,
  background: color.bg,
};

export const timerText: React.CSSProperties = {
  fontFamily: font.mono,
  fontSize: 48,
  fontWeight: 700,
  color: color.text,
  letterSpacing: 2,
};

export const recRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: space.md,
};

export const recDot: React.CSSProperties = {
  width: 12,
  height: 12,
  borderRadius: radius.pill,
  background: color.recording,
  animation: "pulse-dot 1s ease-in-out infinite",
};

export const recBox: React.CSSProperties = {
  borderRadius: radius.lg,
  border: `2px solid ${color.recording}`,
  padding: space.lg,
  background: "rgba(255, 71, 87, 0.05)",
};

export const timerRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: space.sm,
  justifyContent: "center",
};

export const timerSub: React.CSSProperties = {
  color: color.textMuted,
  fontSize: 16,
  fontFamily: font.mono,
};

export const backBtnStyle: React.CSSProperties = {
  ...btnGhost,
  position: "absolute",
  top: space.md,
  left: space.md,
};
