import { motion } from 'framer-motion';
import { Play, Mail, Calendar, BarChart3, Zap, Lock } from 'lucide-react';
import styles from './VideoSection.module.css';

export default function VideoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>
            <Play size={14} />
            See It In Action
          </span>
          <h2 className={styles.title}>
            Watch How Estatico{' '}
            <span className={styles.gradient}>Transforms Your Workflow</span>
          </h2>
          <p className={styles.subtitle}>
            Experience the power of intelligent automation that works seamlessly 
            to manage leads, automate follow-ups, and close more deals.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          className={styles.videoWrapper}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Decorative Orbs */}
          <div className={styles.decorativeOrb1} />
          <div className={styles.decorativeOrb2} />

          <div className={styles.videoContainer}>
            {/* Glow Effects */}
            <div className={styles.glowTop} />
            <div className={styles.glowBottom} />

            {/* Browser Frame */}
            <div className={styles.browserFrame}>
              <div className={styles.browserDots}>
                <div className={`${styles.browserDot} ${styles.dotRed}`} />
                <div className={`${styles.browserDot} ${styles.dotYellow}`} />
                <div className={`${styles.browserDot} ${styles.dotGreen}`} />
              </div>
              <div className={styles.browserUrl}>
                <Lock size={12} className={styles.lockIcon} />
                app.estatico.io/dashboard
              </div>
            </div>

            {/* Motion Graphic Canvas */}
            <div className={styles.videoCanvas}>
              {/* Animated Grid Background */}
              <div className={styles.animatedGrid} />
              
              {/* Ambient Glow */}
              <div className={styles.ambientGlow} />

              {/* Connection Lines - SVG Based */}
              <svg className={styles.connectionSvg} viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
                    <stop offset="50%" stopColor="rgba(16, 185, 129, 0.6)" />
                    <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                  </linearGradient>
                  <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
                    <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Animated Paths */}
                <path 
                  className={styles.flowPath1}
                  d="M 150 120 Q 300 180 400 250" 
                  stroke="url(#lineGradient1)" 
                  strokeWidth="2" 
                  fill="none"
                  filter="url(#glow)"
                />
                <path 
                  className={styles.flowPath2}
                  d="M 650 180 Q 550 220 400 250" 
                  stroke="url(#lineGradient1)" 
                  strokeWidth="2" 
                  fill="none"
                  filter="url(#glow)"
                />
                <path 
                  className={styles.flowPath3}
                  d="M 180 350 Q 280 300 400 270" 
                  stroke="url(#lineGradient2)" 
                  strokeWidth="2" 
                  fill="none"
                  filter="url(#glow)"
                />
                <path 
                  className={styles.flowPath4}
                  d="M 680 400 Q 550 350 400 270" 
                  stroke="url(#lineGradient2)" 
                  strokeWidth="2" 
                  fill="none"
                  filter="url(#glow)"
                />
                
                {/* Traveling Dots */}
                <circle className={styles.travelDot1} r="4" fill="#10b981">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M 150 120 Q 300 180 400 250" />
                </circle>
                <circle className={styles.travelDot2} r="4" fill="#10b981">
                  <animateMotion dur="3.5s" repeatCount="indefinite" path="M 650 180 Q 550 220 400 250" />
                </circle>
                <circle className={styles.travelDot3} r="4" fill="#8b5cf6">
                  <animateMotion dur="2.8s" repeatCount="indefinite" path="M 180 350 Q 280 300 400 270" />
                </circle>
                <circle className={styles.travelDot4} r="4" fill="#f97316">
                  <animateMotion dur="3.2s" repeatCount="indefinite" path="M 680 400 Q 550 350 400 270" />
                </circle>
              </svg>

              {/* Data Particles */}
              <div className={styles.particles}>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`${styles.particle} ${styles[`particle${i + 1}`]}`} />
                ))}
              </div>

              {/* Floating Elements */}
              <div className={styles.floatingElements}>
                {/* Email Automation Card */}
                <motion.div
                  className={`${styles.floatCard} ${styles.floatCard1}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 0.5, 0]
                  }}
                  // @ts-ignore
                  transition2={{ 
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <div className={styles.cardGlow} />
                  <div className={`${styles.cardIcon} ${styles.cardIconTeal}`}>
                    <Mail size={18} />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardTitle}>Auto Follow-up</span>
                    <span className={styles.cardDesc}>Email sent to lead</span>
                  </div>
                  <div className={styles.cardPulse} />
                </motion.div>

                {/* Calendar Card */}
                <motion.div
                  className={`${styles.floatCard} ${styles.floatCard2}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className={styles.cardGlow} />
                  <div className={`${styles.cardIcon} ${styles.cardIconCyan}`}>
                    <Calendar size={18} />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardTitle}>Meeting Set</span>
                    <span className={styles.cardDesc}>Tomorrow, 2:00 PM</span>
                  </div>
                </motion.div>

                {/* Analytics Card */}
                <motion.div
                  className={`${styles.floatCard} ${styles.floatCard3}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className={styles.cardGlow} />
                  <div className={`${styles.cardIcon} ${styles.cardIconPurple}`}>
                    <BarChart3 size={18} />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardTitle}>+47% Response</span>
                    <span className={styles.cardDesc}>This month</span>
                  </div>
                  <div className={styles.miniChart}>
                    <div className={styles.chartBar} style={{ height: '40%' }} />
                    <div className={styles.chartBar} style={{ height: '60%' }} />
                    <div className={styles.chartBar} style={{ height: '45%' }} />
                    <div className={styles.chartBar} style={{ height: '80%' }} />
                    <div className={styles.chartBar} style={{ height: '100%' }} />
                  </div>
                </motion.div>

                {/* Deal Closed Card */}
                <motion.div
                  className={`${styles.floatCard} ${styles.floatCard4}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <div className={styles.cardGlow} />
                  <div className={`${styles.cardIcon} ${styles.cardIconOrange}`}>
                    <Zap size={18} />
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardTitle}>Deal Closed</span>
                    <span className={styles.cardDesc}>$425,000</span>
                  </div>
                  <div className={styles.successBadge}>✓</div>
                </motion.div>
              </div>

              {/* Central Animation */}
              <motion.div
                className={styles.centralAnimation}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className={styles.logoAnimation}>
                  <div className={`${styles.logoRing} ${styles.logoRing1}`} />
                  <div className={`${styles.logoRing} ${styles.logoRing2}`} />
                  <div className={`${styles.logoRing} ${styles.logoRing3}`} />
                  <div className={styles.logoCenter}>
                    <Zap size={28} />
                  </div>
                </div>
                <div className={styles.centralText}>
                  <h3 className={styles.centralTitle}>Estatico AI</h3>
                  <p className={styles.centralSubtitle}>Automating your success</p>
                </div>
              </motion.div>

              {/* Play Button Overlay */}
              <div className={styles.playOverlay}>
                <motion.button
                  className={styles.playButton}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Play video"
                >
                  <div className={styles.playButtonRing} />
                  <Play size={28} fill="currentColor" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className={styles.statsRow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className={styles.stat}>
            <div className={styles.statIconWrapper}>
              <Zap size={20} className={styles.statIcon} />
            </div>
            <div className={styles.statValue}>
              <span className={styles.statNumber}>10</span>
              <span className={styles.statSuffix}>x</span>
            </div>
            <div className={styles.statLabel}>Faster Lead Response</div>
            <div className={styles.statGlow} />
          </div>
          
          <div className={styles.statDivider} />
          
          <div className={styles.stat}>
            <div className={styles.statIconWrapper}>
              <Calendar size={20} className={styles.statIcon} />
            </div>
            <div className={styles.statValue}>
              <span className={styles.statNumber}>3</span>
              <span className={styles.statSuffix}>hrs</span>
            </div>
            <div className={styles.statLabel}>Saved Daily</div>
            <div className={styles.statGlow} />
          </div>
          
          <div className={styles.statDivider} />
          
          <div className={styles.stat}>
            <div className={styles.statIconWrapper}>
              <BarChart3 size={20} className={styles.statIcon} />
            </div>
            <div className={styles.statValue}>
              <span className={styles.statNumber}>47</span>
              <span className={styles.statSuffix}>%</span>
            </div>
            <div className={styles.statLabel}>More Conversions</div>
            <div className={styles.statGlow} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
