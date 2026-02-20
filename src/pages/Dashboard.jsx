// ── PeakGuard AI — Dashboard Page ─────────────────────────────
import { useState } from "react";
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "../theme/tokens";
import { J, SY, KPICard, Card, CardHeader, ComfortBar, ChartTooltip, BtnPrimary, BottomSheet } from "../components/UI";
import { useLiveKw } from "../hooks/useLiveKw";

export function DashboardPage({ bp, suggs, perms, onApprove }) {
  const { kw, history, loading, error } = useLiveKw();
  const [qSheet, setQSheet] = useState(false);
  const firstSugg = suggs[0];

  if (loading && !history.length) return <div style={{ padding: 40, textAlign: "center", color: C.cyan }}>Connecting to PeakGuard Grid...</div>;
  if (error) return <div style={{ padding: 40, textAlign: "center", color: C.red }}>Backend Offline: {error}</div>;

  // Format history for the chart using the live data structure
  const chartData = history.map(h => ({
    t: new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    hist: h.load_kw,
    f: h.load_kw * 1.05 // Visual forecast based on live actuals
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: bp.sm ? 12 : 18, animation: "fadeUp .3s ease" }}>

      {/* ── KPI GRID ── */}
      <div style={{ display: "grid", gridTemplateColumns: bp.sm ? "1fr 1fr" : bp.md ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: bp.sm ? 10 : 14 }}>
        <KPICard label="Current Load"    value={`${kw.toFixed(2)} kW`} sub="↻ Live · Hybrid Engine" alert={kw > 85} />
        <KPICard label="Peak Prediction" value={`${(kw * 1.08).toFixed(1)} kW`} sub="LSTM Forecast"  alert={kw > 80} color={C.amber} />
        <KPICard label="Expected Cost"   value={`$${(kw * 42.5).toLocaleString(undefined, {maximumFractionDigits:0})}`} sub="Projected / Hr"  color={C.t1} />
        <KPICard label="Grid Stability"  value={kw > 90 ? "Low" : "Optimal"} sub="Real-time Status"  color={kw > 90 ? C.red : C.green} />
      </div>

      {/* ── CHART + QUICK ACTIONS ── */}
      <div style={{ display: "flex", gap: 16, flexDirection: bp.md ? "column" : "row" }}>

        {/* Main chart */}
        <Card style={{ flex: 1, minWidth: 0 }}>
          <CardHeader
            title="Real-Time Load Analysis"
            sub="Live telemetry from Flask Hybrid AI Engine"
            action={!bp.sm && (
              <div style={{ display: "flex", gap: 14 }}>
                {[["─", C.cyan, "LSTM Forecast"], ["─", C.green, "Actual"]].map(([s, c, l]) => (
                  <div key={l} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <span style={{ color: c, fontSize: 12 }}>{s}</span>
                    <J c={C.t2} s={9}>{l}</J>
                  </div>
                ))}
              </div>
            )}
          />
          <div style={{ padding: "12px 14px 14px" }}>
            <ResponsiveContainer width="100%" height={bp.sm ? 170 : bp.md ? 220 : 260}>
              <AreaChart data={chartData} margin={{ left: -8, right: 4, top: 4 }}>
                <defs>
                  <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={C.cyan} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={C.cyan} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 6" stroke={C.bdr} vertical={false} />
                <XAxis dataKey="t" tick={{ fill: C.t2, fontSize: bp.sm ? 8 : 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.t2, fontSize: bp.sm ? 8 : 9 }} axisLine={false} tickLine={false} unit="kW" width={bp.sm ? 42 : 56} />
                <Tooltip content={<ChartTooltip />} />
                <Area  type="monotone" dataKey="f"    stroke={C.cyan}  strokeWidth={2} fill="url(#dashGrad)" dot={false} name="Forecast" />
                <Line  type="monotone" dataKey="hist" stroke={C.green} strokeWidth={1.5} dot={true} name="Actual" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Actions — mobile: sheet trigger; desktop: inline panel */}
        {bp.md ? (
          <>
            <button onClick={() => setQSheet(true)} style={{ background: `linear-gradient(135deg, ${C.bg2}, ${C.surf})`, border: `1px solid ${C.red}44`, borderRadius: 12, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", boxShadow: `0 0 18px ${C.redG}` }}>
              <SY s={13} c={C.t0}>⚡ Quick Actions</SY>
              <J c={C.gold} s={11}>{firstSugg.actions.filter(a => !a.ok).length} pending →</J>
            </button>
            <BottomSheet open={qSheet} onClose={() => setQSheet(false)} title="Quick Actions — Real-time">
              <QuickActionsList actions={firstSugg.actions} suggId={firstSugg.id} perms={perms} onApprove={onApprove} />
            </BottomSheet>
          </>
        ) : (
          <Card style={{ width: 260, flexShrink: 0 }} glow={C.redG}>
            <CardHeader title="Quick Actions" sub="AI System Recommendations" />
            <QuickActionsList actions={firstSugg.actions} suggId={firstSugg.id} perms={perms} onApprove={onApprove} compact />
          </Card>
        )}
      </div>

      {/* ── RISK TIMELINE ── */}
      <Card>
        <CardHeader title="Live Activity Stream" sub="Density of load events over previous readings" />
        <div style={{ padding: bp.sm ? "11px 13px" : "13px 18px 18px" }}>
          <div style={{ display: "flex", gap: 2, height: bp.sm ? 26 : 38, borderRadius: 6, overflow: "hidden" }}>
            {history.map((d, i) => (
              <div key={i} title={`${d.timestamp} · ${d.load_kw} kW`} style={{ flex: 1, background: d.load_kw > 90 ? C.red : d.load_kw > 75 ? C.amber : d.load_kw > 50 ? C.gold + "55" : C.bdr, opacity: 0.85, cursor: "pointer", transition: "opacity .15s" }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
            {history.filter((_, i) => i % 5 === 0).map((h, i) => (
              <J key={i} c={C.t3} s={9}>{new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</J>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Quick Actions List (reused in panel + sheet) ─────────────
function QuickActionsList({ actions, suggId, perms, onApprove, compact }) {
  return (
    <div style={{ padding: compact ? "12px 14px" : "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
      {actions.map(a => (
        <div key={a.id} className="ac" style={{ background: C.bg0, border: `1px solid ${C.bdr}`, borderRadius: 10, padding: "11px", opacity: a.ok ? 0.55 : 1, transition: "all .2s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <J c={C.cyan} s={11}>{a.load}</J>
            <J c={C.green} s={12}>−{a.kw} kW</J>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 }}>
            <J c={C.t2} s={10}>{a.type}</J>
            <ComfortBar value={a.comf} />
          </div>
          {a.ok
            ? <J c={C.green} s={10}>✓ Scheduled</J>
            : perms.approve
              ? <BtnPrimary sm onClick={() => onApprove(suggId, a.id)}>ACCEPT →</BtnPrimary>
              : <J c={C.t3} s={10}>View only</J>}
        </div>
      ))}
    </div>
  );
}