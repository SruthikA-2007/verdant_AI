import { Bell, Search, Zap } from 'lucide-react';
import './Topbar.css';

export default function Topbar({ title, subtitle }) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <header className="topbar">
      <div className="topbar__left">
        <h1 className="topbar__title">{title}</h1>
        {subtitle && <p className="topbar__subtitle">{subtitle}</p>}
      </div>
      <div className="topbar__right">
        <div className="topbar__datetime">
          <span className="topbar__time">{timeStr}</span>
          <span className="topbar__date">{dateStr}</span>
        </div>
        <div className="topbar__divider" />
        <button className="topbar__icon-btn" title="Notifications">
          <Bell size={18} />
          <span className="topbar__notif-dot" />
        </button>
        <div className="topbar__ai-badge">
          <Zap size={12} fill="currentColor" />
          AI Active
        </div>
      </div>
    </header>
  );
}

