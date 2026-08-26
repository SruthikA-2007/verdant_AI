import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Square, Rocket, ArrowRight } from 'lucide-react';
import { businessIdeas } from '../../data/sihData.js';
import { calculateFinancials } from '../../utils/financialCalculations.js';
import { formatINR } from '../../utils/helpers.js';
import './LaunchPadPage.css';

export default function LaunchPadPage({ sihProfile, sihBusiness, sihFinancial, sihAnalysis, onToast }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});

  if (!sihProfile || !sihBusiness) { navigate('/advisor/profile'); return null; }

  const idea = businessIdeas.find(b => b.id === sihBusiness.id);
  const fin  = sihFinancial || calculateFinancials(idea, sihProfile);

  const toggleTask = (weekIdx, taskIdx) => {
    const key = `${weekIdx}-${taskIdx}`;
    setChecked(p => ({ ...p, [key]: !p[key] }));
  };

  const allTasks = idea?.checklistWeeks?.flatMap(w => w.tasks) || [];
  const doneTasks = Object.values(checked).filter(Boolean).length;
  const progress  = allTasks.length ? Math.round((doneTasks / allTasks.length) * 100) : 0;

  return (
    <div className="launchpad">
      {/* Hero Banner */}
      <div className="launchpad__hero">
        <div className="launchpad__hero-rocket">🚀</div>
        <div className="launchpad__hero-content">
          <p className="launchpad__hero-tag">Your Business Launch Plan</p>
          <h1>{sihBusiness.name}</h1>
          <p className="launchpad__hero-loc">📍 {sihProfile.village}, {sihProfile.district}, {sihProfile.state}</p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="launchpad__summary">
        <div className="launchpad__kpi">
          <span>🎯</span>
          <div>
            <p className="launchpad__kpi-label">Opportunity Score</p>
            <p className="launchpad__kpi-value">{sihBusiness.score?.overall || sihAnalysis?.overall || '--'}/100</p>
          </div>
        </div>
        <div className="launchpad__kpi">
          <span>💰</span>
          <div>
            <p className="launchpad__kpi-label">Required Investment</p>
            <p className="launchpad__kpi-value">{formatINR(fin.totalStartup)}</p>
          </div>
        </div>
        <div className="launchpad__kpi">
          <span>📈</span>
          <div>
            <p className="launchpad__kpi-label">Expected Monthly Profit</p>
            <p className="launchpad__kpi-value launchpad__kpi-value--green">{formatINR(fin.monthlyProfit)}</p>
          </div>
        </div>
        <div className="launchpad__kpi">
          <span>⏱️</span>
          <div>
            <p className="launchpad__kpi-label">Break-Even</p>
            <p className="launchpad__kpi-value launchpad__kpi-value--orange">{fin.breakEvenMonths} months</p>
          </div>
        </div>
      </div>

      <div className="launchpad__body">
        {/* Checklist */}
        <div className="launchpad__checklist-section">
          <div className="launchpad__checklist-header">
            <div>
              <h2>Your First 30 Days</h2>
              <p>Complete these weekly tasks to launch successfully.</p>
            </div>
            <div className="launchpad__progress-wrap">
              <div className="launchpad__progress-ring">
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#E5E7EB" strokeWidth="5" />
                  <circle
                    cx="24" cy="24" r="20" fill="none" stroke="#16A34A" strokeWidth="5"
                    strokeDasharray={`${(progress / 100) * 125.7} 125.7`}
                    strokeLinecap="round"
                    transform="rotate(-90 24 24)"
                    style={{ transition: 'stroke-dasharray 0.4s ease' }}
                  />
                </svg>
                <span>{progress}%</span>
              </div>
              <p className="launchpad__progress-label">{doneTasks}/{allTasks.length} tasks done</p>
            </div>
          </div>

          <div className="launchpad__weeks">
            {idea?.checklistWeeks?.map((week, wi) => (
              <div key={wi} className="launchpad__week card">
                <h3 className="launchpad__week-title">{week.week}</h3>
                <ul className="launchpad__tasks">
                  {week.tasks.map((task, ti) => {
                    const key = `${wi}-${ti}`;
                    const done = !!checked[key];
                    return (
                      <li key={ti} className={`launchpad__task ${done ? 'launchpad__task--done' : ''}`} onClick={() => toggleTask(wi, ti)}>
                        {done ? <CheckSquare size={17} color="#16A34A" /> : <Square size={17} color="#94A3B8" />}
                        <span>{task}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar info */}
        <div className="launchpad__sidebar">
          {/* Key strengths */}
          <div className="launchpad__strengths card">
            <h3>✅ Key Strengths</h3>
            <ul>
              {idea?.strengths?.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          {/* Key challenges */}
          <div className="launchpad__challenges card">
            <h3>⚠️ Watch Out For</h3>
            <ul>
              {idea?.challenges?.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>

          {/* Connect to GrowPilot */}
          <div className="launchpad__growpilot-cta card">
            <div className="launchpad__cta-icon">🚀</div>
            <h3>Launch into GrowPilot</h3>
            <p>
              After launching, use GrowPilot's existing business management tools to track sales, manage inventory, control expenses, and grow your business.
            </p>
            <ul className="launchpad__gp-features">
              <li>🏠 Dashboard & KPIs</li>
              <li>📦 Operations & Inventory</li>
              <li>₹ Expense Tracking</li>
              <li>🚚 Supplier Management</li>
              <li>📈 Seasonal Trends</li>
              <li>📢 Marketing AI</li>
              <li>📊 Business Reports</li>
            </ul>
            <button
              className="btn btn-primary btn-lg launchpad__launch-btn"
              onClick={() => {
                onToast?.('Launching GrowPilot business management!', 'success');
                navigate('/businesses');
              }}
            >
              <Rocket size={18} />
              Go to Business Management
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
