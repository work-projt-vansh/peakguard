// ── PeakGuard AI — Shared UI Components ───────────────────────
import { useEffect } from "react";
import { C } from "../theme/tokens";

// ─── Typography ────────────────────────────────────────────────
export const J = ({ c = C.t1, s = 11, bold, children, style }) => (
  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: s, color: c, fontWeight: bold ? 600 : 400, letterSpacing: 0.3, ...style }}>
    {children}
  </span>
);

export const SY = ({ c = C.t0, s = 14, w = 700, children, style }) => (
  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: s, fontWeight: w, color: c, ...style }}>
    {children}
  </span>
);

export const LBL = ({ children, mb = 5 }) => (
  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: C.t2, textTransform: "uppercase", letterSpacing: 2, marginBottom: mb }}>
    {children}
  </div>
);

// ─── Indicators ───────────────────────────────────────────────
export const LiveDot = ({ color = C.green }) => (
  <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, flexShrink: 0 }}>
    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.4, animation: "pulse 2s infinite", transform: "scale(2)" }} />
    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color }} />
  </span>
);

export const ComfortBar = ({ value, max = 5 }) => (
  <div style={{ display: "flex", gap: 3 }}>
    {Array.from({ length: max }, (_, i) => (
      <div key={i} style={{ width: 12, height: 4, borderRadius: 2, background: i < value ? (value <= 2 ? C.green : value <= 3 ? C.amber : C.red) : C.bg3 }} />
    ))}
  </div>
);

export const Skeleton = ({ w = "100%", h = 20, r = 6 }) => (
  <div style={{ width: w, height: h, borderRadius: r, background: `linear-gradient(90deg, ${C.bg2}, ${C.bg3}, ${C.bg2})`, backgroundSize: "400% 100%", animation: "shimmer 1.8s infinite" }} />
);

// ─── Chip / Badge ─────────────────────────────────────────────
const CMAP = {
  critical: { bg: "#1a0028", fg: "#e879f9", bd: "#6b21a8" },
  high:     { bg: "#1e0909", fg: C.red,     bd: "#991b1b"  },
  medium:   { bg: "#1c1400", fg: C.amber,   bd: "#92400e"  },
  low:      { bg: "#071a10", fg: C.green,   bd: "#065f46"  },
  online:   { bg: "#071a10", fg: C.green,   bd: "#065f46"  },
  offline:  { bg: "#111",   fg: "#475569",  bd: "#1e293b"  },
  success:  { bg: "#071a10", fg: C.green,   bd: "#065f46"  },
  rejected: { bg: "#1e0909", fg: C.red,     bd: "#991b1b"  },
  failed:   { bg: "#1e0909", fg: C.red,     bd: "#991b1b"  },
  admin:    { bg: "#1a1200", fg: C.gold,    bd: "#78350f"  },
  operator: { bg: "#071420", fg: C.cyan,    bd: "#164e63"  },
  viewer:   { bg: "#111",   fg: C.t1,      bd: C.bdr      },
  auto:     { bg: "#0d1520", fg: "#7dd3fc", bd: "#1e3a5f"  },
};

export const Chip = ({ value, style }) => {
  const s = CMAP[value] || CMAP.low;
  return (
    <span style={{
      background: s.bg, color: s.fg, border: `1px solid ${s.bd}`,
      padding: "2px 8px", borderRadius: 3,
      fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
      textTransform: "uppercase", letterSpacing: 1.2,
      whiteSpace: "nowrap", display: "inline-block",
      ...style,
    }}>
      {value}
    </span>
  );
};

// ─── Card ─────────────────────────────────────────────────────
export const Card = ({ children, style, glow }) => (
  <div style={{
    background: `linear-gradient(135deg, ${C.bg2}ee, ${C.surf}dd)`,
    border: `1px solid ${C.bdr}`,
    borderRadius: 12,
    overflow: "hidden",
    backdropFilter: "blur(6px)",
    boxShadow: glow ? `0 0 32px ${glow}` : "inset 0 1px 0 rgba(255,255,255,.03)",
    ...style,
  }}>
    {children}
  </div>
);

export const CardHeader = ({ title, sub, action }) => (
  <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.bdr}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
    <div>
      <SY s={13}>{title}</SY>
      {sub && <J c={C.t2} s={10} style={{ display: "block", marginTop: 3 }}>{sub}</J>}
    </div>
    {action && <div style={{ flexShrink: 0 }}>{action}</div>}
  </div>
);

// ─── Buttons ──────────────────────────────────────────────────
export const BtnPrimary = ({ children, onClick, sm, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="bp" style={{
    background: "linear-gradient(135deg, #1a3a6b, #1e4080)",
    border: "1px solid #2a5298", color: "#93c5fd",
    fontSize: sm ? 10 : 11, padding: sm ? "6px 12px" : "8px 16px",
    borderRadius: 6, transition: "all .15s", opacity: disabled ? 0.5 : 1,
    letterSpacing: 0.4, whiteSpace: "nowrap",
  }}>
    {children}
  </button>
);

export const BtnGhost = ({ children, onClick, sm }) => (
  <button onClick={onClick} className="bg" style={{
    background: "transparent", border: `1px solid ${C.bdr}`,
    color: C.t2, fontSize: sm ? 10 : 11,
    padding: sm ? "6px 12px" : "8px 16px",
    borderRadius: 6, letterSpacing: 0.4,
    whiteSpace: "nowrap", transition: "all .15s",
  }}>
    {children}
  </button>
);

export const BtnDanger = ({ children, onClick, sm }) => (
  <button onClick={onClick} style={{
    background: "#1e0909", border: "1px solid #7f1d1d",
    color: C.red, fontSize: sm ? 10 : 11,
    padding: sm ? "6px 12px" : "8px 16px",
    borderRadius: 6, letterSpacing: 0.4, whiteSpace: "nowrap",
  }}>
    {children}
  </button>
);

// ─── Chart Tooltip ────────────────────────────────────────────
export const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.bg1, border: `1px solid ${C.bdrB}`, borderRadius: 8, padding: "10px 14px", boxShadow: "0 16px 40px rgba(0,0,0,.7)" }}>
      <J c={C.t2} s={10}>{label}</J>
      <div style={{ marginTop: 5, display: "flex", flexDirection: "column", gap: 3 }}>
        {payload.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            <J c={C.t1} s={11}>{p.name}: <strong style={{ color: C.t0 }}>{typeof p.value === "number" ? Math.round(p.value) : p.value}</strong></J>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── KPI Card ─────────────────────────────────────────────────
export const KPICard = ({ label, value, sub, alert, color }) => {
  const col = color || (alert ? C.red : C.cyan);
  return (
    <div className="kc" style={{
      background: `linear-gradient(135deg, ${C.bg2}, ${C.surf})`,
      border: `1px solid ${alert ? C.red + "33" : C.bdr}`,
      borderRadius: 12, padding: "15px 17px",
      position: "relative", overflow: "hidden",
      boxShadow: alert ? `0 0 28px ${C.redG}` : "none",
      transition: "transform .25s",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${col}55, transparent)` }} />
      <LBL>{label}</LBL>
      <SY s={22} w={700} style={{ display: "block", lineHeight: 1, animation: "ntick .35s ease" }}>{value}</SY>
      {sub && <J c={C.t2} s={10} style={{ display: "block", marginTop: 6 }}>{sub}</J>}
      <div style={{ position: "absolute", bottom: -20, right: -20, width: 60, height: 60, borderRadius: "50%", background: `radial-gradient(circle, ${col}11, transparent 70%)` }} />
    </div>
  );
};

// ─── Bottom Sheet / Overlay ───────────────────────────────────
export const BottomSheet = ({ open, onClose, title, children }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.75)", animation: "overlayIn .2s ease" }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: C.bg1, borderRadius: "16px 16px 0 0",
        border: `1px solid ${C.bdr}`, borderBottom: "none",
        maxHeight: "88vh", display: "flex", flexDirection: "column",
        animation: "slideUp .28s cubic-bezier(.32,0,.67,0)",
      }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.bdr}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <SY s={14}>{title}</SY>
          <button onClick={onClose} style={{ background: C.bg2, border: `1px solid ${C.bdr}`, color: C.t2, width: 30, height: 30, borderRadius: 8, fontSize: 16 }}>×</button>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

// ─── Segmented Control ────────────────────────────────────────
export const SegmentedControl = ({ options, value, onChange }) => (
  <div style={{ display: "flex", background: C.bg2, borderRadius: 6, padding: 2, border: `1px solid ${C.bdr}` }}>
    {options.map(o => (
      <button key={o} onClick={() => onChange(o)} style={{
        padding: "5px 10px", borderRadius: 4,
        background: value === o ? C.bg3 : "none",
        border: value === o ? `1px solid ${C.bdrB}` : "1px solid transparent",
        color: value === o ? C.t0 : C.t2,
        fontSize: 10, letterSpacing: 0.4, transition: "all .15s",
      }}>
        {o}
      </button>
    ))}
  </div>
);

// ─── Toggle Switch ────────────────────────────────────────────
export const Toggle = ({ value, onChange }) => (
  <div
    onClick={onChange}
    style={{
      width: 38, height: 21, borderRadius: 11,
      background: value ? `linear-gradient(90deg, ${C.cyanD}, ${C.cyan})` : C.bg3,
      border: `1px solid ${value ? C.cyan + "44" : C.bdr}`,
      position: "relative", cursor: "pointer", transition: "all .25s",
      boxShadow: value ? `0 0 10px ${C.cyanG}` : "none",
    }}
  >
    <div style={{
      position: "absolute", top: 2, left: value ? 19 : 2,
      width: 15, height: 15, borderRadius: "50%",
      background: value ? "#fff" : C.t2,
      transition: "left .22s",
    }} />
  </div>
);

// ─── Input ────────────────────────────────────────────────────
export const Input = ({ value, onChange, placeholder, type = "text", disabled, style }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    disabled={disabled}
    style={{
      width: "100%", background: C.bg0,
      border: `1px solid ${C.bdr}`, color: disabled ? C.t2 : C.t0,
      padding: "8px 10px", borderRadius: 6,
      fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
      ...style,
    }}
  />
);

// ─── Section Divider ─────────────────────────────────────────
export const Divider = ({ style }) => (
  <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.bdr}, transparent)`, ...style }} />
);
