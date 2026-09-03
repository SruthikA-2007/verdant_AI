import { useNavigate } from 'react-router-dom';
import { Zap, TrendingUp, ShieldCheck, Clock, Bot, Package, BarChart2, Megaphone, ArrowRight, Star, CheckCircle } from 'lucide-react';
import './LandingPage.css';

const benefits = [
  { icon: Clock, title: "Save 3+ Hours Daily", desc: "Automate inventory alerts, customer replies, and reports." },
  { icon: TrendingUp, title: "Increase Revenue 20%", desc: "AI-driven insights help you stock right and sell more." },
  { icon: ShieldCheck, title: "Zero Errors", desc: "Smart stock tracking prevents stockouts and over-ordering." },
];

const features = [
  { icon: Bot, title: "AI Customer Chat", desc: "Answer customer queries 24/7 automatically on WhatsApp.", color: "blue" },
  { icon: Package, title: "Smart Inventory", desc: "Real-time alerts when products run low or go critical.", color: "green" },
  { icon: BarChart2, title: "Business Insights", desc: "Daily revenue, top products, and sales forecasts.", color: "purple" },
  { icon: Megaphone, title: "Marketing AI", desc: "Generate Instagram & WhatsApp promo posts in seconds.", color: "orange" },
];

const testimonials = [
  { name: "Suresh Patel", store: "Patel Grocery, Ahmedabad", text: "GrowPilot saved me 2 hours every day. My stock never runs out now!", rating: 5 },
  { name: "Meena Krishnan", store: "Krishnan Supermart, Chennai", text: "The AI chatbot handles 60% of customer queries. Game changer!", rating: 5 },
  { name: "Arjun Singh", store: "Singh Kirana, Delhi", text: "Revenue grew 28% in 3 months just by following the AI tips.", rating: 5 },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="landing__nav">
        <div className="landing__nav-logo">
          <div className="landing__nav-icon"><Zap size={16} fill="white" /></div>
          <span>GrowPilot <strong>AI</strong></span>
        </div>
        <div className="landing__nav-links">
          <a href="#features">Features</a>
          <a href="#testimonials">Reviews</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div className="landing__nav-cta">
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/login')}>Sign In</button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/login')}>Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing__hero">
        <div className="landing__hero-badge">
          <Zap size={12} fill="currentColor" />
          Trusted by 2,000+ Indian MSME businesses
        </div>
        <h1 className="landing__hero-title">
          Grow Your Small Business<br />
          <span className="text-gradient">with the Power of AI</span>
        </h1>
        <p className="landing__hero-sub">
          Automate inventory, chat with customers, and create marketing content —
          all from one AI-powered platform built for Indian retailers.
        </p>
        <div className="landing__hero-actions">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
            Get Started <ArrowRight size={18} />
          </button>
        </div>
        <div className="landing__hero-proof">
          <div className="landing__hero-proof-item">
            <span className="landing__hero-proof-num">₹2.4Cr+</span>
            <span>Revenue tracked</span>
          </div>
          <div className="landing__hero-proof-divider" />
          <div className="landing__hero-proof-item">
            <span className="landing__hero-proof-num">2,000+</span>
            <span>Active stores</span>
          </div>
          <div className="landing__hero-proof-divider" />
          <div className="landing__hero-proof-item">
            <span className="landing__hero-proof-num">4.9 ⭐</span>
            <span>App rating</span>
          </div>
        </div>

        {/* Mock dashboard preview card */}
        <div className="landing__preview">
          <div className="landing__preview-bar">
            <span className="landing__preview-dot" style={{background:'#EF4444'}} />
            <span className="landing__preview-dot" style={{background:'#F59E0B'}} />
            <span className="landing__preview-dot" style={{background:'#22C55E'}} />
            <span className="landing__preview-url">growpilot.ai/dashboard</span>
          </div>
          <div className="landing__preview-content">
            <div className="landing__preview-kpis">
              {[
                { label: "Revenue Today", val: "₹15,240", color: "#2563EB" },
                { label: "Orders", val: "23", color: "#16A34A" },
                { label: "Low Stock", val: "4 items", color: "#D97706" },
                { label: "Queries", val: "8", color: "#7C3AED" },
              ].map(k => (
                <div key={k.label} className="landing__preview-kpi">
                  <div className="landing__preview-kpi-bar" style={{background: k.color}} />
                  <div>
                    <div className="landing__preview-kpi-val">{k.val}</div>
                    <div className="landing__preview-kpi-label">{k.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="landing__benefits">
        {benefits.map((b, i) => (
          <div key={i} className="landing__benefit-card">
            <div className="landing__benefit-icon"><b.icon size={22} /></div>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="landing__features" id="features">
        <div className="landing__section-header">
          <h2>Everything your store needs</h2>
          <p>One platform to run your entire business operations</p>
        </div>
        <div className="landing__features-grid">
          {features.map((f, i) => (
            <div key={i} className={`landing__feature-card landing__feature-card--${f.color}`}>
              <div className={`landing__feature-icon landing__feature-icon--${f.color}`}>
                <f.icon size={22} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <button className="landing__feature-link" onClick={() => navigate('/login')}>
                Try it now <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="landing__testimonials" id="testimonials">
        <div className="landing__section-header">
          <h2>Loved by store owners across India</h2>
          <p>Real results from real MSMEs</p>
        </div>
        <div className="landing__testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="landing__testimonial-card">
              <div className="landing__stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <p className="landing__testimonial-text">"{t.text}"</p>
              <div className="landing__testimonial-author">
                <div className="landing__testimonial-avatar">{t.name[0]}</div>
                <div>
                  <div className="landing__testimonial-name">{t.name}</div>
                  <div className="landing__testimonial-store">{t.store}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="landing__cta-banner">
        <div className="landing__cta-content">
          <h2>Ready to grow your business?</h2>
          <p>Join 2,000+ store owners already using Verdant AI</p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
            Get Started Free <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <div className="landing__footer-logo">
          <div className="landing__nav-icon" style={{width:24,height:24}}><Zap size={12} fill="white" /></div>
          <span>Verdant AI</span>
        </div>
        <div className="landing__footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
        <p className="landing__footer-copy">© 2026 Verdant AI. Made for Indian MSMEs. 🇮🇳</p>
      </footer>
    </div>
  );
}

