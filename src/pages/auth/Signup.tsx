import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';
import styles from './Auth.module.css';

export default function Signup() {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains a number', met: /\d/.test(formData.password) },
    { text: 'Contains uppercase', met: /[A-Z]/.test(formData.password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    login(formData.email, formData.password);
    navigate('/onboarding');
  };

  return (
    <motion.div 
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.background}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
      </div>

      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="8" width="24" height="18" rx="2" stroke="url(#signupLogoGrad)" strokeWidth="2"/>
              <path d="M4 14L16 22L28 14" stroke="url(#signupLogoGrad)" strokeWidth="2"/>
              <circle cx="16" cy="6" r="3" fill="url(#signupLogoGrad)"/>
              <defs>
                <linearGradient id="signupLogoGrad" x1="4" y1="3" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00d4aa"/>
                  <stop offset="1" stopColor="#00b4d8"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>Estatico</span>
        </Link>

        <motion.div 
          className={styles.card}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.header}>
            <h1>Create your account</h1>
            <p>Start your 14-day free trial</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>First name</label>
              <input
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Last name</label>
              <input
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                {passwordRequirements.map((req, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      fontSize: '12px',
                      color: req.met ? 'var(--success)' : 'var(--text-muted)'
                    }}
                  >
                    <Check size={12} />
                    {req.text}
                  </span>
                ))}
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className={styles.footer}>
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
