// src/App.jsx

import { useState, useEffect, useCallback } from "react";
import Header          from "./components/layout/Header";
import Toast           from "./components/ui/Toast";
import DashboardTab    from "./components/tabs/DashboardTab";
import ShockLabTab     from "./components/tabs/ShockLabTab";
import PortfolioTab    from "./components/tabs/PortfolioTab";
import AnalyticsTab    from "./components/tabs/AnalyticsTab";
import LeaderboardTab  from "./components/tabs/LeaderboardTab";
import { useSimulation } from "./hooks/useSimulation";
import { usePortfolio }  from "./hooks/usePortfolio";
import "./styles/index.css";

export default function App() {
  const [tab,        setTab]        = useState("dashboard");
  const [toast,      setToast]      = useState(null);
  const [opecUsed,   setOpecUsed]   = useState(false);

  const sim = useSimulation();

  const port = usePortfolio(sim.sectorPrices);

  // Record portfolio snapshot each tick
  useEffect(() => {
    if (sim.running) port.recordSnapshot();
  }, [sim.dayCount]);

  const showToast = useCallback((msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleTriggerShock = (key) => {
    sim.triggerShock(key);
    showToast(`⚡ Shock triggered!`, "warn");
  };

  const handleApplyOpec = (key) => {
    sim.applyOpec(key);
    setOpecUsed(true);
    showToast(`🛢️ OPEC strategy applied`, "info");
  };

  const handleTrade = (action, sectorKey, qty) => {
    const result = port.executeTrade(action, sectorKey, qty);
    showToast(result.message, result.success ? "success" : "error");
  };

  const handleReset = () => {
    sim.reset();
    port.reset();
    setOpecUsed(false);
    showToast("Simulation reset", "info");
  };

  const score = Math.round(
    Math.max(0, port.pnlPct) * 1000 + sim.dayCount * 10
  );

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#060912 0%,#0d1628 100%)",
        minHeight:  "100vh",
        fontFamily: "'Inter',sans-serif",
        color:      "#e2e8f0",
      }}
    >
      <Header
        activeTab={tab}
        setTab={setTab}
        oilPrice={sim.oilPrice}
        dayCount={sim.dayCount}
        score={score}
      />

      <Toast toast={toast} />

      <div style={{ padding: "20px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        {tab === "dashboard" && (
          <DashboardTab
            oilPrice={sim.oilPrice}
            priceHistory={sim.priceHistory}
            sectorPrices={sim.sectorPrices}
            totalValue={port.totalValue}
            pnl={port.pnl}
            pnlPct={port.pnlPct}
            dayCount={sim.dayCount}
            score={score}
            running={sim.running}
            setRunning={sim.setRunning}
            onReset={handleReset}
          />
        )}
        {tab === "shocklab" && (
          <ShockLabTab
            onTriggerShock={handleTriggerShock}
            onApplyOpec={handleApplyOpec}
            activeOpec={sim.activeOpec}
          />
        )}
        {tab === "portfolio" && (
          <PortfolioTab
            portfolio={port.snapshot}
            sectorPrices={sim.sectorPrices}
            totalValue={port.totalValue}
            pnl={port.pnl}
            pnlPct={port.pnlPct}
            onTrade={handleTrade}
          />
        )}
        {tab === "analytics" && (
          <AnalyticsTab
            sectorPrices={sim.sectorPrices}
            oilPrice={sim.oilPrice}
            dayCount={sim.dayCount}
            score={score}
          />
        )}
        {tab === "leaderboard" && (
          <LeaderboardTab
            score={score}
            pnlPct={port.pnlPct}
            dayCount={sim.dayCount}
            opecUsed={opecUsed}
            holdingsCount={Object.keys(port.snapshot.holdings).length}
            portfolioPnlPositive={port.pnl > 0}
          />
        )}
      </div>
    </div>
  );
}