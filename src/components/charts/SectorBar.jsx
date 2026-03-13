// src/components/charts/SectorBar.jsx

export default function SectorBar({ label, beta, pct, color }) {
  const barW = (Math.abs(beta) / 0.7) * 100;

  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          marginBottom:   "3px",
        }}
      >
        <span style={{ fontSize: "13px", color: "#e2e8f0" }}>{label}</span>
        <span style={{ fontSize: "13px", color, fontWeight: 700 }}>
          β {beta >= 0 ? "+" : ""}{beta} | {pct >= 0 ? "+" : ""}{pct.toFixed(2)}%
        </span>
      </div>
      <div
        style={{
          height:       "6px",
          background:   "rgba(51,65,85,0.4)",
          borderRadius: "3px",
          overflow:     "hidden",
        }}
      >
        <div
          style={{
            height:       "100%",
            width:        `${barW}%`,
            background:   color,
            borderRadius: "3px",
            transition:   "width 0.3s",
          }}
        />
      </div>
    </div>
  );
}