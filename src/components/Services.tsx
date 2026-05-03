import { motion } from 'framer-motion';

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="12" height="28" rx="2" stroke="#D4A574" strokeWidth="1.5" />
        <rect x="18" y="2" width="12" height="12" rx="2" stroke="#D4A574" strokeWidth="1.5" />
        <rect x="18" y="18" width="12" height="12" rx="2" stroke="#D4A574" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Web Design',
    body: 'Clean, fast, conversion-focused websites built to make your brand look as serious as your ideas.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" stroke="#D4A574" strokeWidth="1.5" />
        <polygon points="13,10 13,22 23,16" fill="#D4A574" />
      </svg>
    ),
    title: 'Content Creation',
    body: 'Business ideas that spread — short-form content across YouTube, Instagram & Facebook as Randombaaz.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="6" stroke="#D4A574" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="10" stroke="#D4A574" strokeWidth="1" opacity="0.5" />
        <circle cx="16" cy="16" r="14" stroke="#D4A574" strokeWidth="0.75" opacity="0.3" />
        <circle cx="16" cy="16" r="2" fill="#D4A574" />
      </svg>
    ),
    title: 'Brand Strategy',
    body: 'Connecting how you look online with what you say. Ideas plus design plus distribution.',
  },
];

const cardVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.88, rotateX: 8 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.18,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#D4A574',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          // WHAT I DO
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-anton)',
            fontSize: 'clamp(40px, 6vw, 80px)',
            color: '#F5F0E8',
            textAlign: 'center',
            textTransform: 'uppercase',
            marginBottom: '64px',
            lineHeight: 1.05,
          }}
        >
          Two Skills. One Vision.
        </motion.h2>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            perspective: '800px',
          }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="service-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              style={{ transformOrigin: 'center bottom' }}
            >
              <div style={{ marginBottom: '20px' }}>{service.icon}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-anton)',
                  fontSize: '26px',
                  color: '#F5F0E8',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '14px',
                  color: 'rgba(245, 240, 232, 0.6)',
                  lineHeight: 1.7,
                }}
              >
                {service.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
