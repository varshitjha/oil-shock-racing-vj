// src/engine/ShockEngine.js

import { SCENARIOS } from "../constants/scenarios";
import { OPEC_STRATEGIES } from "../constants/opecStrategies";

export class ShockEngine {
  constructor() {
    this.basePrice    = 75;
    this.currentPrice = 75;
    this.priceHistory = [75];
    this.activeShock  = null;
    this.dayCount     = 0;
  }

  triggerShock(scenarioKey) {
    const scenario = SCENARIOS[scenarioKey];
    if (!scenario) return;
    this.activeShock = {
      ...scenario,
      key:        scenarioKey,
      startPrice: this.currentPrice,
      elapsed:    0,
    };
  }

  applyOpec(strategyKey) {
    const strategy = OPEC_STRATEGIES.find((s) => s.key === strategyKey);
    if (!strategy) return;
    this.currentPrice = Math.max(
      10,
      this.currentPrice * (1 + strategy.effect / 100)
    );
  }

  _computeShockDrift() {
    if (!this.activeShock) return 0;

    const s        = this.activeShock;
    s.elapsed     += 1;
    const progress = s.elapsed / s.duration;

    if (progress >= 1) {
      this.activeShock = null;
      return 0;
    }

    let dailyForce;
    switch (s.type) {
      case "geopolitical":
        // 60 % of magnitude front-loaded in first 10 % of duration
        dailyForce =
          progress < 0.1
            ? (s.magnitude * 0.6) / (s.duration * 0.1)
            : (s.magnitude * 0.4) / (s.duration * 0.9);
        break;
      case "demand":
        // Demand crashes accelerate early then slow
        dailyForce =
          progress < 0.3
            ? (s.magnitude * 2.5) / (s.duration * 0.3)
            : (s.magnitude * 0.7) / (s.duration * 0.7);
        break;
      default:
        // Supply / structural: uniform
        dailyForce = s.magnitude / s.duration;
    }

    return dailyForce / 100;
  }

  tick() {
    this.dayCount += 1;

    const baseVol      = 0.018;
    const shockDrift   = this._computeShockDrift();
    const meanRevert   =
      ((this.basePrice - this.currentPrice) / this.currentPrice) * 0.004;
    const noise        = (Math.random() - 0.5) * 2 * baseVol;

    this.currentPrice = Math.max(
      10,
      this.currentPrice * (1 + shockDrift + meanRevert + noise)
    );
    this.currentPrice = Math.round(this.currentPrice * 100) / 100;

    this.priceHistory.push(this.currentPrice);
    if (this.priceHistory.length > 200) this.priceHistory.shift();

    return this.currentPrice;
  }

  reset() {
    this.basePrice    = 75;
    this.currentPrice = 75;
    this.priceHistory = [75];
    this.activeShock  = null;
    this.dayCount     = 0;
  }

  get activeScenarioName() {
    return this.activeShock ? this.activeShock.name : null;
  }

  get shockProgress() {
    if (!this.activeShock) return 0;
    return Math.min(1, this.activeShock.elapsed / this.activeShock.duration);
  }
}