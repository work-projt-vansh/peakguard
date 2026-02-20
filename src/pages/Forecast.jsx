// ── PeakGuard AI — Forecast Page ──────────────────────────────
import { useState } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "../theme/tokens";
import { J, Card, CardHeader, ChartTooltip, SegmentedControl } from "../components/UI";

export function ForecastPage({ bp, hours }) {
  const [horizon,    setHorizon]    = useState("24h");
  const [resolution, setResolution] = useState("1h");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: bp.sm ? 12 : 16, animation: "fadeUp .3s ease" }}>

      {/* ── CONTROLS ── */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <J s={10}>Horizon</J>
          <SegmentedControl options={["24h", "48h", "7d"]} value={horizon} onChange={setHorizon} />
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <J s={10}>Resolution</J>
          <SegmentedControl options={["15m", "1h", "4h"]} value={resolution} onChange={setResolution} />
        </div>
      </div>

      {/* ── LOAD FORECAST CURVE ── */}
      <Card>
        <CardHeader title="Load Forecast Curve" sub="AI demand prediction with 90% confidence intervals" />
        <div style={{ padding: "12px 14px 14px" }}>
          <ResponsiveContainer width="100%" height={bp.sm ? 170 : 240}>
            <AreaChart data={hours} margin={{ left: -8, right: 4 }}>
              <defs>
                <linearGradient id="fcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={C.gold} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={C.gold} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 6" stroke={C.bdr} vertical={false} />
              <XAxis dataKey="t" tick={{ fill: C.t2, fontSize: bp.sm ? 8 : 9 }} axisLine={false} tickLine={false} interval={bp.sm ? 5 : 2} />
              <YAxis tick={{ fill: C.t2, fontSize: bp.sm ? 8 : 9 }} axisLine={false} unit="kW" width={bp.sm ? 42 : 54} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="hi" stroke="none"   fill={`${C.amber}08`} fillOpacity={1} name="Upper CI" />
              <Area type="monotone" dataKey="f"  stroke={C.gold} strokeWidth={2} fill="url(#fcGrad)" dot={false} name="Forecast" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ── PEAK PROBABILITY HEATMAP ── */}
      <Card>
        <CardHeader title="Peak Probability Heatmap" sub="Hour-by-hour demand peak likelihood (darker = higher probability)" />
        <div style={{ padding: "12px 14px 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${bp.sm ? 12 : 24}, 1fr)`, gap: bp.sm ? 2 : 3, height: bp.sm ? 50 : 70 }}>
            {(bp.sm ? hours.filter((_, i) => i % 2 === 0) : hours).map((d, i) => {
              const prob = d.peak ? 0.82 + Math.random() * 0.12 : Math.random() * 0.25;
              return (
                <div key={i} title={`${d.t} · ${Math.round(prob * 100)}% probability`}
                  style={{ borderRadius: 3, background: `rgba(248,113,113,${prob * 0.9})`, cursor: "pointer", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 3 }}>
                  <span style={{ fontSize: 6, color: `rgba(255,255,255,${Math.max(0, prob - 0.2)})`, fontFamily: "monospace" }}>{d.t.slice(0, 2)}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <J c={C.t3} s={9}>0% probability</J>
            <J c={C.t3} s={9}>100% probability</J>
          </div>
        </div>
      </Card>

      {/* ── COST PROJECTION ── */}
      <Card>
        <CardHeader title="Cost Projection" sub="Estimated demand charges per interval (based on tariff schedule)" />
        <div style={{ padding: "12px 14px 14px" }}>
          <ResponsiveContainer width="100%" height={bp.sm ? 150 : 190}>
            <BarChart data={hours.filter((_, i) => i % (bp.sm ? 4 : 2) === 0)} margin={{ left: -8, right: 4 }}>
              <CartesianGrid strokeDasharray="2 6" stroke={C.bdr} vertical={false} />
              <XAxis dataKey="t" tick={{ fill: C.t2, fontSize: 8 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.t2, fontSize: 8 }} axisLine={false} unit="$" width={40} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="f" fill={C.cyanD} opacity={0.7} radius={[3, 3, 0, 0]} name="Est. Cost ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
