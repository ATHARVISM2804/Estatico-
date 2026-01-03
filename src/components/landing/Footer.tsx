import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

interface ModalContent {
  title: string;
  items: { label: string; value: string }[];
}

const modalData: Record<string, ModalContent> = {
  // Resources
  'Help Center': {
    title: 'Help Center',
    items: [
      { label: 'Support Hours', value: '24/7 Available' },
      { label: 'Response Time', value: 'Under 2 hours' },
      { label: 'Live Chat', value: 'Available' },
      { label: 'Knowledge Base', value: '500+ Articles' },
      { label: 'Video Tutorials', value: '100+ Videos' },
      { label: 'Email Support', value: 'support@estatico.com' },
    ],
  },
  'API Docs': {
    title: 'API Documentation',
    items: [
      { label: 'API Version', value: 'v2.0 (Latest)' },
      { label: 'Authentication', value: 'OAuth 2.0 / API Keys' },
      { label: 'Rate Limit', value: '1000 requests/min' },
      { label: 'Endpoints', value: '50+ RESTful APIs' },
      { label: 'SDKs', value: 'Python, Node.js, PHP' },
      { label: 'Sandbox', value: 'Available for testing' },
    ],
  },
  'Integrations': {
    title: 'Integrations',
    items: [
      { label: 'CRM Systems', value: 'Salesforce, HubSpot, Zoho' },
      { label: 'Email Platforms', value: 'Gmail, Outlook, Mailchimp' },
      { label: 'MLS Systems', value: '500+ MLS Supported' },
      { label: 'Calendar', value: 'Google, Outlook, iCal' },
      { label: 'Payment', value: 'Stripe, PayPal' },
      { label: 'Social Media', value: 'Facebook, Instagram, LinkedIn' },
    ],
  },
  'Status': {
    title: 'System Status',
    items: [
      { label: 'Current Status', value: '✅ All Systems Operational' },
      { label: 'Uptime (30 days)', value: '99.99%' },
      { label: 'API Status', value: '✅ Operational' },
      { label: 'Database', value: '✅ Operational' },
      { label: 'Last Incident', value: 'None in 90 days' },
      { label: 'Maintenance', value: 'Sundays 2-4 AM EST' },
    ],
  },
  // Legal
  'Privacy Policy': {
    title: 'Privacy Policy',
    items: [
      { label: 'Data Collection', value: 'Minimal & Transparent' },
      { label: 'Data Storage', value: 'Encrypted (AES-256)' },
      { label: 'Data Sharing', value: 'Never sold to 3rd parties' },
      { label: 'GDPR Compliant', value: '✅ Yes' },
      { label: 'CCPA Compliant', value: '✅ Yes' },
      { label: 'Data Deletion', value: 'On request within 30 days' },
    ],
  },
  'Terms of Service': {
    title: 'Terms of Service',
    items: [
      { label: 'Account Age', value: '18+ Required' },
      { label: 'Free Trial', value: '14 days, no CC required' },
      { label: 'Cancellation', value: 'Anytime, no fees' },
      { label: 'Refund Policy', value: '30-day money back' },
      { label: 'Usage Rights', value: 'Commercial allowed' },
      { label: 'SLA Guarantee', value: '99.9% uptime' },
    ],
  },
  'Security': {
    title: 'Security',
    items: [
      { label: 'Encryption', value: 'TLS 1.3 / AES-256' },
      { label: 'Authentication', value: '2FA / SSO Available' },
      { label: 'SOC 2', value: '✅ Type II Certified' },
      { label: 'Penetration Testing', value: 'Quarterly' },
      { label: 'Bug Bounty', value: 'Active Program' },
      { label: 'Data Centers', value: 'AWS (US, EU, Asia)' },
    ],
  },
  'Cookies': {
    title: 'Cookie Policy',
    items: [
      { label: 'Essential Cookies', value: 'Required for function' },
      { label: 'Analytics Cookies', value: 'Optional (consent)' },
      { label: 'Marketing Cookies', value: 'Optional (consent)' },
      { label: 'Cookie Duration', value: '30 days max' },
      { label: 'Cookie Control', value: 'Full user control' },
      { label: 'Third-Party', value: 'Google Analytics only' },
    ],
  },
  // Company
  'About Us': {
    title: 'About Us',
    items: [
      { label: 'Founded', value: '2020' },
      { label: 'Headquarters', value: 'San Francisco, CA' },
      { label: 'Team Size', value: '50+ Professionals' },
      { label: 'Customers', value: '10,000+ Agents' },
      { label: 'Mission', value: 'Empower RE Professionals' },
      { label: 'Funding', value: 'Series B ($25M)' },
    ],
  },
  'Blog': {
    title: 'Blog',
    items: [
      { label: 'Topics', value: 'Real Estate, Tech, Tips' },
      { label: 'Frequency', value: '3 posts/week' },
      { label: 'Newsletter', value: '25,000+ subscribers' },
      { label: 'Guest Posts', value: 'Accepting submissions' },
      { label: 'Podcast', value: 'Coming Q1 2026' },
      { label: 'Webinars', value: 'Monthly live sessions' },
    ],
  },
  'Careers': {
    title: 'Careers',
    items: [
      { label: 'Open Positions', value: '12 Roles' },
      { label: 'Remote Work', value: '✅ Fully Remote' },
      { label: 'Benefits', value: 'Health, 401k, Equity' },
      { label: 'PTO', value: 'Unlimited' },
      { label: 'Culture', value: 'Collaborative & Innovative' },
      { label: 'Apply', value: 'careers@estatico.com' },
    ],
  },
  'Contact': {
    title: 'Contact Us',
    items: [
      { label: 'Email', value: 'hello@estatico.com' },
      { label: 'Phone', value: '+1 (888) 555-0123' },
      { label: 'Address', value: '123 Market St, SF, CA' },
      { label: 'Sales', value: 'sales@estatico.com' },
      { label: 'Support', value: 'support@estatico.com' },
      { label: 'Hours', value: 'Mon-Fri 9AM-6PM PST' },
    ],
  },
};

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (key: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveModal(key);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <footer className={styles.footer}>
      {/* Decorative gradient orbs */}
      <div className={styles.gradientOrb1}></div>
      <div className={styles.gradientOrb2}></div>
      
      <div className={styles.container}>
        {/* Top section with CTA */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Ready to transform your real estate business?</h3>
            <p className={styles.ctaText}>Join thousands of agents already closing more deals with Estatico.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link to="/signup" className={styles.ctaButton}>
              Book a Demo
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.main}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <img 
                src="https://res.cloudinary.com/dmhabztbf/image/upload/v1766477001/no_bg_2_d1xywc.png" 
                alt="Estatico Logo" 
                className={styles.logoImage}
              />
              <span>Estatico</span>
            </Link>
            <p className={styles.tagline}>
              Empowering real estate professionals with intelligent automation to close more deals and build lasting client relationships.
            </p>
            
            {/* Newsletter signup */}
            <div className={styles.newsletter}>
              <p className={styles.newsletterLabel}>Subscribe to our newsletter</p>
              <div className={styles.newsletterForm}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className={styles.newsletterInput}
                />
                <button className={styles.newsletterButton}>
                  <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                    <path d="M3 10h14m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>Product</h4>
              <a href="#features">
                <span className={styles.linkIcon}>✦</span>
                Features
              </a>
              <a href="#pricing">
                <span className={styles.linkIcon}>✦</span>
                Pricing
              </a>
              <a href="#how-it-works">
                <span className={styles.linkIcon}>✦</span>
                How It Works
              </a>
              <Link to="/signup">
                <span className={styles.linkIcon}>✦</span>
                Get Started
              </Link>
            </div>

            <div className={styles.linkGroup}>
              <h4>Company</h4>
              <a href="#" onClick={openModal('About Us')}>
                <span className={styles.linkIcon}>✦</span>
                About Us
              </a>
              <a href="#" onClick={openModal('Blog')}>
                <span className={styles.linkIcon}>✦</span>
                Blog
              </a>
              <a href="#" onClick={openModal('Careers')}>
                <span className={styles.linkIcon}>✦</span>
                Careers
              </a>
              <a href="#" onClick={openModal('Contact')}>
                <span className={styles.linkIcon}>✦</span>
                Contact
              </a>
            </div>

            <div className={styles.linkGroup}>
              <h4>Resources</h4>
              <a href="#" onClick={openModal('Help Center')}>
                <span className={styles.linkIcon}>✦</span>
                Help Center
              </a>
              <a href="#" onClick={openModal('API Docs')}>
                <span className={styles.linkIcon}>✦</span>
                API Docs
              </a>
              <a href="#" onClick={openModal('Integrations')}>
                <span className={styles.linkIcon}>✦</span>
                Integrations
              </a>
              <a href="#" onClick={openModal('Status')}>
                <span className={styles.linkIcon}>✦</span>
                Status
              </a>
            </div>

            <div className={styles.linkGroup}>
              <h4>Legal</h4>
              <a href="#" onClick={openModal('Privacy Policy')}>
                <span className={styles.linkIcon}>✦</span>
                Privacy Policy
              </a>
              <a href="#" onClick={openModal('Terms of Service')}>
                <span className={styles.linkIcon}>✦</span>
                Terms of Service
              </a>
              <a href="#" onClick={openModal('Security')}>
                <span className={styles.linkIcon}>✦</span>
                Security
              </a>
              <a href="#" onClick={openModal('Cookies')}>
                <span className={styles.linkIcon}>✦</span>
                Cookies
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Estatico. All rights reserved.
            </p>
            
          </div>
          
          <div className={styles.social}>
            <a href="#" aria-label="Twitter" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className={styles.socialLink}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Floating badge */}
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>🏠</span>
          <span>Made for Real Estate Professionals</span>
        </div>
      </div>

      {/* Modal */}
      {activeModal && modalData[activeModal] && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h3 className={styles.modalTitle}>{modalData[activeModal].title}</h3>
            <div className={styles.modalContent}>
              {modalData[activeModal].items.map((item, index) => (
                <div key={index} className={styles.modalItem}>
                  <span className={styles.modalLabel}>{item.label}</span>
                  <span className={styles.modalValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
