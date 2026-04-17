import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Header({ onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const navRef = useRef(null)
  const userMenuRef = useRef(null)

  const isActive = (path) => location.pathname === path

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false)
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close user menu on route change
  useEffect(() => { setUserMenuOpen(false) }, [location])

  const handleSignOut = () => {
    signOut()
    setUserMenuOpen(false)
    navigate('/')
  }

  const userInitial = user ? user.name.charAt(0).toUpperCase() : ''

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
            <li><Link to="/things"        className={isActive('/things')        ? 'active' : ''}>Things</Link></li>
            <li><Link to="/store"         className={isActive('/store')         ? 'active' : ''}>Store</Link></li>
            <li><Link to="/business"      className={isActive('/business')      ? 'active' : ''}>Business</Link></li>
            <li><Link to="/gallery"       className={isActive('/gallery')       ? 'active' : ''}>Gallery</Link></li>
            <li><Link to="/anti-cruelty"  className={isActive('/anti-cruelty')  ? 'active' : ''}>Mission</Link></li>
            {/* Mobile-only: Sign In / Account link in hamburger menu */}
            <li className="nav__links-mobile-only">
              {user
                ? <Link to="/account">🐾 My Account</Link>
                : <Link to="/signin">→ Sign In / Create Account</Link>
              }
            </li>
            {/* Mobile-only: Donate link */}
            <li className="nav__links-mobile-only">
              <a
                href="https://www.anticruelty.org"
                target="_blank"
                rel="noopener noreferrer"
                className="donate-badge"
                style={{ display: 'inline-flex' }}
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

            {user ? (
              <div className="user-menu" ref={userMenuRef}>
                <button
                  className="user-avatar"
                  onClick={() => setUserMenuOpen(o => !o)}
                  aria-label={`Account menu for ${user.name}`}
                  aria-expanded={userMenuOpen}
                >
                  {userInitial}
                </button>
                {userMenuOpen && (
                  <div className="user-menu__dropdown">
                    <div className="user-menu__greeting">
                      Signed in as<br />
                      <strong>{user.email}</strong>
                    </div>
                    <Link to="/account" onClick={() => setUserMenuOpen(false)}>🐾 Account</Link>
                    <Link to="/account" onClick={() => setUserMenuOpen(false)}>🛍️ Order history</Link>
                    <button onClick={handleSignOut}>← Sign out</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin" className="signin-link">Sign In</Link>
            )}

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
