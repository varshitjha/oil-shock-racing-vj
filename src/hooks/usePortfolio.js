// src/hooks/usePortfolio.js

import { useState, useCallback, useRef } from "react";
import { Portfolio } from "../engine/Portfolio";

export function usePortfolio(sectorPrices) {
  const portfolioRef  = useRef(new Portfolio());
  const [snapshot,    setSnapshot]    = useState({
    cash:     100_000,
    holdings: {},
    history:  [100_000],
  });

  const refresh = () => {
    const p = portfolioRef.current;
    setSnapshot({
      cash:     p.cash,
      holdings: { ...p.holdings },
      history:  [...p.history],
    });
  };

  const executeTrade = useCallback((action, sectorKey, quantity) => {
    const price  = sectorPrices[sectorKey] || 100;
    const result = action === "buy"
      ? portfolioRef.current.buy(sectorKey, quantity, price)
      : portfolioRef.current.sell(sectorKey, quantity, price);
    if (result.success) refresh();
    return result;
  }, [sectorPrices]);

  const recordSnapshot = useCallback(() => {
    portfolioRef.current.recordSnapshot(sectorPrices);
    setSnapshot((prev) => ({
      ...prev,
      history: [...portfolioRef.current.history],
    }));
  }, [sectorPrices]);

  const reset = useCallback(() => {
    portfolioRef.current.reset();
    refresh();
  }, []);

  const totalValue = portfolioRef.current.totalValue(sectorPrices);
  const pnl        = portfolioRef.current.pnl(sectorPrices);
  const pnlPct     = portfolioRef.current.pnlPct(sectorPrices);

  return {
    snapshot, totalValue, pnl, pnlPct,
    executeTrade, recordSnapshot, reset,
  };
}