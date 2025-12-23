import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock } from 'lucide-react';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            Ready to Close
            <br />
            <span className={styles.gradient}>More Deals?</span>
          </h2>
          <p className={styles.subtitle}>
            Join 2,500+ real estate agents who have transformed their workflow 
            and are closing more deals with less effort.
          </p>
          
          <motion.div 
            className={styles.ctas}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/signup" className={styles.primaryCta}>
              Start Free Trial
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className={styles.guarantees}>
            <div className={styles.guarantee}>
              <Clock size={18} />
              <span>14-day free trial</span>
            </div>
            <div className={styles.guarantee}>
              <Shield size={18} />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>

        <div className={styles.decoration}>
          <div className={styles.ring1} />
          <div className={styles.ring2} />
          <div className={styles.ring3} />
        </div>
      </div>
    </section>
  );
}
