import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lightbulb, Target, Wallet, MapPinned } from 'lucide-react';
import './FirstLoginAssessmentPage.css';

const initialForm = {
  customerSegment: '',
  coreProblem: '',
  competitors: '',
  whyChooseYou: '',
  nichePositioning: '',
  businessModel: '',
  pricingStrategy: '',
  costVsProfit: '',
  growthPlan: '',
  initialInvestment: '',
  workingCapital: '',
  emergencyBuffer: '',
  cashflowTracking: '',
  setupType: '',
  infraAccess: '',
  customerAccessibility: '',
};

export default function FirstLoginAssessmentPage({ user, onComplete, onToast }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [aiSeed, setAiSeed] = useState('');
  const [isFilling, setIsFilling] = useState(false);

  const setValue = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleAIFill = async () => {
    const seed = aiSeed.trim();
    if (!seed) {
      onToast?.('Add a short business idea and location to use AI Fill.', 'warning');
      return;
    }

    setIsFilling(true);

    const tokens = seed.split(/[,|-]/).map((t) => t.trim()).filter(Boolean);
    const idea = tokens[0] || seed;
    const location = tokens[1] || 'your local market';
    const audience = tokens[2] || 'price-sensitive local customers';

    await new Promise((resolve) => setTimeout(resolve, 700));

    setForm({
      customerSegment: `${audience}, nearby residents, and repeat walk-in buyers in ${location}`,
      coreProblem: `Customers need reliable and affordable access to ${idea.toLowerCase()} with consistent quality and availability.`,
      competitors: `Local stores and online sellers offering similar ${idea.toLowerCase()} options.`,
      whyChooseYou: `Better value pricing, faster service, and curated products matched to customer demand in ${location}.`,
      nichePositioning: `${idea} tailored for ${audience} in ${location} with practical pricing and dependable service.`,
      businessModel: `Retail and repeat-order model focused on ${idea.toLowerCase()} with both walk-in and messaging-based orders.`,
      pricingStrategy: 'Competitive pricing for fast-moving items and margin-focused pricing for premium variants.',
      costVsProfit: 'Target gross margin 22-30% with monthly fixed cost control and weekly profitability tracking.',
      growthPlan: 'Month 1-2: stabilize sales and repeat customers. Month 3-4: partner channels and bundles. Month 5-6: add top-demand SKUs/services.',
      initialInvestment: 'Split budget across inventory/equipment (55%), setup and rent (25%), marketing (10%), operations (10%).',
      workingCapital: 'Keep at least 3-6 months of operating expense and replenishment cycle buffer.',
      emergencyBuffer: 'Maintain emergency reserve equal to at least 2 months of fixed costs.',
      cashflowTracking: 'Daily sales and expense entry with weekly cashflow review and monthly reconciliation.',
      setupType: 'Shop',
      infraAccess: `Stable electricity, internet, and logistics partner coverage in ${location}.`,
      customerAccessibility: `Customer-friendly location with nearby footfall, clear signboards, and easy pickup/delivery support in ${location}.`,
    });

    setIsFilling(false);
    onToast?.('AI Fill completed. Review and edit before saving.', 'success');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      'customerSegment',
      'coreProblem',
      'competitors',
      'whyChooseYou',
      'nichePositioning',
      'businessModel',
      'pricingStrategy',
      'costVsProfit',
      'growthPlan',
      'initialInvestment',
      'workingCapital',
      'emergencyBuffer',
      'cashflowTracking',
      'setupType',
      'infraAccess',
      'customerAccessibility',
    ];

    const missing = requiredFields.filter((field) => !`${form[field] || ''}`.trim());
    if (missing.length) {
      onToast?.('Please fill all assessment fields before continuing.', 'warning');
      return;
    }

    onComplete?.(user.email, form);
    navigate('/businesses');
  };

  return (
    <div className="first-assessment-page">
      <div className="first-assessment-shell card animate-fade-in">
        <header className="first-assessment-header">
          <h1>Business Foundation Assessment</h1>
          <p>
            Hi {user.name || user.email}. This one-time setup captures your business essentials so the platform can tailor guidance.
          </p>
        </header>

        <section className="first-ai-fill">
          <div>
            <p className="first-ai-fill__title">AI Fill (Quick Start)</p>
            <p className="first-ai-fill__sub">Share minimal details like idea, city, and audience. Example: bakery, Madurai, college students.</p>
          </div>
          <div className="first-ai-fill__controls">
            <input
              className="input"
              value={aiSeed}
              onChange={(e) => setAiSeed(e.target.value)}
              placeholder="Example: affordable trendy wear, Madurai, college students"
            />
            <button type="button" className="btn btn-outline" onClick={handleAIFill} disabled={isFilling}>
              {isFilling ? 'Filling...' : 'Fill with AI'}
            </button>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="first-assessment-form">
          <section className="first-section">
            <h2><Target size={16} /> 1. Business Idea & Market Fit</h2>
            <div className="first-grid">
              <div>
                <label>Who are your customers? (local, online, niche)</label>
                <input className="input" value={form.customerSegment} onChange={(e) => setValue('customerSegment', e.target.value)} placeholder="Example: college students in Madurai" />
              </div>
              <div>
                <label>What problem are you solving?</label>
                <input className="input" value={form.coreProblem} onChange={(e) => setValue('coreProblem', e.target.value)} placeholder="Example: affordable trendy daily wear" />
              </div>
              <div>
                <label>Who are your competitors?</label>
                <input className="input" value={form.competitors} onChange={(e) => setValue('competitors', e.target.value)} placeholder="Direct and indirect competitors" />
              </div>
              <div>
                <label>Why should customers choose you?</label>
                <input className="input" value={form.whyChooseYou} onChange={(e) => setValue('whyChooseYou', e.target.value)} placeholder="Your differentiator" />
              </div>
            </div>
            <div>
              <label>Define your idea with niche clarity</label>
              <textarea className="input first-textarea" value={form.nichePositioning} onChange={(e) => setValue('nichePositioning', e.target.value)} placeholder="Example: affordable trendy college wear for students in Madurai" />
            </div>
          </section>

          <section className="first-section">
            <h2><Lightbulb size={16} /> 2. Business Plan</h2>
            <div className="first-grid">
              <div>
                <label>Business model (product/service)</label>
                <input className="input" value={form.businessModel} onChange={(e) => setValue('businessModel', e.target.value)} placeholder="What you sell and how" />
              </div>
              <div>
                <label>Pricing strategy</label>
                <input className="input" value={form.pricingStrategy} onChange={(e) => setValue('pricingStrategy', e.target.value)} placeholder="Value, premium, penetration..." />
              </div>
              <div>
                <label>Cost vs expected profit</label>
                <input className="input" value={form.costVsProfit} onChange={(e) => setValue('costVsProfit', e.target.value)} placeholder="Monthly cost and expected margin" />
              </div>
              <div>
                <label>Growth plan (3-6 months)</label>
                <input className="input" value={form.growthPlan} onChange={(e) => setValue('growthPlan', e.target.value)} placeholder="Milestones for next 3-6 months" />
              </div>
            </div>
          </section>

          <section className="first-section">
            <h2><Wallet size={16} /> 3. Finance & Budgeting</h2>
            <div className="first-grid">
              <div>
                <label>Initial investment</label>
                <input className="input" value={form.initialInvestment} onChange={(e) => setValue('initialInvestment', e.target.value)} placeholder="Machines, rent, stock etc." />
              </div>
              <div>
                <label>Working capital (3-6 months)</label>
                <input className="input" value={form.workingCapital} onChange={(e) => setValue('workingCapital', e.target.value)} placeholder="Planned working capital" />
              </div>
              <div>
                <label>Emergency buffer</label>
                <input className="input" value={form.emergencyBuffer} onChange={(e) => setValue('emergencyBuffer', e.target.value)} placeholder="Backup reserve" />
              </div>
              <div>
                <label>Cash flow tracking method</label>
                <input className="input" value={form.cashflowTracking} onChange={(e) => setValue('cashflowTracking', e.target.value)} placeholder="Daily sheet, app, accountant..." />
              </div>
            </div>
          </section>

          <section className="first-section">
            <h2><MapPinned size={16} /> 4. Location & Infrastructure</h2>
            <div className="first-grid">
              <div>
                <label>Business setup type</label>
                <select className="select" value={form.setupType} onChange={(e) => setValue('setupType', e.target.value)}>
                  <option value="">Choose setup...</option>
                  <option value="Shop">Shop</option>
                  <option value="Office">Office</option>
                  <option value="Home-based">Home-based</option>
                </select>
              </div>
              <div>
                <label>Electricity, internet, logistics access</label>
                <input className="input" value={form.infraAccess} onChange={(e) => setValue('infraAccess', e.target.value)} placeholder="Infrastructure readiness notes" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Customer accessibility</label>
                <textarea className="input first-textarea" value={form.customerAccessibility} onChange={(e) => setValue('customerAccessibility', e.target.value)} placeholder="How easy is it for customers to reach you?" />
              </div>
            </div>
          </section>

          <div className="first-assessment-actions">
            <button type="submit" className="btn btn-primary btn-lg">
              Save and Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
