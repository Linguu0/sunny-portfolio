import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'WORK', href: '#services' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true); // hero is dark, so nav text is light

  useEffect(() => {
    const handleScroll = () => {
      // Switch to dark text once scrolled past the hero
      const heroHeight = window.innerHeight;
      setIsDark(window.scrollY < heroHeight * 0.7);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const textColor = isDark ? '#F5F0E8' : '#2C1810';

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className="nav-fixed"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ color: textColor }}
      >
        {/* Logo */}
        <a href="#" className="nav-logo" style={{ color: textColor }}>
          ✦ SUNNY
        </a>

        {/* Desktop Nav Links */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              style={{ color: textColor }}
              onClick={(e) => scrollToSection(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Hire Me Button */}
        <a
          href="#contact"
          className="nav-hire hidden md:inline-block"
          style={{
            color: textColor,
            borderColor: textColor,
          }}
          onClick={(e) => scrollToSection(e, '#contact')}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#2C1810';
            (e.target as HTMLElement).style.color = '#F5F0E8';
            (e.target as HTMLElement).style.borderColor = '#2C1810';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'transparent';
            (e.target as HTMLElement).style.color = textColor;
            (e.target as HTMLElement).style.borderColor = textColor;
          }}
        >
          HIRE ME →
        </a>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              backgroundColor: isOpen ? '#F5F0E8' : textColor,
              transform: isOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }}
          />
          <span
            style={{
              backgroundColor: isOpen ? '#F5F0E8' : textColor,
              opacity: isOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              backgroundColor: isOpen ? '#F5F0E8' : textColor,
              transform: isOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="mobile-menu-link"
                onClick={(e) => scrollToSection(e, link.href)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="mobile-menu-link"
              style={{ color: '#D4A574', fontSize: '24px', marginTop: '20px' }}
              onClick={(e) => scrollToSection(e, '#contact')}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              HIRE ME →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
