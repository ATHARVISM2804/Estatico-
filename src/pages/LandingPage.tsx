import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './LandingPage.module.css';
import Hero from '../components/landing/Hero';
import ProblemSolution from '../components/landing/ProblemSolution';
import VideoSection from '../components/landing/VideoSection';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import AutomationDemo from '../components/landing/AutomationDemo';
import WhyChooseUs from '../components/landing/WhyChooseUs';
import Pricing from '../components/landing/Pricing';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.page}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gradientOrb3} />
        <div className={styles.gridOverlay} />
      </div>

      {/* Navigation */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navContainer}>
          <Link to="/" className={styles.logo}>
            <img 
              src="https://res.cloudinary.com/dmhabztbf/image/upload/v1766477001/no_bg_2_d1xywc.png" 
              alt="Estatico Logo" 
              className={styles.logoImage}
            />
            <span className={styles.logoText}>Estatico</span>
          </Link>

          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#why-us">Why Us</a>
          </div>

          <div className={styles.navActions}>
            <Link to="/login" className={styles.loginBtn}>
              Sign In
            </Link>
            <Link to="/signup" className={styles.ctaBtn}>
              Start Free Trial
            </Link>
          </div>

          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
            <div className={styles.mobileMenuActions}>
              <Link to="/login" className={styles.loginBtn}>Sign In</Link>
              <Link to="/signup" className={styles.ctaBtn}>Start Free Trial</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <ProblemSolution />
        <VideoSection />
        <HowItWorks />
        <Features />
        <AutomationDemo />
        <WhyChooseUs />
        <Pricing />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
