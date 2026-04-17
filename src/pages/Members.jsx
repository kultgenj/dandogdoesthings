import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import amplitude from '../amplitude.js'
import { TIERS } from '../data/tiers'

export default function Members() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSelect = (tier) => {
    amplitude.track('Membership Tier Selected', { tier: tier.id, price: tier.price })
    navigate(`/members/join?tier=${tier.id}`)
  }

  const currentTier = user?.membership?.tier

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--jet-black)', color: '#fff', paddingBlock: 'clamp(4rem,8vw,6.5rem)', textAlign: 'center' }}>
        <div className="container">
          <span className="section-eyebrow" style={{ color: 'var(--warm-tan)' }}>Membership</span>
          <h1>Join the <span style={{ color: 'var(--warm-tan)' }}>Pack.</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 620, marginInline: 'auto', marginTop: '1rem', fontSize: 'clamp(1rem,1.8vw,1.2rem)' }}>
            Three tiers. Annual. A meaningful slice of every membership goes to the Anti-Cruelty Society of Chicago —
            the shelter that produced Dan.
          </p>
          {currentTier && (
            <div style={{ marginTop: '2rem' }}>
              <Link to="/members/lounge" className="btn btn--tan btn--lg">
                🐾 You're a {TIERS.find(t => t.id === currentTier)?.name} member → Lounge
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── TIER CARDS ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="tier-grid">
            {TIERS.map(tier => (
              <div key={tier.id} className={`tier-card${tier.featured ? ' tier-card--featured' : ''}${currentTier === tier.id ? ' tier-card--current' : ''}`}>
                {tier.featured && <div className="tier-card__ribbon">Most Popular</div>}
                {currentTier === tier.id && <div className="tier-card__ribbon tier-card__ribbon--current">Your Tier</div>}

                <div className="tier-card__name">{tier.name}</div>
                <div className="tier-card__price">
                  <span className="tier-card__price-amount">${tier.price}</span>
                  <span className="tier-card__price-period">/ year</span>
                </div>
                <p className="tier-card__tagline">{tier.tagline}</p>

                <ul className="tier-card__perks">
                  {tier.perks.map(perk => (
                    <li key={perk}>
                      <span style={{ color: 'var(--warm-tan)', fontWeight: 700 }}>✓</span> {perk}
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                  {currentTier === tier.id ? (
                    <Link to="/members/lounge" className="btn btn--outline-tan" style={{ width: '100%', justifyContent: 'center' }}>
                      Enter Lounge →
                    </Link>
                  ) : (
                    <button
                      className={`btn ${tier.featured ? 'btn--tan' : 'btn--outline-black'}`}
                      style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => handleSelect(tier)}
                    >
                      Choose {tier.name} →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACS CALLOUT ───────────────────────────────────── */}
      <section className="section--tight">
        <div className="container">
          <div className="ac-callout">
            <span style={{ fontSize: '3.5rem' }}>🐾</span>
            <div>
              <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>The Mission</span>
              <h2 style={{ color: '#fff', marginBottom: '0.75rem' }}>
                A Real Portion of Every Membership<br />Goes to the Anti-Cruelty Society
              </h2>
              <p>
                10%, 20%, or 30% of your tier's annual fee is donated directly to the Anti-Cruelty Society of Chicago,
                the organization that made Dan possible. You can verify with us any time. Dan does not keep receipts
                but we do.
              </p>
            </div>
            <Link to="/anti-cruelty" className="btn btn--outline-white btn--lg">Read About the Mission →</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="section section--light">
        <div className="container" style={{ maxWidth: 780, marginInline: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">The Fine Print</span>
            <h2>Questions, Answered</h2>
          </div>
          {[
            { q: 'Is this really annual?', a: "Yes. One charge, 365 days of benefits. No monthly fuss. Renews manually — we'll reach out before expiry." },
            { q: 'What if I want to upgrade later?', a: "You can upgrade mid-year and we'll credit the difference. Dan supports upward mobility." },
            { q: 'Can I cancel?', a: "You can stop renewing. Benefits stay active until your term ends. If you've never used them, that's on you." },
            { q: 'Is the physical Evidence Packet real?', a: "Yes. Real prints, real stickers, real zine, real postage. Dan signs them with his paw (we press his paw on an ink pad; he is not an active participant)." },
            { q: 'Can I gift a membership?', a: "Not yet. It's on Dan's list. He made the list himself. He has not checked it recently." },
          ].map(item => (
            <div key={item.q} style={{ background: '#fff', padding: '1.5rem 1.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', boxShadow: 'var(--shadow-card)' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--warm-tan)' }}>{item.q}</h4>
              <p style={{ color: 'rgba(10,10,10,0.7)', fontSize: '0.95rem', lineHeight: 1.7 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
