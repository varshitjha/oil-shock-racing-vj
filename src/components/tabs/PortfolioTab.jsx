// src/components/tabs/PortfolioTab.jsx

import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import FullChart    from "../charts/FullChart";
import KpiCard      from "../ui/KpiCard";
import Button       from "../ui/Button";
import { SECTORS }  from "../../constants/sectors";
import * as S from "../../styles/cardStyles";

const fmt    = (n) =>
  n >= 0
    ? `+$${Math.abs(n).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : `-$${Math.abs(n).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
const fmtPct = (n) => (n >= 0 ? "+" : "") + n.toFixed(2) + "%";

export default function PortfolioTab({
  portfolio, sectorPrices,
  totalValue, pnl, pnlPct,
  onTrade,
}) {
  const [selectedSector, setSelectedSector] = useState("energy");
  const [tradeQty,       setTradeQty]       = useState(10);

  const hint =
    sectorPrices.energy > 120
      ? "Overweight Energy, underweight Airlines, consider TIPS"
      : sectorPrices.energy < 80
      ? "Airlines benefit, Energy stressed — watch for OPEC cuts"
      : "Balanced allocation — monitor shock events";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Summary */}
      <div style={S.grid3}>
        <KpiCard label="Cash"        value={`$${Math.round(portfolio.cash).toLocaleString()}`}                    color="#3b82f6" />
        <KpiCard label="Total Value" value={`$${Math.round(totalValue).toLocaleString()}`}                        color="#10b981" />
        <KpiCard label="P&L"         value={`${fmt(pnl)}`} sub={fmtPct(pnlPct)} color={pnl >= 0 ? "#10b981" : "#ef4444"} />
      </div>

      {/* Trade Panel */}
      <div style={S.card}>
        <SectionTitle>Execute Trade</SectionTitle>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: 1, minWidth: "180px" }}>
            <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>Sector</div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              style={S.input}
            >
              {SECTORS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.name} (${sectorPrices[s.key].toFixed(2)})
                </option>
              ))}
            </select>
          </div>
          <div style={{ minWidth: "130px" }}>
            <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>Quantity</div>
            <select
              value={tradeQty}
              onChange={(e) => setTradeQty(Number(e.target.value))}
              style={S.input}
            >
              {[5, 10, 25, 50].map((q) => (
                <option key={q} value={q}>{q} shares</option>
              ))}
            </select>
          </div>
          <Button onClick={() => onTrade("buy",  selectedSector, tradeQty)} rgb="16,185,129" style={{ height: "38px" }}>▲ BUY</Button>
          <Button onClick={() => onTrade("sell", selectedSector, tradeQty)} rgb="239,68,68"  style={{ height: "38px" }}>▼ SELL</Button>
        </div>
        <div
          style={{
            marginTop:    "12px",
            padding:      "10px",
            background:   "rgba(245,158,11,0.08)",
            borderRadius: "8px",
            border:       "1px solid rgba(245,158,11,0.2)",
            fontSize:     "12px",
            color:        "#f59e0b",
          }}
        >
          💡 Strategy hint: {hint}
        </div>
      </div>

      {/* Holdings Table */}
      <div style={S.card}>
        <SectionTitle>Holdings</SectionTitle>
        {Object.keys(portfolio.holdings).length === 0 ? (
          <div style={{ color: "#64748b", textAlign: "center", padding: "24px" }}>
            No positions yet — make a trade to get started
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(51,65,85,0.6)" }}>
                {["Sector", "Shares", "Avg Price", "Current", "Value", "P&L"].map((h) => (
                  <th key={h} style={S.tableHeaderCell}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(portfolio.holdings).map(([key, qty]) => {
                const sec       = SECTORS.find((s) => s.key === key);
                const curPrice  = sectorPrices[key];
                const val       = qty * curPrice;
                const pnlSector = val - qty * 100;
                return (
                  <tr key={key} style={S.tableRow}>
                    <td style={{ ...S.tableCell, color: sec.color, fontWeight: 700 }}>{sec.name}</td>
                    <td style={S.tableCell}>{qty}</td>
                    <td style={S.tableCell}>$100.00</td>
                    <td style={S.tableCell}>${curPrice.toFixed(2)}</td>
                    <td style={S.tableCell}>${Math.round(val).toLocaleString()}</td>
                    <td style={{ ...S.tableCell, color: pnlSector >= 0 ? "#10b981" : "#ef4444", fontWeight: 700 }}>
                      {fmt(pnlSector)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Performance Chart */}
      <div style={S.card}>
        <SectionTitle>Portfolio Performance</SectionTitle>
        <FullChart
          data={portfolio.history.length > 1 ? portfolio.history : [100000]}
          color={pnl >= 0 ? "#10b981" : "#ef4444"}
        />
      </div>
    </div>
  );
}