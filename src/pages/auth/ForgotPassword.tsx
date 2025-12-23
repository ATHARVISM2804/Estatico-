import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import styles from './Auth.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSent(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
      </div>

      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="8" width="24" height="18" rx="2" stroke="url(#forgotLogoGrad)" strokeWidth="2"/>
              <path d="M4 14L16 22L28 14" stroke="url(#forgotLogoGrad)" strokeWidth="2"/>
              <circle cx="16" cy="6" r="3" fill="url(#forgotLogoGrad)"/>
              <defs>
                <linearGradient id="forgotLogoGrad" x1="4" y1="3" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00d4aa"/>
                  <stop offset="1" stopColor="#00b4d8"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>Estatico</span>
        </Link>

        <div className={styles.card}>
          {!sent ? (
            <>
              <div className={styles.header}>
                <h1>Reset password</h1>
                <p>Enter your email and we'll send you a reset link</p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? (
                    <span className={styles.spinner} />
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div 
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 212, 170, 0.1)',
                  borderRadius: '50%',
                  color: 'var(--primary-cyan)'
                }}
              >
                <Mail size={32} />
              </div>
              <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>Check your email</h1>
              <p style={{ color: 'var(--text-tertiary)', marginBottom: '32px' }}>
                We've sent a password reset link to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
              </p>
              <button 
                onClick={() => setSent(false)} 
                className={styles.submitBtn}
                style={{ width: '100%' }}
              >
                Send again
              </button>
            </div>
          )}

          <p className={styles.footer}>
            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={16} />
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
