import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, ShieldCheck, BarChart2, Eye, EyeOff } from 'lucide-react';
import './LoginPage.css';

const features = [
  { icon: TrendingUp, label: 'Revenue Insights', desc: 'Real-time sales & growth analytics.' },
  { icon: BarChart2, label: 'Smart Inventory', desc: 'AI-powered stock management.' },
  { icon: ShieldCheck, label: 'Secure & Private', desc: 'Enterprise-grade data protection.' },
];

export default function LoginPage({ onLogin, onToast }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes('@') || !email.includes('.')) {
      onToast?.('Please enter a valid email address.', 'warning');
      return;
    }

    if (password.trim().length < 3) {
      onToast?.('Please enter your password.', 'warning');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const nextPath = onLogin?.({ email, name: email.split('@')[0] }) || '/businesses';
      navigate(nextPath);
    }, 600);
  };

  return (
    <div className="login-page">
      {/* Left Brand Panel */}
      <aside className="login-brand">
        <div className="login-brand__inner">
          {/* Logo */}
          <div className="login-brand__logo">
            <div className="login-brand__logo-icon">
              <Zap size={18} fill="white" />
            </div>
            <span className="login-brand__logo-text">GrowPilot <strong>AI</strong></span>
          </div>

          {/* Headline */}
          <div className="login-brand__headline">
            <h1>Your business,<br />powered by AI.</h1>
            <p>
              Join thousands of MSME owners who manage inventory, customers,
              and growth — all from one intelligent platform.
            </p>
          </div>

          {/* Feature List */}
          <ul className="login-brand__features">
            {features.map(({ icon: Icon, label, desc }) => (
              <li key={label} className="login-brand__feature">
                <div className="login-brand__feature-icon">
                  <Icon size={16} />
                </div>
                <div>
                  <strong>{label}</strong>
                  <span>{desc}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Social Proof */}
          <div className="login-brand__proof">
            <div className="login-brand__proof-avatars">
              {['S','M','A','R','K'].map((l, i) => (
                <div key={i} className="login-brand__avatar" style={{ zIndex: 5 - i }}>
                  {l}
                </div>
              ))}
            </div>
            <p><strong>2,000+</strong> store owners trust Verdant AI</p>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="login-brand__blob login-brand__blob--1" />
        <div className="login-brand__blob login-brand__blob--2" />
      </aside>

      {/* Right Form Panel */}
      <main className="login-form-panel">
        {/* Top nav link */}
        <div className="login-form-panel__topbar">
          <span>New to GrowPilot?</span>
          <button className="login-topbar-link" onClick={() => navigate('/')}>
            Learn more →
          </button>
        </div>

        <div className="login-card">
          {/* Card header */}
          <div className="login-card__header">
            <h2>Welcome back</h2>
            <p>Sign in to your GrowPilot account to continue.</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="login-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                className="login-input"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <div className="login-field__label-row">
                <label htmlFor="password">Password</label>
                <button type="button" className="login-forgot">Forgot password?</button>
              </div>
              <div className="login-input-wrap">
                <input
                  id="password"
                  className="login-input"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="login-eye"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`login-submit${isLoading ? ' login-submit--loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="login-spinner" />
              ) : (
                <>Sign in <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider"><span>or</span></div>

          {/* SSO / Google placeholder */}
          <button className="login-sso" type="button">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.2-2.7-.5-4z"/>
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <p className="login-card__footer">
            By signing in, you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
