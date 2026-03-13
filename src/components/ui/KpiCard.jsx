// src/components/ui/KpiCard.jsx

import * as S from "../../styles/cardStyles";

export default function KpiCard({ label, value, sub, color = "#f59e0b" }) {
  return (
    <div style={S.card}>
      <div style={S.kpiLabel}>{label}</div>
      <div style={{ ...S.kpiValue, color }}>{value}</div>
      {sub && (
        <div style={{ fontSize: "12px", color, marginTop: "4px", opacity: 0.85 }}>
          {sub}
        </div>
      )}
    </div>
  );
}