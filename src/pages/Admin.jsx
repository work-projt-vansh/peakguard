// ── PeakGuard AI — Admin Page ──────────────────────────────────
import { C } from "../theme/tokens";
import { J, SY, LBL, Card, CardHeader, Chip, BtnPrimary, BtnGhost } from "../components/UI";
import { USERS_DATA } from "../data/mockData";

export function AdminPage({ bp, perms, role, onRoleChange }) {
  /* ── Access guard ── */
  if (!perms.users) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 14, padding: 24, textAlign: "center", animation: "fadeUp .3s ease" }}>
        <SY s={48} c={C.bdr} style={{ display: "block" }}>⊘</SY>
        <SY s={15} c={C.t2}>Access Restricted</SY>
        <J c={C.t3} s={11}>Switch to Admin role to access user management</J>
        <div style={{ marginTop: 8 }}>
          <select
            value={role}
            onChange={e => onRoleChange(e.target.value)}
            style={{ background: C.bg3, border: `1px solid ${C.bdr}`, color: C.gold, padding: "9px 13px", borderRadius: 8, fontSize: 12 }}
          >
            <option value="viewer">Viewer</option>
            <option value="operator">Operator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    );
  }

  const STATS = [
    ["Total Users",    "4", C.t0  ],
    ["Active Today",   "3", C.green],
    ["Pending Invites","2", C.amber],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: bp.sm ? 12 : 16, animation: "fadeUp .3s ease" }}>

      {/* ── Summary Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${bp.sm ? 2 : 3}, 1fr)`, gap: bp.sm ? 9 : 13 }}>
        {STATS.map(([label, value, color]) => (
          <div key={label} style={{ background: C.bg2, border: `1px solid ${C.bdr}`, borderRadius: 10, padding: "13px 15px" }}>
            <LBL>{label}</LBL>
            <SY s={bp.sm ? 20 : 26} w={700} c={color}>{value}</SY>
          </div>
        ))}
      </div>

      {/* ── User Management Table ── */}
      <Card>
        <CardHeader
          title="User Management"
          sub="Manage roles and access permissions across the platform"
          action={<BtnPrimary sm>+ Invite User</BtnPrimary>}
        />

        {bp.sm ? (
          /* Mobile user cards */
          USERS_DATA.map(u => (
            <div key={u.email} className="rh" style={{ padding: "13px 15px", borderBottom: `1px solid ${C.bg1}`, display: "flex", alignItems: "center", gap: 11, transition: "background .15s" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.bg3, border: `1px solid ${C.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <J c={C.gold} s={13} bold>{u.name[0]}</J>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <J c={C.t0} s={12} style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</J>
                <div style={{ display: "flex", gap: 7, marginTop: 4, alignItems: "center" }}>
                  <Chip value={u.role} />
                  <J c={C.t3} s={10}>{u.last}</J>
                </div>
              </div>
              <BtnGhost sm>Edit</BtnGhost>
            </div>
          ))
        ) : (
          /* Desktop table */
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.bdr}` }}>
                {["Name", "Email", "Role", "Last Active", ""].map(h => (
                  <th key={h} style={{ padding: "9px 16px", textAlign: "left" }}><LBL>{h}</LBL></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USERS_DATA.map(u => (
                <tr key={u.email} className="rh" style={{ borderBottom: `1px solid ${C.bg1}`, transition: "background .15s" }}>
                  <td style={{ padding: "12px 16px" }}><J c={C.t0} s={12}>{u.name}</J></td>
                  <td style={{ padding: "12px 16px" }}><J c={C.t2} s={11}>{u.email}</J></td>
                  <td style={{ padding: "12px 16px" }}><Chip value={u.role} /></td>
                  <td style={{ padding: "12px 16px" }}><J c={C.t3} s={10}>{u.last}</J></td>
                  <td style={{ padding: "12px 16px" }}><BtnGhost sm>Edit</BtnGhost></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* ── System Settings ── */}
      <Card>
        <CardHeader title="System Settings" sub="Platform-wide configuration" />
        <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            ["Peak Demand Tariff",       "$12.40 / kW"],
            ["Alert Threshold",          "450 kW"],
            ["Forecast Horizon",         "48 hours"],
            ["Auto-Execute Actions",     "Disabled"],
            ["Notification Email",       "ops@facility.com"],
          ].map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.bg1}`, paddingBottom: 10 }}>
              <J c={C.t1} s={12}>{label}</J>
              <J c={C.cyan} s={12}>{val}</J>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
