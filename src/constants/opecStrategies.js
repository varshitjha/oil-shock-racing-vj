// src/constants/opecStrategies.js

export const OPEC_STRATEGIES = [
  {
    key:    "cut",
    label:  "Production Cut",
    effect: 15,
    icon:   "✂️",
    desc:   "Reduce output to raise prices",
    color:  "#f59e0b",
  },
  {
    key:    "hold",
    label:  "Hold Steady",
    effect: 0,
    icon:   "⚖️",
    desc:   "Monitor market conditions",
    color:  "#3b82f6",
  },
  {
    key:    "flood",
    label:  "Market Flood",
    effect: -20,
    icon:   "🌊",
    desc:   "Regain market share aggressively",
    color:  "#ef4444",
  },
  {
    key:    "cheat",
    label:  "Cheat Quota",
    effect: -8,
    icon:   "🤫",
    desc:   "Secret overproduction above quota",
    color:  "#8b5cf6",
  },
];