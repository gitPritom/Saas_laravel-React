import { usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard({ stats }) {
    const { auth } = usePage().props;

    return (
        <AppLayout title="Dashboard">
            <div style={styles.root}>
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.heading}>
                            Welcome back, {auth.user.name} 👋
                        </h1>
                        <p style={styles.sub}>
                            You are logged in as&nbsp;
                            <span style={styles.roleBadge}>
                                {auth.user.roles[0]}
                            </span>
                        </p>
                    </div>
                </div>

                <div style={styles.grid}>
                    {[
                        { label: 'Total Users',   value: stats.total_users,   icon: '👥', color: '#7b61ff' },
                        { label: 'Total Events',  value: stats.total_events,  icon: '⚡', color: '#4da6ff' },
                        { label: 'Total Reports', value: stats.total_reports, icon: '📊', color: '#ff4d8d' },
                    ].map((card) => (
                        <div key={card.label} style={styles.card}>
                            <div style={{ ...styles.cardIcon, background: `${card.color}22` }}>
                                {card.icon}
                            </div>
                            <div style={{ ...styles.cardValue, color: card.color }}>
                                {card.value}
                            </div>
                            <div style={styles.cardLabel}>{card.label}</div>
                        </div>
                    ))}
                </div>

                {/* Phase 2+ will fill this */}
                <div style={styles.placeholder}>
                    🚧 Analytics charts coming in Phase 3
                </div>
            </div>
        </AppLayout>
    );
}

const styles = {
    root:        { padding: '32px', maxWidth: 1200, margin: '0 auto' },
    header:      { marginBottom: 32 },
    heading:     { fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 6 },
    sub:         { color: 'rgba(255,255,255,0.5)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 },
    roleBadge:   { background: 'rgba(123,97,255,0.2)', color: '#7b61ff', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 },
    grid:        { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 },
    card:        { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px', display: 'flex', flexDirection: 'column', gap: 10 },
    cardIcon:    { width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 },
    cardValue:   { fontSize: 36, fontWeight: 700, fontFamily: "'Syne', sans-serif" },
    cardLabel:   { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
    placeholder: { background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 16, padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 14 },
};