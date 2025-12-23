import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import styles from './Pricing.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individual agents getting started',
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        'Up to 100 leads',
        '3 workflow automations',
        'Email templates',
        'Basic analytics',
        'Calendar sync',
        'Email support',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Professional',
      description: 'For agents ready to scale their business',
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        'Unlimited leads',
        'Unlimited workflows',
        'Advanced email automation',
        'Full analytics dashboard',
        'Team collaboration (3 users)',
        'Priority support',
        'Custom integrations',
        'API access',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Team',
      description: 'For brokerages and growing teams',
      monthlyPrice: 249,
      annualPrice: 199,
      features: [
        'Everything in Professional',
        'Unlimited team members',
        'Admin controls & permissions',
        'Team performance analytics',
        'Custom branding',
        'Dedicated account manager',
        'Phone support',
        'Custom onboarding',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Pricing</span>
          <h2 className={styles.title}>
            Simple, Transparent
            <br />
            <span className={styles.gradient}>Pricing</span>
          </h2>
          <p className={styles.subtitle}>
            Start free for 14 days. No credit card required.
          </p>

          <div className={styles.toggle}>
            <span className={!annual ? styles.active : ''}>Monthly</span>
            <button 
              className={`${styles.toggleBtn} ${annual ? styles.toggleActive : ''}`}
              onClick={() => setAnnual(!annual)}
            >
              <span className={styles.toggleKnob} />
            </button>
            <span className={annual ? styles.active : ''}>
              Annual <span className={styles.discount}>Save 20%</span>
            </span>
          </div>
        </div>

        <div className={styles.plans}>
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              className={`${styles.planCard} ${plan.highlighted ? styles.highlighted : ''}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={index}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              {plan.badge && (
                <div className={styles.badge}>
                  <Sparkles size={14} />
                  {plan.badge}
                </div>
              )}
              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planDesc}>{plan.description}</p>
              </div>
              <div className={styles.planPrice}>
                <span className={styles.currency}>$</span>
                <motion.span 
                  className={styles.amount}
                  key={annual ? 'annual' : 'monthly'}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {annual ? plan.annualPrice : plan.monthlyPrice}
                </motion.span>
                <span className={styles.period}>/month</span>
              </div>
              {annual && (
                <p className={styles.billedAnnually}>
                  Billed annually (${(annual ? plan.annualPrice : plan.monthlyPrice) * 12}/year)
                </p>
              )}
              <Link 
                to="/signup" 
                className={`${styles.planCta} ${plan.highlighted ? styles.ctaHighlighted : ''}`}
              >
                {plan.cta}
              </Link>
              <ul className={styles.features}>
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <Check size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
