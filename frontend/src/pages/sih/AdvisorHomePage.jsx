import { useNavigate } from 'react-router-dom';
import {
  User2, Bot, MapPin, DollarSign, BarChart2, Rocket,
  ArrowRight, Zap, ChevronRight,
} from 'lucide-react';
import './AdvisorHomePage.css';

const journeySteps = [
  { num: 1, icon: User2,      label: 'Understand You',         desc: 'Build your entrepreneur profile',          route: '/advisor/profile',   color: '#60A5FA' },
  { num: 2, icon: Bot,        label: 'Find the Right Business', desc: 'AI recommends best ideas for you',        route: '/advisor/ideas',     color: '#A78BFA' },
  { num: 3, icon: MapPin,     label: 'Analyze Your Area',       desc: 'Hyper-local opportunity scan',            route: '/advisor/analysis',  color: '#34D399' },
  { num: 4, icon: DollarSign, label: 'Plan Your Finances',      desc: 'Investment, profit & break-even',         route: '/advisor/financial', color: '#FBBF24' },
  { num: 5, icon: BarChart2,  label: 'Test Business Risks',     desc: 'What-if scenario simulator',              route: '/advisor/simulator', color: '#F87171' },
  { num: 6, icon: Rocket,     label: 'Launch & Grow',           desc: '30-day action plan & dashboard',          route: '/advisor/launchpad', color: '#FB923C' },
];

const features = [
  { emoji: '🤖', title: 'AI Business Advisor',      benefit: 'Finds suitable business ideas matched to your profile, capital, and local area.' },
  { emoji: '📍', title: 'Hyper-Local Intelligence', benefit: 'Analyzes demand, competition, market access, and seasonal trends in your district.' },
  { emoji: '💰', title: 'Financial Structuring',    benefit: 'Calculates exact investment needed, monthly profit forecast, and break-even timeline.' },
  { emoji: '📊', title: 'Risk Simulator',            benefit: 'Tests different price, cost, and sales scenarios before you invest a single rupee.' },
  { emoji: '🚀', title: 'Launch Support',            benefit: 'Gives a personalized 30-day action plan and connects you to your business dashboard.' },
];

export default function AdvisorHomePage({ user, sihProfile }) {
  const navigate = useNavigate();
  const firstName = sihProfile?.name?.split(' ')[0] || user?.name?.split('@')[0] || 'Entrepreneur';

  return (
    <div className="advisor-home">
      {/* Hero */}
      <section className="advisor-home__hero">
        <div className="advisor-home__hero-badge">
          <Zap size={13} fill="currentColor" />
          SIH26091 — AI-Driven Rural Business Advisory
        </div>
        <h1 className="advisor-home__hero-title">
          {sihProfile ? `Welcome back, ${firstName}.` : 'Your AI Partner for Building a Better Business.'}
        </h1>
        <p className="advisor-home__hero-sub">
          From business idea to financial planning and growth —
          personalized for your location, budget, and skills.
        </p>
        <button
          className="advisor-home__hero-cta btn btn-primary btn-lg"
          onClick={() => navigate(sihProfile ? '/advisor/ideas' : '/advisor/profile')}
        >
          {sihProfile ? 'Continue My Journey' : 'Start My Business Journey'}
          <ArrowRight size={18} />
        </button>
      </section>

      {/* Journey Steps */}
      <section className="advisor-home__journey">
        <div className="advisor-home__journey-header">
          <h2>Your 6-Step Journey to Business Success</h2>
          <p>Follow the guided path from idea to launch — fully powered by AI.</p>
        </div>

        <div className="advisor-home__steps">
          {journeySteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="advisor-home__step-wrap">
                <button
                  className="advisor-home__step card card-hover"
                  onClick={() => navigate(step.route)}
                >
                  <div className="advisor-home__step-num" style={{ background: step.color + '22', color: step.color, border: `1.5px solid ${step.color}44` }}>
                    {step.num}
                  </div>
                  <div className="advisor-home__step-icon" style={{ background: step.color + '18', color: step.color }}>
                    <Icon size={20} />
                  </div>
                  <div className="advisor-home__step-body">
                    <strong>{step.label}</strong>
                    <span>{step.desc}</span>
                  </div>
                  <ChevronRight size={16} className="advisor-home__step-arrow" />
                </button>
                {i < journeySteps.length - 1 && (
                  <div className="advisor-home__step-connector" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="advisor-home__features">
        <div className="advisor-home__features-header">
          <h2>How Verdant AI Helps You</h2>
          <p>Five intelligent modules, built for rural micro-entrepreneurs.</p>
        </div>
        <div className="advisor-home__features-grid">
          {features.map(f => (
            <div key={f.title} className="advisor-home__feature-card card">
              <span className="advisor-home__feature-emoji">{f.emoji}</span>
              <strong>{f.title}</strong>
              <p>{f.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prototype notice */}
      <div className="advisor-home__notice">
        <span>ℹ️</span>
        <span>
          <strong>Prototype Notice:</strong> Analysis and recommendations use curated demo datasets
          and deterministic scoring algorithms. Results are illustrative, not live market data.
        </span>
      </div>
    </div>
  );
}

