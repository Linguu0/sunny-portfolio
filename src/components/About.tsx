import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // GSAP parallax on portrait + clip-path reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hardware-accelerated scale reveal instead of expensive clip-path
      if (revealRef.current) {
        gsap.fromTo(
          revealRef.current,
          { scale: 0.95, opacity: 0.8, borderRadius: '24px' },
          {
            scale: 1,
            opacity: 1,
            borderRadius: '0px',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              end: 'top 30%',
              scrub: 0.6,
            },
          }
        );
      }

      // Portrait parallax
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" style={{ overflow: 'hidden' }}>
      <div ref={revealRef} className="about-section">
        <div className="about-grid">
          {/* Left Column — Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div ref={portraitRef} className="about-portrait-container">
              <img
                src="/assets/sunny-portrait-2.png"
                alt="Sunny Chaudhary — Web designer and content creator"
                className="about-portrait"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.style.background = 'linear-gradient(160deg, #c49b6a 0%, #2c1810 100%)';
                    target.parentElement.style.aspectRatio = '3/4';
                    target.parentElement.style.borderRadius = '4px';
                  }
                }}
              />
              <div className="about-portrait-overlay" />
            </div>
          </motion.div>

          {/* Right Column — Text */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            {/* Label */}
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: '#8B7355',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              // ABOUT
            </p>

            {/* Heading */}
            <h2
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: 'clamp(32px, 5vw, 48px)',
                color: '#2C1810',
                lineHeight: 1.05,
                textTransform: 'uppercase',
                marginBottom: '32px',
              }}
            >
              Business Ideas.
              <br />
              Web Design.
              <br />
              Real Results.
            </h2>

            {/* Body Copy */}
            <div
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '16px',
                color: '#5C4A35',
                lineHeight: 1.85,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <p>
                I'm Sunny Chaudhary — web designer and content creator behind
                Randombaaz. I believe every business idea deserves to look as
                good as it works.
              </p>
              <p>
                On YouTube, Instagram, and Facebook, I share business ideas that
                real people can actually use — no fluff, no gatekeeping.
              </p>
              <p>
                Whether you need a website that converts or content that stops
                the scroll, I build both.
              </p>
            </div>

            {/* Social Pills */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '28px', flexWrap: 'wrap' }}>
              <a
                href="https://youtube.com/@randombaaz.0?si=UEJiOjqRmoeI32Og"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                ▶ YouTube · Randombaaz
              </a>
              <a
                href="https://www.instagram.com/randombaaz?igsh=MXdieG1panZtNGM3OQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                ◆ Instagram · Randombaaz
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100078177716022&mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                ● Facebook · Randombaaz
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
