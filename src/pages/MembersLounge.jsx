import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import amplitude from '../amplitude.js'
import ImgSlot from '../components/ImgSlot'
import { getTier } from '../data/tiers'

export default function MembersLounge() {
  const { user } = useAuth()

  useEffect(() => {
    if (user?.membership?.tier) {
      amplitude.track('Lounge Viewed', { tier: user.membership.tier })
    }
  }, [user])

  if (!user) return <Navigate to="/signin" state={{ from: '/members/lounge' }} replace />
  if (!user.membership?.tier) return <Navigate to="/members" replace />

  const tier = getTier(user.membership.tier)
  const m = user.membership
  const expires = new Date(m.expires_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  // Generated discount code keyed off user + tier (display only; demo)
  const discountPercent = tier.id === 'basic' ? 10 : tier.id === 'standard' ? 15 : 25
  const discountCode = `DAN-${tier.id.toUpperCase()}-${user.id.slice(0, 6).toUpperCase()}`

  return (
    <div style={{ background: 'var(--jet-black)', color: '#fff', minHeight: 'calc(100vh - 80px)', paddingBlock: 'clamp(2.5rem,5vw,4rem)' }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        {/* ── HEADER ──────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <div>
            <span className="section-eyebrow">The Lounge</span>
            <h1 style={{ color: '#fff' }}>Welcome, {user.name.split(' ')[0]}.</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>
              You are a <strong style={{ color: 'var(--warm-tan)' }}>{tier.name}</strong> member.
              Dan acknowledges your support (internally).
            </p>
          </div>

          <div className="tier-badge">
            <span className="tier-badge__label">Your tier</span>
            <span className="tier-badge__name">{tier.name}</span>
            <span className="tier-badge__meta">Active through {expires}</span>
          </div>
        </div>

        {/* ── PERKS ACTIVE ────────────────────────────────── */}
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Your Perks</h3>
          <div className="lounge-grid">
            <div className="lounge-card">
              <div className="lounge-card__icon">💸</div>
              <h4>Store Discount</h4>
              <p>Apply this code at checkout for {discountPercent}% off any order.</p>
              <div className="lounge-card__code">{discountCode}</div>
            </div>

            <div className="lounge-card">
              <div className="lounge-card__icon">📬</div>
              <h4>The Dan Dispatch</h4>
              <p>Your monthly newsletter. Next issue ships first Friday of the month.</p>
              <span className="lounge-card__pill">Subscribed</span>
            </div>

            <div className="lounge-card">
              <div className="lounge-card__icon">💚</div>
              <h4>Anti-Cruelty Contribution</h4>
              <p>
                <strong style={{ color: 'var(--teal)' }}>${m.acs_donation.toFixed(2)}</strong> of your membership
                supports the Anti-Cruelty Society of Chicago this year.
              </p>
              <a href="https://www.anticruelty.org" target="_blank" rel="noopener noreferrer" className="btn btn--teal btn--sm" style={{ marginTop: '0.5rem' }}>
                Visit ACS →
              </a>
            </div>

            {tier.id !== 'basic' && (
              <div className="lounge-card">
                <div className="lounge-card__icon">⏩</div>
                <h4>Early Access</h4>
                <p>New merch unlocks 48 hours before public release. Watch this space.</p>
                <Link to="/store" className="btn btn--outline-white btn--sm" style={{ marginTop: '0.5rem' }}>Browse Store →</Link>
              </div>
            )}

            {tier.id === 'premium' && (
              <div className="lounge-card">
                <div className="lounge-card__icon">📦</div>
                <h4>Annual Evidence Packet</h4>
                <p>Ships to you on your anniversary. Prints, stickers, zine, and whatever else Dan approves.</p>
                <span className="lounge-card__pill">Shipping in {Math.ceil((new Date(m.expires_at) - new Date()) / 86400000 / 30)} mo</span>
              </div>
            )}

            {tier.id === 'premium' && (
              <div className="lounge-card">
                <div className="lounge-card__icon">🎥</div>
                <h4>Quarterly Hangouts</h4>
                <p>Virtual meetups. Dan attends. He may or may not be engaged. Coffee encouraged.</p>
                <span className="lounge-card__pill">Next invite incoming</span>
              </div>
            )}
          </div>
        </section>

        {/* ── EXCLUSIVE CONTENT ───────────────────────────── */}
        <section style={{ marginBottom: '3rem' }}>
          <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Exclusive Content</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Outtakes: The Flannel Shoot',  color: 'amber', tag: 'Photo set' },
              { title: 'Lakefront, 6:47am',             color: 'blue',  tag: 'Video — 3:12' },
              { title: 'Dan\'s Next Couch (Previews)', color: 'teal',  tag: 'Sneak peek' },
              { title: 'Dispatch #14 — The Rug Era',    color: 'tan',   tag: 'Newsletter' },
            ].map(item => (
              <div key={item.title} className="exclusive-card">
                <ImgSlot alt={item.title} variant={`img-slot--landscape img-slot--${item.color}`} style={{ borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }} />
                <div style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--warm-tan)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    {item.tag}
                  </div>
                  <h4 style={{ color: '#fff', fontSize: '1rem' }}>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '1rem', fontStyle: 'italic' }}>
            Previews shown. Real drops land here as Dan produces them.
          </p>
        </section>

        {/* ── FOOTER NOTE ─────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
            Questions? <Link to="/business" style={{ color: 'var(--warm-tan)' }}>Reach out</Link> —
            or view <Link to="/account" style={{ color: 'var(--warm-tan)' }}>your account</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
