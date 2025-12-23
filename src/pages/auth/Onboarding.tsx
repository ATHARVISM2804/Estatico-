import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import styles from './Auth.module.css';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    phone: '',
    company: '',
    role: '',
    sources: [] as string[],
    template: '',
  });

  const totalSteps = 3;

  const leadSources = [
    { id: 'zillow', icon: '🏠', title: 'Zillow', desc: 'Import Zillow leads' },
    { id: 'realtor', icon: '🔑', title: 'Realtor.com', desc: 'Connect your account' },
    { id: 'website', icon: '🌐', title: 'Website', desc: 'Your website forms' },
    { id: 'manual', icon: '✏️', title: 'Manual', desc: 'Add leads manually' },
  ];

  const workflowTemplates = [
    { id: 'buyer', icon: '🏡', title: 'Buyer Lead', desc: 'For new buyer inquiries' },
    { id: 'seller', icon: '💰', title: 'Seller Lead', desc: 'For listing appointments' },
    { id: 'contract', icon: '📋', title: 'Under Contract', desc: 'Closing process workflow' },
    { id: 'custom', icon: '⚡', title: 'Start Fresh', desc: 'Build your own workflow' },
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleSource = (id: string) => {
    setData(prev => ({
      ...prev,
      sources: prev.sources.includes(id) 
        ? prev.sources.filter(s => s !== id)
        : [...prev.sources, id]
    }));
  };

  return (
    <div className={styles.onboardingPage}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
      </div>

      <header className={styles.onboardingHeader}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="8" width="24" height="18" rx="2" stroke="url(#onboardLogoGrad)" strokeWidth="2"/>
              <path d="M4 14L16 22L28 14" stroke="url(#onboardLogoGrad)" strokeWidth="2"/>
              <circle cx="16" cy="6" r="3" fill="url(#onboardLogoGrad)"/>
              <defs>
                <linearGradient id="onboardLogoGrad" x1="4" y1="3" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00d4aa"/>
                  <stop offset="1" stopColor="#00b4d8"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>Estatico</span>
        </Link>
        <button className={styles.skipBtn} onClick={() => navigate('/dashboard')}>
          Skip for now
        </button>
      </header>

      <main className={styles.onboardingContent}>
        <div className={styles.onboardingCard}>
          {/* Progress */}
          <div className={styles.progress}>
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`${styles.progressStep} ${i === step ? styles.active : ''} ${i < step ? styles.completed : ''}`}
              />
            ))}
          </div>

          {/* Step 1: Profile */}
          {step === 1 && (
            <>
              <h2 className={styles.stepTitle}>Tell us about yourself</h2>
              <p className={styles.stepSubtitle}>This helps us personalize your experience</p>
              
              <div className={styles.form}>
                <div className={styles.field}>
                  <label>Phone number</label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label>Company / Brokerage</label>
                  <input
                    type="text"
                    placeholder="RE/MAX, Keller Williams, etc."
                    value={data.company}
                    onChange={(e) => setData({ ...data, company: e.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label>Your role</label>
                  <select 
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                    style={{
                      padding: '14px 16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '15px',
                      color: data.role ? 'var(--text-primary)' : 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select your role</option>
                    <option value="agent">Real Estate Agent</option>
                    <option value="broker">Broker</option>
                    <option value="team_lead">Team Lead</option>
                    <option value="admin">Admin/Assistant</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Step 2: Lead Sources */}
          {step === 2 && (
            <>
              <h2 className={styles.stepTitle}>Connect your lead sources</h2>
              <p className={styles.stepSubtitle}>Select where your leads come from</p>
              
              <div className={styles.optionGrid}>
                {leadSources.map(source => (
                  <div 
                    key={source.id}
                    className={`${styles.optionCard} ${data.sources.includes(source.id) ? styles.selected : ''}`}
                    onClick={() => toggleSource(source.id)}
                  >
                    <div className={styles.optionIcon}>{source.icon}</div>
                    <div className={styles.optionTitle}>{source.title}</div>
                    <div className={styles.optionDesc}>{source.desc}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Step 3: Workflow Template */}
          {step === 3 && (
            <>
              <h2 className={styles.stepTitle}>Choose a workflow template</h2>
              <p className={styles.stepSubtitle}>Start with a pre-built automation or create your own</p>
              
              <div className={styles.optionGrid}>
                {workflowTemplates.map(template => (
                  <div 
                    key={template.id}
                    className={`${styles.optionCard} ${data.template === template.id ? styles.selected : ''}`}
                    onClick={() => setData({ ...data, template: template.id })}
                  >
                    <div className={styles.optionIcon}>{template.icon}</div>
                    <div className={styles.optionTitle}>{template.title}</div>
                    <div className={styles.optionDesc}>{template.desc}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Actions */}
          <div className={styles.onboardingActions}>
            {step > 1 && (
              <button className={styles.backBtn} onClick={handleBack}>
                <ArrowLeft size={18} />
                Back
              </button>
            )}
            <button className={styles.nextBtn} onClick={handleNext}>
              {step === totalSteps ? 'Get Started' : 'Continue'}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
