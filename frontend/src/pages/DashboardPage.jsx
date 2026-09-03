import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  IndianRupee, ShoppingBag, AlertTriangle, MessageSquare,
  Lightbulb, AlertCircle, Info, CheckCircle, ArrowRight, RefreshCw,
} from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import { kpiData, weeklyData, aiInsights, recentOrders } from '../data/mockData';
import './DashboardPage.css';

const iconMap = {
  IndianRupee, ShoppingBag, AlertTriangle, MessageSquare,
};

const colorMap = {
  blue: { bg: '#EFF6FF', icon: '#2563EB', accent: '#2563EB' },
  green: { bg: '#F0FDF4', icon: '#16A34A', accent: '#16A34A' },
  orange: { bg: '#FFFBEB', icon: '#D97706', accent: '#D97706' },
  purple: { bg: '#F5F3FF', icon: '#7C3AED', accent: '#7C3AED' },
};

const insightIcons = {
  warning: <AlertCircle size={16} />,
  info: <Info size={16} />,
  success: <CheckCircle size={16} />,
  tip: <Lightbulb size={16} />,
};

const insightColors = {
  warning: { bg: '#FFFBEB', border: '#FDE68A', text: '#92400E', icon: '#D97706' },
  info: { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF', icon: '#2563EB' },
  success: { bg: '#F0FDF4', border: '#BBF7D0', text: '#14532D', icon: '#16A34A' },
  tip: { bg: '#F5F3FF', border: '#DDD6FE', text: '#4C1D95', icon: '#7C3AED' },
};

const orderStatus = {
  delivered: { label: 'Delivered', cls: 'badge-success' },
  processing: { label: 'Processing', cls: 'badge-primary' },
  cancelled: { label: 'Cancelled', cls: 'badge-danger' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 8, padding: '8px 12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: 4 }}>{label}</p>
        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>₹{payload[0].value.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardPage({ business }) {
  const dashboardData = business?.workspace?.dashboard || {
    kpiData,
    weeklyData,
    aiInsights,
    recentOrders,
    supplierInsights: [],
    supplierSnapshot: [],
    title: 'Owner Dashboard',
    subtitle: 'Welcome back, Rajesh! Here\'s your business summary.',
  };

  const weeklyTotal = dashboardData.weeklyData.reduce((sum, day) => sum + (day.sales || 0), 0);

  return (
    <div className="page-wrap">
      <Topbar title={dashboardData.title} subtitle={dashboardData.subtitle} />
      <div className="dash-content animate-fade-in">

        <div className="dash-kpis">
          {dashboardData.kpiData.map((kpi, i) => {
            const Icon = iconMap[kpi.icon];
            const colors = colorMap[kpi.color];
            return (
              <div key={i} className="dash-kpi card card-hover" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="dash-kpi__top">
                  <div className="dash-kpi__icon" style={{ background: colors.bg, color: colors.icon }}>
                    <Icon size={22} />
                  </div>
                  <div className="dash-kpi__accent" style={{ background: colors.accent }} />
                </div>
                <p className="dash-kpi__value">{kpi.value}</p>
                <p className="dash-kpi__label">{kpi.label}</p>
                <p className="dash-kpi__trend">{kpi.trend}</p>
              </div>
            );
          })}
        </div>

        <div className="dash-row">
          <div className="dash-chart card">
            <div className="dash-card-header">
              <div>
                <h2 className="dash-card-title">Weekly Sales</h2>
                <p className="dash-card-sub">Revenue overview for this week</p>
              </div>
              <div className="dash-chart-total">
                <span>Total</span>
                <strong>₹{weeklyTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dashboardData.weeklyData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#EFF6FF' }} />
                <Bar dataKey="sales" fill="url(#blueGrad)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="dash-insights card">
            <div className="dash-card-header">
              <div>
                <h2 className="dash-card-title">AI Recommendations</h2>
                <p className="dash-card-sub">Powered by Verdant AI</p>
              </div>
              <button className="btn btn-ghost btn-icon"><RefreshCw size={15} /></button>
            </div>
            <div className="dash-insights-list">
              {dashboardData.aiInsights.map((insight, i) => {
                const colors = insightColors[insight.type];
                return (
                  <div
                    key={i}
                    className="dash-insight-item"
                    style={{ background: colors.bg, borderColor: colors.border }}
                  >
                    <div className="dash-insight-icon" style={{ color: colors.icon }}>
                      {insightIcons[insight.type]}
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: colors.text, lineHeight: 1.5 }}>{insight.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="dash-card-header" style={{ padding: '20px 20px 0' }}>
            <div>
              <h2 className="dash-card-title">Recent Orders</h2>
              <p className="dash-card-sub">Latest customer transactions</p>
            </div>
            <button className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="table-wrap" style={{ marginTop: 12 }}>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentOrders.map((order, i) => (
                  <tr key={i}>
                    <td><span style={{ fontWeight: 600, color: '#2563EB', fontFamily: 'monospace', fontSize: '0.8rem' }}>{order.id}</span></td>
                    <td style={{ fontWeight: 500 }}>{order.customer}</td>
                    <td style={{ color: '#6B7280', fontSize: '0.8125rem' }}>{order.items}</td>
                    <td><strong>{order.amount}</strong></td>
                    <td><span className={`badge ${orderStatus[order.status].cls}`}>{orderStatus[order.status].label}</span></td>
                    <td style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {(dashboardData.supplierInsights?.length > 0 || dashboardData.supplierSnapshot?.length > 0) && (
          <div className="dash-row">
            <div className="dash-insights card">
              <div className="dash-card-header">
                <div>
                  <h2 className="dash-card-title">Supplier Insights</h2>
                  <p className="dash-card-sub">Delivery reliability and procurement actions</p>
                </div>
              </div>
              <div className="dash-insights-list">
                {dashboardData.supplierInsights?.map((insight, i) => {
                  const colors = insightColors[insight.type] || insightColors.info;
                  return (
                    <div
                      key={i}
                      className="dash-insight-item"
                      style={{ background: colors.bg, borderColor: colors.border }}
                    >
                      <div className="dash-insight-icon" style={{ color: colors.icon }}>
                        {insightIcons[insight.type] || insightIcons.info}
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: colors.text, lineHeight: 1.5 }}>{insight.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card dash-suppliers">
              <div className="dash-card-header" style={{ marginBottom: 0 }}>
                <div>
                  <h2 className="dash-card-title">Top Suppliers</h2>
                  <p className="dash-card-sub">Current procurement health</p>
                </div>
              </div>
              <div className="dash-suppliers-list">
                {dashboardData.supplierSnapshot?.map((supplier) => (
                  <div className="dash-supplier-item" key={supplier.name}>
                    <div>
                      <p className="dash-supplier-name">{supplier.name}</p>
                      <p className="dash-supplier-meta">{supplier.category} • Last delivery {supplier.lastDelivery}</p>
                    </div>
                    <div className="dash-supplier-right">
                      <span className={`badge ${supplier.reliability >= 90 ? 'badge-success' : supplier.reliability >= 80 ? 'badge-warning' : 'badge-danger'}`}>
                        {supplier.reliability}%
                      </span>
                      <span className="dash-supplier-status">{supplier.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

