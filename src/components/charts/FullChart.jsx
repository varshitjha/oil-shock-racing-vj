// src/components/charts/FullChart.jsx

export default function FullChart({ data = [], color = "#f59e0b" }) {
  if (data.length < 2) return null;

  const W    = 500;
  const H    = 120;
  const min  = Math.min(...data);
  const max  = Math.max(...data);
  const range = max - min || 1;

  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 10) - 5}`
    )
    .join(" ");

  const fillPts = `0,${H} ${pts} ${W},${H}`;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon
        points={fillPts}
        fill={`url(#grad-${color.replace("#", "")})`}
      />
      <polyline fill="none" stroke={color} strokeWidth="2" points={pts} />
      <text x="4" y="14"    fill="#94a3b8" fontSize="10">${max.toFixed(0)}</text>
      <text x="4" y={H - 2} fill="#94a3b8" fontSize="10">${min.toFixed(0)}</text>
    </svg>
  );
}