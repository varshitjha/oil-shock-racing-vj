// src/components/layout/Header.jsx

import { colors } from "../../styles/theme";

const TABS = [
  { key: "dashboard",   label: "Dashboard",   icon: "📊" },
  { key: "shocklab",    label: "Shock Lab",    icon: "⚡" },
  { key: "portfolio",   label: "Portfolio",    icon: "💼" },
  { key: "analytics",   label: "Analytics",    icon: "📈" },
  { key: "leaderboard", label: "Leaderboard",  icon: "🏆" },
];

export default function Header({ activeTab, setTab, oilPrice, dayCount, score, running }) {
  return (
    <div
      style={{
        background:     colors.headerBg,
        borderBottom:   "1px solid rgba(245,158,11,0.15)",
        padding:        "0 28px",
        display:        "flex",
        alignItems:     "center",
        gap:            "20px",
        position:       "sticky",
        top:            0,
        zIndex:         50,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        height:         "58px",
        flexWrap:       "wrap",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "28px", height: "28px",
            background: "linear-gradient(135deg,#f59e0b,#ef4444)",
            borderRadius: "7px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", boxShadow: "0 0 12px rgba(245,158,11,0.3)",
          }}
        >
          ⚡
        </div>
        <div>
          <div style={{
            fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em",
            background: "linear-gradient(90deg,#f59e0b,#fbbf24)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            OIL SHOCK RACING
          </div>
          <div style={{ fontSize: "10px", color: colors.muted, letterSpacing: "0.06em", marginTop: "-1px" }}>
            varshitjha
          </div>
        </div>
      </div>

      {/* Live stats pill */}
      <div style={{
        display: "flex", gap: "16px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "8px", padding: "5px 14px",
        fontSize: "12px",
      }}>
        <span style={{ color: colors.mutedLight }}>
          {running && <span className="live-dot" />}
          Day <span style={{ color: "#f59e0b", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{dayCount}</span>
        </span>
        <span style={{ color: colors.border2 }}>|</span>
        <span style={{ color: colors.mutedLight }}>
          WTI <span style={{ color: "#f59e0b", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>${oilPrice.toFixed(2)}</span>
        </span>
        <span style={{ color: colors.border2 }}>|</span>
        <span style={{ color: colors.mutedLight }}>
          Score <span style={{ color: "#a78bfa", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{score.toLocaleString()}</span>
        </span>
      </div>

      {/* Tab nav */}
      <nav style={{ display: "flex", gap: "2px", marginLeft: "auto" }}>
        {TABS.map((t) => {
          const active = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`tab-btn ${active ? "active" : ""}`}
              style={{
                background:    active ? "rgba(245,158,11,0.12)" : "transparent",
                border:        active ? "1px solid rgba(245,158,11,0.3)" : "1px solid transparent",
                color:         active ? "#f59e0b" : colors.mutedLight,
                padding:       "6px 14px",
                borderRadius:  "8px",
                cursor:        "pointer",
                fontSize:      "13px",
                fontWeight:    active ? 700 : 500,
                display:       "flex",
                alignItems:    "center",
                gap:           "5px",
                letterSpacing: "0.01em",
              }}
            >
              <span style={{ fontSize: "12px" }}>{t.icon}</span>
              {t.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}