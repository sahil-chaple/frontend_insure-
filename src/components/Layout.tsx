import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import {
  Shield, LogOut, Menu, X, Bell, Moon, Sun, Search,
  LayoutDashboard, User, FileText, LifeBuoy, BarChart3,
  Settings, HelpCircle, MessageSquare, FolderOpen, CreditCard,
  ChevronLeft, ChevronRight, ChevronDown, ArrowUp,
} from 'lucide-react';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const PRIMARY_NAV = [
  { id: 'home', label: 'Home', icon: Home, badge: null },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'profile', label: 'Profile', icon: User, badge: null },
  { id: 'policies', label: 'Policies', icon: FileText, badge: null },
  { id: 'claims', label: 'Claims', icon: LifeBuoy, badge: 3 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
  { id: 'documents', label: 'Documents', icon: FolderOpen, badge: null },
  { id: 'billing', label: 'Billing', icon: CreditCard, badge: null },
];

const SECONDARY_NAV = [
  { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  { id: 'support', label: 'Support', icon: HelpCircle, badge: null },
  { id: 'feedback', label: 'Feedback', icon: MessageSquare, badge: null },
];

const NOTIFICATIONS = [
  { id: 1, title: 'Claim Approved', desc: 'Claim #C-2891 has been approved.', time: '5m ago', unread: true },
  { id: 2, title: 'Policy Expiring', desc: 'Auto policy expires in 30 days.', time: '2h ago', unread: true },
  { id: 3, title: 'Payment Due', desc: 'Premium payment due on Jul 15, 2026.', time: '1d ago', unread: true },
];

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem('insure-theme');
      return stored ? stored === 'dark' : true;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (dark) {
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
      }
      window.localStorage.setItem('insure-theme', dark ? 'dark' : 'light');
    }
  }, [dark]);

  return [dark, () => setDark((d) => !d)] as const;
}

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleString('en-IN', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function Layout({ children, activeTab = 'dashboard', onTabChange }: LayoutProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const profile = useAuthStore((s) => s.profile);

  const [dark, toggleDark] = useDarkMode();
  const datetime = useClock();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const [scrolled, setScrolled] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifs.filter((n) => n.unread).length;
  const avatarLetter = profile?.name?.charAt(0)?.toUpperCase() ?? 'U';
  const displayName = profile?.name ?? 'User';

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scroll-to-top visibility
  const handleScroll = useCallback(() => {
    const el = mainRef.current;
    if (el) setScrolled(el.scrollTop > 200);
  }, []);

  const scrollTop = () => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

  const markAllRead = () => setNotifs((ns) => ns.map((n) => ({ ...n, unread: false })));

  const handleLogout = () => { logout(); navigate('/login'); };
  const handleTab = (id: string) => { onTabChange?.(id); setMobileOpen(false); };

  const navItem = (item: typeof PRIMARY_NAV[0]) => (
    <button
      key={item.id}
      className={`sidebar-nav-item${activeTab === item.id ? ' active' : ''}`}
      onClick={() => handleTab(item.id)}
      title={collapsed ? item.label : undefined}
    >
      <item.icon size={18} className="nav-icon" />
      <span className="nav-label">{item.label}</span>
      {item.badge !== null && <span className="sidebar-badge">{item.badge}</span>}
    </button>
  );

  return (
    <div className="app-shell">
      {/* ── HEADER ─────────────────────────── */}
      <header className="app-header">
        {/* Hamburger (mobile) */}
        <button
          className="icon-btn lg:hidden"
          aria-label="Toggle sidebar"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Collapse toggle (desktop) */}
        <button
          className="icon-btn hidden lg:flex"
          aria-label="Collapse sidebar"
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Brand */}
        <a className="header-brand" href="/home" onClick={(e) => { e.preventDefault(); handleTab('home'); }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #3b91fd, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={16} color="#fff" />
          </div>
          <span className="header-brand-name">InsureAI</span>
        </a>

        {/* Search */}
        <div className="search-bar">
          <Search size={15} />
          <input
            type="search"
            placeholder="Search policies, claims, documents…"
            aria-label="Search"
          />
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0 }}>⌘K</span>
        </div>

        {/* Right actions */}
        <div className="header-actions">
          <span className="header-datetime">{datetime}</span>

          {/* Notifications */}
          <div className="dropdown-anchor" ref={notifRef}>
            <button
              className="icon-btn"
              aria-label="Notifications"
              onClick={() => { setNotifOpen((v) => !v); setUserOpen(false); }}
            >
              <Bell size={18} />
              {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
            </button>
            {notifOpen && (
              <div className="notif-panel">
                <div className="notif-header">
                  <span className="notif-header-title">Notifications</span>
                  <button className="notif-mark-all" onClick={markAllRead}>Mark all read</button>
                </div>
                {notifs.map((n) => (
                  <div key={n.id} className="notif-item">
                    <div className={`notif-dot${n.unread ? '' : ' read'}`} />
                    <div>
                      <div className="notif-title">{n.title}</div>
                      <div className="notif-desc">{n.desc}</div>
                      <div className="notif-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light toggle */}
          <button className="icon-btn" aria-label="Toggle theme" onClick={toggleDark}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* User dropdown */}
          <div className="dropdown-anchor" ref={userRef}>
            <button
              className="avatar-btn"
              aria-label="User menu"
              onClick={() => { setUserOpen((v) => !v); setNotifOpen(false); }}
            >
              <div className="avatar-circle">{avatarLetter}</div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'none' }} className="sm:inline">
                {displayName}
              </span>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </button>
            {userOpen && (
              <div className="dropdown-menu">
                <div className="dm-header">
                  <div className="dm-name">{displayName}</div>
                  <div className="dm-sub">InsureAI Member</div>
                </div>
                <button className="dm-item" onClick={() => { handleTab('profile'); setUserOpen(false); }}>
                  <User size={15} /> Profile
                </button>
                <button className="dm-item" onClick={() => { handleTab('settings'); setUserOpen(false); }}>
                  <Settings size={15} /> Settings
                </button>
                <button className="dm-item" onClick={() => { handleTab('support'); setUserOpen(false); }}>
                  <HelpCircle size={15} /> Help &amp; Support
                </button>
                <div className="dm-divider" />
                <button className="dm-item dm-danger" onClick={handleLogout}>
                  <LogOut size={15} /> Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── BODY ───────────────────────────── */}
      <div className="shell-body">
        {/* Mobile overlay */}
        <div
          className={`sidebar-overlay${mobileOpen ? ' active' : ''}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* ── SIDEBAR ─────────────────────── */}
        <aside className={`sidebar-shell${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}>
          <nav className="sidebar-nav">
            <span className="sidebar-section-label">Main</span>
            {PRIMARY_NAV.map(navItem)}

            <div className="sidebar-divider" />
            <span className="sidebar-section-label">Other</span>
            {SECONDARY_NAV.map(navItem)}
          </nav>

          {/* Collapse button (desktop only) */}
          <button
            className="sidebar-collapse-btn"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </aside>

        {/* ── MAIN ────────────────────────── */}
        <div className="shell-main" ref={mainRef} onScroll={handleScroll}>
          <main className="shell-content">
            {children}
          </main>

          {/* ── FOOTER ──────────────────── */}
          <Footer />
        </div>
      </div>

      {/* Scroll to top */}
      <button
        className={`scroll-top-btn${scrolled ? ' visible' : ''}`}
        onClick={scrollTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
}
