// ── PeakGuard AI — Calendar Page ──────────────────────────────
import { C } from "../theme/tokens";
import { J, SY, LBL, Card } from "../components/UI";
import { CAL_EVENTS, EV_COLORS } from "../data/mockData";

export function CalendarPage({ bp }) {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const dayLabels = bp.sm
    ? ["M", "T", "W", "T", "F", "S", "S"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp .3s ease" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <SY s={bp.sm ? 15 : 18} w={700}>February 2026</SY>
        <div style={{ display: "flex", gap: bp.sm ? 8 : 14, flexWrap: "wrap" }}>
          {Object.entries(EV_COLORS)
            .filter(([k]) => k !== "today")
            .map(([type, color]) => (
              <div key={type} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
                <J c={C.t2} s={bp.sm ? 9 : 10}>{type}</J>
              </div>
            ))}
        </div>
      </div>

      <Card style={{ overflow: "hidden" }}>
        {/* Day labels */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: `1px solid ${C.bdr}` }}>
          {dayLabels.map((d, i) => (
            <div key={i} style={{ padding: bp.sm ? "7px 4px" : "9px", textAlign: "center" }}>
              <LBL>{d}</LBL>
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {days.map(d => {
            const ev    = CAL_EVENTS.find(e => e.d === d);
            const color = ev ? EV_COLORS[ev.type] : null;
            const isToday = d === 19;

            return (
              <div key={d} className="rh" style={{ minHeight: bp.sm ? 52 : 78, padding: bp.sm ? "7px 5px" : "9px 8px", borderRight: `1px solid ${C.bg1}`, borderBottom: `1px solid ${C.bg1}`, background: isToday ? `${C.gold}0a` : "transparent", cursor: "pointer", transition: "background .15s" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: bp.sm ? 11 : 12, color: isToday ? C.gold : C.t2, fontWeight: isToday ? 600 : 400, width: bp.sm ? 18 : 22, height: bp.sm ? 18 : 22, borderRadius: "50%", border: isToday ? `1px solid ${C.gold}55` : "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: isToday ? `0 0 10px ${C.goldG}` : "none" }}>
                  {d}
                </div>
                {ev && (
                  <div style={{ marginTop: 4, background: `${color}14`, borderLeft: `2px solid ${color}`, borderRadius: "0 3px 3px 0", padding: bp.sm ? "2px 3px" : "3px 6px" }}>
                    <J c={color} s={bp.sm ? 7 : 9}>
                      {bp.sm ? ev.label.slice(0, 6) : ev.label}
                    </J>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
