import { AlertCircle, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './ProblemSolution.module.css';

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
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ProblemSolution() {
  const problems = [
    {
      icon: <AlertCircle size={24} />,
      title: 'Leads Fall Through the Cracks',
      description: 'Without a system, promising leads get lost in spreadsheets and forgotten inboxes.',
    },
    {
      icon: <AlertCircle size={24} />,
      title: 'Manual Follow-ups Waste Time',
      description: 'Hours spent on repetitive emails and calls that could be automated.',
    },
    {
      icon: <AlertCircle size={24} />,
      title: 'Missed Deadlines Cost Commissions',
      description: 'Important dates slip by, deals fall through, and revenue walks out the door.',
    },
  ];

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
          <span className={styles.label}>The Problem</span>
          <h2 className={styles.title}>
            Real Estate is Competitive.
            <br />
            <span className={styles.gradient}>Manual Work Holds You Back.</span>
          </h2>
        </motion.div>

        <div className={styles.flow}>
          {/* Problems */}
          <motion.div 
            className={styles.problems}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className={styles.chaosLabel}>
              <span className={styles.dot} />
              The Chaos
            </div>
            {problems.map((problem, index) => (
              <motion.div key={index} className={styles.problemCard} variants={itemVariants}>
                <div className={styles.problemIcon}>{problem.icon}</div>
                <div>
                  <h3 className={styles.problemTitle}>{problem.title}</h3>
                  <p className={styles.problemDesc}>{problem.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Arrow */}
          <div className={styles.arrow}>
            <div className={styles.arrowLine} />
            <div className={styles.arrowIcon}>
              <Zap size={28} />
            </div>
            <div className={styles.arrowLabel}>Estatico Automation</div>
          </div>

          {/* Solution */}
          <motion.div 
            className={styles.solution}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.successLabel}>
              <span className={styles.successDot} />
              The Success
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.solutionIcon}>
                <TrendingUp size={32} />
              </div>
              <h3 className={styles.solutionTitle}>Automated Excellence</h3>
              <ul className={styles.benefits}>
                <li>Every lead captured and nurtured automatically</li>
                <li>Smart follow-ups sent at the perfect time</li>
                <li>Never miss another deadline or opportunity</li>
                <li>Focus on closing while AI handles the rest</li>
              </ul>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>3x</span>
                  <span className={styles.statLabel}>More Deals</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>10h</span>
                  <span className={styles.statLabel}>Saved Weekly</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>98%</span>
                  <span className={styles.statLabel}>Satisfaction</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
