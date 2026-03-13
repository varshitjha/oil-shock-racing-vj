// src/hooks/useSimulation.js

import { useState, useRef, useEffect, useCallback } from "react";
import { ShockEngine } from "../engine/ShockEngine";
import { initSectorPrices, SECTORS } from "../constants/sectors";

const TICK_MS = 380;

export function useSimulation() {
  const engineRef        = useRef(new ShockEngine());
  const [running,        setRunning]        = useState(false);
  const [oilPrice,       setOilPrice]       = useState(75);
  const [priceHistory,   setPriceHistory]   = useState([75]);
  const [sectorPrices,   setSectorPrices]   = useState(initSectorPrices());
  const [dayCount,       setDayCount]       = useState(0);
  const [activeScenario, setActiveScenario] = useState(null);
  const intervalRef      = useRef(null);

  const tick = useCallback(() => {
    const eng       = engineRef.current;
    const prevPrice = eng.currentPrice;
    const newPrice  = eng.tick();
    const pctChange = (newPrice - prevPrice) / prevPrice;

    setSectorPrices((prev) => {
      const next = { ...prev };
      SECTORS.forEach((s) => {
        const sectorChg = pctChange * s.beta + (Math.random() - 0.5) * 0.004;
        next[s.key] = Math.max(5, prev[s.key] * (1 + sectorChg));
      });
      return next;
    });

    setOilPrice(newPrice);
    setPriceHistory([...eng.priceHistory]);
    setDayCount(eng.dayCount);
    setActiveScenario(eng.activeScenarioName);
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, TICK_MS);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, tick]);

  const triggerShock = useCallback((scenarioKey) => {
    engineRef.current.triggerShock(scenarioKey);
    if (!running) setRunning(true);
  }, [running]);

  const applyOpec = useCallback((strategyKey) => {
    engineRef.current.applyOpec(strategyKey);
    if (!running) setRunning(true);
  }, [running]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    engineRef.current.reset();
    setRunning(false);
    setOilPrice(75);
    setPriceHistory([75]);
    setSectorPrices(initSectorPrices());
    setDayCount(0);
    setActiveScenario(null);
  }, []);

  return {
    running, setRunning,
    oilPrice, priceHistory,
    sectorPrices,
    dayCount, activeScenario,
    triggerShock, applyOpec, reset,
  };
}