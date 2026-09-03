import { useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowRight,
  LogOut,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  BarChart3,
} from 'lucide-react';
import Topbar from '../layout/Topbar';
import '../../pages/BusinessFlow.css';

const toneClassMap = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  primary: 'badge-primary',
  purple: 'badge-purple',
  gray: 'badge-gray',
  info: 'badge-primary',
};

const insightIconMap = {
  success: CheckCircle2,
  warning: AlertCircle,
  info: Info,
  tip: Sparkles,
};

function numberFormat(value) {
  if (typeof value !== 'number') {
    return value;
  }

  if (value >= 1000) {
    return value.toLocaleString('en-IN');
  }

  return `${value}`;
}

function ChartTooltip({ active, payload, label, metricLabel }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="business-tooltip">
      <p className="business-tooltip__label">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="business-tooltip__value" style={{ color: entry.color }}>
          {entry.name}: {numberFormat(entry.value)} {metricLabel}
        </p>
      ))}
    </div>
  );
}

export default function BusinessOverviewPage({ profile, user, onLogout, onSwitchBusiness, onToast }) {
  const navigate = useNavigate();

  return (
    <div className="business-page">
      <Topbar title={`${profile.businessName} Dashboard`} subtitle={`${profile.location} • Signed in as ${user.email}`} />

      <div className="business-page__content animate-fade-in">
        <section className="business-hero card">
          <div className="business-hero__main">
            <div className="business-badge" style={{ background: profile.softBg, color: profile.accent }}>
              {profile.badge}
            </div>
            <h2>{profile.headline}</h2>
            <p>{profile.summary}</p>

            <div className="business-hero__actions">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onToast?.(profile.primaryActionToast, 'success')}
              >
                {profile.primaryActionLabel}
                <ArrowRight size={16} />
              </button>
              <button
                className="btn btn-outline btn-lg"
                onClick={() => {
                  onSwitchBusiness?.();
                  navigate('/businesses');
                }}
              >
                Switch business
              </button>
              <button className="btn btn-ghost btn-lg" onClick={onLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <div className="business-hero__panel">
            {profile.overviewCards.map((card) => (
              <div key={card.label} className="business-hero__stat">
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <p>{card.helper}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="business-metrics">
          {profile.metrics.map((metric, index) => (
            <article key={metric.label} className="business-metric card" style={{ animationDelay: `${index * 0.04}s` }}>
              <span className="business-metric__label">{metric.label}</span>
              <strong className="business-metric__value">{metric.value}</strong>
              <span className="business-metric__trend">{metric.trend}</span>
            </article>
          ))}
        </section>

        <section className="business-grid">
          <div className="business-panel card business-chart-panel">
            <div className="business-panel__header">
              <div>
                <h3>{profile.chart.title}</h3>
                <p>{profile.chart.subtitle}</p>
              </div>
              <div className="business-panel__header-pill">
                <BarChart3 size={14} />
                Live view
              </div>
            </div>

            <div className="business-chart-legend">
              {profile.chart.series.map((series) => (
                <div key={series.key} className="business-chart-legend__item">
                  <span className="business-chart-legend__dot" style={{ background: series.color }} />
                  {series.label}
                </div>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={profile.chart.data}>
                <defs>
                  {profile.chart.series.map((series) => (
                    <linearGradient id={`${profile.slug}-${series.key}`} key={series.key} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={series.color} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={series.color} stopOpacity={0.02} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip content={<ChartTooltip metricLabel={profile.slug === 'bakery' ? 'items' : 'units'} />} />
                {profile.chart.series.map((series) => (
                  <Area
                    key={series.key}
                    type="monotone"
                    dataKey={series.key}
                    name={series.label}
                    stroke={series.color}
                    fill={`url(#${profile.slug}-${series.key})`}
                    strokeWidth={3}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="business-panel card">
            <div className="business-panel__header">
              <div>
                <h3>Operations board</h3>
                <p>Daily work that needs action</p>
              </div>
              <button className="btn btn-ghost btn-icon" onClick={() => onToast?.('Operations board refreshed', 'info')}>
                <RotateCcw size={14} />
              </button>
            </div>

            <div className="business-ops-list">
              {profile.operations.map((item) => (
                <div key={item.title} className="business-ops-item">
                  <div className="business-ops-item__row">
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.note}</p>
                    </div>
                    <strong>{item.value}</strong>
                  </div>
                  <div className="business-progress">
                    <span style={{ width: `${item.progress}%`, background: profile.accent }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="business-grid business-grid--split">
          <div className="business-panel card">
            <div className="business-panel__header">
              <div>
                <h3>Inventory watchlist</h3>
                <p>What needs attention first</p>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Supplier</th>
                    <th>Next restock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.inventoryRows.map((row) => (
                    <tr key={row.item}>
                      <td style={{ fontWeight: 600 }}>{row.item}</td>
                      <td>{row.category}</td>
                      <td>{row.stock}</td>
                      <td style={{ color: '#6B7280' }}>{row.supplier}</td>
                      <td style={{ color: '#6B7280' }}>{row.nextRestock}</td>
                      <td>
                        <span className={`badge ${toneClassMap[row.tone] || 'badge-gray'}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="business-panel card">
            <div className="business-panel__header">
              <div>
                <h3>Recent orders</h3>
                <p>Latest customer activity</p>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Slot</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.orderRows.map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 700, color: profile.accent }}>{row.id}</td>
                      <td style={{ fontWeight: 600 }}>{row.customer}</td>
                      <td style={{ color: '#6B7280' }}>{row.items}</td>
                      <td style={{ fontWeight: 700 }}>{row.amount}</td>
                      <td>
                        <span className="badge badge-primary">{row.status}</span>
                      </td>
                      <td style={{ color: '#6B7280' }}>{row.slot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="business-insights">
          {profile.insights.map((insight) => {
            const Icon = insightIconMap[insight.tone] || Sparkles;

            return (
              <div key={insight.title} className="business-insight card">
                <div className="business-insight__icon" style={{ color: profile.accent }}>
                  <Icon size={16} />
                </div>
                <div>
                  <h4>{insight.title}</h4>
                  <p>{insight.text}</p>
                </div>
              </div>
            );
          })}
        </section>

        <section className="business-actions card">
          <div className="business-panel__header" style={{ marginBottom: 16 }}>
            <div>
              <h3>Quick actions</h3>
              <p>Shortcuts for daily work</p>
            </div>
          </div>

          <div className="business-actions__grid">
            {profile.quickActions.map((action) => (
              <button
                key={action.label}
                className="business-action-btn"
                onClick={() => onToast?.(action.hint, 'success')}
              >
                <strong>{action.label}</strong>
                <span>{action.hint}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
