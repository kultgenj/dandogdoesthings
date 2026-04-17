import { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import amplitude from '../amplitude.js'
import { getTier } from '../data/tiers'

export default function MembersJoin() {
  const [params] = useSearchParams()
  const tierId = params.get('tier')
  const tier = getTier(tierId)

  const { user, joinMembership } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [card, setCard] = useState({ name: '', number: '', exp: '', cvv: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // If no valid tier was requested, bounce back to the members landing
  if (!tier) return <Navigate to="/members" replace />
  // Require auth for the join flow — send to signup with a return intent
  if (!user) {
    return <Navigate to="/signup" state={{ from: `/members/join?tier=${tierId}` }} replace />
  }
  // Already an active member? Send them to the lounge instead
  if (user.membership?.tier) {
    return <Navigate to="/members/lounge" replace />
  }

  const formatCard = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  const formatExp  = v => { const d = v.replace(/\D/g,'').slice(0,4); return d.length > 2 ? d.slice(0,2)+'/'+d.slice(2) : d }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (card.number.replace(/\s/g, '') !== '4242424242424242') {
      setError('Use test card: 4242 4242 4242 4242')
      return
    }
    if (!card.name.trim() || !card.exp.trim() || !card.cvv.trim()) {
      setError('Please complete all payment fields.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const m = joinMembership({ tier: tier.id, price: tier.price, acsPercent: tier.acs_percent })
      amplitude.track('Membership Joined', {
        tier: tier.id,
        price: tier.price,
        acs_donation: m.acs_donation,
      })
      showToast(`Welcome to the ${tier.name} tier 🐾`)
      navigate('/members/lounge', { replace: true })
    }, 1200)
  }

  return (
    <div className="checkout-page">
      <div className="container" style={{ maxWidth: 900 }}>
        <Link to="/members" className="back-link">← Back to tiers</Link>

        <div className="checkout-layout">
          {/* Left: payment form */}
          <div>
            <div className="checkout-section">
              <h3>💳 Payment</h3>

              <div className="test-card-hint">
                <span>🧪</span>
                <span><strong>Test mode:</strong> Use card <strong>4242 4242 4242 4242</strong>, any future expiry, any 3-digit CVV.</span>
              </div>

              {error && <div className="auth-error">⚠️ {error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="card-name">Name on Card</label>
                  <input className="form-input" id="card-name" type="text" placeholder="Jane Smith" autoComplete="cc-name"
                    value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <div className="card-icons">💳 🔒</div>
                  <label className="form-label" htmlFor="card-number">Card Number</label>
                  <input className="form-input" id="card-number" type="text" maxLength={19} inputMode="numeric" autoComplete="cc-number"
                    value={card.number}
                    onChange={e => setCard(c => ({ ...c, number: formatCard(e.target.value) }))}
                    placeholder="4242 4242 4242 4242" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="card-exp">Expiry</label>
                    <input className="form-input" id="card-exp" type="text" maxLength={5} inputMode="numeric" autoComplete="cc-exp"
                      value={card.exp} onChange={e => setCard(c => ({ ...c, exp: formatExp(e.target.value) }))} placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="card-cvv">CVV</label>
                    <input className="form-input" id="card-cvv" type="text" maxLength={4} inputMode="numeric" autoComplete="cc-csc"
                      value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g,'').slice(0,4) }))} placeholder="123" />
                  </div>
                </div>

                <button type="submit" className="btn btn--tan btn--lg"
                  style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Activating membership…' : `Join for $${tier.price}/year →`}
                </button>

                <div className="security-note" style={{ marginTop: '1rem' }}>
                  🔒 Demo flow. No real charges are made.
                </div>
              </form>
            </div>
          </div>

          {/* Right: tier summary */}
          <div>
            <div className="order-summary">
              <h3>{tier.name} Membership</h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.92rem', margin: '0.5rem 0 1.25rem' }}>
                {tier.tagline}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {tier.perks.map(perk => (
                  <li key={perk} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.55rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)' }}>
                    <span style={{ color: 'var(--warm-tan)', fontWeight: 700 }}>✓</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="order-line" style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                <span>Annual fee</span>
                <span>${tier.price.toFixed(2)}</span>
              </div>
              <div className="order-line">
                <span>To Anti-Cruelty Society ({tier.acs_percent}%)</span>
                <span style={{ color: 'var(--teal)', fontWeight: 700 }}>${(tier.price * tier.acs_percent / 100).toFixed(2)}</span>
              </div>
              <div className="order-line order-line--total">
                <span>Total today</span>
                <span>${tier.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
