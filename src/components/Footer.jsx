import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-teal-callout">
          <div>
            <strong>🐾 Dan was adopted from the Anti-Cruelty Society of Chicago.</strong>
            <p>Every purchase supports the mission. Every dog deserves a skyline view.</p>
          </div>
          <a
            href="https://www.anticruelty.org"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline-white"
          >
            Donate Now
          </a>
        </div>

        <div className="footer-inner">
          <div className="footer-col">
            <h4>Dan Dog Does Things</h4>
            <p>A Chicago dog on a mission. Athlete. Philosopher. Occasional menace. Always distinguished.</p>
            <div className="social-links" style={{ marginTop: '1rem' }}>
              <a href="#" title="Instagram" aria-label="Instagram">📸</a>
              <a href="#" title="TikTok"    aria-label="TikTok">🎵</a>
              <a href="#" title="Twitter/X" aria-label="Twitter">🐦</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/things">Things Dan Does</Link>
            <Link to="/store">Store</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/anti-cruelty">The Mission</Link>
          </div>

          <div className="footer-col">
            <h4>The Shop</h4>
            <Link to="/store#physical">Merch &amp; Prints</Link>
            <Link to="/store#services">Collaborations</Link>
            <Link to="/store#services">Public Appearances</Link>
            <Link to="/checkout">Checkout</Link>
          </div>

          <div className="footer-col">
            <h4>Chicago</h4>
            <p>
              Dan is a proud product of the city that never stops — the lake, the loop, the lakefront
              path at 6am. Chicago forever.
            </p>
            <a
              href="https://www.anticruelty.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--teal)', marginTop: '0.5rem', fontWeight: '700' }}
            >
              Anti-Cruelty Society →
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 Dan Dog Does Things. All rights reserved (by Dan).</span>
          <span>Chicago, IL 🐾</span>
        </div>
      </div>
    </footer>
  )
}
