import { NavLink, useNavigate } from 'react-router-dom';
import {
  Sparkles, Bot, User2, MapPin, DollarSign, BarChart2, Rocket,
  LayoutDashboard, Package, Receipt, Truck, TrendingUp, Megaphone, FileBarChart,
  LogOut, HelpCircle, ChevronLeft,
} from 'lucide-react';
import './SIHSidebar.css';

const advisorNav = [
  { to: '/advisor',            icon: Sparkles,      label: 'Advisor Home' },
  { to: '/advisor/profile',    icon: User2,         label: 'Business Profile' },
  { to: '/advisor/ideas',      icon: Bot,           label: 'Business Ideas' },
  { to: '/advisor/analysis',   icon: MapPin,        label: 'Local Intelligence' },
  { to: '/advisor/financial',  icon: DollarSign,    label: 'Financial Plan' },
  { to: '/advisor/simulator',  icon: BarChart2,     label: 'Risk Simulator' },
  { to: '/advisor/launchpad',  icon: Rocket,        label: 'Launch Plan' },
];

const managementNav = [
  { to: '/businesses',     icon: LayoutDashboard, label: 'Dashboard',        note: 'Select a business' },
];

const growNav = [
  { label: 'Seasonal Trends', icon: TrendingUp,   to: '/businesses' },
  { label: 'Marketing AI',    icon: Megaphone,    to: '/businesses' },
  { label: 'Reports',         icon: FileBarChart, to: '/businesses' },
];

export default function SIHSidebar({ user, onLogout, onToast }) {
  const navigate = useNavigate();

  return (
    <aside className="sih-sidebar">
      {/* Brand */}
      <div className="sih-sidebar__brand" onClick={() => navigate('/advisor')}>
        <div className="sih-sidebar__logo">
          <Sparkles size={16} fill="currentColor" />
        </div>
        <div>
          <span className="sih-sidebar__brand-name">Verdant AI</span>
          <span className="sih-sidebar__brand-tag">SIH26091</span>
        </div>
      </div>

      {/* Scrollable nav */}
      <nav className="sih-sidebar__nav">
        {/* AI Advisor section */}
        <div className="sih-sidebar__section-label">AI ADVISOR</div>
        {advisorNav.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/advisor'}
              className={({ isActive }) =>
                `sih-sidebar__item ${isActive ? 'sih-sidebar__item--active' : ''}`
              }
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <div className="sih-sidebar__divider" />

        {/* Business Management */}
        <div className="sih-sidebar__section-label">BUSINESS MANAGEMENT</div>
        <NavLink to="/businesses" className={({ isActive }) => `sih-sidebar__item ${isActive ? 'sih-sidebar__item--active' : ''}`}>
          <LayoutDashboard size={17} />
          <span>My Businesses</span>
        </NavLink>
        <div className="sih-sidebar__item sih-sidebar__item--disabled">
          <Package size={17} />
          <span>Operations</span>
        </div>
        <div className="sih-sidebar__item sih-sidebar__item--disabled">
          <Receipt size={17} />
          <span>Expenses</span>
        </div>
        <div className="sih-sidebar__item sih-sidebar__item--disabled">
          <Truck size={17} />
          <span>Suppliers</span>
        </div>

        <div className="sih-sidebar__divider" />

        {/* Grow */}
        <div className="sih-sidebar__section-label">GROW</div>
        <div className="sih-sidebar__item sih-sidebar__item--disabled">
          <TrendingUp size={17} />
          <span>Seasonal Trends</span>
        </div>
        <div className="sih-sidebar__item sih-sidebar__item--disabled">
          <Megaphone size={17} />
          <span>Marketing AI</span>
        </div>
        <div className="sih-sidebar__item sih-sidebar__item--disabled">
          <FileBarChart size={17} />
          <span>Reports</span>
        </div>

        <div className="sih-sidebar__divider" />

        {/* Support */}
        <div className="sih-sidebar__item" onClick={() => onToast?.('Help & documentation coming soon.', 'info')}>
          <HelpCircle size={17} />
          <span>Help</span>
        </div>
      </nav>

      {/* Footer — user + logout */}
      {user && (
        <div className="sih-sidebar__footer">
          <div className="sih-sidebar__user">
            <div className="sih-sidebar__avatar">
              {(user.name || user.email || 'U')[0].toUpperCase()}
            </div>
            <div className="sih-sidebar__user-info">
              <p className="sih-sidebar__user-name">{user.name || user.email}</p>
              <p className="sih-sidebar__user-role">Entrepreneur</p>
            </div>
          </div>
          <button className="sih-sidebar__logout" onClick={onLogout} title="Logout">
            <LogOut size={15} />
          </button>
        </div>
      )}
    </aside>
  );
}

