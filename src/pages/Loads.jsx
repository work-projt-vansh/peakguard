// ── PeakGuard AI — Loads Management Page ──────────────────────
import { useState } from "react";
import { C } from "../theme/tokens";
import { J, SY, LBL, Card, CardHeader, Chip, LiveDot, BtnPrimary, BtnGhost, Toggle, Input, BottomSheet } from "../components/UI";

export function LoadsPage({ bp, loads, setLoads, perms, onToast }) {
  const [selected,    setSelected]   = useState(null);
  const [drawerOpen,  setDrawerOpen] = useState(false);
  const [activeTab,   setActiveTab]  = useState("config");

  const handleToggle = (id) => {
    if (!perms.edit) return onToast("Admin access required to edit loads", "err");
    setLoads(prev => prev.map(l => l.id === id ? { ...l, ctrl: !l.ctrl } : l));
    onToast("Load configuration saved");
  };

  const openLoad = (load) => {
    setSelected(load);
    setActiveTab("config");
    setDrawerOpen(true);
  };

  const TABS = ["config", "constraints", "endpoint", "test"];

  /* ── Drawer content (shared between panel & sheet) ── */
  const DrawerContent = () => {
    if (!selected) return null;
    return (
      <>
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${C.bdr}`, flexShrink: 0 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className="tb" style={{ flex: 1, padding: "9px 2px", background: activeTab === t ? C.bg3 : "none", border: "none", borderBottom: activeTab === t ? `2px solid ${C.gold}` : "2px solid transparent", color: activeTab === t ? C.gold : C.t2, fontSize: 9, textTransform: "uppercase", letterSpacing: 1, transition: "color .15s" }}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: 16, overflowY: "auto", flex: 1 }}>
          {activeTab === "config" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {[["Name", selected.name], ["Location", selected.loc], ["Avg kW", `${selected.kw}`], ["Criticality", selected.crit]].map(([label, val]) => (
                <div key={label}>
                  <LBL>{label}</LBL>
                  <Input defaultValue={val} disabled={!perms.edit} />
                </div>
              ))}
              {perms.edit && <BtnPrimary onClick={() => onToast("Configuration saved")}>Save Changes</BtnPrimary>}
            </div>
          )}

          {activeTab === "constraints" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {[["Min kW", "50"], ["Max kW", "220"], ["Min Off (min)", "15"], ["Max Off (min)", "120"]].map(([label, val]) => (
                <div key={label}>
                  <LBL>{label}</LBL>
                  <Input defaultValue={val} disabled={!perms.edit} />
                </div>
              ))}
            </div>
          )}

          {activeTab === "endpoint" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <div><LBL>API Endpoint</LBL><Input defaultValue="https://bms.local/api/v2/loads/42" /></div>
              <div><LBL>Auth Token</LBL><Input defaultValue="••••••••••" type="password" /></div>
            </div>
          )}

          {activeTab === "test" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <J s={11}>Send a test command to verify BMS connectivity.</J>
              <BtnGhost onClick={() => onToast("Test sent — 200 OK · 38ms")}>⬡ Send Test Command</BtnGhost>
              <div style={{ background: C.bg0, border: `1px solid ${C.bdr}`, borderRadius: 8, padding: "12px", lineHeight: 1.9 }}>
                {[["Connected",    C.green], ["Status: 200 OK", C.t1], ["Latency: 38ms",  C.t1], ["Last check: 2s ago", C.cyan]].map(([text, col]) => (
                  <div key={text}><J c={C.t3} s={10}>{"> "}</J><J c={col} s={10}>{text}</J></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div style={{ display: "flex", gap: 18, flexDirection: bp.md ? "column" : "row", animation: "fadeUp .3s ease" }}>

      {/* ── LOAD TABLE / CARD LIST ── */}
      <Card style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
        <CardHeader
          title="Load Inventory"
          sub={`${loads.length} loads registered · ${loads.filter(l => l.ctrl).length} controllable`}
          action={perms.edit && <BtnPrimary sm>+ Add Load</BtnPrimary>}
        />

        {bp.sm ? (
          /* Mobile card list */
          loads.map(l => (
            <div key={l.id} className="rh" onClick={() => openLoad(l)} style={{ padding: "13px 15px", borderBottom: `1px solid ${C.bg1}`, display: "flex", alignItems: "center", gap: 11, cursor: "pointer", transition: "background .15s" }}>
              <LiveDot color={l.st === "online" ? C.green : C.t3} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <J c={C.t0} s={12} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.name}</J>
                <div style={{ display: "flex", gap: 7, marginTop: 5, alignItems: "center" }}>
                  <Chip value={l.crit} />
                  <J c={C.cyan} s={11}>{l.kw} kW</J>
                </div>
              </div>
              <div onClick={e => { e.stopPropagation(); handleToggle(l.id); }}>
                <Toggle value={l.ctrl} onChange={() => handleToggle(l.id)} />
              </div>
            </div>
          ))
        ) : (
          /* Desktop table */
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.bdr}` }}>
                  {["Name", "Location", "Avg kW", "Criticality", "Ctrl", "Status", "Response", ""].map(h => (
                    <th key={h} style={{ padding: "9px 13px", textAlign: "left" }}><LBL>{h}</LBL></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loads.map(l => (
                  <tr key={l.id} className="rh" onClick={() => openLoad(l)} style={{ borderBottom: `1px solid ${C.bg1}`, cursor: "pointer", transition: "background .15s" }}>
                    <td style={{ padding: "11px 13px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <LiveDot color={l.st === "online" ? C.green : C.t3} />
                        <J c={C.t0} s={12}>{l.name}</J>
                      </div>
                    </td>
                    <td style={{ padding: "11px 13px" }}><J c={C.t2} s={11}>{l.loc}</J></td>
                    <td style={{ padding: "11px 13px" }}><J c={C.cyan} s={12} bold>{l.kw}</J></td>
                    <td style={{ padding: "11px 13px" }}><Chip value={l.crit} /></td>
                    <td style={{ padding: "11px 13px" }} onClick={e => { e.stopPropagation(); handleToggle(l.id); }}>
                      <Toggle value={l.ctrl} onChange={() => handleToggle(l.id)} />
                    </td>
                    <td style={{ padding: "11px 13px" }}><Chip value={l.st} /></td>
                    <td style={{ padding: "11px 13px" }}><J c={C.t3} s={10}>{l.ago} ago</J></td>
                    <td style={{ padding: "11px 13px" }}><BtnGhost sm>Edit</BtnGhost></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* ── EDIT DRAWER ── */}
      {bp.sm ? (
        <BottomSheet open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selected?.name || "Load Detail"}>
          <DrawerContent />
        </BottomSheet>
      ) : (
        drawerOpen && selected && (
          <Card style={{ width: bp.md ? 260 : 300, flexShrink: 0, display: "flex", flexDirection: "column", maxHeight: "70vh", animation: "slideIn .2s ease" }}>
            <div style={{ padding: "13px 15px", borderBottom: `1px solid ${C.bdr}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexShrink: 0 }}>
              <div>
                <SY s={13}>{selected.name}</SY>
                <J c={C.t2} s={10} style={{ display: "block", marginTop: 3 }}>{selected.loc} · {selected.kw} kW avg</J>
              </div>
              <button onClick={() => setDrawerOpen(false)} style={{ background: C.bg2, border: `1px solid ${C.bdr}`, color: C.t2, width: 26, height: 26, borderRadius: 6, fontSize: 14 }}>×</button>
            </div>
            <DrawerContent />
          </Card>
        )
      )}
    </div>
  );
}
