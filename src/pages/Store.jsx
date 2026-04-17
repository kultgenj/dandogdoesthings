import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

const PHYSICAL_PRODUCTS = [
  { id: 'tote-01',          name: 'The Distinguished Gentleman Tote', desc: "Heavy canvas. Dan's portrait. Your grocery haul. His dignity, doing the heavy lifting.",           price: 28, src: '/images/dan-amplitude-sign.jpg' },
  { id: 'print-01',         name: 'Maximum Mouth Print',              desc: 'Dan. Full chaos mode. Mouth completely open. Art print. 8×10. Do not hang in a calming space.',     price: 35, src: '/images/dan-mouth-open-lakefront.jpg', badge: 'Fan Fave' },
  { id: 'pin-01',           name: 'Couch Ops Enamel Pin',             desc: 'Hard enamel. Soft clutch back. Dan on the teal couch, depicted with full aristocratic authority.',  price: 12, src: '/images/dan-couch-lounging.jpg' },
  { id: 'sticker-01',       name: 'Flannel Era Sticker Pack',         desc: '5 stickers. Dan across his many moods. The flannel. The gaze. The scream. The couch.',            price:  8, src: '/images/dan-flannel.jpg' },
  { id: 'poster-01',        name: 'Chaos Mode Poster',                desc: 'Dan screaming at the sky. City behind him. 18×24 inches. You know what this is for.',              price: 30, src: '/images/dan-screaming-skyline.jpg', badge: 'New' },
  { id: 'tee-01',           name: 'Dan Dog Fan Tee',                  desc: 'Unisex fit. Soft cotton. "Dan Dog Does Things" on front. Your fandom, now wearable.',             price: 32, src: '/images/dan-standing.jpg' },
  { id: 'bundle-journalist',name: 'The Journalist Collection',        desc: "Six-print set from Dan's Chicago River coverage. Full investigation. No conclusions.",            price: 55, src: '/images/dan-chicago-river.jpg', badge: 'Bundle' },
  { id: 'pin-02',           name: 'Skyline Gazer Pin',                desc: 'Dan, Chicago skyline behind him, grinning in the way he does. Enamel. 1.25 inches.',             price: 12, src: '/images/dan-full-cityscape.jpg' },
]

export default function Store() {
  const { addToCart } = useCart()
  const { showToast } = useToast()

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
              <img
                src="/images/dan-on-beach-gazing.jpg"
                alt="Lake Michigan Gaze — Art Print"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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

      {/* ── BUSINESS CROSS-LINK ───────────────────────────── */}
      <section className="section--tight">
        <div className="container">
          <div style={{ background: 'var(--jet-black)', color: '#fff', borderRadius: 'var(--radius-lg)', padding: 'clamp(2rem,4vw,3rem)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div style={{ flex: '1 1 320px' }}>
              <span className="section-eyebrow">Collaborations, Bookings, Consulting</span>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Looking to Work With Dan?</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                Brand collabs, public appearances, and canine social strategy consulting live on their own page now.
              </p>
            </div>
            <Link to="/business" className="btn btn--tan btn--lg">Visit Dan's Business →</Link>
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
    </>
  )
}
