// src/components/charts/MiniChart.jsx

export default function MiniChart({ data = [], color = "#f59e0b", w = 120, h = 40 }) {
  if (data.length < 2) return <svg width={w} height={h} />;

  const min   = Math.min(...data);
  const max   = Math.max(...data);
  const range = max - min || 1;

  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`
    )
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts} />
    </svg>
  );
}