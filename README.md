# PeakGuard AI — Energy Management Dashboard

A premium, fully responsive React dashboard for real-time energy demand management.

---

## 📁 Project Structure

```
peakguard/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root — routing, global state, toast
    │
    ├── theme/
    │   └── tokens.js         # Design tokens (colors, fonts, global CSS)
    │
    ├── data/
    │   └── mockData.js       # All static data & constants
    │
    ├── hooks/
    │   ├── useBreakpoint.js  # Responsive breakpoint hook
    │   └── useLiveKw.js      # Simulated WebSocket live kW hook
    │
    ├── components/
    │   ├── UI.jsx            # Shared atoms: Button, Card, Chip, Toast…
    │   └── AppShell.jsx      # Layout: sidebar, topbar, mobile nav
    │
    └── pages/
        ├── Dashboard.jsx     # KPIs, forecast chart, risk timeline
        ├── Forecast.jsx      # Load curve, heatmap, cost projection
        ├── Suggestions.jsx   # Peak window cards with approve/reject
        ├── Loads.jsx         # Load table + edit drawer (4 tabs)
        ├── Calendar.jsx      # Monthly calendar with event types
        ├── Reports.jsx       # Charts: reduction, savings, acceptance
        ├── Audit.jsx         # Filterable audit log with diffs
        └── Admin.jsx         # User management + system settings
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:3000)
npm run dev

# 3. Build for production
npm run build
```

---

## 🎨 Features

- **8 fully functional pages** — each in its own file
- **Role-based UI** — Viewer / Operator / Admin permissions enforced throughout
- **Live kW simulation** — updates every 2s simulating WebSocket feed
- **Fully responsive** — mobile (bottom nav + sheets), tablet, desktop layouts
- **Premium dark aesthetic** — Syne + JetBrains Mono, gold/cyan accent system
- **Interactive charts** — Recharts with custom tooltips and gradients
- **Smooth transitions** — page load animations, skeleton states, toast notifications

---

## 🔑 Role System

Switch roles via the sidebar dropdown (or mobile nav sheet):

| Feature         | Viewer | Operator | Admin |
|----------------|--------|----------|-------|
| View all data  | ✅     | ✅       | ✅    |
| Approve actions| ❌     | ✅       | ✅    |
| Execute/Simulate| ❌    | ✅       | ✅    |
| Edit loads     | ❌     | ❌       | ✅    |
| User management| ❌     | ❌       | ✅    |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| `< 480px` | Extra small mobile |
| `< 768px` | Mobile — bottom tab bar, slide-up sheets |
| `< 1024px`| Tablet — stacked layouts, compact sidebar |
| `≥ 1024px`| Desktop — full 3-panel layout |

---

## 🛠 Tech Stack

- **React 18** + Vite
- **Recharts** — AreaChart, BarChart, LineChart
- **JetBrains Mono** + **Syne** — Google Fonts
- Zero external UI libraries — all components hand-built
