import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User2, MapPin, Briefcase, Package } from 'lucide-react';
import { locationData } from '../../data/sihData.js';
import './BusinessProfilePage.css';

const STEPS = ['About You', 'Your Location', 'Your Situation', 'Business Interest'];

const ageRanges   = ['18–25', '26–35', '36–45', '46–55', '55+'];
const occupations = ['Farmer', 'Daily Wage Worker', 'Housewife', 'Shop Owner', 'Student', 'Self-Employed', 'Other'];
const experiences = ['No prior experience', 'Ran a small business before', 'Helped family business', 'Worked in a relevant trade'];
const states      = Object.keys(locationData);
const resourceOptions = [
  { key: 'space',      label: 'Shop / Workspace' },
  { key: 'land',       label: 'Land / Farm' },
  { key: 'vehicle',    label: 'Vehicle' },
  { key: 'equipment',  label: 'Equipment / Tools' },
];
const interestOptions = [
  { key: 'food',         label: 'Food & Processing',  emoji: '🍽️' },
  { key: 'agriculture',  label: 'Agriculture',         emoji: '🌱' },
  { key: 'retail',       label: 'Retail',              emoji: '🏪' },
  { key: 'manufacturing',label: 'Manufacturing',        emoji: '⚙️' },
  { key: 'services',     label: 'Services',            emoji: '💼' },
  { key: 'handicrafts',  label: 'Handicrafts',         emoji: '🏺' },
];

const stepIcons = [User2, MapPin, Briefcase, Package];

const INITIAL = {
  name: '', age: '', occupation: '', experience: '',
  state: '', district: '', village: '',
  capital: '', hasShop: '', hasFamily: '', resources: [],
  interests: [],
};

export default function BusinessProfilePage({ onSave, onToast }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const toggle = (k, val) => {
    setForm(p => {
      const arr = p[k] || [];
      return { ...p, [k]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  };

  const districts = form.state ? Object.keys(locationData[form.state]?.districts || {}) : [];
  const villages  = form.state && form.district
    ? (locationData[form.state]?.districts[form.district]?.villages || [])
    : [];

  const canProceed = () => {
    if (step === 0) return form.name && form.age && form.occupation;
    if (step === 1) return form.state && form.district && form.village;
    if (step === 2) return form.capital && form.hasShop !== '' && form.hasFamily !== '';
    if (step === 3) return form.interests.length > 0;
    return true;
  };

  const handleNext = () => {
    if (!canProceed()) { onToast?.('Please fill in all required fields to continue.', 'warning'); return; }
    if (step < STEPS.length - 1) { setStep(s => s + 1); return; }
    onSave?.(form);
    onToast?.('Profile saved! Finding the best businesses for you...', 'success');
    navigate('/advisor/ideas');
  };

  const StepIcon = stepIcons[step];

  return (
    <div className="biz-profile">
      {/* Progress bar */}
      <div className="biz-profile__progress-wrap">
        <div className="biz-profile__progress-bar" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>

      {/* Step tabs */}
      <div className="biz-profile__tabs">
        {STEPS.map((label, i) => (
          <button
            key={label}
            className={`biz-profile__tab ${i === step ? 'biz-profile__tab--active' : ''} ${i < step ? 'biz-profile__tab--done' : ''}`}
            onClick={() => i < step && setStep(i)}
          >
            <span className="biz-profile__tab-num">{i < step ? '✓' : i + 1}</span>
            <span className="biz-profile__tab-label">{label}</span>
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="biz-profile__body">
        <div className="biz-profile__card card animate-fade-in" key={step}>
          <div className="biz-profile__card-header">
            <div className="biz-profile__card-icon">
              <StepIcon size={22} />
            </div>
            <div>
              <p className="biz-profile__card-step">Step {step + 1} of {STEPS.length}</p>
              <h2 className="biz-profile__card-title">{STEPS[step]}</h2>
            </div>
          </div>

          {/* Step 0 — About You */}
          {step === 0 && (
            <div className="biz-profile__fields">
              <div className="biz-profile__field">
                <label htmlFor="bp-name">Your Full Name *</label>
                <input id="bp-name" className="input" placeholder="e.g. Rajesh Kumar" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div className="biz-profile__field-row">
                <div className="biz-profile__field">
                  <label>Age Range *</label>
                  <div className="biz-profile__chips">
                    {ageRanges.map(a => (
                      <button key={a} className={`biz-profile__chip ${form.age === a ? 'biz-profile__chip--active' : ''}`} onClick={() => set('age', a)}>{a}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="biz-profile__field">
                <label>Current Occupation *</label>
                <div className="biz-profile__chips">
                  {occupations.map(o => (
                    <button key={o} className={`biz-profile__chip ${form.occupation === o ? 'biz-profile__chip--active' : ''}`} onClick={() => set('occupation', o)}>{o}</button>
                  ))}
                </div>
              </div>
              <div className="biz-profile__field">
                <label>Previous Business Experience</label>
                <div className="biz-profile__chips">
                  {experiences.map(e => (
                    <button key={e} className={`biz-profile__chip ${form.experience === e ? 'biz-profile__chip--active' : ''}`} onClick={() => set('experience', e)}>{e}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Location */}
          {step === 1 && (
            <div className="biz-profile__fields">
              <div className="biz-profile__field">
                <label>State *</label>
                <select className="select" value={form.state} onChange={e => set('state', e.target.value)}>
                  <option value="">Select State</option>
                  {states.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="biz-profile__field">
                <label>District *</label>
                <select className="select" value={form.district} onChange={e => { set('district', e.target.value); set('village', ''); }} disabled={!form.state}>
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="biz-profile__field">
                <label>Village / Town *</label>
                <select className="select" value={form.village} onChange={e => set('village', e.target.value)} disabled={!form.district}>
                  <option value="">Select Village / Town</option>
                  {villages.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              {form.state && form.district && form.village && (
                <div className="biz-profile__location-badge">
                  <MapPin size={14} />
                  {form.village}, {form.district}, {form.state}
                </div>
              )}
            </div>
          )}

          {/* Step 2 — Situation */}
          {step === 2 && (
            <div className="biz-profile__fields">
              <div className="biz-profile__field">
                <label htmlFor="bp-capital">Available Capital (₹) *</label>
                <input
                  id="bp-capital"
                  className="input"
                  type="number"
                  placeholder="e.g. 150000"
                  value={form.capital}
                  onChange={e => set('capital', e.target.value)}
                />
                <span className="biz-profile__hint">Enter the amount you can invest to start a business</span>
              </div>
              <div className="biz-profile__field">
                <label>Do you have a shop or workspace? *</label>
                <div className="biz-profile__toggle-row">
                  {['Yes', 'No'].map(opt => (
                    <button key={opt} className={`biz-profile__toggle ${form.hasShop === opt ? 'biz-profile__toggle--active' : ''}`} onClick={() => set('hasShop', opt)}>{opt}</button>
                  ))}
                </div>
              </div>
              <div className="biz-profile__field">
                <label>Can family members help in the business? *</label>
                <div className="biz-profile__toggle-row">
                  {['Yes', 'No'].map(opt => (
                    <button key={opt} className={`biz-profile__toggle ${form.hasFamily === opt ? 'biz-profile__toggle--active' : ''}`} onClick={() => set('hasFamily', opt)}>{opt}</button>
                  ))}
                </div>
              </div>
              <div className="biz-profile__field">
                <label>What resources do you have? (select all that apply)</label>
                <div className="biz-profile__chips">
                  {resourceOptions.map(r => (
                    <button key={r.key} className={`biz-profile__chip ${form.resources.includes(r.key) ? 'biz-profile__chip--active' : ''}`} onClick={() => toggle('resources', r.key)}>{r.label}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Business Interest */}
          {step === 3 && (
            <div className="biz-profile__fields">
              <p className="biz-profile__interest-sub">Select one or more areas you're interested in:</p>
              <div className="biz-profile__interest-grid">
                {interestOptions.map(opt => (
                  <button
                    key={opt.key}
                    className={`biz-profile__interest-card ${form.interests.includes(opt.key) ? 'biz-profile__interest-card--active' : ''}`}
                    onClick={() => toggle('interests', opt.key)}
                  >
                    <span className="biz-profile__interest-emoji">{opt.emoji}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="biz-profile__actions">
            {step > 0 && (
              <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)}>← Back</button>
            )}
            <button className="btn btn-primary biz-profile__next" onClick={handleNext}>
              {step === STEPS.length - 1 ? (
                <>Find Suitable Businesses <ArrowRight size={16} /></>
              ) : (
                <>Next: {STEPS[step + 1]} <ArrowRight size={16} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

