import { 
  LayoutGrid, 
  Mail, 
  CheckSquare, 
  Calendar, 
  GitBranch, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Features.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Features() {
  const features = [
    {
      icon: <LayoutGrid size={28} />,
      title: 'Smart Lead Pipeline',
      description: 'Visual Kanban board to track every lead through your sales process. Drag and drop to update status.',
      color: 'cyan',
      size: 'large',
    },
    {
      icon: <Mail size={28} />,
      title: 'Email Automation',
      description: 'Pre-built templates and drip campaigns. Send the right message at the right time.',
      color: 'blue',
      size: 'normal',
    },
    {
      icon: <CheckSquare size={28} />,
      title: 'Task Management',
      description: 'Never miss a follow-up. Auto-generated tasks with smart priorities and reminders.',
      color: 'violet',
      size: 'normal',
    },
    {
      icon: <Calendar size={28} />,
      title: 'Calendar Sync',
      description: 'Showings, meetings, and closings all in one place. Syncs with Google Calendar.',
      color: 'cyan',
      size: 'normal',
    },
    {
      icon: <GitBranch size={28} />,
      title: 'Workflow Builder',
      description: 'Visual drag-and-drop automation builder. Create custom workflows without code.',
      color: 'blue',
      size: 'large',
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Deal Analytics',
      description: 'Track conversion rates, revenue, and performance. Make data-driven decisions.',
      color: 'violet',
      size: 'normal',
    },
  ];

  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Features</span>
          <h2 className={styles.title}>
            Everything You Need to
            <br />
            <span className={styles.gradient}>Close More Deals</span>
          </h2>
          <p className={styles.subtitle}>
            A complete toolkit designed specifically for real estate professionals. 
            Powerful yet simple to use.
          </p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className={`${styles.card} ${styles[feature.size]} ${styles[feature.color]}`}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={styles.cardIcon}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
              <div className={styles.cardLink}>
                Learn more <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
