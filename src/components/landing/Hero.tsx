import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowRight, CheckCircle } from 'lucide-react';
import styles from './Hero.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.badge} variants={itemVariants}>
            <span className={styles.badgeDot} />
            <span>Trusted by 2,500+ Real Estate Agents</span>
          </motion.div>
          
          <motion.h1 className={styles.title} variants={itemVariants}>
            Automate Your Real Estate
            <br />
            <span className={styles.gradient}>Workflow. Close More Deals.</span>
          </motion.h1>
          
          <motion.p className={styles.subtitle} variants={itemVariants}>
            AI-powered automation handles your follow-ups, tasks, and reminders — 
            so you can focus on what matters most: closing deals.
          </motion.p>
          
          <motion.div className={styles.ctas} variants={itemVariants}>
            <Link to="/signup" className={styles.primaryCta}>
              Start Free Trial
              <ArrowRight size={18} />
            </Link>
            <button className={styles.secondaryCta}>
              <Play size={18} />
              Watch Demo
            </button>
          </motion.div>
          
          <motion.div className={styles.trust} variants={itemVariants}>
            <div className={styles.trustItem}>
              <CheckCircle size={16} />
              <span>No credit card required</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle size={16} />
              <span>14-day free trial</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle size={16} />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.mockup}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.mockupGlow} />
          <div className={styles.mockupWindow}>
            <div className={styles.windowHeader}>
              <div className={styles.windowDots}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.windowTitle}>Estatico Dashboard</div>
              <div className={styles.windowLive}>
                <span className={styles.liveDot} />
                Live Preview
              </div>
            </div>
            <div className={styles.windowContent}>
              {/* Dashboard Preview */}
              <div className={styles.dashboardPreview}>
                <div className={styles.previewSidebar}>
                  <div className={styles.sidebarItem} />
                  <div className={styles.sidebarItem} />
                  <div className={styles.sidebarItem} />
                  <div className={styles.sidebarItem} />
                  <div className={styles.sidebarItem} />
                </div>
                <div className={styles.previewMain}>
                  <div className={styles.previewHeader}>
                    <div className={styles.previewTitle} />
                    <div className={styles.previewActions} />
                  </div>
                  <div className={styles.previewStats}>
                    <div className={styles.statCard}>
                      <div className={styles.statValue}>$2.4M</div>
                      <div className={styles.statLabel}>Pipeline Value</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statValue}>47</div>
                      <div className={styles.statLabel}>Active Leads</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statValue}>89%</div>
                      <div className={styles.statLabel}>Close Rate</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statValue}>12</div>
                      <div className={styles.statLabel}>This Month</div>
                    </div>
                  </div>
                  <div className={styles.previewChart}>
                    <div className={styles.chartBars}>
                      <div className={styles.chartBar} style={{ height: '60%' }} />
                      <div className={styles.chartBar} style={{ height: '80%' }} />
                      <div className={styles.chartBar} style={{ height: '45%' }} />
                      <div className={styles.chartBar} style={{ height: '90%' }} />
                      <div className={styles.chartBar} style={{ height: '70%' }} />
                      <div className={styles.chartBar} style={{ height: '100%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className={`${styles.floatingCard} ${styles.float1}`}>
            <div className={styles.floatingIcon}>📧</div>
            <div className={styles.floatingText}>
              <div className={styles.floatingTitle}>Email Sent</div>
              <div className={styles.floatingSubtitle}>Follow-up to Sarah J.</div>
            </div>
          </div>
          
          <div className={`${styles.floatingCard} ${styles.float2}`}>
            <div className={styles.floatingIcon}>✅</div>
            <div className={styles.floatingText}>
              <div className={styles.floatingTitle}>Task Complete</div>
              <div className={styles.floatingSubtitle}>Call with Michael C.</div>
            </div>
          </div>
          
          <div className={`${styles.floatingCard} ${styles.float3}`}>
            <div className={styles.floatingIcon}>🏠</div>
            <div className={styles.floatingText}>
              <div className={styles.floatingTitle}>Deal Closed!</div>
              <div className={styles.floatingSubtitle}>$485,000</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Wave decoration */}
      <div className={styles.waveContainer}>
        <svg className={styles.wave} viewBox="0 0 1440 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 212, 170, 0.1)" />
              <stop offset="50%" stopColor="rgba(0, 180, 216, 0.1)" />
              <stop offset="100%" stopColor="rgba(124, 58, 237, 0.05)" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#waveGradient)" 
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}
