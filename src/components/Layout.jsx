import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Home, Wallet, ShieldAlert, Activity, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Layout = () => {
  const { user, logout, notifications } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return (
      <div className="app-wrapper bg-transparent min-h-screen">
        <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
          {notifications.map(n => (
            <div key={n.id} className="glass-panel p-4 animate-fade-in" style={{ borderLeftWidth: '4px', borderLeftColor: n.type === 'primary' ? 'var(--primary)' : `var(--${n.type})`}}>
               <span className="text-sm font-semibold">{n.message}</span>
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Plans', path: '/plans', icon: <Shield size={20} /> },
    { name: 'Wallet & Claims', path: '/wallet', icon: <Wallet size={20} /> },
    { name: 'Admin', path: '/admin', icon: <Activity size={20} /> },
    { name: 'Phase 2 Demo', path: '/phase2', icon: <ShieldAlert size={20} /> },
  ];

  return (
    <div className="app-wrapper bg-transparent flex flex-row min-h-screen">
      <aside style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '2.5rem 1.5rem', background: 'var(--bg-surface)', borderRight: '1px solid var(--border-glass)' }}>
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="text-white p-2 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary)' }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold m-0 tracking-tight text-main">GigShield AI</h2>
            <div className="text-xs text-muted font-medium mt-1">Parametric Protection</div>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const bgClass = isActive ? 'var(--secondary)' : 'transparent';
            const colorClass = isActive ? 'white' : 'var(--text-muted)';
            
            return (
              <button 
                key={item.name}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 p-3 text-left transition-all rounded-lg"
                style={{
                  background: bgClass,
                  color: colorClass,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? '600' : '400'
                }}
              >
                {item.icon}
                {item.name}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto px-4 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-gray-100 text-black border border-gray-200">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-sm text-black">{user.name}</div>
              <div className="text-xs text-muted">{user.platform} Partner</div>
            </div>
          </div>
          
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center gap-3 w-full text-left text-primary font-medium bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative" style={{ height: '100vh', overflowY: 'auto' }}>
        <div className="container flex-1" style={{ padding: '3rem 2rem' }}>
          <header className="flex justify-between items-center mb-10 border-b pb-6" style={{ borderColor: 'var(--border-glass)' }}>
            <h1 className="text-3xl font-extrabold text-main tracking-tight">{navItems.find(i => i.path === location.pathname)?.name || 'Phase 2 Evaluator'}</h1>
            <div className="flex gap-4 items-center">
               <div className="text-sm px-4 py-2 font-medium rounded-full" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
                 City: <span className="font-bold text-main ml-1">{user.city}</span>
               </div>
            </div>
          </header>
          <Outlet />
        </div>
        
        <footer className="w-full text-center py-8 mt-auto" style={{ borderTop: '1px solid var(--border-glass)', background: 'var(--bg-dark)' }}>
          <p className="text-xs text-muted mb-2 font-medium">© 2026 GigShield AI. All rights reserved for gig workers.</p>
          <div className="flex justify-center gap-6 text-xs font-semibold text-main">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Support</a>
          </div>
        </footer>
      </main>

      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className="glass-panel p-4 animate-fade-in flex items-center gap-3"
            style={{ borderLeftWidth: '4px', borderLeftColor: n.type === 'primary' ? 'var(--primary)' : `var(--${n.type})` }}
          >
             <span className="text-sm font-semibold text-main">{n.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
