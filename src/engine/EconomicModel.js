// src/engine/EconomicModel.js

const BASE_OIL_PRICE = 75;

/**
 * All functions accept current oil price and return estimated macro delta.
 * Lag structures are simplified (instantaneous approximation for UI display).
 */

// +10% oil → +0.3% CPI  (1–2 quarter lag, asymmetric: negative 1.5×)
export function inflationDelta(oilPrice) {
  const pctChg    = (oilPrice - BASE_OIL_PRICE) / BASE_OIL_PRICE;
  const raw       = pctChg * 0.3 * 3;           // 3 × multiplier for display
  const asymmetry = raw < 0 ? 1.5 : 1.0;
  return raw * asymmetry;
}

// +10% oil → -0.2% GDP  (2–3 quarter lag)
export function gdpDelta(oilPrice) {
  const pctChg    = (oilPrice - BASE_OIL_PRICE) / BASE_OIL_PRICE;
  const raw       = pctChg * -0.2 * 3;
  const asymmetry = raw < 0 ? 1.5 : 1.0;
  return raw * asymmetry;
}

// Okun's Law: -1% GDP → +0.5% unemployment
export function unemploymentDelta(oilPrice) {
  const gdp = gdpDelta(oilPrice);
  return Math.max(0, gdp * -0.5);
}

// Returns all three metrics at once
export function getMacroImpact(oilPrice) {
  return {
    inflation:    inflationDelta(oilPrice),
    gdp:          gdpDelta(oilPrice),
    unemployment: unemploymentDelta(oilPrice),
  };
}