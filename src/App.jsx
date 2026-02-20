// ── PeakGuard AI — Root Application ───────────────────────────
import { useState, useCallback } from "react";
import { GLOBAL_CSS } from "./theme/tokens";
import { C } from "./theme/tokens";
import { PERMS, genHours, LOADS_DATA, SUGGESTIONS_DATA } from "./data/mockData";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { useLiveKw } from "./hooks/useLiveKw";
import { AppShell } from "./components/AppShell";
import { J } from "./components/UI";

// Pages
import { DashboardPage }   from "./pages/Dashboard";
import { ForecastPage }    from "./pages/Forecast";
import { SuggestionsPage } from "./pages/Suggestions";
import { LoadsPage }       from "./pages/Loads";
import { CalendarPage }    from "./pages/Calendar";
import { ReportsPage }     from "./pages/Reports";
import { AuditPage }       from "./pages/Audit";
import { AdminPage }       from "./pages/Admin";

// Shared chart data (stable reference)
const HOURS = genHours();

export default function App() {
  const bp   = useBreakpoint();
  const kw   = useLiveKw(487);

  const [role,  setRole]  = useState("operator");
  const [page,  setPage]  = useState("dashboard");
  const [alert, setAlert] = useState(true);
  const [toast, setToast] = useState(null);
  const [loads, setLoads] = useState(LOADS_DATA);
  const [suggs, setSuggs] = useState(SUGGESTIONS_DATA);
  const [loading, setLoading] = useState(false);

  const perms = PERMS[role];

  /* ── Toast helper ── */
  const showToast = useCallback((msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3400);
  }, []);

  /* ── Approve suggestion action ── */
  const handleApprove = useCallback((suggId, actionId) => {
    if (!perms.approve) return showToast("Permission denied — Operator role required", "err");
    setSuggs(prev =>
      prev.map(s =>
        s.id === suggId
          ? { ...s, actions: s.actions.map(a => a.id === actionId ? { ...a, ok: true } : a) }
          : s
      )
    );
    showToast("Action approved and scheduled");
  }, [perms.approve, showToast]);

  /* ── Navigation with loading transition ── */
  const navigate = useCallback((id) => {
    setLoading(true);
    setTimeout(() => {
      setPage(id);
      setLoading(false);
    }, 150);
  }, []);

  /* ── Shared page props ── */
  const pageProps = { bp, perms, onToast: showToast };

  /* ── Page renderer ── */
  const renderPage = () => {
    if (loading) return <LoadingSkeleton bp={bp} />;
    switch (page) {
      case "dashboard":
        return <DashboardPage {...pageProps} hours={HOURS} kw={kw} suggs={suggs} onApprove={handleApprove} />;
      case "forecast":
        return <ForecastPage {...pageProps} hours={HOURS} />;
      case "suggestions":
        return <SuggestionsPage {...pageProps} suggs={suggs} onApprove={handleApprove} />;
      case "loads":
        return <LoadsPage {...pageProps} loads={loads} setLoads={setLoads} />;
      case "calendar":
        return <CalendarPage {...pageProps} />;
      case "reports":
        return <ReportsPage {...pageProps} />;
      case "audit":
        return <AuditPage {...pageProps} />;
      case "admin":
        return <AdminPage {...pageProps} role={role} onRoleChange={setRole} />;
      default:
        return null;
    }
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <AppShell
        page={page}
        onNavigate={navigate}
        role={role}
        onRoleChange={setRole}
        kw={kw}
        bp={bp}
        alert={alert}
        onDismissAlert={() => setAlert(false)}
      >
        {renderPage()}
      </AppShell>

      {/* ── Global Toast ── */}
      {toast && (
        <div style={{
          position: "fixed",
          bottom: bp.sm ? 80 : 24,
          right: bp.sm ? 8 : 20,
          left: bp.sm ? 8 : "auto",
          zIndex: 9999,
          background: toast.type === "err" ? "#170404" : C.bg2,
          border: `1px solid ${toast.type === "err" ? "#7f1d1d" : C.green + "44"}`,
          padding: "11px 16px", borderRadius: 10,
          boxShadow: "0 16px 50px rgba(0,0,0,.7)",
          animation: "fadeUp .22s ease",
          display: "flex", alignItems: "center", gap: 9,
          maxWidth: bp.sm ? "none" : 360,
        }}>
          <span style={{ color: toast.type === "err" ? C.red : C.green, fontSize: 12 }}>
            {toast.type === "err" ? "✕" : "✓"}
          </span>
          <J c={toast.type === "err" ? "#fca5a5" : "#a7f3d0"} s={12}>{toast.msg}</J>
        </div>
      )}
    </>
  );
}

/* ── Loading Skeleton ── */
function LoadingSkeleton({ bp }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: bp.sm ? "1fr 1fr" : "repeat(4,1fr)", gap: 12 }}>
        {[0,1,2,3].map(i => <Skl key={i} h={80} />)}
      </div>
      <Skl h={bp.sm ? 200 : 280} r={12} />
      <Skl h={180} r={12} />
    </div>
  );
}

const Skl = ({ h, r = 6 }) => (
  <div style={{ height: h, borderRadius: r, background: `linear-gradient(90deg, ${C.bg2}, ${C.bg3}, ${C.bg2})`, backgroundSize: "400% 100%", animation: "shimmer 1.8s infinite" }} />
);
