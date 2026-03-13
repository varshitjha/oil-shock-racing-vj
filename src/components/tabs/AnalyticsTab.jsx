// src/components/tabs/AnalyticsTab.jsx

import SectionTitle from "../ui/SectionTitle";
import SectorBar    from "../charts/SectorBar";
import { SECTORS }  from "../../constants/sectors";
import * as S from "../../styles/cardStyles";

export default function AnalyticsTab({ sectorPrices, oilPrice, dayCount, score }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Beta Bars */}
      <div style={S.card}>
        <SectionTitle>Sector Beta Analysis</SectionTitle>
        {SECTORS.map((s) => {
          const pct = ((sectorPrices[s.key] - 100) / 100) * 100;
          return (
            <SectorBar
              key={s.key}
              label={s.name}
              beta={s.beta}
              pct={pct}
              color={s.color}
            />
          );
        })}
      </div>

      {/* Transmission Matrix */}
      <div style={S.card}>
        <SectionTitle>Economic Transmission Matrix</SectionTitle>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(51,65,85,0.6)" }}>
              {["Shock", "Inflation (lag)", "GDP (lag)", "Employment"].map((h) => (
                <th key={h} style={S.tableHeaderCell}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["+10% Oil", "+0.3% CPI (1–2Q)", "-0.2% GDP (2–3Q)", "+0.1% Unemp."],
              ["-10% Oil", "-0.3% CPI (1–2Q)", "+0.2% GDP (2–3Q)", "-0.1% Unemp."],
              ["Neg. Shock", "Effect ×1.5",    "Effect ×1.5",       "Effect ×1.5"],
            ].map((r, i) => (
              <tr key={i} style={S.tableRow}>
                {r.map((c, j) => (
                  <td
                    key={j}
                    style={{ ...S.tableCell, color: j === 0 ? "#f59e0b" : "#94a3b8" }}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Live Stats */}
      <div style={S.card}>
        <SectionTitle>Live Session Stats</SectionTitle>
        <div style={S.grid4}>
          {[
            { label: "Days Simulated", value: dayCount },
            {
              label: "Oil Change",
              value: `${(((oilPrice - 75) / 75) * 100).toFixed(2)}%`,
            },
            {
              label: "Best Sector",
              value: SECTORS.reduce(
                (b, s) => (sectorPrices[s.key] > sectorPrices[b.key] ? s : b),
                SECTORS[0]
              ).name.split(" ")[0],
            },
            { label: "Score", value: score.toLocaleString() },
          ].map((k) => (
            <div key={k.label} style={{ textAlign: "center" }}>
              <div style={S.kpiLabel}>{k.label}</div>
              <div style={{ fontSize: "18px", fontWeight: 900, color: "#f59e0b" }}>
                {k.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}