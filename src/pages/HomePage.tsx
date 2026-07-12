import { useState } from 'react';
import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';
import ProfileOnboardingForm from '../components/ProfileOnboardingForm';
import { useAuthStore } from '../store/authStore';
import type { Profile } from '../types';
import {
  FileText, LifeBuoy, BarChart3, CreditCard, PlusCircle,
  Download, RefreshCw, PhoneCall, Shield, Sparkles,
  TrendingUp, TrendingDown, ChevronRight, Clock,
  FolderOpen, Settings, HelpCircle, MessageSquare,
} from 'lucide-react';

import CategoryGrid from '../components/landing/CategoryGrid';
import PopularPlans from '../components/landing/PopularPlans';
import FeaturedOffers from '../components/landing/FeaturedOffers';
import Testimonials from '../components/landing/Testimonials';
import FAQAccordion from '../components/landing/FAQAccordion';
import CallToActionBanner from '../components/landing/CallToActionBanner';

/* ── MOCK DATA ─────────────────────────── */
const STAT_CARDS = [
  {
    label: 'Active Policies',
    value: '4',
    delta: '+1 this month',
    up: true,
    icon: FileText,
    bg: 'rgba(31,110,242,0.15)',
    color: '#59b0ff',
  },
  {
    label: 'Claims Filed',
    value: '7',
    delta: '2 pending',
    up: false,
    icon: LifeBuoy,
    bg: 'rgba(124,58,237,0.15)',
    color: '#a78bfa',
  },
  {
    label: 'Coverage Score',
    value: '94%',
    delta: '+3% vs last year',
    up: true,
    icon: BarChart3,
    bg: 'rgba(52,211,153,0.15)',
    color: '#34d399',
  },
  {
    label: 'Next Due',
    value: 'Jul 15',
    delta: '₹4,820 premium',
    up: true,
    icon: CreditCard,
    bg: 'rgba(251,191,36,0.15)',
    color: '#f59e0b',
  },
];

const RECENT_CLAIMS = [
  { id: 'C-2891', type: 'Health', amount: '₹28,500', date: 'Jul 05, 2026', status: 'approved' },
  { id: 'C-2756', type: 'Auto', amount: '₹12,000', date: 'Jun 20, 2026', status: 'pending' },
  { id: 'C-2641', type: 'Home', amount: '₹65,000', date: 'May 30, 2026', status: 'approved' },
  { id: 'C-2590', type: 'Travel', amount: '₹8,200', date: 'May 12, 2026', status: 'rejected' },
];

const POLICY_STATUS = [
  { name: 'Health Shield Plus', type: 'Health', renewDate: 'Dec 2026', premium: '₹6,200/yr', status: 'active' },
  { name: 'Auto Protect', type: 'Auto', renewDate: 'Jul 2026', premium: '₹4,820/yr', status: 'active' },
  { name: 'Home Guard', type: 'Home', renewDate: 'Mar 2027', premium: '₹9,500/yr', status: 'active' },
  { name: 'Travel Safe', type: 'Travel', renewDate: 'Aug 2026', premium: '₹1,800/yr', status: 'pending' },
];

const QUICK_ACTIONS = [
  { label: 'Buy Policy', icon: PlusCircle, color: '#59b0ff' },
  { label: 'File Claim', icon: LifeBuoy, color: '#a78bfa' },
  { label: 'Renew Policy', icon: RefreshCw, color: '#34d399' },
  { label: 'Download Policy', icon: Download, color: '#f59e0b' },
];

const AI_FEATURES = [
  'Instant AI-powered claim assessment',
  'Smart fraud detection & prevention',
  'Personalised coverage recommendations',
  'Automated document verification',
  'Natural language policy Q&A',
];

/* ── COMING SOON PLACEHOLDER ───────────── */
function ComingSoon({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <div className="coming-soon-card">
      <Icon size={36} strokeWidth={1.2} />
      <h3>{label}</h3>
      <p>This section is coming soon. Stay tuned!</p>
      <span className="slot-card-badge">Launching soon</span>
    </div>
  );
}
function HomePane() {
  return (
    <div className="animate-fade-in">
      <CategoryGrid />
      <PopularPlans />
      <FeaturedOffers />
      <Testimonials />
      <FAQAccordion />
      <CallToActionBanner />
    </div>
  );
}
/* ── DASHBOARD PANE ─────────────────────── */
function DashboardPane({ name }: { name?: string }) {
  return (
    <div className="animate-fade-in">
      {/* Welcome banner */}
      {/* ── NON-DESTRUCTIVE LANDING EXTENSION ── */}

      <div style={{
        background: 'linear-gradient(135deg, rgba(31,110,242,0.18), rgba(124,58,237,0.14))',
        border: '1px solid rgba(59,145,253,0.2)',
        borderRadius: 20,
        padding: '1.5rem 1.75rem',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(59,145,253,0.12), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Welcome back, {name ?? 'there'} 👋
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Here's your insurance dashboard overview for today.
            </p>
          </div>
          <div style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: 'linear-gradient(135deg, #3b91fd, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(31,110,242,0.35)',
          }}>
            <Shield size={22} color="#fff" />
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stat-cards-grid">
        {STAT_CARDS.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-card-icon" style={{ background: s.bg }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div className="stat-card-value">{s.value}</div>
              <div className="stat-card-label">{s.label}</div>
            </div>
            <div className={`stat-card-delta${s.up ? ' up' : ' down'}`}>
              {s.up ? <TrendingUp size={12} style={{ display: 'inline', marginRight: 3 }} /> : <TrendingDown size={12} style={{ display: 'inline', marginRight: 3 }} />}
              {s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="dash-grid" style={{ marginBottom: '1.5rem' }}>
        {/* Recent Claims */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-low)', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ padding: '1.125rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>Recent Claims</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{RECENT_CLAIMS.length} claims total</div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: 'var(--brand-400)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_CLAIMS.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.id}</td>
                    <td>{c.type}</td>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.amount}</td>
                    <td style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} />{c.date}</td>
                    <td><span className={`status-pill ${c.status}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions + AI card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Quick Actions */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-low)', borderRadius: 20, padding: '1.125rem 1.25rem' }}>
            <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Quick Actions</div>
            <div className="quick-actions-grid">
              {QUICK_ACTIONS.map((a) => (
                <button key={a.label} className="quick-action-btn">
                  <div className="quick-action-icon" style={{ background: `${a.color}20` }}>
                    <a.icon size={16} color={a.color} />
                  </div>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Info card */}
          <div className="ai-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Sparkles size={16} color="#59b0ff" />
              <div className="ai-card-title">InsureAI Assistant</div>
            </div>
            <div className="ai-card-sub">AI-Native Insurance Automation Platform</div>
            <div className="ai-feature-list">
              {AI_FEATURES.map((f) => (
                <div key={f} className="ai-feature-item">
                  <div className="ai-feature-dot" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Policy Status */}
      <div style={{ marginBottom: '2.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-low)', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ padding: '1.125rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>Policy Status</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>All your active policies</div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Policy Name</th>
                <th>Type</th>
                <th>Renewal</th>
                <th>Premium</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {POLICY_STATUS.map((p) => (
                <tr key={p.name}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</td>
                  <td>{p.type}</td>
                  <td>{p.renewDate}</td>
                  <td>{p.premium}</td>
                  <td><span className={`status-pill ${p.status}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>



    </div>
  );
}

/* ── PROFILE PANE ──────────────────────── */
function ProfilePane() {
  const isNewUser = useAuthStore((s) => s.isNewUser);
  const profile = useAuthStore((s) => s.profile);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  return (
    <div className="animate-fade-in" style={{ maxWidth: 520 }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Your Profile</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 4 }}>
          {isNewUser || !profile ? 'Complete your profile to unlock all features.' : 'Manage your personal information.'}
        </p>
      </div>
      {isNewUser || !profile
        ? <ProfileOnboardingForm onComplete={updateProfile} />
        : <ProfileCard profile={profile} />
      }
    </div>
  );
}

/* ── TAB BREADCRUMB LABEL ──────────────── */
const TAB_LABELS: Record<string, string> = {
  home: 'Home',
  dashboard: 'Dashboard',
  profile: 'Profile',
  policies: 'Policies',
  claims: 'Claims',
  analytics: 'Analytics',
  documents: 'Documents',
  billing: 'Billing & Payments',
  settings: 'Settings',
  support: 'Support / Help Center',
  feedback: 'Feedback',
};

const TAB_ICONS: Record<string, React.ElementType> = {
  policies: FileText,
  claims: LifeBuoy,
  analytics: BarChart3,
  documents: FolderOpen,
  billing: CreditCard,
  settings: Settings,
  support: HelpCircle,
  feedback: MessageSquare,
};

/* ── HOME PAGE ─────────────────────────── */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const profile = useAuthStore((s) => s.profile);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePane />;

      case 'dashboard':
        return <DashboardPane name={profile?.name} />;

      case 'profile':
        return <ProfilePane />;

      default: {
        const Icon = TAB_ICONS[activeTab] ?? BarChart3;
        return (
          <ComingSoon
            label={TAB_LABELS[activeTab] ?? activeTab}
            icon={Icon}
          />
        );
      }
    }
  };

  const label = TAB_LABELS[activeTab] ?? activeTab;

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {/* Breadcrumb */}
      <nav className="breadcrumb-bar" aria-label="breadcrumb">
        <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>Home</a>
        {activeTab !== 'home' && (
          <>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">{label}</span>
          </>
        )}
      </nav>

      {renderContent()}
    </Layout>
  );
}
