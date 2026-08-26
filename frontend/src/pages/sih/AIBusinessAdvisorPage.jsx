import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot, MapPin, TrendingUp } from 'lucide-react';
import { getRankedRecommendations } from '../../utils/opportunityScore.js';
import './AIBusinessAdvisorPage.css';

const MEDALS = ['🥇', '🥈', '🥉'];
const MEDAL_LABELS = ['Top Recommendation', '2nd Choice', '3rd Choice'];
const MEDAL_COLORS = ['#D97706', '#6B7280', '#B45309'];
const MEDAL_BG    = ['#FFFBEB', '#F8FAFC', '#FFF7ED'];

const SCORE_BARS = [
  { key: 'budgetFit',        label: 'Budget Fit' },
  { key: 'interestMatch',    label: 'Skills Match' },
  { key: 'resourceFit',      label: 'Resource Fit' },
  { key: 'locationPotential',label: 'Local Potential' },
];

function ScoreBar({ label, value }) {
  const color = value >= 80 ? '#16A34A' : value >= 60 ? '#D97706' : '#DC2626';
  return (
    <div className="ai-advisor__score-row">
      <span className="ai-advisor__score-label">{label}</span>
      <div className="ai-advisor__score-track">
        <div className="ai-advisor__score-fill" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="ai-advisor__score-val" style={{ color }}>{value}%</span>
    </div>
  );
}

export default function AIBusinessAdvisorPage({ sihProfile, onSaveBusiness, onToast }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recs, setRecs] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!sihProfile) { navigate('/advisor/profile'); return; }
    const timer = setTimeout(() => {
      setRecs(getRankedRecommendations(sihProfile));
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [sihProfile, navigate]);

  const handleAnalyze = (idea) => {
    const payload = { id: idea.id, name: idea.name, score: idea.score, category: idea.category, emoji: idea.emoji };
    onSaveBusiness?.(payload);
    onToast?.(`${idea.name} selected. Analyzing your local area...`, 'success');
    navigate('/advisor/analysis');
  };

  const firstName = sihProfile?.name?.split(' ')[0] || 'you';

  return (
    <div className="ai-advisor">
      {/* Header */}
      <div className="ai-advisor__header">
        <div className="ai-advisor__header-icon">
          <Bot size={24} />
        </div>
        <div>
          <h1 className="ai-advisor__title">AI Business Recommendations</h1>
          <p className="ai-advisor__subtitle">
            {sihProfile ? (
              <>Based on your budget, skills, interests, and location in <strong>{sihProfile.village}, {sihProfile.district}</strong></>
            ) : 'Complete your profile to get personalized recommendations.'}
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="ai-advisor__loading">
          <div className="ai-advisor__loading-dots">
            <span /><span /><span />
          </div>
          <p>AI is analyzing your profile and local market conditions...</p>
        </div>
      )}

      {/* Cards */}
      {!loading && (
        <>
          <div className="ai-advisor__tagline">
            <TrendingUp size={16} />
            {firstName.charAt(0).toUpperCase() + firstName.slice(1)}, here are the best business opportunities matched to your profile.
          </div>

          <div className="ai-advisor__cards">
            {recs.map((idea, i) => (
              <div
                key={idea.id}
                className={`ai-advisor__card card ${selected === idea.id ? 'ai-advisor__card--selected' : ''}`}
                style={{ '--medal-color': MEDAL_COLORS[i], '--medal-bg': MEDAL_BG[i] }}
                onClick={() => setSelected(idea.id)}
              >
                {/* Rank badge */}
                <div className="ai-advisor__rank">
                  <span className="ai-advisor__medal">{MEDALS[i]}</span>
                  <span className="ai-advisor__rank-label" style={{ color: MEDAL_COLORS[i] }}>{MEDAL_LABELS[i]}</span>
                </div>

                {/* Business name */}
                <div className="ai-advisor__idea-name">
                  <span className="ai-advisor__idea-emoji">{idea.emoji}</span>
                  <div>
                    <h2>{idea.name}</h2>
                    <span className="badge badge-gray">{idea.category}</span>
                  </div>
                </div>

                {/* Overall score */}
                <div className="ai-advisor__overall" style={{ background: MEDAL_BG[i] }}>
                  <div className="ai-advisor__overall-num" style={{ color: MEDAL_COLORS[i] }}>
                    {idea.score.overall}<span>/100</span>
                  </div>
                  <div className="ai-advisor__overall-label">Opportunity Score</div>
                </div>

                {/* Score breakdown bars */}
                <div className="ai-advisor__bars">
                  {SCORE_BARS.map(bar => (
                    <ScoreBar key={bar.key} label={bar.label} value={idea.score.breakdown[bar.key]} />
                  ))}
                </div>

                {/* Why */}
                <div className="ai-advisor__why">
                  <p className="ai-advisor__why-title">Why GrowPilot recommends this:</p>
                  <ul>
                    {idea.strengths.slice(0, 3).map((s, j) => (
                      <li key={j}>✓ {s}</li>
                    ))}
                  </ul>
                </div>

                {/* Investment range */}
                <div className="ai-advisor__meta">
                  <span>💰 ₹{(idea.investmentMin / 1000).toFixed(0)}K – ₹{(idea.investmentMax / 1000).toFixed(0)}K investment</span>
                  <span>📊 {idea.risk} risk</span>
                </div>

                {/* CTA */}
                <button
                  className="btn btn-primary ai-advisor__cta"
                  style={i > 0 ? { background: 'white', color: MEDAL_COLORS[i], border: `1.5px solid ${MEDAL_COLORS[i]}` } : {}}
                  onClick={(e) => { e.stopPropagation(); handleAnalyze(idea); }}
                >
                  <MapPin size={15} />
                  Analyze My Location →
                </button>
              </div>
            ))}
          </div>

          <div className="ai-advisor__note">
            <span>ℹ️ Recommendations use a scoring algorithm based on your profile inputs and demo datasets. Scores are indicative — not live market data.</span>
          </div>
        </>
      )}
    </div>
  );
}
