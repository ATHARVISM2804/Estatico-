import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, CheckSquare, Calendar, MessageCircle } from 'lucide-react';
import styles from './AutomationDemo.module.css';

export default function AutomationDemo() {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { icon: <UserPlus size={24} />, label: 'New Lead', color: 'cyan' },
    { icon: <Mail size={24} />, label: 'Email Sent', color: 'blue' },
    { icon: <CheckSquare size={24} />, label: 'Task Created', color: 'violet' },
    { icon: <Calendar size={24} />, label: 'Appointment Set', color: 'cyan' },
    { icon: <MessageCircle size={24} />, label: 'Follow-up', color: 'blue' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>See It In Action</span>
          <h2 className={styles.title}>
            Watch Automation
            <br />
            <span className={styles.gradient}>Work Its Magic</span>
          </h2>
          <p className={styles.subtitle}>
            From lead capture to closing, every step is automated. 
            Here's a real workflow in action.
          </p>
        </motion.div>

        <motion.div 
          className={styles.demo}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.flowContainer}>
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`${styles.flowStep} ${index === activeStep ? styles.active : ''} ${index < activeStep ? styles.completed : ''}`}
              >
                <div className={`${styles.stepCircle} ${styles[step.color]}`}>
                  {step.icon}
                  {index < activeStep && <div className={styles.checkmark}>✓</div>}
                </div>
                <span className={styles.stepLabel}>{step.label}</span>
                {index < steps.length - 1 && (
                  <div className={`${styles.connector} ${index < activeStep ? styles.connectorActive : ''}`}>
                    <div className={styles.connectorLine} />
                    <div className={`${styles.pulse} ${index === activeStep ? styles.pulseActive : ''}`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.details}>
            <div className={styles.detailCard}>
              <div className={styles.detailHeader}>
                <span className={styles.detailIcon}>{steps[activeStep].icon}</span>
                <span className={styles.detailTitle}>{steps[activeStep].label}</span>
              </div>
              <div className={styles.detailContent}>
                {activeStep === 0 && (
                  <>
                    <p>New lead <strong>Sarah Johnson</strong> added from Zillow</p>
                    <div className={styles.detailMeta}>
                      <span>📍 Downtown Area</span>
                      <span>💰 $450K-$550K</span>
                    </div>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <p>Welcome email automatically sent</p>
                    <div className={styles.emailPreview}>
                      <div className={styles.emailSubject}>Welcome to Your Home Search!</div>
                      <div className={styles.emailBody}>Hi Sarah, I'm excited to help you find your perfect home...</div>
                    </div>
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <p>Task created: Follow-up call</p>
                    <div className={styles.taskPreview}>
                      <div className={styles.taskItem}>
                        <span className={styles.taskPriority}>High</span>
                        <span>Call Sarah Johnson - Property preferences</span>
                      </div>
                      <div className={styles.taskDue}>Due: Tomorrow 10:00 AM</div>
                    </div>
                  </>
                )}
                {activeStep === 3 && (
                  <>
                    <p>Showing scheduled for Dec 20</p>
                    <div className={styles.calendarPreview}>
                      <div className={styles.calendarEvent}>
                        <div className={styles.eventTime}>10:00 AM - 11:30 AM</div>
                        <div className={styles.eventTitle}>Property Showing - 123 Main St</div>
                      </div>
                    </div>
                  </>
                )}
                {activeStep === 4 && (
                  <>
                    <p>Post-showing follow-up queued</p>
                    <div className={styles.followupPreview}>
                      <div className={styles.followupItem}>
                        <span className={styles.followupTime}>2 hours after showing</span>
                        <span>How did you like the property?</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
