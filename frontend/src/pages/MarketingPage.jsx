import { useState } from 'react';
import { MessageCircle, Copy, Check, Sparkles, Zap, ArrowRight } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import { useAI } from '../hooks/useAI';
import { marketingPresets } from '../data/mockData';
import './MarketingPage.css';

// Inline SVG icons for social platforms not in lucide-react
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const platforms = [
  { id: 'instagram', label: 'Instagram', icon: InstagramIcon, color: '#E1306C' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: '#25D366' },
  { id: 'facebook', label: 'Facebook', icon: FacebookIcon, color: '#1877F2' },
];

const occasions = ["Weekend Special", "Eid Al Adha", "Diwali Offer", "Independence Day", "Stock Clearance", "New Arrival", "Monsoon Sale", "Festival Season"];

function CopyButton({ text, onToast }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    onToast?.('Copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className={`btn btn-ghost btn-sm copy-btn ${copied ? 'copy-btn--copied' : ''}`} onClick={handleCopy}>
      {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
    </button>
  );
}

export default function MarketingPage({ onToast, business }) {
  const { generateMarketing, isLoading } = useAI();
  const marketingData = business?.workspace?.marketing || { title: 'AI Marketing Generator', subtitle: 'Generate promotional content for Instagram, WhatsApp & Facebook in seconds', presets: marketingPresets, businessName: 'Sharma General Store' };
  const [form, setForm] = useState({ productName: '', offerPercent: '', occasion: '', platform: 'instagram' });
  const [content, setContent] = useState(null);

  const handleGenerate = async () => {
    if (!form.productName || !form.offerPercent) {
      onToast?.('Please fill product name and offer %', 'error');
      return;
    }
    const result = await generateMarketing(form, {
      businessName: marketingData?.businessName || 'Sharma General Store',
    });
    setContent(result);
  };

  const loadPreset = (preset) => {
    setForm({ productName: preset.productName, offerPercent: preset.offerPercent, occasion: preset.occasion, platform: preset.platform });
    setContent(null);
    onToast?.(`Preset loaded: ${preset.label}`, 'info');
  };

  return (
    <div className="page-wrap">
      <Topbar title={marketingData.title} subtitle={marketingData.subtitle} />
      <div className="mkt-layout animate-fade-in">

        {/* Input Panel */}
        <div className="mkt-panel">
          {/* Quick Presets */}
          <div className="card mkt-presets-card">
            <p className="mkt-section-label">Quick Presets</p>
            <div className="mkt-presets">
              {marketingData.presets.map((p, i) => (
                <button key={i} className="mkt-preset-btn" onClick={() => loadPreset(p)}>
                  <Zap size={12} /> {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="card mkt-form-card">
            <h3 className="mkt-form-title">
              <Sparkles size={18} /> Create Content
            </h3>

            <div className="mkt-form-group">
              <label>Product / Offer Name</label>
              <input
                className="input"
                placeholder="e.g. Basmati Rice 5kg"
                value={form.productName}
                onChange={e => setForm(p => ({ ...p, productName: e.target.value }))}
              />
            </div>

            <div className="mkt-form-row">
              <div className="mkt-form-group">
                <label>Discount %</label>
                <input
                  className="input"
                  type="number"
                  placeholder="e.g. 15"
                  value={form.offerPercent}
                  onChange={e => setForm(p => ({ ...p, offerPercent: e.target.value }))}
                  min={1} max={90}
                />
              </div>
              <div className="mkt-form-group">
                <label>Occasion</label>
                <select
                  className="select"
                  value={form.occasion}
                  onChange={e => setForm(p => ({ ...p, occasion: e.target.value }))}
                >
                  <option value="">Choose...</option>
                  {occasions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="mkt-form-group">
              <label>Primary Platform</label>
              <div className="mkt-platform-select">
                {platforms.map(p => (
                  <button
                    key={p.id}
                    className={`mkt-platform-btn ${form.platform === p.id ? 'mkt-platform-btn--active' : ''}`}
                    onClick={() => setForm(prev => ({ ...prev, platform: p.id }))}
                    style={{ '--p-color': p.color }}
                  >
                    <p.icon size={16} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              className={`btn btn-primary btn-lg mkt-generate-btn ${isLoading ? 'mkt-loading' : ''}`}
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mkt-spinner" />
                  Generating with AI...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Content
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="mkt-output">
          {!content && !isLoading && (
            <div className="mkt-empty card">
              <div className="mkt-empty-icon"><Sparkles size={32} /></div>
              <h3>Fill in the form and click Generate</h3>
              <p>Verdant AI will create personalized marketing content for all your social platforms in seconds.</p>
            </div>
          )}

          {isLoading && (
            <div className="mkt-loading-state card">
              <div className="mkt-loading-dots">
                <div className="mkt-loading-dot" />
                <div className="mkt-loading-dot" />
                <div className="mkt-loading-dot" />
              </div>
              <p>AI is crafting your perfect marketing copy...</p>
            </div>
          )}

          {content && !isLoading && (
            <div className="mkt-results">
              {platforms.map(p => (
                <div key={p.id} className="card mkt-result-card">
                  <div className="mkt-result-header">
                    <div className="mkt-result-icon" style={{ background: `${p.color}15`, color: p.color }}>
                      <p.icon size={18} />
                    </div>
                    <div>
                      <h4>{p.label} Post</h4>
                      <p className="mkt-result-sub">Ready to share</p>
                    </div>
                    <CopyButton text={content[p.id]} onToast={onToast} />
                  </div>
                  <div className="mkt-result-body">
                    <p>{content[p.id]}</p>
                  </div>
                </div>
              ))}

              {/* Hashtags + CTA */}
              <div className="mkt-extras">
                <div className="card mkt-hashtags-card">
                  <div className="mkt-extras-header">
                    <h4>Hashtags</h4>
                    <CopyButton text={content.hashtags?.join(' ')} onToast={onToast} />
                  </div>
                  <div className="mkt-hashtags">
                    {content.hashtags?.map((tag, i) => (
                      <span key={i} className="badge badge-primary">#{tag.replace('#', '')}</span>
                    ))}
                  </div>
                </div>
                <div className="card mkt-cta-card">
                  <h4>Call to Action</h4>
                  <p className="mkt-cta-text">{content.callToAction}</p>
                  <CopyButton text={content.callToAction} onToast={onToast} />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

