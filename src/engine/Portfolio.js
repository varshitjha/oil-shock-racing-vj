// src/engine/Portfolio.js

const STARTING_CASH = 100_000;

export class Portfolio {
  constructor() {
    this.cash     = STARTING_CASH;
    this.holdings = {};   // { sectorKey: quantity }
    this.history  = [STARTING_CASH];
  }

  buy(sectorKey, quantity, price) {
    const cost = quantity * price;
    if (cost > this.cash) {
      return { success: false, message: "Insufficient funds!" };
    }
    this.cash -= cost;
    this.holdings[sectorKey] = (this.holdings[sectorKey] || 0) + quantity;
    return {
      success: true,
      message: `Bought ${quantity} shares @ $${price.toFixed(2)}`,
    };
  }

  sell(sectorKey, quantity, price) {
    const held = this.holdings[sectorKey] || 0;
    if (held < quantity) {
      return { success: false, message: "Not enough shares!" };
    }
    this.cash += quantity * price;
    this.holdings[sectorKey] = held - quantity;
    if (this.holdings[sectorKey] === 0) delete this.holdings[sectorKey];
    return {
      success: true,
      message: `Sold ${quantity} shares @ $${price.toFixed(2)}`,
    };
  }

  totalValue(sectorPrices) {
    const holdingsValue = Object.entries(this.holdings).reduce(
      (sum, [key, qty]) => sum + qty * (sectorPrices[key] || 100),
      0
    );
    return this.cash + holdingsValue;
  }

  pnl(sectorPrices) {
    return this.totalValue(sectorPrices) - STARTING_CASH;
  }

  pnlPct(sectorPrices) {
    return (this.pnl(sectorPrices) / STARTING_CASH) * 100;
  }

  recordSnapshot(sectorPrices) {
    this.history.push(Math.round(this.totalValue(sectorPrices)));
    if (this.history.length > 200) this.history.shift();
  }

  reset() {
    this.cash     = STARTING_CASH;
    this.holdings = {};
    this.history  = [STARTING_CASH];
  }
}