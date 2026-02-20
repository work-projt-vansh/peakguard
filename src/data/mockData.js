// ── PeakGuard AI — Mock Data ───────────────────────────────────

export const genHours = () =>
  Array.from({ length: 24 }, (_, h) => {
    const base = 320 + Math.sin((h - 6) * Math.PI / 12) * 180;
    const f = Math.round(Math.max(150, base + (Math.random() - 0.5) * 40 + (h > 14 && h < 20 ? 130 : 0)));
    return {
      t: `${String(h).padStart(2, "0")}:00`,
      f,
      hist: h < 18 ? f - Math.round((Math.random() - 0.5) * 18) : null,
      hi: f + 45,
      lo: Math.max(150, f - 45),
      peak: h >= 15 && h <= 19,
    };
  });

export const LOADS_DATA = [
  { id: 1, name: "HVAC · Main Building",  loc: "Block A",     kw: 145, crit: "high",     ctrl: true,  st: "online",  ago: "12s" },
  { id: 2, name: "Chiller Plant #1",       loc: "Utility",     kw: 210, crit: "high",     ctrl: false, st: "online",  ago: "8s"  },
  { id: 3, name: "Lighting · Floors 1–5", loc: "Block A/B",   kw: 42,  crit: "low",      ctrl: true,  st: "online",  ago: "45s" },
  { id: 4, name: "EV Charging Bay",        loc: "Parking",     kw: 88,  crit: "medium",   ctrl: true,  st: "online",  ago: "3s"  },
  { id: 5, name: "Server Room Cooling",    loc: "Data Center", kw: 95,  crit: "critical", ctrl: false, st: "online",  ago: "2s"  },
  { id: 6, name: "Workshop Machinery",     loc: "Block C",     kw: 175, crit: "medium",   ctrl: true,  st: "offline", ago: "2m"  },
  { id: 7, name: "Cafeteria Equipment",    loc: "Block B",     kw: 38,  crit: "low",      ctrl: true,  st: "online",  ago: "18s" },
];

export const SUGGESTIONS_DATA = [
  {
    id: 1, win: "15:00 – 18:00", reduce: 180, conf: 91,
    actions: [
      { id: 1, load: "EV Charging Bay",        type: "Defer",         dur: 3, kw: 88, comf: 1, ok: false },
      { id: 2, load: "HVAC · Main Building",   type: "Setpoint +2°C", dur: 3, kw: 52, comf: 3, ok: false },
      { id: 3, load: "Lighting · Floors 1–5",  type: "Dim 40%",       dur: 3, kw: 17, comf: 2, ok: false },
    ],
  },
  {
    id: 2, win: "16:30 – 17:30", reduce: 90, conf: 78,
    actions: [
      { id: 4, load: "Workshop Machinery",  type: "Pause cycle",  dur: 1, kw: 60, comf: 2, ok: false },
      { id: 5, load: "Cafeteria Equipment", type: "Standby mode", dur: 1, kw: 28, comf: 1, ok: false },
    ],
  },
];

export const AUDIT_DATA = [
  { id: 1, ts: "10:42", user: "j.smith",  role: "admin",    act: "Approved suggestion #A-1042", load: "HVAC · Main Building",  res: "success",  fr: "24°C",      to: "26°C"       },
  { id: 2, ts: "10:38", user: "m.jones",  role: "operator", act: "Rejected suggestion #A-1041", load: "EV Charging Bay",       res: "rejected", fr: "—",         to: "—"          },
  { id: 3, ts: "09:55", user: "j.smith",  role: "admin",    act: "Modified load constraints",   load: "Chiller Plant #1",      res: "success",  fr: "minKw: 80", to: "minKw: 100" },
  { id: 4, ts: "09:12", user: "system",   role: "auto",     act: "Auto-schedule executed",       load: "Lighting · Floors 1–5", res: "success",  fr: "100%",      to: "60%"        },
  { id: 5, ts: "08:30", user: "r.patel",  role: "operator", act: "Manual override attempted",    load: "Workshop Machinery",    res: "failed",   fr: "running",   to: "running"    },
];

export const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const REPORT_DATA = {
  peak:    MONTHS.map(m => ({ m, a: 80 + Math.random() * 120, tgt: 150 })),
  savings: MONTHS.map(m => ({ m, v: 2000 + Math.random() * 3000 })),
};

export const USERS_DATA = [
  { name: "John Smith",  email: "j.smith@facility.com",  role: "admin",    last: "2m ago" },
  { name: "Maria Jones", email: "m.jones@facility.com",  role: "operator", last: "1h ago" },
  { name: "Raj Patel",   email: "r.patel@facility.com",  role: "operator", last: "3h ago" },
  { name: "Sara Chen",   email: "s.chen@facility.com",   role: "viewer",   last: "1d ago" },
];

export const CAL_EVENTS = [
  { d: 3,  type: "holiday",  label: "Holiday"        },
  { d: 7,  type: "maint",    label: "Maintenance"    },
  { d: 12, type: "exam",     label: "Exam Period"    },
  { d: 15, type: "peak",     label: "Peak Warning"   },
  { d: 19, type: "today",    label: "Today"          },
  { d: 22, type: "custom",   label: "Special Event"  },
  { d: 28, type: "maint",    label: "Sched. Maint."  },
];

export const EV_COLORS = {
  holiday: "#38bdf8",
  maint:   "#fbbf24",
  exam:    "#a78bfa",
  peak:    "#f87171",
  today:   "#c8a96e",
  custom:  "#22d3ee",
};

export const PERMS = {
  viewer:   { approve: false, execute: false, edit: false, users: false },
  operator: { approve: true,  execute: true,  edit: false, users: false },
  admin:    { approve: true,  execute: true,  edit: true,  users: true  },
};

export const NAV_ITEMS = [
  { id: "dashboard",   ico: "◈", label: "Dashboard"   },
  { id: "forecast",    ico: "⌬", label: "Forecast"    },
  { id: "suggestions", ico: "◎", label: "Suggestions" },
  { id: "loads",       ico: "⊞", label: "Loads"       },
  { id: "calendar",    ico: "▦", label: "Calendar"    },
  { id: "reports",     ico: "▨", label: "Reports"     },
  { id: "audit",       ico: "▤", label: "Audit Log"   },
  { id: "admin",       ico: "⬡", label: "Admin",       adminOnly: true },
];
