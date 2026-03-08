import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

const DEMO_ACCOUNTS = [
  { role: "Super Admin", email: "superadmin@insightflow.test", color: "#ff4d4d", icon: "⚡" },
  { role: "Admin",       email: "admin@insightflow.test",      color: "#f5a623", icon: "🛡" },
  { role: "Analyst",     email: "analyst@insightflow.test",    color: "#4da6ff", icon: "📊" },
  { role: "Viewer",      email: "viewer@insightflow.test",     color: "#7ed321", icon: "👁" },
];

export default function Login({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "", password: "", remember: false,
  });

  const [focused, setFocused] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => () => reset("password"), []);

  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };

  const fillDemo = (email) => {
    setData({ email, password: "password", remember: false });
  };

  return (
    <div style={styles.root}>
      {/* Animated grid background */}
      <div style={styles.grid} />
      <div style={styles.glow} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="14" width="6" height="12" rx="1" fill="#4da6ff"/>
              <rect x="11" y="8" width="6" height="18" rx="1" fill="#7b61ff"/>
              <rect x="20" y="2" width="6" height="24" rx="1" fill="#ff4d8d"/>
            </svg>
          </div>
          <span style={styles.logoText}>InsightFlow</span>
        </div>

        <h1 style={styles.heading}>Welcome back</h1>
        <p style={styles.sub}>Sign in to your dashboard</p>

        {status && <div style={styles.statusBanner}>{status}</div>}

        {/* RBAC Demo Pills */}
        <div style={styles.demoLabel}>Try a demo account</div>
        <div style={styles.demoGrid}>
          {DEMO_ACCOUNTS.map((acc) => (
            <button
              key={acc.role}
              type="button"
              onClick={() => fillDemo(acc.email)}
              style={{
                ...styles.demoPill,
                borderColor: data.email === acc.email ? acc.color : "transparent",
                background: data.email === acc.email
                  ? `${acc.color}18`
                  : "rgba(255,255,255,0.04)",
              }}
            >
              <span style={styles.demoIcon}>{acc.icon}</span>
              <span style={{ color: acc.color, fontWeight: 600, fontSize: 12 }}>
                {acc.role}
              </span>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={submit} style={styles.form}>
          {/* Email */}
          <div style={styles.fieldWrap}>
            <label style={styles.label}>Email</label>
            <div style={{
              ...styles.inputWrap,
              borderColor: focused === "email" ? "#7b61ff" : errors.email
                ? "#ff4d4d" : "rgba(255,255,255,0.1)",
              boxShadow: focused === "email" ? "0 0 0 3px rgba(123,97,255,0.2)" : "none",
            }}>
              <svg style={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <input
                style={styles.input}
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                placeholder="you@company.com"
                autoComplete="username"
              />
            </div>
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          {/* Password */}
          <div style={styles.fieldWrap}>
            <div style={styles.labelRow}>
              <label style={styles.label}>Password</label>
              <a href={route("password.request")} style={styles.forgotLink}>
                Forgot password?
              </a>
            </div>
            <div style={{
              ...styles.inputWrap,
              borderColor: focused === "password" ? "#7b61ff" : errors.password
                ? "#ff4d4d" : "rgba(255,255,255,0.1)",
              boxShadow: focused === "password" ? "0 0 0 3px rgba(123,97,255,0.2)" : "none",
            }}>
              <svg style={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                style={styles.input}
                type={visible ? "text" : "password"}
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                style={styles.eyeBtn}
                tabIndex={-1}
              >
                {visible ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          {/* Remember */}
          <label style={styles.rememberRow}>
            <input
              type="checkbox"
              checked={data.remember}
              onChange={(e) => setData("remember", e.target.checked)}
              style={styles.checkbox}
            />
            <span style={styles.rememberText}>Remember me for 30 days</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={processing}
            style={{
              ...styles.submitBtn,
              opacity: processing ? 0.7 : 1,
            }}
          >
            {processing ? (
              <span style={styles.spinner}>⟳</span>
            ) : (
              "Sign in to Dashboard →"
            )}
          </button>
        </form>

        {/* Role Legend */}
        <div style={styles.roleTable}>
          <div style={styles.roleTableTitle}>Role Permissions</div>
          {[
            { role: "Super Admin", perms: "All tenants, god mode", color: "#ff4d4d" },
            { role: "Admin",       perms: "Full tenant access",    color: "#f5a623" },
            { role: "Analyst",     perms: "Reports + Analytics",   color: "#4da6ff" },
            { role: "Viewer",      perms: "Read-only dashboard",   color: "#7ed321" },
          ].map((r) => (
            <div key={r.role} style={styles.roleRow}>
              <span style={{ ...styles.roleBadge, background: `${r.color}22`, color: r.color }}>
                {r.role}
              </span>
              <span style={styles.rolePerms}>{r.perms}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
  },
  grid: {
    position: "absolute", inset: 0,
    backgroundImage: `
      linear-gradient(rgba(123,97,255,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(123,97,255,0.07) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  glow: {
    position: "absolute",
    top: "30%", left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600, height: 600,
    background: "radial-gradient(circle, rgba(123,97,255,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    width: "100%", maxWidth: 440,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: "36px 36px 28px",
    backdropFilter: "blur(20px)",
    animation: "fadeUp 0.5s ease both",
  },
  logoWrap: {
    display: "flex", alignItems: "center", gap: 10, marginBottom: 28,
  },
  logoIcon: {
    width: 44, height: 44,
    background: "rgba(123,97,255,0.15)",
    border: "1px solid rgba(123,97,255,0.3)",
    borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  logoText: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800, fontSize: 20,
    color: "#fff", letterSpacing: "-0.5px",
  },
  heading: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700, fontSize: 26,
    color: "#fff", marginBottom: 6,
  },
  sub: {
    color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 24,
  },
  statusBanner: {
    background: "rgba(125,211,252,0.1)",
    border: "1px solid rgba(125,211,252,0.3)",
    borderRadius: 8, padding: "10px 14px",
    color: "#7dd3fc", fontSize: 13, marginBottom: 16,
  },
  demoLabel: {
    fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
    color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
    marginBottom: 10,
  },
  demoGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: 8, marginBottom: 24,
  },
  demoPill: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "8px 12px", borderRadius: 8,
    border: "1px solid transparent",
    cursor: "pointer", transition: "all 0.2s",
    textAlign: "left",
  },
  demoIcon: { fontSize: 16 },
  form: { display: "flex", flexDirection: "column", gap: 16 },
  fieldWrap: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" },
  labelRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  forgotLink: { fontSize: 12, color: "#7b61ff", textDecoration: "none" },
  inputWrap: {
    display: "flex", alignItems: "center",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, padding: "0 14px",
    transition: "all 0.2s",
  },
  inputIcon: { color: "rgba(255,255,255,0.3)", flexShrink: 0 },
  input: {
    flex: 1, background: "transparent", border: "none", outline: "none",
    color: "#fff", fontSize: 14, padding: "12px 10px",
    fontFamily: "'DM Sans', sans-serif",
  },
  eyeBtn: {
    background: "none", border: "none",
    cursor: "pointer", fontSize: 14, padding: 4,
  },
  error: { fontSize: 12, color: "#ff4d4d" },
  rememberRow: {
    display: "flex", alignItems: "center",
    gap: 8, cursor: "pointer",
  },
  checkbox: { accentColor: "#7b61ff", width: 16, height: 16 },
  rememberText: { fontSize: 13, color: "rgba(255,255,255,0.5)" },
  submitBtn: {
    width: "100%", padding: "13px",
    background: "linear-gradient(135deg, #7b61ff, #4da6ff)",
    border: "none", borderRadius: 10,
    color: "#fff", fontSize: 15, fontWeight: 600,
    cursor: "pointer", transition: "opacity 0.2s",
    fontFamily: "'DM Sans', sans-serif",
    marginTop: 4,
  },
  spinner: { display: "inline-block", animation: "spin 1s linear infinite" },
  roleTable: {
    marginTop: 24, paddingTop: 20,
    borderTop: "1px solid rgba(255,255,255,0.07)",
  },
  roleTableTitle: {
    fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
    color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
    marginBottom: 10,
  },
  roleRow: {
    display: "flex", alignItems: "center",
    gap: 10, marginBottom: 8,
  },
  roleBadge: {
    fontSize: 11, fontWeight: 700,
    padding: "3px 8px", borderRadius: 6,
    minWidth: 80, textAlign: "center",
  },
  rolePerms: { fontSize: 12, color: "rgba(255,255,255,0.4)" },
};