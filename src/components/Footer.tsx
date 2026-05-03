export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(245, 240, 232, 0.2)',
          }}
        >
          © 2026 Sunny Chaudhary · Randombaaz
        </p>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(245, 240, 232, 0.2)',
          }}
        >
          Designed & Built by Sunny
        </p>
      </div>
    </footer>
  );
}
