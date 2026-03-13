// src/constants/historicalData.js

export const HISTORICAL_EVENTS = [
  {
    year:     "1973",
    event:    "OPEC Embargo",
    oilChg:   "+300%",
    gdpImpact:"-3.5% GDP",
    duration: "5 months",
    positive: false,
  },
  {
    year:     "1979",
    event:    "Iran Revolution",
    oilChg:   "+130%",
    gdpImpact:"-2.2% GDP",
    duration: "24 months",
    positive: false,
  },
  {
    year:     "1990",
    event:    "Gulf War",
    oilChg:   "+110%",
    gdpImpact:"-0.8% GDP",
    duration: "6 months",
    positive: false,
  },
  {
    year:     "2008",
    event:    "Demand Peak",
    oilChg:   "+120%",
    gdpImpact:"-4.3% GDP",
    duration: "8 months",
    positive: false,
  },
  {
    year:     "2014",
    event:    "Shale Glut",
    oilChg:   "-70%",
    gdpImpact:"+0.5% GDP",
    duration: "24 months",
    positive: true,
  },
  {
    year:     "2020",
    event:    "COVID Crash",
    oilChg:   "-130%",
    gdpImpact:"-5.5% GDP",
    duration: "2 months",
    positive: false,
  },
];

export const LEADERBOARD = [
  { rank: 1, name: "OilWolf_99",  pts: 48320, ret: "+41.2%", strategy: "Long Energy / Short Airlines",  color: "#f59e0b" },
  { rank: 2, name: "BarrelBaron", pts: 44110, ret: "+38.7%", strategy: "OPEC Timing + TIPS",            color: "#94a3b8" },
  { rank: 3, name: "ShockTrader", pts: 39500, ret: "+31.5%", strategy: "Geopolitical Pairs",            color: "#f97316" },
  { rank: 4, name: "FuturesCzar", pts: 33400, ret: "+24.8%", strategy: "Volatility Straddles",          color: "#64748b" },
  { rank: 5, name: "AlgoEnergy",  pts: 28900, ret: "+19.3%", strategy: "Sector Rotation",               color: "#64748b" },
];