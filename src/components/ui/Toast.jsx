// src/components/ui/Toast.jsx

export default function Toast({ toast }) {
  if (!toast) return null;

  const styles = {
    success: { bg: "rgba(16,185,129,0.95)",  icon: "✅", border: "rgba(16,185,129,0.4)"  },
    error:   { bg: "rgba(239,68,68,0.95)",   icon: "❌", border: "rgba(239,68,68,0.4)"   },
    warn:    { bg: "rgba(245,158,11,0.95)",  icon: "⚡", border: "rgba(245,158,11,0.4)"  },
    info:    { bg: "rgba(59,130,246,0.95)",  icon: "ℹ️", border: "rgba(59,130,246,0.4)"  },
  };
  const s = styles[toast.type] || styles.info;

  return (
    <div
      className="toast-enter"
      style={{
        position:       "fixed",
        top:            "76px",
        right:          "24px",
        zIndex:         200,
        background:     s.bg,
        border:         `1px solid ${s.border}`,
        color:          "#fff",
        padding:        "12px 18px",
        borderRadius:   "10px",
        fontWeight:     600,
        fontSize:       "13px",
        backdropFilter: "blur(12px)",
        boxShadow:      "0 8px 32px rgba(0,0,0,0.4)",
        display:        "flex",
        alignItems:     "center",
        gap:            "8px",
        maxWidth:       "320px",
        letterSpacing:  "0.01em",
      }}
    >
      <span>{s.icon}</span>
      <span>{toast.msg}</span>
    </div>
  );
}