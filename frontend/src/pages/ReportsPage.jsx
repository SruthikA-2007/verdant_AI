import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, Users, Clock, Zap, Award, Star } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import { reportData } from '../data/mockData';
import './ReportsPage.css';

export default function ReportsPage({ business }) {
  const reportsPageData = business?.workspace?.reports || { title: 'Business Reports', subtitle: 'AI-powered analytics and sales forecasting', reportData };
  const { bestSelling, returningCustomers, peakOrderTime, salesForecast, categoryBreakdown, topCustomers } = reportsPageData.reportData;

  return (
    <div className="page-wrap">
      <Topbar title={reportsPageData.title} subtitle={reportsPageData.subtitle} />
      <div className="rpt-content animate-fade-in">

        {/* Key metrics */}
        <div className="rpt-metrics">
          {[
            { icon: Award, label: "Best Selling", value: bestSelling.product, sub: `${bestSelling.units} units sold • ${bestSelling.revenue}`, color: 'blue', accent: bestSelling.growth },
            { icon: Users, label: "Returning Customers", value: returningCustomers.percentage, sub: `${returningCustomers.count} loyal customers`, color: 'green', accent: returningCustomers.trend },
            { icon: Clock, label: "Peak Order Time", value: peakOrderTime.time, sub: `Busiest on ${peakOrderTime.dayOfWeek}`, color: 'purple', accent: 'Plan stock ahead' },
            { icon: TrendingUp, label: "Sales Forecast", value: salesForecast.nextWeek, sub: `${salesForecast.confidence} confidence`, color: 'orange', accent: "↑ Next week" },
          ].map((m, i) => (
            <div key={i} className={`rpt-metric card card-hover rpt-metric--${m.color}`}>
              <div className="rpt-metric-icon">
                <m.icon size={20} />
              </div>
              <p className="rpt-metric-label">{m.label}</p>
              <p className="rpt-metric-value">{m.value}</p>
              <p className="rpt-metric-sub">{m.sub}</p>
              <span className="rpt-metric-accent">{m.accent}</span>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="rpt-charts">
          {/* Category Distribution */}
          <div className="card rpt-chart">
            <h3 className="rpt-chart-title">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  dataKey="value"
                  nameKey="name"
                >
                  {categoryBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={val => [`${val}%`, '']} />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Customers Table */}
          <div className="card rpt-chart">
            <h3 className="rpt-chart-title">Top Customers</h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Orders</th>
                    <th>Total Spent</th>
                    <th>Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {topCustomers.map((c, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>
                            {c.name[0]}
                          </div>
                          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{c.name}</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{c.orders}</td>
                      <td style={{ fontWeight: 700, color: '#16A34A' }}>{c.spent}</td>
                      <td>
                        <span className={`badge ${c.badge === 'VIP' ? 'badge-purple' : c.badge === 'Regular' ? 'badge-primary' : 'badge-success'}`}>
                          {c.badge === 'VIP' && <Star size={10} fill="currentColor" />}
                          {c.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* AI Forecast Card */}
        <div className="card rpt-forecast">
          <div className="rpt-forecast-icon">
            <Zap size={24} fill="white" />
          </div>
          <div className="rpt-forecast-content">
            <h3>🚀 AI Sales Forecast — Next 7 Days</h3>
            <p>Based on your last 30 days of sales patterns, seasonal trends, and current inventory levels, Verdant AI predicts:</p>
            <div className="rpt-forecast-metrics">
              <div className="rpt-forecast-metric">
                <span>Projected Revenue</span>
                <strong>{salesForecast.nextWeek}</strong>
              </div>
              <div className="rpt-forecast-divider" />
              <div className="rpt-forecast-metric">
                <span>Confidence Score</span>
                <strong>{salesForecast.confidence}</strong>
              </div>
              <div className="rpt-forecast-divider" />
              <div className="rpt-forecast-metric">
                <span>Trend</span>
                <strong style={{ color: '#22C55E' }}>↑ Upward</strong>
              </div>
            </div>
            <p className="rpt-forecast-tip">💡 Stock up on Rice 5kg and Cooking Oil before Saturday for maximum revenue.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

