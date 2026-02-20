// ── PeakGuard AI — Audit Log Page ─────────────────────────────
import { useState } from "react";
import { C } from "../theme/tokens";
import { J, Chip, BtnGhost } from "../components/UI";
import { AUDIT_DATA } from "../data/mockData";

export function AuditPage({ bp }) {
  const [query, setQuery] = useState("");

  const filtered = AUDIT_DATA.filter(l =>
    !query || [l.user, l.act, l.load].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  const borderColor = (res) =>
    res === "success" ? C.green : res === "rejected" ? C.amber : C.red;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13, animation: "fadeUp .3s ease" }}>

      {/* ── Filter Bar ── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Filter by user, action, or load…"
          style={{ flex: 1, minWidth: 160, background: C.bg2, border: `1px solid ${C.bdr}`, color: C.t0, padding: "9px 13px", borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}
        />
        {!bp.sm && ["User", "Load", "Date Range"].map(f => (
          <BtnGhost key={f} sm>{f}</BtnGhost>
        ))}
      </div>

      {/* ── Log Entries ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((l, i) => (
          <div key={l.id} style={{
            background: `linear-gradient(135deg, ${C.bg2}, ${C.surf})`,
            border: `1px solid ${C.bdr}`,
            borderLeft: `3px solid ${borderColor(l.res)}`,
            borderRadius: 10,
            padding: bp.sm ? "11px 13px" : "13px 17px",
            display: "flex", alignItems: "flex-start", gap: bp.sm ? 9 : 14,
            animation: `fadeUp .28s ease ${i * 45}ms both`,
          }}>
            {/* Timestamp */}
            <div style={{ paddingTop: 2, flexShrink: 0 }}>
              <J c={C.t3} s={10}>{l.ts}</J>
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Action + result */}
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                <J c={C.t0} s={bp.sm ? 11 : 12} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: bp.sm ? "nowrap" : "normal", maxWidth: bp.sm ? 180 : 9999 }}>
                  {l.act}
                </J>
                <Chip value={l.res} />
              </div>

              {/* Meta */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: l.fr !== "—" ? 8 : 0 }}>
                <Chip value={l.role} style={{ fontSize: 9, padding: "1px 6px" }} />
                <J c={C.t2} s={10}>{l.user}</J>
                <J c={C.t3} s={10}>·</J>
                <J c={C.t2} s={10}>{l.load}</J>
              </div>

              {/* Before → After diff */}
              {l.fr !== "—" && (
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <code style={{ background: "#1e0909", border: "1px solid #7f1d1d44", color: C.red, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                    {l.fr}
                  </code>
                  <span style={{ color: C.t3, fontSize: 12 }}>→</span>
                  <code style={{ background: "#071a10", border: `1px solid ${C.green}33`, color: C.green, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                    {l.to}
                  </code>
                </div>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <J c={C.t3} s={12}>No entries match your filter.</J>
          </div>
        )}
      </div>
    </div>
  );
}
