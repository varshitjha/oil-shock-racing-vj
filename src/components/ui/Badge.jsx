// src/components/ui/Badge.jsx

export default function Badge({ children, color = "#f59e0b" }) {
  return (
    <span
      style={{
        background:   `${color}22`,
        color,
        padding:      "2px 8px",
        borderRadius: "4px",
        fontSize:     "11px",
        fontWeight:   700,
        display:      "inline-block",
      }}
    >
      {children}
    </span>
  );
}