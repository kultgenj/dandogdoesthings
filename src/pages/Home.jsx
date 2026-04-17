import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import ImgSlot from '../components/ImgSlot'
import { trackClick } from '../amplitude.js'

const FEATURED_PRODUCTS = [
  { id: 'tote-01',    name: 'The Distinguished Gentleman Tote', desc: "Canvas tote. Dan's likeness. Your groceries. His dignity.",    price: 28, src: '/images/dan-amplitude-sign.jpg' },
  { id: 'print-01',   name: 'Maximum Mouth Print',              desc: 'Art print. Full chaos energy. Suitable for framing.',          price: 35, src: '/images/dan-mouth-open-lakefront.jpg', badge: 'Fan Fave' },
  { id: 'pin-01',     name: 'Couch Ops Enamel Pin',             desc: 'Hard enamel. Soft backing. Hard commitments to the couch.',   price: 12, src: '/images/dan-couch-lounging.jpg' },
  { id: 'sticker-01', name: 'Flannel Era Sticker Pack',         desc: "5 stickers. One for every mood Dan has. Usually 2 at once.",  price:  8, src: '/images/dan-flannel.jpg' },
]

export default function Home() {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAdd = (product) => {
    addToCart(product)
    showToast(`${product.name} added to cart 🛍️`)
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="hero">
        <img
          src="/images/dan-grinning-skyline.jpg"
          alt="Dan grinning in front of the Chicago skyline across Lake Michigan"
          className="hero__bg"
        />
        <div className="hero__overlay" />
        <div className="container">
          <div className="hero__content animate-fade-up">
            <span className="hero__eyebrow">Chicago's Most Distinguished Mutt</span>
            <h1 className="hero__title">
              I Am Dan.<br />
              <span className="accent">I Do Things.</span>
            </h1>
            <p className="hero__sub">
              Calm. Athletic. Deeply philosophical about the lake.
              Also capable of going 0 to 60 in one second for reasons
              that will never be fully explained.
            </p>
            <div className="hero__actions">
              <Link to="/things" className="btn btn--tan btn--lg">See What Dan Does</Link>
              <Link to="/store"  className="btn btn--outline-white btn--lg">Shop the Collection</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <div className="stats-bar">
        {[
          { number: '∞',    label: 'Miles Contemplated' },
          { number: '1',    label: 'Chicago River Beat' },
          { number: '0',    label: 'Seconds Warning Before Zoomies' },
          { number: '2',    label: 'Couches Claimed' },
          { number: '100%', label: 'Distinguished' },
        ].map(s => (
          <div className="stat-item" key={s.label}>
            <span className="stat-item__number">{s.number}</span>
            <span className="stat-item__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── ABOUT DAN ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2.5rem,6vw,6rem)', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img
                src="/images/dan-on-beach-gazing.jpg"
                alt="Dan on the beach gazing at the horizon — stoic mode"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 'var(--radius-md)', display: 'block' }}
              />
              <div style={{ position: 'absolute', width: 180, height: 180, background: 'var(--warm-tan)', borderRadius: 'var(--radius-md)', bottom: '-1.5rem', right: '-1.5rem', zIndex: -1 }} />
            </div>
            <div>
              <span className="section-eyebrow">About Dan</span>
              <h2 className="section-title">
                calm. athletic.<br />distinguished.<br /><em>occasionally a threat.</em>
              </h2>
              <div className="divider" />
              <p>
                Dan is a sleek black and tan mystery mutt — part athlete, part philosopher, part couch acquisition
                specialist. Adopted from the Anti-Cruelty Society of Chicago, he has since established himself as a
                serious presence on the lakefront, in the loop, and on any soft surface left unattended.
              </p>
              <p className="mt-1">
                He is, by all accounts, a very good boy. He has also been seen sprinting at full speed toward nothing
                in particular, screaming at the sky, and side-eyeing strangers with the composure of a diplomat who
                has seen things.
              </p>
              <div className="trait-list mt-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span className="trait-chip trait-chip--black">🐾 Mystery Mutt</span>
                <span className="trait-chip trait-chip--tan">🏃 Athlete</span>
                <span className="trait-chip trait-chip--blue">🌊 Lake Person</span>
                <span className="trait-chip trait-chip--outline">🛋️ Couch Ops</span>
                <span className="trait-chip trait-chip--outline">📰 Journalist</span>
                <span className="trait-chip trait-chip--outline">🤌 Distinguished</span>
              </div>
              <div className="mt-2">
                <Link to="/things" className="btn btn--tan">The Full Story →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE ─────────────────────────────────────────── */}
      <section className="section--tight section--light">
        <div className="container" style={{ textAlign: 'center', maxWidth: 800, marginInline: 'auto' }}>
          <div style={{ borderTop: '4px solid var(--warm-tan)', paddingTop: '1.5rem', textAlign: 'center', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: 'rgba(10,10,10,0.75)', marginBlock: '2rem' }}>
            "I sat by the lake for four hours. I was thinking about everything. I was thinking about nothing.
            Then I spotted a pigeon and absolutely lost my mind."
          </div>
          <p style={{ color: 'var(--mid-gray)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            — Dan, on mindfulness
          </p>
        </div>
      </section>

      {/* ── FEATURED STORE TEASER ─────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="section-eyebrow">The Store</span>
              <h2 className="section-title">Dan-Approved Goods</h2>
            </div>
            <Link to="/store" className="btn btn--outline-black">See All Products →</Link>
          </div>
          <div className="grid-4">
            {FEATURED_PRODUCTS.map(p => (
              <div className="product-card" key={p.id}>
                <div className="product-card__img">
                  <img src={p.src} alt={p.name} loading="lazy" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
                  {p.badge && <span className="product-card__badge">{p.badge}</span>}
                </div>
                <div className="product-card__body">
                  <div className="product-card__name">{p.name}</div>
                  <div className="product-card__desc">{p.desc}</div>
                  <div className="product-card__footer">
                    <span className="product-card__price">${p.price}</span>
                    <button className="btn btn--tan btn--sm" onClick={() => handleAdd(p)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO REEL ────────────────────────────────────── */}
      <section className="section--tight">
        <div className="container" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-eyebrow">Gallery Preview</span>
              <h2 className="section-title">Dan in Action</h2>
            </div>
            <Link to="/gallery" className="btn btn--outline-black">Full Gallery →</Link>
          </div>
        </div>
        {/* Reel: container extends to edge on right */}
        <div className="container" style={{ maxWidth: 'none', paddingRight: 0 }}>
          <div className="photo-reel">
            {[
              { src: '/images/dan-screaming-skyline.jpg',   label: 'Dan screaming at the sky — city behind him' },
              { src: '/images/dan-grinning-skyline.jpg',    label: 'Dan grinning — Chicago skyline across Lake Michigan' },
              { src: '/images/dan-mouth-open-lakefront.jpg', label: 'Dan with maximum mouth open — lakefront chaos' },
              { src: '/images/dan-flannel.jpg',             label: 'Dan in red flannel — profound indoor dignity' },
              { src: '/images/dan-couch-lounging.jpg',      label: 'Dan on teal couch — aristocratic posture' },
              { src: '/images/dan-on-beach-gazing.jpg',     label: 'Dan on the beach — stoic horizon gazing' },
            ].map(item => (
              <div className="photo-reel-item" key={item.label}>
                <img src={item.src} alt={item.label} loading="lazy" style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ANTI-CRUELTY CALLOUT ──────────────────────────── */}
      <section className="section--tight">
        <div className="container">
          <div className="ac-callout">
            <span style={{ fontSize: '3.5rem' }}>🐾</span>
            <div>
              <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>The Mission</span>
              <h2 style={{ color: '#fff', marginBottom: '0.75rem' }}>
                Dan Was Rescued.<br />Now He Rescues Back.
              </h2>
              <p>
                Dan was adopted from the Anti-Cruelty Society of Chicago — one of the country's oldest and most
                important animal welfare organizations. Every Dan Dog purchase helps support their mission.
                Every dog deserves a lakefront view.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <a href="https://www.anticruelty.org" target="_blank" rel="noopener noreferrer" className="btn btn--outline-white btn--lg"
                onClick={trackClick('Donate Link Clicked', { source_page: 'home', variant: 'ac_callout' })}>
                Donate to Anti-Cruelty →
              </a>
              <Link to="/anti-cruelty" className="btn btn--black btn--lg">Read Dan's Story</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
