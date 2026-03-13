// src/components/tabs/DashboardTab.jsx

import KpiCard      from "../ui/KpiCard";
import FullChart    from "../charts/FullChart";
import Button       from "../ui/Button";
import SectionTitle from "../ui/SectionTitle";
import MiniChart    from "../charts/MiniChart";
import { SECTORS }  from "../../constants/sectors";
import { getMacroImpact } from "../../engine/EconomicModel";
import * as S from "../../styles/cardStyles";

const fmtPct = (n) => (n >= 0 ? "+" : "") + n.toFixed(2) + "%";

export default function DashboardTab({
  oilPrice, priceHistory, sectorPrices,
  totalValue, pnl, pnlPct,
  dayCount, score,
  running, setRunning, onReset,
}) {
  const macro = getMacroImpact(oilPrice);

  return (
    <div className="tab-content" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* KPI Row */}
      <div style={S.grid4}>
        <KpiCard
          label="Crude Oil (WTI)"
          value={`$${oilPrice.toFixed(2)}`}
          sub={fmtPct(((oilPrice - 75) / 75) * 100)}
          color="#f59e0b"
        />
        <KpiCard
          label="Portfolio Value"
          value={`$${Math.round(totalValue).toLocaleString()}`}
          sub={fmtPct(pnlPct)}
          color={pnl >= 0 ? "#10b981" : "#ef4444"}
        />
        <KpiCard
          label="Day"
          value={dayCount}
          sub={running
            ? <span><span className="live-dot" />LIVE</span>
            : "⏸ Paused"
          }
          color="#3b82f6"
        />
        <KpiCard
          label="Score"
          value={score.toLocaleString()}
          sub="pts"
          color="#a78bfa"
        />
      </div>

      {/* Oil Price Chart */}
      <div style={S.card}>
        <div style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          marginBottom:   "12px",
        }}>
          <SectionTitle>WTI Crude Oil Price</SectionTitle>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              onClick={() => setRunning((r) => !r)}
              rgb={running ? "239,68,68" : "16,185,129"}
            >
              {running ? "⏸ Pause" : "▶ Start"}
            </Button>
            <Button onClick={onReset} rgb="100,116,139">
              ↺ Reset
            </Button>
          </div>
        </div>
        <FullChart data={priceHistory} color="#f59e0b" />
      </div>

      {/* Sector Rotation Grid */}
      <div style={S.card}>
        <SectionTitle>Sector Rotation Grid</SectionTitle>
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap:                 "10px",
        }}>
          {SECTORS.map((s) => {
            const chg = ((sectorPrices[s.key] - 100) / 100) * 100;
            return (
              <div
                key={s.key}
                className="sector-cell"
                style={{
                  background:   `${s.color}11`,
                  border:       `1px solid ${s.color}33`,
                  borderRadius: "10px",
                  padding:      "12px",
                }}
              >
                <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>
                  {s.name}
                </div>
                <div style={{
                  fontSize:   "20px",
                  fontWeight: 700,
                  color:      s.color,
                  fontFamily: "'JetBrains Mono', monospace",
                  lineHeight: 1,
                }}>
                  ${sectorPrices[s.key].toFixed(1)}
                </div>
                <div style={{
                  fontSize:   "11px",
                  fontWeight: 600,
                  color:      chg >= 0 ? "#10b981" : "#ef4444",
                  marginTop:  "3px",
                }}>
                  {fmtPct(chg)}
                </div>
                <div style={{ marginTop: "6px" }}>
                  <MiniChart
                    data={[100, sectorPrices[s.key]]}
                    color={s.color}
                    w={80}
                    h={22}
                  />
                </div>
                <div style={{
                  fontSize:      "10px",
                  color:         "#475569",
                  marginTop:     "4px",
                  fontFamily:    "'JetBrains Mono', monospace",
                  letterSpacing: "0.02em",
                }}>
                  β {s.beta >= 0 ? "+" : ""}{s.beta}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Macro Gauges */}
      <div style={S.grid3}>
        <div style={S.card}>
          <div style={S.kpiLabel}>Inflation Impact</div>
          <div style={{
            fontSize:   "22px",
            fontWeight: 700,
            color:      "#f59e0b",
            fontFamily: "'JetBrains Mono', monospace",
            marginTop:  "4px",
          }}>
            {macro.inflation >= 0 ? "+" : ""}{macro.inflation.toFixed(2)}%
          </div>
          <div style={{ fontSize: "11px", color: "#475569", marginTop: "6px" }}>
            Est. CPI delta (1–2Q lag)
          </div>
          {/* Mini progress bar */}
          <div style={{
            marginTop:    "10px",
            height:       "3px",
            background:   "rgba(51,65,85,0.4)",
            borderRadius: "2px",
            overflow:     "hidden",
          }}>
            <div
              className="bar-animated"
              style={{
                height:       "100%",
                width:        `${Math.min(100, Math.abs(macro.inflation) * 20)}%`,
                background:   "#f59e0b",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>

        <div style={S.card}>
          <div style={S.kpiLabel}>GDP Impact</div>
          <div style={{
            fontSize:   "22px",
            fontWeight: 700,
            color:      macro.gdp >= 0 ? "#10b981" : "#ef4444",
            fontFamily: "'JetBrains Mono', monospace",
            marginTop:  "4px",
          }}>
            {macro.gdp >= 0 ? "+" : ""}{macro.gdp.toFixed(2)}%
          </div>
          <div style={{ fontSize: "11px", color: "#475569", marginTop: "6px" }}>
            Est. GDP delta (2–3Q lag)
          </div>
          <div style={{
            marginTop:    "10px",
            height:       "3px",
            background:   "rgba(51,65,85,0.4)",
            borderRadius: "2px",
            overflow:     "hidden",
          }}>
            <div
              className="bar-animated"
              style={{
                height:       "100%",
                width:        `${Math.min(100, Math.abs(macro.gdp) * 20)}%`,
                background:   macro.gdp >= 0 ? "#10b981" : "#ef4444",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>

        <div style={S.card}>
          <div style={S.kpiLabel}>Unemployment</div>
          <div style={{
            fontSize:   "22px",
            fontWeight: 700,
            color:      "#8b5cf6",
            fontFamily: "'JetBrains Mono', monospace",
            marginTop:  "4px",
          }}>
            +{macro.unemployment.toFixed(2)}%
          </div>
          <div style={{ fontSize: "11px", color: "#475569", marginTop: "6px" }}>
            Okun's Law estimate
          </div>
          <div style={{
            marginTop:    "10px",
            height:       "3px",
            background:   "rgba(51,65,85,0.4)",
            borderRadius: "2px",
            overflow:     "hidden",
          }}>
            <div
              className="bar-animated"
              style={{
                height:       "100%",
                width:        `${Math.min(100, macro.unemployment * 40)}%`,
                background:   "#8b5cf6",
                borderRadius: "2px",
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}