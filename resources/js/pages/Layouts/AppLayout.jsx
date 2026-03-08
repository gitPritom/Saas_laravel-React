import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

const NAV = [
    { label: 'Dashboard',  href: 'dashboard',      icon: '⬛', permission: 'view dashboard' },
    { label: 'Analytics',  href: 'analytics.index', icon: '📈', permission: 'view analytics' },
    { label: 'Reports',    href: 'reports.index',   icon: '📊', permission: 'view reports'   },
    { label: 'Users',      href: 'users.index',     icon: '👥', permission: 'view users'     },
    { label: 'Settings',   href: 'settings.index',  icon: '⚙️',  permission: 'view settings'  },
];

export default function AppLayout({ children, title }) {
    const { auth, tenant, flash } = usePage().props;
    const [collapsed, setCollapsed] = useState(false);

    const hasPermission = (permission) =>
        auth.user.permissions.includes(permission);

    const logout = () => router.post(route('logout'));

    return (
        <div style={styles.root}>
            {/* Sidebar */}
            <aside style={{ ...styles.sidebar, width: collapsed ? 64 : 220 }}>
                {/* Logo */}
                <div style={styles.logoWrap}>
                    {!collapsed && (
                        <span style={styles.logoText}>InsightFlow</span>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        style={styles.collapseBtn}
                    >
                        {collapsed ? '→' : '←'}
                    </button>
                </div>

                {/* Tenant badge */}
                {!collapsed && tenant && (
                    <div style={styles.tenantBadge}>
                        <span style={styles.tenantDot} />
                        <span style={styles.tenantName}>{tenant.name}</span>
                        <span style={styles.tenantPlan}>{tenant.plan}</span>
                    </div>
                )}

                {/* Nav */}
                <nav style={styles.nav}>
                    {NAV.filter((n) => hasPermission(n.permission)).map((item) => {
                        const active = route().current(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={route(item.href)}
                                style={{
                                    ...styles.navItem,
                                    background: active
                                        ? 'rgba(123,97,255,0.15)'
                                        : 'transparent',
                                    borderColor: active
                                        ? 'rgba(123,97,255,0.5)'
                                        : 'transparent',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                }}
                            >
                                <span style={styles.navIcon}>{item.icon}</span>
                                {!collapsed && (
                                    <span style={{
                                        ...styles.navLabel,
                                        color: active ? '#7b61ff' : 'rgba(255,255,255,0.6)',
                                    }}>
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User + Logout */}
                <div style={styles.userSection}>
                    {!collapsed && (
                        <div style={styles.userInfo}>
                            <div style={styles.userAvatar}>
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div style={styles.userName}>{auth.user.name}</div>
                                <div style={styles.userRole}>
                                    {auth.user.roles[0]}
                                </div>
                            </div>
                        </div>
                    )}
                    <button onClick={logout} style={styles.logoutBtn}>
                        {collapsed ? '🚪' : 'Logout'}
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main style={styles.main}>
                {/* Flash messages */}
                {flash?.success && (
                    <div style={styles.flashSuccess}>{flash.success}</div>
                )}
                {flash?.error && (
                    <div style={styles.flashError}>{flash.error}</div>
                )}

                {children}
            </main>
        </div>
    );
}

const styles = {
    root:        { display: 'flex', minHeight: '100vh', background: '#0a0a0f' },
    sidebar:     { display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.06)', transition: 'width 0.2s', overflow: 'hidden', flexShrink: 0 },
    logoWrap:    { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    logoText:    { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: '#fff', whiteSpace: 'nowrap' },
    collapseBtn: { background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '4px 8px', fontSize: 12 },
    tenantBadge: { margin: '12px', padding: '10px 12px', background: 'rgba(123,97,255,0.08)', border: '1px solid rgba(123,97,255,0.2)', borderRadius: 10, display: 'flex', flexDirection: 'column', gap: 2 },
    tenantDot:   { width: 6, height: 6, borderRadius: '50%', background: '#7ed321', display: 'inline-block', marginBottom: 2 },
    tenantName:  { fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    tenantPlan:  { fontSize: 10, color: '#7b61ff', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' },
    nav:         { flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 4 },
    navItem:     { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: '1px solid transparent', textDecoration: 'none', transition: 'all 0.15s' },
    navIcon:     { fontSize: 16, flexShrink: 0 },
    navLabel:    { fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' },
    userSection: { padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 8 },
    userInfo:    { display: 'flex', alignItems: 'center', gap: 10 },
    userAvatar:  { width: 34, height: 34, borderRadius: 10, background: 'rgba(123,97,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#7b61ff', flexShrink: 0 },
    userName:    { fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' },
    userRole:    { fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize' },
    logoutBtn:   { background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.2)', borderRadius: 8, color: '#ff4d4d', cursor: 'pointer', padding: '8px 12px', fontSize: 12, fontWeight: 600, transition: 'all 0.15s' },
    main:        { flex: 1, overflow: 'auto' },
    flashSuccess:{ margin: '16px 32px 0', padding: '12px 16px', background: 'rgba(126,211,33,0.1)', border: '1px solid rgba(126,211,33,0.3)', borderRadius: 10, color: '#7ed321', fontSize: 13 },
    flashError:  { margin: '16px 32px 0', padding: '12px 16px', background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.3)', borderRadius: 10, color: '#ff4d4d', fontSize: 13 },
};