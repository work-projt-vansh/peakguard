// ── PeakGuard AI — Suggestions Page ───────────────────────────
import { useState } from "react";
import { C } from "../theme/tokens";
import { J, SY, LBL, Card, ComfortBar, BtnPrimary, BtnGhost, BtnDanger } from "../components/UI";

export function SuggestionsPage({ bp, suggs, perms, onApprove, onToast }) {
  const [simId, setSimId] = useState(null);

  const simulate = (id) => {
    setSimId(id);
    setTimeout(() => {
      setSimId(null);
      onToast("Simulation complete — projected peak reduction: 164 kW");
    }, 2200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: bp.sm ? 12 : 16, animation: "fadeUp .3s ease" }}>
      {suggs.map(s => {
        const totalKw  = s.actions.reduce((a, b) => a + b.kw, 0);
        const approved = s.actions.filter(a => a.ok).length;

        return (
          <Card key={s.id}>
            {/* ── Window Header ── */}
            <div style={{ padding: bp.sm ? "13px 14px" : "15px 18px", borderBottom: `1px solid ${C.bdr}`, background: `linear-gradient(90deg, ${C.redG}, transparent)` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                <div>
                  <SY s={14}>Peak Window</SY>
                  <J c={C.gold} s={bp.sm ? 13 : 16} style={{ display: "block", marginTop: 2 }}>{s.win}</J>
                </div>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                  {perms.execute && (
                    <BtnGhost sm onClick={() => simulate(s.id)}>
                      {simId === s.id ? "⟳ Running…" : "Simulate"}
                    </BtnGhost>
                  )}
                  {perms.approve && (
                    <BtnPrimary sm onClick={() => onToast("All actions approved and scheduled")}>
                      Approve All
                    </BtnPrimary>
                  )}
                  <BtnDanger sm onClick={() => onToast("Plan rejected — reason logged", "err")}>
                    Reject
                  </BtnDanger>
                </div>
              </div>

              {/* Stats strip */}
              <div style={{ display: "flex", gap: bp.sm ? 14 : 24, flexWrap: "wrap" }}>
                {[
                  ["Required",  `${s.reduce} kW`,        C.red  ],
                  ["Confidence",`${s.conf}%`,             C.green],
                  ["Potential", `−${totalKw} kW`,         C.cyan ],
                  ["Approved",  `${approved}/${s.actions.length}`, C.t1],
                ].map(([label, val, col]) => (
                  <div key={label}>
                    <LBL>{label}</LBL>
                    <J c={col} s={12}>{val}</J>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Action Rows ── */}
            <div style={{ padding: bp.sm ? "11px 13px" : "0 18px" }}>
              {!bp.sm && (
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 55px 90px 90px 110px", padding: "9px 0", borderBottom: `1px solid ${C.bdr}` }}>
                  {["Load", "Action", "Dur.", "Reduction", "Comfort", "Status"].map(h => <LBL key={h}>{h}</LBL>)}
                </div>
              )}

              {s.actions.map((a, ai) =>
                bp.sm ? (
                  /* Mobile card layout */
                  <div key={a.id} style={{ background: C.bg0, border: `1px solid ${C.bdr}`, borderRadius: 10, padding: "12px", marginBottom: ai < s.actions.length - 1 ? 9 : 0, opacity: a.ok ? 0.55 : 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <J c={C.t0} s={12}>{a.load}</J>
                      <J c={C.green} s={12}>−{a.kw} kW</J>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <J c={C.t2} s={11}>{a.type} · {a.dur}h</J>
                      <ComfortBar value={a.comf} />
                    </div>
                    {a.ok
                      ? <J c={C.green} s={11}>✓ Scheduled</J>
                      : perms.approve
                        ? <BtnPrimary sm onClick={() => onApprove(s.id, a.id)}>Approve</BtnPrimary>
                        : <J c={C.t3} s={10}>Pending approval</J>}
                  </div>
                ) : (
                  /* Desktop table row */
                  <div key={a.id} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 55px 90px 90px 110px", alignItems: "center", padding: "12px 0", borderBottom: ai < s.actions.length - 1 ? `1px solid ${C.bg0}` : "none", opacity: a.ok ? 0.5 : 1, transition: "opacity .3s" }}>
                    <J c={C.t0} s={12}>{a.load}</J>
                    <J c={C.t2} s={11}>{a.type}</J>
                    <J c={C.t2} s={11}>{a.dur}h</J>
                    <J c={C.green} s={12}>−{a.kw} kW</J>
                    <ComfortBar value={a.comf} />
                    <div>
                      {a.ok
                        ? <J c={C.green} s={10}>✓ Scheduled</J>
                        : perms.approve
                          ? (
                            <button onClick={() => onApprove(s.id, a.id)} style={{ background: `${C.green}14`, border: `1px solid ${C.green}44`, color: C.green, padding: "4px 11px", borderRadius: 5, fontSize: 10 }}>
                              Approve
                            </button>
                          )
                          : <J c={C.t3} s={10}>Pending</J>}
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
