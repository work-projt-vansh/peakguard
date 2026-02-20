// ── PeakGuard AI — Design Tokens ──────────────────────────────
export const C = {
  // Backgrounds
  bg0: "#03050a",
  bg1: "#070c14",
  bg2: "#0c1220",
  bg3: "#111827",
  surf: "#0d1525",
  surfH: "#121d30",

  // Borders
  bdr: "#1a2540",
  bdrB: "#243352",

  // Accent — Gold
  gold: "#c8a96e",
  goldD: "#9a7a4a",
  goldG: "rgba(200,169,110,0.14)",

  // Accent — Cyan
  cyan: "#38bdf8",
  cyanD: "#0ea5e9",
  cyanG: "rgba(56,189,248,0.11)",

  // Status
  green: "#34d399",
  greenG: "rgba(52,211,153,0.11)",
  red: "#f87171",
  redG: "rgba(248,113,113,0.11)",
  amber: "#fbbf24",

  // Text
  t0: "#f0f4ff",
  t1: "#94a3b8",
  t2: "#4a5568",
  t3: "#2d3748",
};

export const FONTS = {
  display: "'Syne', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; overscroll-behavior: none; -webkit-text-size-adjust: 100%; }
:root { color-scheme: dark; }
body { background: #03050a; font-family: 'JetBrains Mono', monospace; color: #94a3b8; }
::-webkit-scrollbar { width: 3px; height: 3px; }
::-webkit-scrollbar-thumb { background: #1a2540; border-radius: 2px; }
::-webkit-scrollbar-track { background: transparent; }

@keyframes fadeUp   { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
@keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.25} }
@keyframes shimmer  { 0%{background-position:-400% 0} 100%{background-position:400% 0} }
@keyframes overlayIn{ from{opacity:0} to{opacity:1} }
@keyframes slideUp  { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
@keyframes ntick    { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
@keyframes slideIn  { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }

/* Interactive states */
.nb          { transition: all .18s; }
.nb:hover    { background: #111827 !important; }
.nb.act      { background: #111827 !important; }
.rh:hover    { background: #121d30 !important; }
.bp:hover    { filter: brightness(1.18); transform: translateY(-1px); }
.bg:hover    { background: #111827 !important; border-color: #243352 !important; }
.kc:hover    { transform: translateY(-2px); }
.ac:hover    { border-color: #243352 !important; }
.tb:hover    { color: #94a3b8 !important; }

/* Inputs */
input:focus  { outline: none !important; border-color: #0ea5e9 !important; box-shadow: 0 0 0 3px rgba(56,189,248,0.12) !important; }
select:focus { outline: none; }
button       { cursor: pointer; font-family: 'JetBrains Mono', monospace; }

/* Touch targets on mobile */
@media (max-width: 768px) {
  button { min-height: 38px; }
}
`;
