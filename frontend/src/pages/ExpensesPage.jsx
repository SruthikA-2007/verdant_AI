import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Home, Users, Zap, Package, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import { expenseData, monthlyData } from '../data/mockData';
import './ExpensesPage.css';

const iconMap = { Home, Users, Zap, Package };
const COLORS = ['#2563EB', '#16A34A', '#D97706', '#7C3AED'];

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const rad = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * rad);
  const y = cy + r * Math.sin(-midAngle * rad);
  return percent > 0.05 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export default function ExpensesPage({ business }) {
  const financeData = business?.workspace?.expenses || { title: 'Expense & Profit Tracker', subtitle: 'Monthly financial overview with AI cost analysis', expenseData, monthlyData };
  const { totalExpenses, profit, revenue, breakdown, aiInsight } = financeData.expenseData;
  const margin = ((profit / revenue) * 100).toFixed(0);

  return (
    <div className="page-wrap">
      <Topbar title={financeData.title} subtitle={financeData.subtitle} />
      <div className="exp-content animate-fade-in">

        {/* Summary Cards */}
        <div className="exp-summary">
          <div className="card exp-summary-card exp-summary-card--revenue">
            <div className="exp-summary-icon"><TrendingUp size={20} /></div>
            <p className="exp-summary-label">Total Revenue</p>
            <p className="exp-summary-value">₹{revenue.toLocaleString('en-IN')}</p>
            <p className="exp-summary-trend">+12% vs last month</p>
          </div>
          <div className="card exp-summary-card exp-summary-card--expense">
            <div className="exp-summary-icon"><TrendingDown size={20} /></div>
            <p className="exp-summary-label">Total Expenses</p>
            <p className="exp-summary-value">₹{totalExpenses.toLocaleString('en-IN')}</p>
            <p className="exp-summary-trend exp-summary-trend--bad">+4% vs last month</p>
          </div>
          <div className="card exp-summary-card exp-summary-card--profit">
            <div className="exp-summary-icon"><TrendingUp size={20} /></div>
            <p className="exp-summary-label">Net Profit</p>
            <p className="exp-summary-value">₹{profit.toLocaleString('en-IN')}</p>
            <p className="exp-summary-trend">{margin}% margin</p>
          </div>
        </div>

        {/* AI Alert */}
        <div className="exp-ai-alert card">
          <AlertCircle size={18} className="exp-ai-icon" />
          <div>
            <p className="exp-ai-title">🤖 AI Insight</p>
            <p className="exp-ai-text">{aiInsight}</p>
          </div>
          <span className="badge badge-warning" style={{ marginLeft: 'auto', flexShrink: 0 }}>Action Required</span>
        </div>

        {/* Chart row */}
        <div className="exp-charts">
          {/* Pie */}
          <div className="card exp-chart-card">
            <h3 className="exp-chart-title">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={100}
                  dataKey="amount"
                  nameKey="category"
                  labelLine={false}
                  label={CustomLabel}
                >
                  {breakdown.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip formatter={val => [`₹${val.toLocaleString('en-IN')}`, '']} />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
            {/* Breakdown list */}
            <div className="exp-breakdown">
              {breakdown.map((item, i) => {
                const Icon = iconMap[item.icon];
                return (
                  <div key={i} className={`exp-breakdown-item ${item.alert ? 'exp-breakdown-item--alert' : ''}`}>
                    <div className="exp-breakdown-icon" style={{ background: `${COLORS[i]}15`, color: COLORS[i] }}>
                      {Icon && <Icon size={14} />}
                    </div>
                    <span className="exp-breakdown-label">{item.category}</span>
                    {item.alert && <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>↑18%</span>}
                    <span className="exp-breakdown-amount">₹{item.amount.toLocaleString('en-IN')}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Area Chart */}
          <div className="card exp-chart-card">
            <h3 className="exp-chart-title">Revenue vs Expenses (6 months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={financeData.monthlyData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip formatter={(val, name) => [`₹${val.toLocaleString('en-IN')}`, name === 'revenue' ? 'Revenue' : 'Expenses']} />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} />
                <Area type="monotone" dataKey="expenses" stroke="#D97706" strokeWidth={2} fill="url(#expGrad)" dot={false} strokeDasharray="4 2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

