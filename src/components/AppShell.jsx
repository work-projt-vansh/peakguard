// ── PeakGuard AI — App Shell Layout ───────────────────────────
import { useState } from "react";
import { C } from "../theme/tokens";
import { NAV_ITEMS } from "../data/mockData";
import { J, SY, LBL, LiveDot, BottomSheet } from "./UI";

export function AppShell({ page, onNavigate, role, onRoleChange, kw, bp, alert, onDismissAlert, children }) {
  const [sidebar, setSidebar] = useState(true);
  const [navSheet, setNavSheet] = useState(false);

  const isMobile = bp?.sm ?? false;

  const navItems = NAV_ITEMS.filter(n => !n.adminOnly || role === "admin");
  const sbW = isMobile ? 0 : sidebar ? 220 : 52;

  const handleNav = (id) => {
    onNavigate(id);
    setNavSheet(false);
  };

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: C.bg0, color: C.t1, height: "100dvh", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* ── ALERT BANNER ── */}
      {alert && (
        <div style={{ background: "linear-gradient(90deg,#160000,#2a0606,#160000)", borderBottom: "1px solid #7f1d1d33", padding: isMobile ? "7px 12px" : "8px 22px", display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", flexShrink: 0, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: C.red }} />
          <div style={{ display: "flex", gap: 8, alignItems: "center", minWidth: 0, paddingLeft: 6 }}>
            <span style={{ color: C.red, animation: "pulse 1s infinite", fontSize: 11, flexShrink: 0 }}>▲</span>
            <J c="#fca5a5" s={isMobile ? 9 : 11} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {isMobile
                ? "PEAK RISK · 15:00–18:00 · +180 kW"
                : "PEAK RISK — HIGH PROBABILITY · Today 15:00–18:00 · Estimated overage +180 kW · Immediate action required"}
            </J>
          </div>
          <button onClick={onDismissAlert} style={{ background: "none", border: "1px solid #7f1d1d55", color: C.t2, padding: "2px 8px", borderRadius: 4, fontSize: 10, flexShrink: 0 }}>✕</button>
        </div>
      )}

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* ── DESKTOP SIDEBAR ── */}
        {!isMobile && (
          <aside style={{ width: sbW, background: `linear-gradient(180deg, ${C.bg1}, ${C.bg0})`, borderRight: `1px solid ${C.bdr}`, display: "flex", flexDirection: "column", transition: "width .22s ease", flexShrink: 0, overflow: "hidden" }}>
            {/* Logo */}
            <div style={{ padding: "15px 13px", borderBottom: `1px solid ${C.bdr}`, display: "flex", alignItems: "center", gap: 10, minHeight: 56, flexShrink: 0 }}>
              <div style={{ width: 30, height: 30, flexShrink: 0, background: `${C.gold}22`, border: `1px solid ${C.gold}55`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: C.gold, boxShadow: `0 0 18px ${C.goldG}` }}>⬡</div>
              {sidebar && (
                <div>
                  <SY s={12} w={700} style={{ letterSpacing: 2, textTransform: "uppercase", display: "block" }}>PeakGuard</SY>
                  <J c={C.goldD} s={8} style={{ letterSpacing: 3, textTransform: "uppercase" }}>AI Platform</J>
                </div>
              )}
            </div>

            {/* Live kW */}
            {sidebar && (
              <div style={{ padding: "9px 14px", borderBottom: `1px solid ${C.bdr}`, display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                <LiveDot /><J c={C.green} s={10}>LIVE · {kw} kW</J>
              </div>
            )}

            {/* Nav */}
            <nav style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
              {navItems.map(n => (
                <button key={n.id} onClick={() => handleNav(n.id)} className={`nb${page === n.id ? " act" : ""}`}
                  style={{ width: "100%", background: page === n.id ? C.bg3 : "none", border: "none", borderLeft: `2px solid ${page === n.id ? C.gold : "transparent"}`, color: page === n.id ? C.gold : C.t2, padding: sidebar ? "11px 15px" : "11px 0", display: "flex", alignItems: "center", justifyContent: sidebar ? "flex-start" : "center", gap: 10, fontSize: 11, letterSpacing: 0.4 }}>
                  <span style={{ fontSize: 15, flexShrink: 0 }}>{n.ico}</span>
                  {sidebar && n.label}
                </button>
              ))}
            </nav>

            {/* Role switcher */}
            {sidebar && (
              <div style={{ padding: "12px 13px", borderTop: `1px solid ${C.bdr}`, flexShrink: 0 }}>
                <LBL>Demo Role</LBL>
                <select value={role} onChange={e => onRoleChange(e.target.value)} style={{ width: "100%", background: C.bg3, border: `1px solid ${C.bdr}`, color: C.gold, padding: "7px 9px", borderRadius: 6, fontSize: 11 }}>
                  <option value="viewer">Viewer</option>
                  <option value="operator">Operator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            {/* Collapse toggle */}
            <button onClick={() => setSidebar(v => !v)} style={{ background: "none", border: "none", borderTop: `1px solid ${C.bdr}`, color: C.t3, padding: "9px", fontSize: 13, flexShrink: 0 }}>
              {sidebar ? "◂" : "▸"}
            </button>
          </aside>
        )}

        {/* ── MAIN AREA ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Topbar */}
          <header style={{ background: `linear-gradient(90deg, ${C.bg1}, ${C.bg0})`, borderBottom: `1px solid ${C.bdr}`, padding: isMobile ? "0 12px" : "0 22px", height: isMobile ? 48 : 52, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              {isMobile && (
                <button onClick={() => setNavSheet(true)} style={{ background: "none", border: `1px solid ${C.bdr}`, color: C.t1, padding: "6px 9px", borderRadius: 6, fontSize: 14, flexShrink: 0 }}>☰</button>
              )}
              <SY s={isMobile ? 12 : 14} w={700} style={{ letterSpacing: 1, textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {NAV_ITEMS.find(n => n.id === page)?.label}
              </SY>
              {!isMobile && (
                <>
                  <div style={{ width: 1, height: 16, background: C.bdr }} />
                  <J c={C.t2} s={10}>THU 19 FEB 2026</J>
                </>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              {!isMobile && (
                <div style={{ padding: "4px 12px", background: C.bg2, border: `1px solid ${C.bdr}`, borderRadius: 6 }}>
                  <J c={C.cyan} s={10}>Westbrook Campus</J>
                </div>
              )}
              <div style={{ padding: "4px 10px", background: C.goldG, border: `1px solid ${C.gold}33`, borderRadius: 6 }}>
                <J c={C.gold} s={10}>{role.toUpperCase()}</J>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main style={{ flex: 1, overflowY: "auto", padding: isMobile ? 14 : 24, paddingBottom: isMobile ? 76 : 24 }}>
            {children}
          </main>
        </div>
      </div>

      {/* ── MOBILE BOTTOM TAB BAR ── */}
      {isMobile && (
        <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: C.bg1, borderTop: `1px solid ${C.bdr}`, display: "flex", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          {navItems.slice(0, 4).map(n => (
            <button key={n.id} onClick={() => handleNav(n.id)} style={{ flex: 1, background: "none", border: "none", borderTop: `2px solid ${page === n.id ? C.gold : "transparent"}`, color: page === n.id ? C.gold : C.t3, padding: "9px 2px 7px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 16, transition: "color .15s" }}>
              {n.ico}
              <J c="inherit" s={8} style={{ letterSpacing: 0.5, textTransform: "uppercase" }}>{n.label.slice(0, 5)}</J>
            </button>
          ))}
          <button onClick={() => setNavSheet(true)} style={{ flex: 1, background: "none", border: "none", borderTop: `2px solid ${C.bdr}`, color: C.t3, padding: "9px 2px 7px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 16 }}>
            ⋯
            <J c={C.t3} s={8} style={{ letterSpacing: 0.5, textTransform: "uppercase" }}>More</J>
          </button>
        </nav>
      )}

      {/* ── MOBILE FULL NAV SHEET ── */}
      <BottomSheet open={navSheet} onClose={() => setNavSheet(false)} title="Navigation">
        <div style={{ padding: "8px 0" }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => handleNav(n.id)} style={{ width: "100%", background: page === n.id ? C.bg3 : "none", border: "none", borderLeft: `3px solid ${page === n.id ? C.gold : "transparent"}`, color: page === n.id ? C.gold : C.t1, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, fontSize: 13, letterSpacing: 0.4 }}>
              <span style={{ fontSize: 18 }}>{n.ico}</span>{n.label}
            </button>
          ))}
          <div style={{ padding: "14px 20px", borderTop: `1px solid ${C.bdr}`, marginTop: 6 }}>
            <LBL>Demo Role</LBL>
            <select value={role} onChange={e => { onRoleChange(e.target.value); setNavSheet(false); }} style={{ width: "100%", background: C.bg3, border: `1px solid ${C.bdr}`, color: C.gold, padding: "10px 12px", borderRadius: 8, fontSize: 13 }}>
              <option value="viewer">Viewer</option>
              <option value="operator">Operator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
