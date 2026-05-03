import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  // Handle responsive video source
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Hide scroll indicator after first scroll
  useEffect(() => {
    const handler = () => {
      setScrolled(true);
      window.removeEventListener('scroll', handler);
    };
    window.addEventListener('scroll', handler, { once: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // GSAP ScrollTrigger for cinematic zoom + darkening + background text scale
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video zoom on scroll
      if (videoWrapperRef.current) {
        gsap.to(videoWrapperRef.current, {
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Overlay darkening
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.78,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Background text — scales up faster for depth parallax
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          scale: 1.6,
          y: -80,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section" id="hero">
      {/* ===== BACKGROUND TEXT (behind video) ===== */}
      <div
        ref={bgTextRef}
        className="hero-bg-text"
        aria-hidden="true"
      >
        <span className="hero-bg-text-line">SUNNY</span>
        <span className="hero-bg-text-line">CHAUDHARY</span>
      </div>

      {/* ===== Video Background ===== */}
      <div ref={videoWrapperRef} className="hero-video-wrapper">
        <video
          key={isMobile ? 'mobile' : 'desktop'}
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/sunny-portrait.png"
          aria-hidden="true"
          className="hero-video"
          onEnded={(e) => {
            // Fallback for mobile browsers that fail to loop natively
            const video = e.target as HTMLVideoElement;
            video.currentTime = 0;
            video.play().catch(err => console.log('Video play error:', err));
          }}
        >
          <source
            src={isMobile ? '/assets/sunny-hero-9x16.mp4' : '/assets/sunny-hero-16x9.mp4'}
            type="video/mp4"
          />
        </video>
      </div>

      {/* ===== Overlays ===== */}
      <div ref={overlayRef} className="hero-overlay-dark" />
      <div className="hero-overlay-vignette" />
      <div className="hero-overlay-bottom" />
      <div className="hero-watermark-mask" />

      {/* ===== Foreground Content ===== */}
      <div className="hero-content">
        {/* Pre-title */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: 'rgba(245, 240, 232, 0.55)',
            marginBottom: '24px',
          }}
        >
          // WEB DESIGNER · CONTENT CREATOR
        </motion.p>

        {/* Spacer — name is now behind video, this holds the vertical position */}
        <div
          style={{
            height: 'clamp(60px, 14vw, 180px)',
            marginBottom: '24px',
          }}
        />

        {/* Brand Name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            letterSpacing: '0.45em',
            color: '#D4A574',
            textTransform: 'uppercase',
          }}
        >
          RANDOMBAAZ
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '2px',
              height: '40px',
              background: 'rgba(212, 165, 116, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '1px',
            }}
          >
            <div
              className="scroll-dot"
              style={{
                width: '2px',
                height: '8px',
                background: '#D4A574',
                borderRadius: '1px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'rgba(245, 240, 232, 0.4)',
              textTransform: 'uppercase',
            }}
          >
            SCROLL
          </span>
        </motion.div>
      </div>
    </section>
  );
}
