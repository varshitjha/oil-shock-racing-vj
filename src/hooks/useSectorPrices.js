// src/hooks/useSectorPrices.js
// This hook is already embedded inside useSimulation.js.
// Export it separately if you need isolated sector price logic.

import { useState, useCallback } from "react";
import { SECTORS, initSectorPrices } from "../constants/sectors";

export function useSectorPrices() {
  const [sectorPrices, setSectorPrices] = useState(initSectorPrices());

  const updateFromOilChange = useCallback((oilPctChange) => {
    setSectorPrices((prev) => {
      const next = { ...prev };
      SECTORS.forEach((s) => {
        const sectorChg = oilPctChange * s.beta + (Math.random() - 0.5) * 0.004;
        next[s.key] = Math.max(5, prev[s.key] * (1 + sectorChg));
      });
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSectorPrices(initSectorPrices());
  }, []);

  return { sectorPrices, updateFromOilChange, reset };
}