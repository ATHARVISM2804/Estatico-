import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './SocialProof.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Jessica Martinez',
      role: 'Top Producer, RE/MAX',
      avatar: 'JM',
      content: 'Estatico has completely transformed how I manage my business. I went from losing leads to closing 40% more deals in just 3 months.',
      rating: 5,
    },
    {
      name: 'Michael Thompson',
      role: 'Broker, Keller Williams',
      avatar: 'MT',
      content: 'The workflow automation is incredible. I used to spend hours on follow-ups. Now it happens automatically, and I focus on what matters.',
      rating: 5,
    },
    {
      name: 'Sarah Chen',
      role: 'Luxury Agent, Sotheby\'s',
      avatar: 'SC',
      content: 'My high-net-worth clients expect perfection. Estatico helps me deliver that consistently. The best investment I\'ve made in my business.',
      rating: 5,
    },
  ];

  const stats = [
    { value: '2,500+', label: 'Agents Using Estatico' },
    { value: '500K+', label: 'Leads Managed' },
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '$2.3B', label: 'In Closed Deals' },
  ];

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Trusted by Top Agents</span>
          <h2 className={styles.title}>
            Real Results from
            <br />
            <span className={styles.gradient}>Real Agents</span>
          </h2>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className={styles.statCard}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className={styles.testimonials}>
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className={styles.testimonialCard}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={styles.quoteIcon}>
                <Quote size={24} />
              </div>
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className={styles.content}>{testimonial.content}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{testimonial.avatar}</div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.name}</div>
                  <div className={styles.authorRole}>{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logos */}
        <div className={styles.logos}>
          <p className={styles.logosLabel}>Trusted by agents at</p>
          <div className={styles.logosGrid}>
            {['RE/MAX', 'Keller Williams', 'Coldwell Banker', 'Century 21', 'Sotheby\'s', 'Compass'].map((name, i) => (
              <div key={i} className={styles.logo}>{name}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
