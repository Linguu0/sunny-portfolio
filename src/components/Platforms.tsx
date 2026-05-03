import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const platforms = [
  { name: 'YOUTUBE', handle: '@Randombaaz', href: 'https://youtube.com/@randombaaz.0?si=UEJiOjqRmoeI32Og' },
  { name: 'INSTAGRAM', handle: '@Randombaaz', href: 'https://www.instagram.com/randombaaz?igsh=MXdieG1panZtNGM3OQ%3D%3D&utm_source=qr' },
  { name: 'FACEBOOK', handle: '@Randombaaz', href: 'https://www.facebook.com/profile.php?id=100078177716022&mibextid=wwXIfr' },
];

// Repeat items for seamless loop
const marqueeItems = [...platforms, ...platforms, ...platforms, ...platforms];

export default function Platforms() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    // Get half the width (since we have 4 copies, half = 2 copies worth)
    const totalWidth = track.scrollWidth / 2;

    tweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 25,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => parseFloat(String(x)) % totalWidth),
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.6, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
    }
  };

  return (
    <section
      className="platforms-strip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: 'hidden', cursor: 'default' }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '0px',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {marqueeItems.map((platform, i) => (
          <a
            key={`${platform.name}-${i}`}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className="marquee-item"
          >
            <span className="marquee-separator">✦</span>
            <span className="marquee-name">{platform.name}</span>
            <span className="marquee-handle">{platform.handle}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
