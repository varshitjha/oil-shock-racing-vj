// src/components/ui/Button.jsx

export default function Button({ children, onClick, rgb = "245,158,11", style = {} }) {
  return (
    <button
      onClick={onClick}
      style={{
        background:   `rgba(${rgb},0.15)`,
        border:       `1px solid rgba(${rgb},0.4)`,
        color:        `rgb(${rgb})`,
        padding:      "8px 16px",
        borderRadius: "8px",
        cursor:       "pointer",
        fontSize:     "13px",
        fontWeight:   700,
        ...style,
      }}
    >
      {children}
    </button>
  );
}