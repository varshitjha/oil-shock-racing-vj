// src/constants/sectors.js

export const SECTORS = [
  { key: "energy",      name: "Energy (E&P)",        beta:  0.70, color: "#f59e0b" },
  { key: "airlines",    name: "Airlines",             beta: -0.35, color: "#ef4444" },
  { key: "consumer",    name: "Consumer Disc.",        beta: -0.18, color: "#8b5cf6" },
  { key: "industrials", name: "Industrials",           beta: -0.12, color: "#6366f1" },
  { key: "healthcare",  name: "Healthcare",            beta: -0.03, color: "#10b981" },
  { key: "technology",  name: "Technology",            beta: -0.05, color: "#3b82f6" },
  { key: "utilities",   name: "Utilities",             beta: -0.08, color: "#06b6d4" },
  { key: "materials",   name: "Materials",             beta:  0.20, color: "#a78bfa" },
];

export const initSectorPrices = () =>
  Object.fromEntries(SECTORS.map((s) => [s.key, 100]));