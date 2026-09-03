import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { calculateFinancials } from '../../utils/financialCalculations.js';
import { businessIdeas, governmentSchemes } from '../../data/sihData.js';
import { formatINR } from '../../utils/helpers.js';
import './FinancialStructuringPage.css';

function FundingGapBadge({ gap }) {
  if (gap === 0) return (
    <div className="fin-plan__gap-badge fin-plan__gap-badge--zero">
      <CheckCircle size={16} />
      <div>
        <strong>No Funding Gap</strong>
        <span>Your available capital covers the full investment required.</span>
      </div>
    </div>
  );
  if (gap <= 50000) return (
    <div className="fin-plan__gap-badge fin-plan__gap-badge--low">
      <Info size={16} />
      <div>
        <strong>Low Funding Gap — {formatINR(gap)}</strong>
        <span>You can start with minor additional capital or by optimizing setup costs.</span>
      </div>
    </div>
  );
  return (
    <div className="fin-plan__gap-badge fin-plan__gap-badge--high">
      <AlertTriangle size={16} />
      <div>
        <strong>Funding Gap — {formatINR(gap)}</strong>
        <span>Consider a government scheme or microfinance loan to bridge the gap.</span>
      </div>
    </div>
  );
}

export default function FinancialStructuringPage({ sihProfile, sihBusiness, onSaveFinancial, onToast }) {
  const navigate = useNavigate();

  if (!sihProfile || !sihBusiness) { navigate('/advisor/profile'); return null; }

  const idea = businessIdeas.find(b => b.id === sihBusiness.id);
  if (!idea) { navigate('/advisor/ideas'); return null; }

  const fin = calculateFinancials(idea, sihProfile);

  useEffect(() => {
    onSaveFinancial?.({
      totalStartup: fin.totalStartup,
      monthlyRevenue: fin.monthlyRevenue,
      monthlyExpenses: fin.monthlyExpenses,
      monthlyProfit: fin.monthlyProfit,
      breakEvenMonths: fin.breakEvenMonths,
      fundingGap: fin.fundingGap,
    });
  }, []);

  const handleNext = () => {
    onToast?.('Opening scenario simulator...', 'success');
    navigate('/advisor/simulator');
  };

  return (
    <div className="fin-plan">
      {/* Header */}
      <div className="fin-plan__header">
        <div className="fin-plan__header-left">
          <p className="fin-plan__header-tag">Financial Plan</p>
          <h1>{sihBusiness.emoji} {sihBusiness.name}</h1>
          <p className="fin-plan__header-loc">📍 {sihProfile.village}, {sihProfile.district}</p>
        </div>
        <div className="fin-plan__kpis">
          <div className="fin-plan__kpi">
            <span className="fin-plan__kpi-label">Total Investment</span>
            <span className="fin-plan__kpi-value fin-plan__kpi-value--primary">{formatINR(fin.totalStartup)}</span>
          </div>
          <div className="fin-plan__kpi">
            <span className="fin-plan__kpi-label">Monthly Profit</span>
            <span className="fin-plan__kpi-value fin-plan__kpi-value--green">{formatINR(fin.monthlyProfit)}</span>
          </div>
          <div className="fin-plan__kpi">
            <span className="fin-plan__kpi-label">Break-Even</span>
            <span className="fin-plan__kpi-value fin-plan__kpi-value--orange">{fin.breakEvenMonths} months</span>
          </div>
        </div>
      </div>

      <div className="fin-plan__body">
        {/* Startup Costs */}
        <div className="fin-plan__section card">
          <h3 className="fin-plan__section-title">💼 Startup Investment Breakdown</h3>
          <table className="fin-plan__table">
            <tbody>
              {fin.startupCosts.map(item => (
                <tr key={item.item}>
                  <td>{item.item}</td>
                  <td className="fin-plan__table-amount">{formatINR(item.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="fin-plan__table-total">
                <td>Total Required</td>
                <td className="fin-plan__table-amount">{formatINR(fin.totalStartup)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Capital & Gap */}
        <div className="fin-plan__section card">
          <h3 className="fin-plan__section-title">💰 Your Capital vs. Required</h3>
          <div className="fin-plan__capital-row">
            <div className="fin-plan__capital-item">
              <span className="fin-plan__capital-label">Your Available Capital</span>
              <span className="fin-plan__capital-value fin-plan__capital-value--green">{formatINR(fin.capital)}</span>
            </div>
            <div className="fin-plan__capital-divider" />
            <div className="fin-plan__capital-item">
              <span className="fin-plan__capital-label">Total Investment Needed</span>
              <span className="fin-plan__capital-value">{formatINR(fin.totalStartup)}</span>
            </div>
          </div>
          <FundingGapBadge gap={fin.fundingGap} />
        </div>

        {/* Monthly Projection */}
        <div className="fin-plan__section card">
          <h3 className="fin-plan__section-title">📈 Monthly Financial Projection</h3>
          <div className="fin-plan__two-col">
            <div>
              <p className="fin-plan__col-title">Revenue Sources</p>
              <table className="fin-plan__table">
                <tbody>
                  {fin.revenueBreakdown.map(item => (
                    <tr key={item.item}>
                      <td>{item.item}</td>
                      <td className="fin-plan__table-amount fin-plan__table-amount--green">{formatINR(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="fin-plan__table-total">
                    <td>Total Revenue</td>
                    <td className="fin-plan__table-amount fin-plan__table-amount--green">{formatINR(fin.monthlyRevenue)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div>
              <p className="fin-plan__col-title">Monthly Expenses</p>
              <table className="fin-plan__table">
                <tbody>
                  {fin.expenseBreakdown.map(item => (
                    <tr key={item.item}>
                      <td>{item.item}</td>
                      <td className="fin-plan__table-amount fin-plan__table-amount--red">{formatINR(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="fin-plan__table-total">
                    <td>Total Expenses</td>
                    <td className="fin-plan__table-amount fin-plan__table-amount--red">{formatINR(fin.monthlyExpenses)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="fin-plan__profit-banner">
            <TrendingUp size={18} />
            <span>Expected Monthly Profit:</span>
            <strong>{formatINR(fin.monthlyProfit)}</strong>
          </div>
        </div>

        {/* Break-Even */}
        <div className="fin-plan__break-even card">
          <div className="fin-plan__be-num">
            <span>{fin.breakEvenMonths}</span>
            <small>months</small>
          </div>
          <div>
            <h3>Estimated Break-Even Period</h3>
            <p>Based on your startup cost of {formatINR(fin.totalStartup)} and a monthly profit of {formatINR(fin.monthlyProfit)}.</p>
          </div>
        </div>

        {/* Funding Options */}
        <div className="fin-plan__section card">
          <h3 className="fin-plan__section-title">🏛️ Possible Funding Paths</h3>
          <p className="fin-plan__schemes-sub">
            The following government programs may be relevant to your situation. Check individual eligibility criteria before applying.
          </p>
          <div className="fin-plan__schemes">
            {governmentSchemes.map(scheme => (
              <div key={scheme.id} className="fin-plan__scheme-card">
                <span className="fin-plan__scheme-emoji">{scheme.emoji}</span>
                <div>
                  <strong>{scheme.name}</strong>
                  <p className="fin-plan__scheme-agency">{scheme.agency}</p>
                  <p className="fin-plan__scheme-detail">Max Loan: {scheme.maxLoan}</p>
                  <p className="fin-plan__scheme-detail">Subsidy: {scheme.subsidy}</p>
                  <p className="fin-plan__scheme-eligibility">{scheme.eligibility}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="fin-plan__cta-row">
          <button className="btn btn-ghost" onClick={() => navigate('/advisor/analysis')}>← Back to Analysis</button>
          <button className="btn btn-primary btn-lg" onClick={handleNext}>
            Test Business Risks <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

