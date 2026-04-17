import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header({ onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const location = useLocation()
  const navRef = useRef(null)

  const isActive = (path) => location.pathname === path

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav" ref={navRef}>
          <Link to="/" className="nav__logo">
            Dan Dog <span>Does Things</span>
          </Link>

          <ul className={`nav__links${menuOpen ? ' open' : ''}`}>
            <li><Link to="/"              className={isActive('/')              ? 'active' : ''}>Home</Link></li>
            <li><Link to="/things"        className={isActive('/things')        ? 'active' : ''}>Things Dan Does</Link></li>
            <li><Link to="/store"         className={isActive('/store')         ? 'active' : ''}>Store</Link></li>
            <li><Link to="/business"      className={isActive('/business')      ? 'active' : ''}>Business</Link></li>
            <li><Link to="/gallery"       className={isActive('/gallery')       ? 'active' : ''}>Gallery</Link></li>
            <li><Link to="/anti-cruelty"  className={isActive('/anti-cruelty')  ? 'active' : ''}>The Mission</Link></li>
            {/* Donate shown only in mobile menu */}
            <li>
              <a
                href="https://www.anticruelty.org"
                target="_blank"
                rel="noopener noreferrer"
                className="donate-badge"
                style={{ display: menuOpen ? 'inline-flex' : 'none' }}
              >
                🐾 Donate
              </a>
            </li>
          </ul>

          <div className="nav__actions">
            <a
              href="https://www.anticruelty.org"
              target="_blank"
              rel="noopener noreferrer"
              className="donate-badge"
            >
              🐾 Anti-Cruelty
            </a>

            <button
              className="cart-btn"
              onClick={onCartOpen}
              aria-label={`View cart (${cartCount} item${cartCount !== 1 ? 's' : ''})`}
            >
              🛍️
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>

            <button
              className="hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
