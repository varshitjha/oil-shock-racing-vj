// src/constants/scenarios.js

export const SCENARIOS = {
  gulf_war: {
    name:      "Gulf War Crisis",
    magnitude: 45,
    duration:  90,
    type:      "geopolitical",
    color:     "#ef4444",
    desc:      "Iraqi invasion of Kuwait triggers supply disruption",
  },
  opec_cut: {
    name:      "OPEC+ Production Cut",
    magnitude: 30,
    duration:  180,
    type:      "supply",
    color:     "#f59e0b",
    desc:      "Coordinated output reduction to defend price floor",
  },
  pandemic: {
    name:      "Pandemic Demand Collapse",
    magnitude: -65,
    duration:  120,
    type:      "demand",
    color:     "#8b5cf6",
    desc:      "Global lockdowns crash transportation demand",
  },
  shale_glut: {
    name:      "US Shale Supply Glut",
    magnitude: -45,
    duration:  365,
    type:      "structural",
    color:     "#3b82f6",
    desc:      "Hydraulic fracturing floods market with cheap crude",
  },
  iran_sanctions: {
    name:      "Iran Sanctions",
    magnitude: 28,
    duration:  150,
    type:      "geopolitical",
    color:     "#f97316",
    desc:      "US sanctions remove Iranian barrels from market",
  },
  energy_transition: {
    name:      "Energy Transition Signal",
    magnitude: -20,
    duration:  300,
    type:      "structural",
    color:     "#10b981",
    desc:      "Accelerating EV adoption signals long-term demand peak",
  },
};