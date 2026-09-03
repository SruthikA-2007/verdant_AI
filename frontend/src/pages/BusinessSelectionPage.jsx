import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut, Sparkles } from 'lucide-react';
import { businessSelectionOptions } from '../data/businessProfiles';
import './BusinessFlow.css';

export default function BusinessSelectionPage({ user, selectedBusiness, onSelectBusiness, onLogout, onToast }) {
  const navigate = useNavigate();

  const handleChoose = (option) => {
    if (!option.available) {
      onToast?.(`${option.label} is not enabled in this demo yet.`, 'info');
      return;
    }

    onSelectBusiness?.(option);
    navigate(option.route);
  };

  return (
    <div className="selection-page">
      <header className="selection-page__header">
        <div className="selection-page__title">
          <div className="auth-brand__badge" style={{ color: '#2563EB', background: '#EFF6FF', borderColor: 'rgba(37, 99, 235, 0.14)' }}>
            <Sparkles size={14} />
            Choose a business type
          </div>
          <h1>Select the MSME workflow you want to manage.</h1>
          <p>
            The demo includes eight business categories for the onboarding flow, but only bakery and grocery are implemented right now.
            Pick one of them to open a fully detailed working page.
          </p>
        </div>

        <div className="selection-page__meta">
          <div className="selection-page__user">
            Signed in as<br />
            <strong>{user.email}</strong>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <div className="selection-page__grid">
        {businessSelectionOptions.map((option) => {
          const Icon = option.icon;
          const active = selectedBusiness?.slug === option.slug;

          return (
            <button
              key={option.slug}
              type="button"
              className={`selection-card selection-card--clickable ${active ? 'selection-card--active' : ''} ${!option.available ? 'selection-card--disabled' : ''}`}
              onClick={() => handleChoose(option)}
              disabled={!option.available}
            >
              <div className="selection-card__icon" style={{ background: option.softBg, color: option.accent }}>
                <Icon size={22} />
              </div>
              <div className="selection-card__category">{option.category}</div>
              <h3>{option.label}</h3>
              <p>{option.description}</p>
              <div className="selection-card__footer">
                <span className="selection-card__status" style={{ color: option.available ? option.accent : 'var(--text-muted)' }}>
                  {option.available ? 'Available now' : 'Coming soon'}
                </span>
                <span className="selection-card__chip" style={{ background: option.softBg, color: option.accent }}>
                  {option.available ? 'Open demo' : 'Locked'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="selection-page__note">
        <span>
          Tip: bakery is ideal for food processing workflows, while grocery covers retail stock, reorders, and customer bills.
        </span>
        <button className="btn btn-primary btn-sm" onClick={() => onToast?.('Only bakery and grocery are implemented in this build.', 'info')}>
          View implementation note
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
