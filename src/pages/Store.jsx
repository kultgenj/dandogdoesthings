import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import ImgSlot from '../components/ImgSlot'

const PHYSICAL_PRODUCTS = [
  { id: 'tote-01',          name: 'The Distinguished Gentleman Tote', desc: "Heavy canvas. Dan's portrait. Your grocery haul. His dignity, doing the heavy lifting.",           price: 28, icon: '👜', color: 'tan'   },
  { id: 'print-01',         name: 'Maximum Mouth Print',              desc: 'Dan. Full chaos mode. Mouth completely open. Art print. 8×10. Do not hang in a calming space.',     price: 35, icon: '🖼️', color: 'blue',  badge: 'Fan Fave' },
  { id: 'pin-01',           name: 'Couch Ops Enamel Pin',             desc: 'Hard enamel. Soft clutch back. Dan on the teal couch, depicted with full aristocratic authority.',  price: 12, icon: '📌', color: 'teal'  },
  { id: 'sticker-01',       name: 'Flannel Era Sticker Pack',         desc: '5 stickers. Dan across his many moods. The flannel. The gaze. The scream. The couch.',            price:  8, icon: '🏷️', color: 'black' },
  { id: 'poster-01',        name: 'Chaos Mode Poster',                desc: 'Dan screaming at the sky. City behind him. 18×24 inches. You know what this is for.',              price: 30, icon: '🖼️', color: 'black', badge: 'New' },
  { id: 'tee-01',           name: 'Dan Dog Fan Tee',                  desc: 'Unisex fit. Soft cotton. "Dan Dog Does Things" on front. Your fandom, now wearable.',             price: 32, icon: '👕', color: 'amber' },
  { id: 'bundle-journalist',name: 'The Journalist Collection',        desc: "Six-print set from Dan's Chicago River coverage. Full investigation. No conclusions.",            price: 55, icon: '📰', color: 'blue',  badge: 'Bundle' },
  { id: 'pin-02',           name: 'Skyline Gazer Pin',                desc: 'Dan, Chicago skyline behind him, grinning in the way he does. Enamel. 1.25 inches.',             price: 12, icon: '📌', color: 'sky'   },
]

const SERVICES = [
  {
    id: 'instagram',
    icon: '📱',
    title: 'Instagram Collaborations',
    tagline: '"Dan has reach. Let\'s talk."',
    desc: "Dan maintains a dignified and occasionally unhinged social presence. His audience understands him. If your brand also understands him — or wants to — he is open to a conversation. He will stare at the product first. Then decide.",
    cta: 'Get in Touch →',
  },
  {
    id: 'appearances',
    icon: '🎤',
    title: 'Public Appearances',
    tagline: '"He will show up. He will be calm. Then he won\'t be."',
    desc: "Dan is available for events, openings, corporate wellness walks, lakefront press junkets, and occasions that call for a distinguished black and tan presence. He will bring gravitas. He may also bring zoomies. Both are part of the package.",
    cta: 'Book Dan →',
  },
  {
    id: 'consulting',
    icon: '📊',
    title: 'Canine Social Media Management Consulting',
    tagline: '"Years of experience. Zero regrets."',
    desc: "Dan has studied the algorithm from the inside. He knows what performs (grinning at skylines), what doesn't (explaining yourself), and how to build an audience that genuinely does not know what you're going to do next. That is the brand. That is the strategy.",
    cta: 'Inquire →',
  },
]

function InquiryModal({ service, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(onClose, 3500)
  }

  if (!service) return null

  return (
    <div className={`modal-overlay${service ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        <span className="section-eyebrow">{service.title}</span>
        <h3>Get in Touch</h3>
        <p className="subtitle">{service.tagline}</p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="inq-name">Your Name</label>
              <input className="form-input" id="inq-name" type="text" placeholder="Full name" required
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="inq-email">Email</label>
              <input className="form-input" id="inq-email" type="email" placeholder="you@example.com" required
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="inq-org">Organization / Brand (optional)</label>
              <input className="form-input" id="inq-org" type="text" placeholder="Your company or brand"
                value={form.org} onChange={e => setForm(f => ({ ...f, org: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="inq-message">Tell Dan About It</label>
              <textarea className="form-input" id="inq-message" rows={4}
                placeholder="What are you thinking? Dan will think about it too." required
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            </div>
            <button type="submit" className="btn btn--tan" style={{ width: '100%', justifyContent: 'center' }}>
              Send Inquiry →
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐾</div>
            <h3>Inquiry Received.</h3>
            <p style={{ color: 'rgba(10,10,10,0.6)', marginTop: '0.5rem' }}>
              Dan has been notified. He is currently on the couch.
              He will get back to you when he gets back to you.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Store() {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [activeService, setActiveService] = useState(null)

  const handleAdd = (product) => {
    addToCart(product)
    showToast(`${product.name} added to cart 🛍️`)
  }

  return (
    <>
      <div className="store-band">
        ✦ Free shipping on orders over $50 ✦ All sales support the Anti-Cruelty Society of Chicago ✦
        Dan personally approves every item (he was on the couch at the time) ✦
      </div>

      {/* ── STORE HERO ────────────────────────────────────── */}
      <section className="store-header">
        <div className="container">
          <span className="section-eyebrow" style={{ color: 'var(--warm-tan)' }}>Dan's Official Store</span>
          <h1>The <span className="accent">Dan Dog</span><br />Collection</h1>
          <p>Merchandise for people who understand Dan. And even for people who don't — yet.</p>
        </div>
      </section>

      {/* ── PHYSICAL PRODUCTS ─────────────────────────────── */}
      <section className="section" id="physical">
        <div className="container">
          {/* Featured product */}
          <div className="featured-product">
            <div className="featured-product__img">
              <ImgSlot
                alt="Lake Michigan Gaze — Art Print"
                variant="img-slot--blue"
                style={{ height: '100%', borderRadius: 0 }}
              />
            </div>
            <div className="featured-product__body">
              <span className="badge">⭐ Staff Pick</span>
              <h2>Lake Michigan Gaze</h2>
              <p>Dan at the lakefront. Contemplating. Not explaining. Fine art print on 100lb archival paper. Ships flat. Arrives with Dan's silent energy intact.</p>
              <p>12×16 inches. Suitable for framing. Suitable for staring at when you also don't know what you're thinking about.</p>
              <div className="price">$35</div>
              <button className="btn btn--tan btn--lg" onClick={() => handleAdd({ id: 'print-lmg', name: 'Lake Michigan Gaze Print', price: 35, color: '🔵' })}>
                Add to Cart — $35
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <span className="store-section-title">Merch &amp; Prints</span>
            <p style={{ color: 'rgba(10,10,10,0.55)', marginTop: '0.5rem' }}>Physical goods. Real quality. Dan's face on them.</p>
          </div>

          <div className="grid-4">
            {PHYSICAL_PRODUCTS.map(p => (
              <div className="product-card" key={p.id}>
                <div className="product-card__img">
                  <ImgSlot alt={p.name} variant={`img-slot--square img-slot--${p.color}`} />
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

      {/* ── SERVICES ──────────────────────────────────────── */}
      <div className="store-divider container"><span>Professional Services</span></div>

      <section className="section--tight" id="services">
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="store-section-title">Services &amp; Collaborations</span>
            <p style={{ color: 'rgba(10,10,10,0.55)', marginTop: '0.5rem', maxWidth: 560 }}>
              Dan is available for select professional engagements. Submit an inquiry and he will review it
              from the couch. Response times vary based on nap schedule.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div className="service-card" key={s.id}>
                <div className="service-card__icon">{s.icon}</div>
                <div className="service-card__title">{s.title}</div>
                <div className="service-card__tagline">{s.tagline}</div>
                <p>{s.desc}</p>
                <button className="btn btn--tan" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setActiveService(s)}>
                  {s.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHECKOUT CTA ──────────────────────────────────── */}
      <section className="section--tight section--light">
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '2.5rem' }}>🛍️</span>
          <h2 style={{ margin: '0.75rem 0' }}>Ready to Check Out?</h2>
          <p style={{ color: 'rgba(10,10,10,0.55)', marginBottom: '2rem', maxWidth: 400, marginInline: 'auto' }}>
            Dan's watching the cart. He'll know if you leave without finishing.
          </p>
          <Link to="/checkout" className="btn btn--tan btn--lg">Proceed to Checkout →</Link>
        </div>
      </section>

      {/* Inquiry modal */}
      <InquiryModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  )
}
