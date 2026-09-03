import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react';
import { locationData, seasonalIndexData, businessIdeas } from '../../data/sihData.js';
import './HyperLocalAnalysisPage.css';

const ANALYSIS_DIMENSIONS = [
  { key: 'demand',       label: 'Local Demand',   emoji: '📈', description: (v) => v >= 80 ? 'Strong demand for this product in your area.' : v >= 65 ? 'Moderate and growing demand.' : 'Moderate demand — niche positioning needed.' },
  { key: 'competition',  label: 'Competition',    emoji: '🏪', description: (v) => v >= 80 ? 'Low competition — great entry window.' : v >= 65 ? 'Moderate competition — differentiation needed.' : 'Higher competition — premium quality is key.' },
  { key: 'marketAccess', label: 'Market Access',  emoji: '🛣️', description: (v) => v >= 80 ? 'Good access to local shops and nearby town markets.' : v >= 65 ? 'Reasonable market connectivity.' : 'Limited market access — online channels recommended.' },
  { key: 'resources',    label: 'Resource Availability', emoji: '🌾', description: (v) => v >= 80 ? 'Strong local raw material and supplier availability.' : v >= 65 ? 'Good resource availability.' : 'Some resource sourcing effort required.' },
  { key: 'seasonal',     label: 'Seasonal Outlook', emoji: '📅', description: (v) => v >= 80 ? 'Positive year-round demand with festive peaks.' : v >= 65 ? 'Moderate seasonal variation.' : 'Notable seasonal fluctuation — plan inventory carefully.' },
];

function getScoreLabel(score) {
  if (score >= 85) return { label: 'Excellent', color: '#16A34A', bg: '#F0FDF4' };
  if (score >= 75) return { label: 'Strong',    color: '#16A34A', bg: '#F0FDF4' };
  if (score >= 65) return { label: 'Good',      color: '#D97706', bg: '#FFFBEB' };
  return              { label: 'Moderate',    color: '#6B7280', bg: '#F3F4F6' };
}

export default function HyperLocalAnalysisPage({ sihProfile, sihBusiness, onSaveAnalysis, onToast }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState(null);

  useEffect(() => {
    if (!sihProfile || !sihBusiness) { navigate('/advisor/profile'); return; }
    const timer = setTimeout(() => {
      const dist = locationData[sihProfile.state]?.districts?.[sihProfile.district];
      const raw  = dist?.scores?.[sihBusiness.id] || { demand: 78, competition: 68, marketAccess: 74, resources: 76, seasonal: 72 };
      const overall = Math.round((raw.demand * 0.28 + raw.competition * 0.18 + raw.marketAccess * 0.2 + raw.resources * 0.2 + raw.seasonal * 0.14));
      const analysis = { ...raw, overall };
      setScores(analysis);
      onSaveAnalysis?.(analysis);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [sihProfile, sihBusiness, navigate, onSaveAnalysis]);

  const seasonalData = seasonalIndexData[sihBusiness?.id] || seasonalIndexData['default'];
  const idea = businessIdeas.find(b => b.id === sihBusiness?.id);

  const handleNext = () => {
    onToast?.('Building your financial plan...', 'success');
    navigate('/advisor/financial');
  };

  return (
    <div className="local-analysis">
      {/* Hero header */}
      <div className="local-analysis__header">
        <div className="local-analysis__header-left">
          <div className="local-analysis__location-tag">
            <MapPin size={14} />
            {sihProfile?.village}, {sihProfile?.district}, {sihProfile?.state}
          </div>
          <h1>Local Business Opportunity</h1>
          <p className="local-analysis__business-name">
            {sihBusiness?.emoji} {sihBusiness?.name}
          </p>
        </div>
        {scores && (
          <div className="local-analysis__overall-score" style={getScoreLabel(scores.overall)}>
            <div className="local-analysis__score-big">{scores.overall}</div>
            <div className="local-analysis__score-den">/100</div>
            <div className="local-analysis__score-label">{getScoreLabel(scores.overall).label} Local Opportunity</div>
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="local-analysis__loading">
          <div className="local-analysis__loading-bar">
            <div className="local-analysis__loading-fill" />
          </div>
          <p>Analyzing local demand, competition, market access, and seasonal trends…</p>
        </div>
      )}

      {scores && (
        <>
          {/* Analysis Cards */}
          <div className="local-analysis__grid">
            {ANALYSIS_DIMENSIONS.map(dim => {
              const v = scores[dim.key];
              const meta = getScoreLabel(v);
              return (
                <div key={dim.key} className="local-analysis__dim-card card">
                  <div className="local-analysis__dim-header">
                    <span className="local-analysis__dim-emoji">{dim.emoji}</span>
                    <div>
                      <p className="local-analysis__dim-label">{dim.label}</p>
                      <div className="local-analysis__dim-score-wrap">
                        <span className="local-analysis__dim-score" style={{ color: meta.color }}>{v}/100</span>
                        <span className="local-analysis__dim-status badge" style={{ background: meta.bg, color: meta.color }}>{meta.label}</span>
                      </div>
                    </div>
                  </div>
                  <div className="local-analysis__dim-bar-track">
                    <div className="local-analysis__dim-bar-fill" style={{ width: `${v}%`, background: meta.color }} />
                  </div>
                  <p className="local-analysis__dim-desc">{dim.description(v)}</p>
                </div>
              );
            })}
          </div>

          {/* Seasonal Chart */}
          <div className="local-analysis__seasonal card">
            <div className="local-analysis__seasonal-header">
              <h3>📅 Monthly Demand Index</h3>
              <span className="badge badge-primary">Seasonal Pattern</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={seasonalData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} domain={[40, 110]} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: '1px solid #E5E7EB', fontSize: 12 }}
                  formatter={v => [`Index: ${v}`, 'Demand']}
                />
                <Bar dataKey="index" radius={[4, 4, 0, 0]}>
                  {seasonalData.map((entry, i) => (
                    <Cell key={i} fill={entry.index >= 90 ? '#16A34A' : entry.index >= 75 ? '#2563EB' : '#94A3B8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary table */}
          <div className="local-analysis__summary card">
            <h3>📊 Analysis Summary</h3>
            <table className="local-analysis__table">
              <tbody>
                {ANALYSIS_DIMENSIONS.map(d => (
                  <tr key={d.key}>
                    <td>{d.emoji} {d.label}</td>
                    <td>
                      <div className="local-analysis__mini-bar-wrap">
                        <div className="local-analysis__mini-bar" style={{ width: `${scores[d.key]}%`, background: getScoreLabel(scores[d.key]).color }} />
                      </div>
                    </td>
                    <td className="local-analysis__table-score" style={{ color: getScoreLabel(scores[d.key]).color }}>{scores[d.key]}</td>
                  </tr>
                ))}
                <tr className="local-analysis__table-total">
                  <td>🎯 Overall Score</td>
                  <td />
                  <td style={{ color: getScoreLabel(scores.overall).color }}><strong>{scores.overall}/100</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* AI Insight */}
          <div className="local-analysis__insight card">
            <div className="local-analysis__insight-header">
              <TrendingUp size={18} color="#2563EB" />
              <h3>Why This Business Is Suitable Here</h3>
            </div>
            <p>
              {idea?.name} shows{' '}
              <strong>{getScoreLabel(scores.overall).label.toLowerCase()} potential</strong>{' '}
              in {sihProfile?.village}, {sihProfile?.district} based on local demand indicators and resource availability.
              {scores.competition >= 70
                ? ' Competition is manageable — focus on consistent quality and service.'
                : ' Differentiation through product quality and pricing will be important.'}
              {scores.resources >= 80
                ? ' Raw material availability is strong, which reduces sourcing risk.'
                : ' Plan your supplier network early to ensure smooth operations.'}
            </p>
            <div className="local-analysis__notice">
              ℹ️ <em>Prototype Analysis — based on selected local indicators and demo datasets, not live market data.</em>
            </div>
          </div>

          {/* CTA */}
          <div className="local-analysis__cta-row">
            <button className="btn btn-ghost" onClick={() => navigate('/advisor/ideas')}>← Change Business</button>
            <button className="btn btn-primary btn-lg" onClick={handleNext}>
              Build My Financial Plan <ArrowRight size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

