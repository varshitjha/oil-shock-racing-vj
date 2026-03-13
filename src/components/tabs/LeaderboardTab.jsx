// src/components/tabs/LeaderboardTab.jsx

import SectionTitle from "../ui/SectionTitle";
import { LEADERBOARD } from "../../constants/historicalData";
import * as S from "../../styles/cardStyles";

const fmtPct = (n) => (n >= 0 ? "+" : "") + n.toFixed(2) + "%";

export default function LeaderboardTab({
  score, pnlPct, dayCount, opecUsed,
  holdingsCount, portfolioPnlPositive,
}) {
  const milestones = [
    { done: dayCount > 10,           label: "Supply shock propagation mechanics" },
    { done: opecUsed,                label: "OPEC cartel dynamics" },
    { done: holdingsCount > 0,       label: "Sector beta analysis" },
    { done: dayCount > 30,           label: "Inflation transmission channels" },
    { done: portfolioPnlPositive,    label: "Portfolio hedging strategy" },
    { done: score > 5000,            label: "Game theory in commodity markets" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Top Traders */}
      <div style={S.card}>
        <SectionTitle>Top Traders</SectionTitle>
        {LEADERBOARD.map((t) => (
          <div
            key={t.rank}
            style={{
              display:     "flex",
              alignItems:  "center",
              gap:         "16px",
              padding:     "12px",
              marginBottom:"8px",
              background:  "rgba(15,23,42,0.5)",
              borderRadius:"8px",
              border:      `1px solid ${t.color}33`,
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: 900, color: t.color, minWidth: "32px" }}>
              #{t.rank}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "#e2e8f0" }}>{t.name}</div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>{t.strategy}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 900, color: t.color }}>{t.pts.toLocaleString()} pts</div>
              <div style={{ fontSize: "12px", color: "#10b981" }}>{t.ret}</div>
            </div>
          </div>
        ))}

        {/* Player Entry */}
        <div
          style={{
            padding:      "12px",
            background:   "rgba(245,158,11,0.1)",
            borderRadius: "8px",
            border:       "1px solid rgba(245,158,11,0.3)",
            marginTop:    "8px",
            display:      "flex",
            justifyContent:"space-between",
            alignItems:   "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: "#f59e0b" }}>You</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Current session</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 900, color: "#f59e0b" }}>{score.toLocaleString()} pts</div>
            <div style={{ fontSize: "12px", color: pnlPct >= 0 ? "#10b981" : "#ef4444" }}>
              {fmtPct(pnlPct)}
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div style={S.card}>
        <SectionTitle>Learning Milestones</SectionTitle>
        {milestones.map((m, i) => (
          <div
            key={i}
            style={{
              display:      "flex",
              alignItems:   "center",
              gap:          "12px",
              padding:      "10px 0",
              borderBottom: "1px solid rgba(51,65,85,0.3)",
            }}
          >
            <div style={{ fontSize: "18px" }}>{m.done ? "✅" : "⬜"}</div>
            <div style={{ color: m.done ? "#10b981" : "#64748b" }}>{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}