import { 
  Zap, 
  Shield, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import styles from './WhyChooseUs.module.css';

// Animated counter component
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = Date.now();
          
          const updateValue = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(value * easeOut));
            
            if (progress < 1) {
              requestAnimationFrame(updateValue);
            }
          };
          
          requestAnimationFrame(updateValue);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

// Floating particles background
function FloatingParticles() {
  return (
    <div className={styles.particles}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.particle}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1
          }}
          animate={{ 
            y: [null, '-20%', null],
            x: [null, `${Math.random() * 10 - 5}%`, null],
          }}
          transition={{ 
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

export default function WhyChooseUs() {
  const metrics = [
    { value: 10, suffix: 'x', label: 'Faster Follow-ups', icon: <Zap size={24} /> },
    { value: 85, suffix: '%', label: 'Time Saved Weekly', icon: <Clock size={24} /> },
    { value: 3, suffix: 'x', label: 'More Conversions', icon: <TrendingUp size={24} /> },
    { value: 24, suffix: '/7', label: 'Automated Outreach', icon: <Users size={24} /> },
  ];

  const benefits = [
    {
      icon: <Sparkles size={32} />,
      title: 'AI-Powered Intelligence',
      description: 'Smart lead scoring and predictive analytics help you focus on the hottest opportunities first.',
      gradient: 'cyan',
    },
    {
      icon: <Shield size={32} />,
      title: 'Enterprise-Grade Security',
      description: 'Bank-level encryption and compliance keep your client data safe and protected.',
      gradient: 'blue',
    },
    {
      icon: <Zap size={32} />,
      title: 'Lightning Fast Setup',
      description: 'Get started in minutes, not days. Import your leads and start automating immediately.',
      gradient: 'violet',
    },
  ];

  const checkpoints = [
    'No credit card required to start',
    'Free migration from other CRMs',
    'Unlimited leads on all plans',
    'Cancel anytime, no contracts',
  ];

  return (
    <section id="why-us" className={styles.section}>
      <FloatingParticles />
      
      <div className={styles.container}>
        {/* Header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Why Estatico</span>
          <h2 className={styles.title}>
            Built for Modern
            <br />
            <span className={styles.gradient}>Real Estate Success</span>
          </h2>
          <p className={styles.subtitle}>
            Stop losing leads to slow follow-ups. Start closing more deals with intelligent automation.
          </p>
        </motion.div>

        {/* Animated Metrics */}
        <motion.div 
          className={styles.metrics}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              className={styles.metricCard}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 40px rgba(0, 212, 170, 0.15)'
              }}
            >
              <div className={styles.metricIcon}>{metric.icon}</div>
              <div className={styles.metricValue}>
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              </div>
              <div className={styles.metricLabel}>{metric.label}</div>
              <motion.div 
                className={styles.metricGlow}
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className={styles.benefits}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className={`${styles.benefitCard} ${styles[benefit.gradient]}`}
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <motion.div 
                className={styles.benefitIcon}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {benefit.icon}
              </motion.div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
              <motion.div 
                className={styles.benefitLine}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.ctaContent}>
            <div className={styles.checkpoints}>
              {checkpoints.map((point, index) => (
                <motion.div 
                  key={index}
                  className={styles.checkpoint}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span>{point}</span>
                </motion.div>
              ))}
            </div>
            <motion.button 
              className={styles.ctaButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Free Trial
              <ArrowRight size={20} />
            </motion.button>
          </div>
          
          {/* Animated background orbs */}
          <div className={styles.orbs}>
            <motion.div 
              className={styles.orb1}
              animate={{ 
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div 
              className={styles.orb2}
              animate={{ 
                x: [0, -40, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
