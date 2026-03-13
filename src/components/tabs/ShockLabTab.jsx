// src/components/tabs/ShockLabTab.jsx

import Badge        from "../ui/Badge";
import Button       from "../ui/Button";
import SectionTitle from "../ui/SectionTitle";
import { SCENARIOS }         from "../../constants/scenarios";
import { OPEC_STRATEGIES }   from "../../constants/opecStrategies";
import { HISTORICAL_EVENTS } from "../../constants/historicalData";
import * as S from "../../styles/cardStyles";

const rgbMap = {
  "#f59e0b": "245,158,11",
  "#3b82f6": "59,130,246",
  "#ef4444": "239,68,68",
  "#8b5cf6": "139,92,246",
};

export default function ShockLabTab({ onTriggerShock, onApplyOpec, activeOpec }) {
  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* ── Scenario Cards ── */}
      <div style={S.card}>
        <SectionTitle>Historical Shock Scenarios</SectionTitle>
        <div style={S.grid3}>
          {Object.entries(SCENARIOS).map(([key, s]) => (
            <div
              key={key}
              className="shock-card card-hover"
              style={{
                background:   `${s.color}11`,
                border:       `1px solid ${s.color}44`,
                borderRadius: "12px",
                padding:      "16px",
                cursor:       "pointer",
              }}
            >
              <div style={{ fontWeight: 700, color: s.color, marginBottom: "6px", fontSize: "14px" }}>
                {s.name}
              </div>
              <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "10px", lineHeight: 1.5 }}>
                {s.desc}
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                <Badge color={s.magnitude > 0 ? "#f59e0b" : "#10b981"}>
                  {s.magnitude > 0 ? "+" : ""}{s.magnitude}%
                </Badge>
                <Badge color="#3b82f6">{s.duration}d</Badge>
                <Badge color="#8b5cf6">{s.type}</Badge>
              </div>
              <Button
                onClick={() => onTriggerShock(key)}
                rgb="239,68,68"
                style={{ width: "100%", textAlign: "center" }}
              >
                ⚡ Trigger
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* ── OPEC Strategy Game ── */}
      <div style={S.card}>
        <SectionTitle>OPEC Strategy Game</SectionTitle>
        <div style={S.grid4}>
          {OPEC_STRATEGIES.map((o) => {
            const rgb    = rgbMap[o.color] || "245,158,11";
            const active = activeOpec === o.key;
            return (
              <div
                key={o.key}
                style={{
                  background:   active ? `${o.color}22` : "rgba(15,23,42,0.6)",
                  border:       `1px solid ${active ? o.color : "rgba(51,65,85,0.6)"}`,
                  borderRadius: "12px",
                  padding:      "16px",
                  transition:   "all 0.2s ease",
                }}
              >
                <div style={{ fontSize: "26px", marginBottom: "8px" }}>{o.icon}</div>
                <div style={{ fontWeight: 700, color: o.color, marginBottom: "4px" }}>{o.label}</div>
                <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "10px", lineHeight: 1.5 }}>
                  {o.desc}
                </div>
                <Badge color={o.color}>
                  {o.effect > 0 ? "+" : ""}{o.effect}% price
                </Badge>
                <br /><br />
                <Button
                  onClick={() => onApplyOpec(o.key)}
                  rgb={rgb}
                  style={{ width: "100%" }}
                >
                  {active ? "✓ Active" : "Apply"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Historical Reference Table ── */}
      <div style={S.card}>
        <SectionTitle>Historical Reference</SectionTitle>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr>
              {["Year / Event", "Oil Change", "GDP Impact", "Duration"].map((h) => (
                <th key={h} style={S.tableHeaderCell}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HISTORICAL_EVENTS.map((r) => (
              <tr key={r.year} className="table-row-hover" style={S.tableRow}>
                <td style={{ ...S.tableCell, color: "#e2e8f0", fontWeight: 600 }}>
                  {r.year} — {r.event}
                </td>
                <td style={{
                  ...S.tableCell,
                  color:      r.positive ? "#10b981" : "#f59e0b",
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {r.oilChg}
                </td>
                <td style={{ ...S.tableCell, color: "#94a3b8" }}>{r.gdpImpact}</td>
                <td style={{ ...S.tableCell, color: "#94a3b8" }}>{r.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}