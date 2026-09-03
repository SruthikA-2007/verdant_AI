import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  CalendarRange,
  Sparkles,
  TrendingUp,
  Umbrella,
  Sun,
  Gift,
  ArrowUpRight,
} from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import './SeasonalTrendsPage.css';

const fallbackSeasonalByBusiness = {
  grocery: {
    title: 'Seasonal Trends Intelligence',
    subtitle: 'Demand patterns, weather impact, and festive opportunities for your grocery store',
    highlights: [
      { label: 'Peak Season', value: 'Festive (Oct-Nov)', delta: '+26% sales lift', tone: 'success', icon: Gift },
      { label: 'Monsoon Shift', value: 'Staples + Dairy', delta: '+18% vs avg', tone: 'primary', icon: Umbrella },
      { label: 'Summer Trend', value: 'Beverages & Snacks', delta: '+21% basket growth', tone: 'warning', icon: Sun },
    ],
    monthlySales: [
      { month: 'Jan', current: 206000, previous: 187000 },
      { month: 'Feb', current: 212000, previous: 193000 },
      { month: 'Mar', current: 228000, previous: 201000 },
      { month: 'Apr', current: 235000, previous: 209000 },
      { month: 'May', current: 244000, previous: 217000 },
      { month: 'Jun', current: 251000, previous: 223000 },
      { month: 'Jul', current: 258000, previous: 228000 },
      { month: 'Aug', current: 264000, previous: 236000 },
      { month: 'Sep', current: 272000, previous: 241000 },
      { month: 'Oct', current: 304000, previous: 258000 },
      { month: 'Nov', current: 318000, previous: 265000 },
      { month: 'Dec', current: 286000, previous: 249000 },
    ],
    seasonalMix: [
      { season: 'Summer', demandIndex: 68, promoROI: 52 },
      { season: 'Monsoon', demandIndex: 76, promoROI: 61 },
      { season: 'Festive', demandIndex: 96, promoROI: 85 },
      { season: 'Winter', demandIndex: 63, promoROI: 48 },
    ],
    categorySeasonality: [
      { category: 'Staples', summer: 70, monsoon: 82, festive: 90, winter: 68 },
      { category: 'Beverages', summer: 92, monsoon: 64, festive: 72, winter: 58 },
      { category: 'Snacks', summer: 78, monsoon: 74, festive: 94, winter: 66 },
      { category: 'Personal Care', summer: 61, monsoon: 69, festive: 77, winter: 72 },
    ],
    aiActions: [
      {
        title: 'Pre-festive stock timing',
        detail: 'Start staple and snacks replenishment 12 days before major festival dates to avoid late-cycle supplier price spikes.',
        urgency: 'high',
      },
      {
        title: 'Monsoon assortment pivot',
        detail: 'Push quick-cook meals, tea, and hygiene bundles during heavy rain windows to lift average order value.',
        urgency: 'medium',
      },
      {
        title: 'Summer cooling bundles',
        detail: 'Bundle beverages + chips + ice cream coupons in weekends to improve repeat footfall during hot weeks.',
        urgency: 'low',
      },
    ],
  },
  bakery: {
    title: 'Seasonal Trends Intelligence',
    subtitle: 'Track demand swings for cakes, breads, and festive bakery specials across seasons',
    highlights: [
      { label: 'Peak Season', value: 'Wedding + Festive', delta: '+31% custom cake orders', tone: 'success', icon: Gift },
      { label: 'Monsoon Shift', value: 'Tea-time snacks', delta: '+22% pastry add-ons', tone: 'primary', icon: Umbrella },
      { label: 'Summer Trend', value: 'Cold desserts', delta: '+19% weekend demand', tone: 'warning', icon: Sun },
    ],
    monthlySales: [
      { month: 'Jan', current: 172000, previous: 156000 },
      { month: 'Feb', current: 179000, previous: 161000 },
      { month: 'Mar', current: 188000, previous: 167000 },
      { month: 'Apr', current: 196000, previous: 173000 },
      { month: 'May', current: 205000, previous: 177000 },
      { month: 'Jun', current: 212000, previous: 181000 },
      { month: 'Jul', current: 219000, previous: 187000 },
      { month: 'Aug', current: 226000, previous: 193000 },
      { month: 'Sep', current: 232000, previous: 198000 },
      { month: 'Oct', current: 264000, previous: 214000 },
      { month: 'Nov', current: 278000, previous: 219000 },
      { month: 'Dec', current: 248000, previous: 207000 },
    ],
    seasonalMix: [
      { season: 'Summer', demandIndex: 74, promoROI: 57 },
      { season: 'Monsoon', demandIndex: 82, promoROI: 66 },
      { season: 'Festive', demandIndex: 99, promoROI: 88 },
      { season: 'Winter', demandIndex: 71, promoROI: 54 },
    ],
    categorySeasonality: [
      { category: 'Custom Cakes', summer: 66, monsoon: 72, festive: 97, winter: 84 },
      { category: 'Breads', summer: 79, monsoon: 81, festive: 85, winter: 73 },
      { category: 'Pastries', summer: 87, monsoon: 92, festive: 90, winter: 68 },
      { category: 'Savories', summer: 71, monsoon: 88, festive: 76, winter: 64 },
    ],
    aiActions: [
      {
        title: 'Festival pre-order window',
        detail: 'Open themed cake booking slots 3 weeks ahead and lock ingredient procurement 10 days before peak weekends.',
        urgency: 'high',
      },
      {
        title: 'Rainy-day menu optimization',
        detail: 'Increase puffs and tea-cake production by 15% on high-rain probability days for faster same-day sell-through.',
        urgency: 'medium',
      },
      {
        title: 'Summer margin mix',
        detail: 'Promote chilled desserts in combo with breads to keep average margins stable during lower cake demand weekdays.',
        urgency: 'low',
      },
    ],
  },
};

const urgencyTone = {
  high: 'danger',
  medium: 'warning',
  low: 'success',
};

const toneClass = {
  success: 'badge-success',
  primary: 'badge-primary',
  warning: 'badge-warning',
};

const seasonPalette = ['#2563EB', '#16A34A', '#D97706', '#7C3AED'];

function currencyTick(value) {
  return `₹${Math.round(value / 1000)}k`;
}

function RevenueTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const current = payload.find((entry) => entry.dataKey === 'current')?.value || 0;
  const previous = payload.find((entry) => entry.dataKey === 'previous')?.value || 0;
  const uplift = previous > 0 ? Math.round(((current - previous) / previous) * 100) : 0;

  return (
    <div className="seasonal-tooltip">
      <p className="seasonal-tooltip__title">{label}</p>
      <p className="seasonal-tooltip__line">This year: ₹{current.toLocaleString('en-IN')}</p>
      <p className="seasonal-tooltip__line">Last year: ₹{previous.toLocaleString('en-IN')}</p>
      <p className="seasonal-tooltip__delta">YoY change: {uplift >= 0 ? '+' : ''}{uplift}%</p>
    </div>
  );
}

export default function SeasonalTrendsPage({ business }) {
  const fallbackData = fallbackSeasonalByBusiness[business?.slug] || fallbackSeasonalByBusiness.grocery;
  const seasonalData = business?.workspace?.seasonalTrends || fallbackData;

  return (
    <div className="page-wrap">
      <Topbar title={seasonalData.title} subtitle={seasonalData.subtitle} />
      <div className="seasonal-content animate-fade-in">

        <div className="seasonal-banner card" style={{ '--seasonal-accent': business?.accent || '#2563EB' }}>
          <div>
            <p className="seasonal-banner__eyebrow"><CalendarRange size={14} /> Seasonal Pulse</p>
            <h2>Know what to stock before demand spikes</h2>
            <p>GrowPilot compares last-year patterns, seasonality curves, and your current trend trajectory so you can plan with confidence.</p>
          </div>
          <div className="seasonal-banner__chip">
            <Sparkles size={14} /> AI Forecast Updated Today
          </div>
        </div>

        <div className="seasonal-highlights">
          {seasonalData.highlights.map((item) => (
            <div key={item.label} className="seasonal-highlight card card-hover">
              <div className="seasonal-highlight__head">
                <div className="seasonal-highlight__icon">
                  <item.icon size={18} />
                </div>
                <span className={`badge ${toneClass[item.tone] || 'badge-primary'}`}>{item.label}</span>
              </div>
              <p className="seasonal-highlight__value">{item.value}</p>
              <p className="seasonal-highlight__meta">{item.delta}</p>
            </div>
          ))}
        </div>

        <div className="seasonal-grid">
          <div className="card seasonal-panel">
            <div className="seasonal-panel__header">
              <div>
                <h3>Monthly Sales Trend</h3>
                <p>Current year vs previous year performance</p>
              </div>
              <span className="badge badge-success"><TrendingUp size={12} /> Pattern confidence 86%</span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={seasonalData.monthlySales}>
                <defs>
                  <linearGradient id="seasonalArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={currencyTick} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip content={<RevenueTooltip />} />
                <Legend verticalAlign="top" height={28} />
                <Area type="monotone" dataKey="current" name="This year" stroke="#2563EB" strokeWidth={2.5} fill="url(#seasonalArea)" />
                <Area type="monotone" dataKey="previous" name="Last year" stroke="#94A3B8" strokeDasharray="4 4" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card seasonal-panel">
            <div className="seasonal-panel__header">
              <div>
                <h3>Season Opportunity Score</h3>
                <p>Demand potential vs promotional ROI</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={seasonalData.seasonalMix} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={false} />
                <XAxis dataKey="season" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip />
                <Legend verticalAlign="top" height={28} />
                <Bar dataKey="demandIndex" name="Demand Index" radius={[6, 6, 0, 0]} fill="#2563EB" />
                <Bar dataKey="promoROI" name="Promo ROI" radius={[6, 6, 0, 0]} fill="#16A34A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="seasonal-grid seasonal-grid--bottom">
          <div className="card seasonal-panel">
            <div className="seasonal-panel__header">
              <div>
                <h3>Category Seasonality Heatmap</h3>
                <p>Relative demand score by season</p>
              </div>
            </div>
            <div className="seasonal-heatmap">
              <div className="seasonal-heatmap__head">
                <span>Category</span>
                <span>Summer</span>
                <span>Monsoon</span>
                <span>Festive</span>
                <span>Winter</span>
              </div>
              {seasonalData.categorySeasonality.map((row) => (
                <div key={row.category} className="seasonal-heatmap__row">
                  <span className="seasonal-heatmap__category">{row.category}</span>
                  {['summer', 'monsoon', 'festive', 'winter'].map((key, idx) => (
                    <div key={key} className="seasonal-heatmap__cell" style={{ '--strength': row[key] / 100, '--tone': seasonPalette[idx] }}>
                      <span>{row[key]}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="card seasonal-panel">
            <div className="seasonal-panel__header">
              <div>
                <h3>AI Suggested Actions</h3>
                <p>Operational recommendations for the next 30-45 days</p>
              </div>
            </div>
            <div className="seasonal-actions">
              {seasonalData.aiActions.map((action) => (
                <div key={action.title} className="seasonal-action-item">
                  <div className="seasonal-action-item__top">
                    <strong>{action.title}</strong>
                    <span className={`badge badge-${urgencyTone[action.urgency] || 'primary'}`}>{action.urgency} priority</span>
                  </div>
                  <p>{action.detail}</p>
                  <button className="btn btn-ghost btn-sm">
                    Create plan <ArrowUpRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
