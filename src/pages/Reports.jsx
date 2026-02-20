// ── PeakGuard AI — Reports Page ────────────────────────────────
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "../theme/tokens";
import { J, SY, LBL, Card, CardHeader, ChartTooltip, BtnGhost } from "../components/UI";
import { REPORT_DATA } from "../data/mockData";

export function ReportsPage({ bp }) {
  const SUMMARY = [
    ["Peaks Avoided", "247",     C.green],
    ["kW Reduced",    "18,430",  C.cyan ],
    ["Savings (YTD)", "$41.2k",  C.gold ],
    ["Avg Decision",  "2.4 min", C.t1   ],
    ["Uptime",        "99.7%",   C.green],
  ];

  const ACCEPTANCE = [
    ["Accepted", 68, C.green],
    ["Modified", 18, C.amber],
    ["Rejected", 14, C.red  ],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: bp.sm ? 12 : 16, animation: "fadeUp .3s ease" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <SY s={bp.sm ? 14 : 16} w={700}>Performance Reports — 2025</SY>
        <div style={{ display: "flex", gap: 8 }}>
          <BtnGhost sm>Export CSV</BtnGhost>
          <BtnGhost sm>Export PDF</BtnGhost>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ display: "grid", gridTemplateColumns: bp.sm ? "1fr 1fr" : "repeat(5, 1fr)", gap: bp.sm ? 9 : 12 }}>
        {SUMMARY.map(([label, value, color]) => (
          <div key={label} style={{ background: C.bg2, border: `1px solid ${C.bdr}`, borderRadius: 10, padding: "12px 14px" }}>
            <LBL>{label}</LBL>
            <SY s={bp.sm ? 17 : 20} w={700} c={color}>{value}</SY>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: bp.sm || bp.md ? "1fr" : "1fr 1fr", gap: bp.sm ? 12 : 16 }}>

        {/* Peak Reduction Trend */}
        <Card>
          <CardHeader title="Peak Reduction Trend" sub="Actual vs. target kW reduction per month" />
          <div style={{ padding: "12px 14px 14px" }}>
            <ResponsiveContainer width="100%" height={bp.sm ? 150 : 190}>
              <BarChart data={REPORT_DATA.peak} margin={{ left: -8, right: 4 }}>
                <CartesianGrid strokeDasharray="2 6" stroke={C.bdr} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: C.t2, fontSize: bp.sm ? 7 : 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.t2, fontSize: 8 }} axisLine={false} unit="kW" width={40} />
                <Tooltip content={<ChartTooltip />} />
                <Bar  dataKey="a"   fill={C.cyan}  opacity={0.75} radius={[3, 3, 0, 0]} name="Actual (kW)" />
                <Line dataKey="tgt" stroke={C.amber} strokeWidth={1.5} dot={false} name="Target (kW)" type="monotone" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Cost Savings */}
        <Card>
          <CardHeader title="Cost Savings" sub="Monthly demand charge savings ($)" />
          <div style={{ padding: "12px 14px 14px" }}>
            <ResponsiveContainer width="100%" height={bp.sm ? 150 : 190}>
              <AreaChart data={REPORT_DATA.savings} margin={{ left: -8, right: 4 }}>
                <defs>
                  <linearGradient id="savGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={C.green} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={C.green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 6" stroke={C.bdr} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: C.t2, fontSize: bp.sm ? 7 : 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.t2, fontSize: 8 }} axisLine={false} unit="$" width={44} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="v" stroke={C.green} strokeWidth={2} fill="url(#savGrad)" name="Savings ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Acceptance Rate */}
      <Card>
        <CardHeader title="Action Acceptance Rate" sub="How operators responded to AI suggestions this year" />
        <div style={{ padding: "16px 18px", display: "flex", gap: bp.sm ? 16 : 28, alignItems: "center", flexWrap: "wrap" }}>
          {/* Big numbers */}
          {ACCEPTANCE.map(([label, value, color]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <SY s={bp.sm ? 26 : 34} w={800} c={color} style={{ display: "block", lineHeight: 1 }}>{value}%</SY>
              <J c={C.t2} s={9}>{label}</J>
            </div>
          ))}
          {/* Bar chart */}
          <div style={{ flex: 1, minWidth: 140, display: "flex", flexDirection: "column", gap: 7 }}>
            {ACCEPTANCE.map(([label, value, color]) => (
              <div key={label} style={{ display: "flex", gap: 9, alignItems: "center" }}>
                <J c={C.t2} s={9} style={{ width: 46, flexShrink: 0 }}>{label}</J>
                <div style={{ flex: 1, height: 5, background: C.bg3, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 3, boxShadow: `0 0 8px ${color}55` }} />
                </div>
                <J c={color} s={10}>{value}%</J>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
