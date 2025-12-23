import { UserPlus, Workflow, ListChecks, PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './HowItWorks.module.css';

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus size={28} />,
      step: '01',
      title: 'Lead Captured',
      description: 'New lead comes in from any source — Zillow, website, referral, or manual entry.',
    },
    {
      icon: <Workflow size={28} />,
      step: '02',
      title: 'Workflow Activates',
      description: 'Smart automation kicks in immediately. Welcome email sent, tasks created.',
    },
    {
      icon: <ListChecks size={28} />,
      step: '03',
      title: 'Tasks & Reminders',
      description: 'Follow-ups scheduled, appointments set, nothing falls through the cracks.',
    },
    {
      icon: <PartyPopper size={28} />,
      step: '04',
      title: 'Close & Follow-up',
      description: 'Deal closes successfully. Post-sale automation keeps clients engaged.',
    },
  ];

  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>How It Works</span>
          <h2 className={styles.title}>
            From Lead to Close,
            <br />
            <span className={styles.gradient}>Fully Automated</span>
          </h2>
          <p className={styles.subtitle}>
            Set up once, let automation handle the rest. Here's how Estatico transforms your workflow.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className={styles.step}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={index}
            >
              <div className={styles.stepNumber}>{step.step}</div>
              <div className={styles.stepCard}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.connector}>
                  <div className={styles.connectorDot} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
