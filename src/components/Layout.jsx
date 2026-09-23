import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { initials } from './ui';

const NAV = {
  admin: [
    { to: '/', label: 'Overview', icon: '📊', end: true },
    { to: '/people', label: 'People', icon: '👥' },
    { to: '/materials', label: 'Materials', icon: '📁' },
    { to: '/domains', label: 'Domains', icon: '🗂️' },
    { to: '/community', label: 'Community', icon: '💬' },
    { to: '/logs', label: 'Activity logs', icon: '🧾' },
    { to: '/account', label: 'Account', icon: '⚙️' },
  ],
  manager: [
    { to: '/', label: 'Dashboard', icon: '📊', end: true },
    { to: '/people', label: 'My Team', icon: '👥' },
    { to: '/materials', label: 'Materials', icon: '📁' },
    { to: '/community', label: 'Community', icon: '💬' },
    { to: '/logs', label: 'Activity logs', icon: '🧾' },
    { to: '/account', label: 'Account', icon: '⚙️' },
  ],
  employee: [
    { to: '/', label: 'Domains', icon: '🎯', end: true },
    { to: '/progress', label: 'My Progress', icon: '📈' },
    { to: '/community', label: 'Community', icon: '💬' },
    { to: '/account', label: 'Account', icon: '⚙️' },
  ],
};

const ROLE_LABEL = { admin: 'Administrator', manager: 'Manager', employee: 'Engineer' };

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const items = NAV[user.role] || [];

  const current = items.find((i) => (i.end ? loc.pathname === i.to : loc.pathname.startsWith(i.to) && i.to !== '/'));
  const title = current?.label || (loc.pathname === '/' ? items[0]?.label : 'Details');

  return (
    <div className="shell">
      <div className={`backdrop ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <div className="logo">LS</div>
          <div>
            <b>LeadSoC</b>
            <br />
            <span>Training Portal</span>
          </div>
        </div>
        <nav>
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              end={i.end}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="ic">{i.icon}</span>
              {i.label}
            </NavLink>
          ))}
        </nav>
        <div className="side-foot">
            Signed in as
          <br />
          <div className="side-foot1">
          
          <b style={{ color: '#dfe5f5' }}>{user.name}</b>
          <button className="logout" onClick={logout} title="Sign out">⏻</button>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="hamburger" onClick={() => setOpen(true)} aria-label="Menu">
            ☰
          </button>
          <div style={{ flex: 1 }}>
            <div className="title">{title}</div>
            <div className="subtitle hide-mobile">{ROLE_LABEL[user.role]} workspace</div>
          </div>
          <div className="userchip">
            <div className="stack hide-mobile" style={{ alignItems: 'flex-end', lineHeight: 1.2 }}>
              {/* <span style={{ fontSize: 13.5, fontWeight: 600 }}>{user.name}</span> */}
              <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>{user.email}</span>
            </div>
            <div className="avatar" title={user.name}>
              {initials(user.name)}
            </div>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
