import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, CartesianGrid, Legend,
} from 'recharts';
import { ArrowRight } from 'lucide-react';
import { calculateScenario, getRiskMeta, PRESET_SCENARIOS } from '../../utils/scenarioCalculations.js';
import { businessIdeas } from '../../data/sihData.js';
import { calculateFinancials } from '../../utils/financialCalculations.js';
import { formatINR } from '../../utils/helpers.js';
import './ScenarioSimulatorPage.css';

function SliderInput({ id, label, min, max, step, value, onChange, unit }) {
  const pct = ((value - min) / (max - min)) * 100;
  const color = value < 0 ? '#DC2626' : value > 0 ? '#16A34A' : '#6B7280';
  return (
    <div className="scenario__slider-wrap">
      <div className="scenario__slider-header">
        <label htmlFor={id}>{label}</label>
        <span className="scenario__slider-val" style={{ color }}>
          {value > 0 ? '+' : ''}{value}{unit}
        </span>
      </div>
      <div className="scenario__range-wrap">
        <span className="scenario__range-min">{min}{unit}</span>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="scenario__range"
          style={{ '--pct': `${pct}%`, '--color': color }}
        />
        <span className="scenario__range-max">+{max}{unit}</span>
      </div>
    </div>
  );
}

export default function ScenarioSimulatorPage({ sihProfile, sihBusiness, sihFinancial, onSaveScenario, onToast }) {
  const navigate = useNavigate();
  const [salesChange, setSalesChange] = useState(0);
  const [costChange,  setCostChange]  = useState(0);
  const [priceChange, setPriceChange] = useState(0);

  if (!sihProfile || !sihBusiness) { navigate('/advisor/profile'); return null; }

  const idea = businessIdeas.find(b => b.id === sihBusiness.id);
  const base  = sihFinancial || calculateFinancials(idea, sihProfile);

  const scenario = useMemo(
    () => calculateScenario(base, salesChange, costChange, priceChange),
    [base, salesChange, costChange, priceChange],
  );

  const riskMeta = getRiskMeta(scenario.risk);

  const chartData = [
    { name: 'Revenue',  Base: base.monthlyRevenue,  Scenario: scenario.revenue  },
    { name: 'Expenses', Base: base.monthlyExpenses, Scenario: scenario.expenses },
    { name: 'Profit',   Base: base.monthlyProfit,   Scenario: Math.max(0, scenario.profit) },
  ];

  const applyPreset = (preset) => {
    setSalesChange(preset.sales);
    setCostChange(preset.cost);
    setPriceChange(preset.price);
  };

  const handleNext = () => {
    onSaveScenario?.({ salesChange, costChange, priceChange, ...scenario });
    onToast?.('Scenario saved! Creating your launch plan...', 'success');
    navigate('/advisor/launchpad');
  };

  const profitDiff = scenario.profit - base.monthlyProfit;
  const beDiff     = scenario.breakEven - base.breakEvenMonths;

  return (
    <div className="scenario">
      {/* Header */}
      <div className="scenario__header">
        <h1 className="scenario__title">📊 Test Your Business Before You Start</h1>
        <p className="scenario__subtitle">See what happens if your assumptions change — instantly.</p>
      </div>

      <div className="scenario__layout">
        {/* Left — controls */}
        <div className="scenario__controls">
          {/* Preset buttons */}
          <div className="scenario__presets">
            {PRESET_SCENARIOS.map(preset => (
              <button
                key={preset.id}
                className={`scenario__preset-btn ${salesChange === preset.sales && costChange === preset.cost && priceChange === preset.price ? 'scenario__preset-btn--active' : ''}`}
                onClick={() => applyPreset(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="scenario__sliders card">
            <SliderInput
              id="sales-change"
              label="📦 Sales Volume Change"
              min={-50} max={50} step={5}
              value={salesChange}
              onChange={setSalesChange}
              unit="%"
            />
            <SliderInput
              id="cost-change"
              label="🧾 Raw Material Cost Change"
              min={-20} max={40} step={5}
              value={costChange}
              onChange={setCostChange}
              unit="%"
            />
            <SliderInput
              id="price-change"
              label="🏷️ Selling Price Change"
              min={-30} max={30} step={5}
              value={priceChange}
              onChange={setPriceChange}
              unit="%"
            />
          </div>

          {/* Risk badge */}
          <div
            className="scenario__risk-badge"
            style={{ background: riskMeta.bg, border: `1.5px solid ${riskMeta.border}`, color: riskMeta.color }}
          >
            <span className="scenario__risk-emoji">{riskMeta.emoji}</span>
            <div>
              <strong>{riskMeta.label}</strong>
              <p>
                {scenario.risk === 'low'      && 'This scenario maintains strong profitability.'}
                {scenario.risk === 'medium'   && 'Moderate impact — monitor closely.'}
                {scenario.risk === 'high'     && 'A significant drop would substantially delay break-even.'}
                {scenario.risk === 'critical' && 'This scenario results in a net loss — revisit your plan.'}
              </p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="scenario__compare card">
            <div className="scenario__compare-col">
              <p className="scenario__compare-header">Base Plan</p>
              <div className="scenario__compare-val scenario__compare-val--base">{formatINR(base.monthlyRevenue)}</div>
              <p className="scenario__compare-metric">Revenue</p>
              <div className="scenario__compare-val scenario__compare-val--base">{formatINR(base.monthlyExpenses)}</div>
              <p className="scenario__compare-metric">Expenses</p>
              <div className="scenario__compare-val scenario__compare-val--base">{formatINR(base.monthlyProfit)}</div>
              <p className="scenario__compare-metric">Profit</p>
              <div className="scenario__compare-val scenario__compare-val--base">{base.breakEvenMonths} months</div>
              <p className="scenario__compare-metric">Break-Even</p>
            </div>
            <div className="scenario__compare-divider" />
            <div className="scenario__compare-col">
              <p className="scenario__compare-header">This Scenario</p>
              <div className="scenario__compare-val" style={{ color: scenario.revenue >= base.monthlyRevenue ? '#16A34A' : '#DC2626' }}>{formatINR(scenario.revenue)}</div>
              <p className="scenario__compare-metric">Revenue</p>
              <div className="scenario__compare-val" style={{ color: scenario.expenses <= base.monthlyExpenses ? '#16A34A' : '#DC2626' }}>{formatINR(scenario.expenses)}</div>
              <p className="scenario__compare-metric">Expenses</p>
              <div className="scenario__compare-val" style={{ color: scenario.profit >= base.monthlyProfit ? '#16A34A' : '#DC2626' }}>
                {formatINR(scenario.profit)}
                {profitDiff !== 0 && <small> ({profitDiff > 0 ? '+' : ''}{formatINR(profitDiff)})</small>}
              </div>
              <p className="scenario__compare-metric">Profit</p>
              <div className="scenario__compare-val" style={{ color: scenario.breakEven <= base.breakEvenMonths ? '#16A34A' : '#DC2626' }}>
                {scenario.breakEven === 999 ? 'No break-even' : `${scenario.breakEven} months`}
                {beDiff !== 0 && scenario.breakEven !== 999 && <small> ({beDiff > 0 ? '+' : ''}{beDiff})</small>}
              </div>
              <p className="scenario__compare-metric">Break-Even</p>
            </div>
          </div>
        </div>

        {/* Right — chart */}
        <div className="scenario__chart-side">
          <div className="scenario__chart-card card">
            <h3 className="scenario__chart-title">Base Plan vs. This Scenario</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Tooltip
                  formatter={(v, name) => [formatINR(v), name]}
                  contentStyle={{ borderRadius: 10, border: '1px solid #E5E7EB', fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Base"     fill="#93C5FD" radius={[4,4,0,0]} name="Base Plan" />
                <Bar dataKey="Scenario" fill="#2563EB" radius={[4,4,0,0]} name="Scenario" />
                <ReferenceLine y={0} stroke="#E5E7EB" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Insight */}
          <div className="scenario__insight card" style={{ borderLeftColor: riskMeta.color }}>
            <p><strong>What this means:</strong></p>
            <p>
              {salesChange !== 0 && `Sales volume change of ${salesChange > 0 ? '+' : ''}${salesChange}% `}
              {costChange  !== 0 && `with cost change of ${costChange > 0 ? '+' : ''}${costChange}% `}
              {priceChange !== 0 && `and price change of ${priceChange > 0 ? '+' : ''}${priceChange}% `}
              {salesChange === 0 && costChange === 0 && priceChange === 0 ? 'Normal scenario — showing base plan.' : ''}
              {scenario.profit <= 0
                ? 'results in a net loss. Reconsider pricing or reduce startup costs.'
                : `results in a monthly profit of ${formatINR(scenario.profit)} and break-even in ${scenario.breakEven} months.`}
            </p>
          </div>

          <button className="btn btn-primary btn-lg scenario__cta" onClick={handleNext}>
            Create My Launch Plan <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

