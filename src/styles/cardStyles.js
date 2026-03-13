// src/styles/cardStyles.js

import { colors, radius, shadow } from "./theme";

export const card = {
  background:     colors.cardBg,
  border:         `1px solid ${colors.border}`,
  borderRadius:   radius.lg,
  padding:        "20px",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow:      shadow.card,
  transition:     "border-color 0.2s ease",
};

export const cardHover = {
  ...card,
  borderColor: "rgba(245,158,11,0.28)",
};

export const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "14px",
};

export const grid3 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "14px",
};

export const grid4 = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: "14px",
};

export const kpiLabel = {
  fontSize:      "10px",
  color:         colors.muted,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontWeight:    600,
  marginBottom:  "6px",
};

export const kpiValue = {
  fontSize:      "26px",
  fontWeight:    700,
  letterSpacing: "-0.02em",
  lineHeight:    1,
  fontFamily:    "'JetBrains Mono', monospace",
};

export const sectionTitle = {
  fontSize:      "10px",
  fontWeight:    700,
  color:         colors.mutedLight,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  marginBottom:  "16px",
  paddingBottom: "10px",
  borderBottom:  `1px solid ${colors.border}`,
};

export const input = {
  background:   "rgba(4,8,15,0.6)",
  border:       `1px solid ${colors.border2}`,
  color:        colors.text,
  padding:      "9px 13px",
  borderRadius: radius.md,
  fontSize:     "14px",
  fontWeight:   500,
  width:        "100%",
  boxSizing:    "border-box",
  transition:   "border-color 0.2s ease",
};

export const tableHeaderCell = {
  textAlign:     "left",
  padding:       "10px 12px",
  color:         colors.muted,
  fontWeight:    600,
  fontSize:      "10px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  borderBottom:  `1px solid ${colors.border}`,
};

export const tableCell = {
  padding:    "11px 12px",
  fontSize:   "13px",
  fontWeight: 500,
};

export const tableRow = {
  borderBottom: `1px solid rgba(51,65,85,0.2)`,
  transition:   "background 0.15s ease",
};

export const badge = (col) => ({
  background:    `${col}18`,
  color:         col,
  padding:       "3px 9px",
  borderRadius:  "6px",
  fontSize:      "11px",
  fontWeight:    700,
  letterSpacing: "0.04em",
  display:       "inline-block",
  border:        `1px solid ${col}30`,
});

export const btn = (r, g, b) => ({
  background:    `rgba(${r},${g},${b},0.1)`,
  border:        `1px solid rgba(${r},${g},${b},0.35)`,
  color:         `rgb(${r},${g},${b})`,
  padding:       "9px 18px",
  borderRadius:  radius.md,
  cursor:        "pointer",
  fontSize:      "13px",
  fontWeight:    600,
  letterSpacing: "0.02em",
  transition:    "all 0.18s ease",
});