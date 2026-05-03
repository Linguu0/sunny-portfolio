import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: 'YOUTUBE', href: 'https://youtube.com/@randombaaz.0?si=UEJiOjqRmoeI32Og' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/randombaaz?igsh=MXdieG1panZtNGM3OQ%3D%3D&utm_source=qr' },
  { label: 'FACEBOOK', href: 'https://www.facebook.com/profile.php?id=100078177716022&mibextid=wwXIfr' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Dramatic scale-in + clip-path reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (innerRef.current) {
        gsap.fromTo(
          innerRef.current,
          {
            scale: 0.88,
            opacity: 0.8,
            borderRadius: '32px',
          },
          {
            scale: 1,
            opacity: 1,
            borderRadius: '0px',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 0.8,
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" style={{ overflow: 'hidden' }}>
      <div ref={innerRef} className="contact-section">
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: '#D4A574',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            // LET'S WORK TOGETHER
          </motion.p>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 'clamp(48px, 8vw, 110px)',
              color: '#F5F0E8',
              lineHeight: 1.0,
              textTransform: 'uppercase',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            Got a project?
            <br />
            Let's talk.
          </motion.h2>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              color: 'rgba(245, 240, 232, 0.55)',
              maxWidth: '460px',
              margin: '24px auto 0',
              lineHeight: 1.7,
            }}
          >
            Whether it's a website, a brand, or just a business idea —
            I'm always open to a conversation.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ marginTop: '48px' }}
          >
            <a
              href="mailto:Randombaaz0@gmail.com"
              className="contact-cta"
              id="contact-cta-button"
            >
              GET IN TOUCH
            </a>
          </motion.div>

          {/* Contact Details */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              marginTop: '24px',
              flexWrap: 'wrap',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                color: 'rgba(245, 240, 232, 0.3)',
              }}
            >
              Randombaaz0@gmail.com
            </p>
            <a
              href="tel:+917489494743"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '13px',
                color: 'rgba(245, 240, 232, 0.3)',
                textDecoration: 'none',
                transition: 'color 200ms ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#D4A574';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'rgba(245, 240, 232, 0.3)';
              }}
            >
              +91 7489494743
            </a>
          </div>

          {/* Social Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              marginTop: '24px',
              flexWrap: 'wrap',
            }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'rgba(245, 240, 232, 0.3)',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#D4A574';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'rgba(245, 240, 232, 0.3)';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
