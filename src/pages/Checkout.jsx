import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

const STEPS = ['Shipping', 'Payment', 'Confirm']

function StepsBar({ current }) {
  return (
    <div className="steps-bar">
      {STEPS.map((label, i) => {
        const n = i + 1
        const isActive = n === current
        const isDone   = n < current
        return (
          <div key={label} className={`step-indicator${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}>
            <span className="step-num">{isDone ? '✓' : n}</span>
            <span className="step-label">{label}</span>
          </div>
        )
      })}
    </div>
  )
}

function ShippingForm({ data, onChange, onContinue }) {
  const fields = [
    { id: 'name',    label: 'Full Name',      type: 'text',  placeholder: 'Jane Smith',       auto: 'name' },
    { id: 'email',   label: 'Email Address',  type: 'email', placeholder: 'you@example.com',  auto: 'email' },
    { id: 'address', label: 'Street Address', type: 'text',  placeholder: '123 Lakefront Dr', auto: 'street-address' },
  ]

  const validate = () => {
    const required = ['name', 'email', 'address', 'city', 'state', 'zip']
    return required.every(k => data[k]?.trim()) && data.email?.includes('@')
  }

  return (
    <div>
      <div className="checkout-section">
        <h3>📦 Shipping Information</h3>
        {fields.map(f => (
          <div className="form-group" key={f.id}>
            <label className="form-label" htmlFor={`ship-${f.id}`}>{f.label}</label>
            <input
              className={`form-input${!data[f.id] ? '' : ''}`}
              id={`ship-${f.id}`}
              type={f.type}
              placeholder={f.placeholder}
              autoComplete={f.auto}
              value={data[f.id] || ''}
              onChange={e => onChange(f.id, e.target.value)}
            />
          </div>
        ))}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="ship-city">City</label>
            <input className="form-input" id="ship-city" type="text" placeholder="Chicago" autoComplete="address-level2"
              value={data.city || ''} onChange={e => onChange('city', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="ship-state">State</label>
            <input className="form-input" id="ship-state" type="text" placeholder="IL" maxLength={2} autoComplete="address-level1"
              value={data.state || ''} onChange={e => onChange('state', e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="ship-zip">ZIP Code</label>
          <input className="form-input" id="ship-zip" type="text" placeholder="60601" maxLength={10} autoComplete="postal-code"
            value={data.zip || ''} onChange={e => onChange('zip', e.target.value)} />
        </div>
      </div>

      <div className="checkout-section">
        <h3>🚚 Shipping Method</h3>
        {[
          { value: 'standard', label: 'Standard Shipping', sub: '5–7 business days', price: '$5.99' },
          { value: 'express',  label: 'Express Shipping',  sub: '2–3 business days', price: '$14.99' },
        ].map(opt => (
          <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem', border: `2px solid ${data.shipping === opt.value ? 'var(--warm-tan)' : 'var(--light-gray)'}`, borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem', background: data.shipping === opt.value ? 'rgba(200,132,58,0.05)' : '#fff' }}>
            <input type="radio" name="shipping" value={opt.value} checked={data.shipping === opt.value} onChange={() => onChange('shipping', opt.value)} style={{ accentColor: 'var(--warm-tan)' }} />
            <span style={{ flex: 1 }}>
              <strong style={{ display: 'block', fontFamily: 'var(--font-display)' }}>{opt.label}</strong>
              <span style={{ fontSize: '0.85rem', color: 'rgba(10,10,10,0.55)' }}>{opt.sub}</span>
            </span>
            <strong>{opt.price}</strong>
          </label>
        ))}
      </div>

      <button
        className="btn btn--tan btn--lg"
        style={{ width: '100%', justifyContent: 'center' }}
        onClick={() => { if (validate()) onContinue(); }}
      >
        Continue to Payment →
      </button>
    </div>
  )
}

function PaymentForm({ onBack, onPlace, loading }) {
  const [card, setCard] = useState({ name: '', number: '', exp: '', cvv: '' })
  const [errors, setErrors] = useState({})

  const formatCard   = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  const formatExp    = v => { const d = v.replace(/\D/g,'').slice(0,4); return d.length > 2 ? d.slice(0,2)+'/'+d.slice(2) : d }

  const validate = () => {
    const errs = {}
    if (card.number.replace(/\s/g,'') !== '4242424242424242') errs.number = 'Use test card: 4242 4242 4242 4242'
    if (!card.name.trim())  errs.name = 'Required'
    if (!card.exp.trim())   errs.exp  = 'Required'
    if (!card.cvv.trim())   errs.cvv  = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  return (
    <div>
      <div className="checkout-section">
        <h3>💳 Payment Details</h3>
        <div className="test-card-hint">
          <span>🧪</span>
          <span><strong>Test mode:</strong> Use card <strong>4242 4242 4242 4242</strong>, any future expiry, any 3-digit CVV.</span>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="card-name">Name on Card</label>
          <input className={`form-input${errors.name ? ' error' : ''}`} id="card-name" type="text" placeholder="Jane Smith" autoComplete="cc-name"
            value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} />
        </div>

        <div className="form-group">
          <div className="card-icons">💳 🔒</div>
          <label className="form-label" htmlFor="card-number">Card Number</label>
          <input className={`form-input${errors.number ? ' error' : ''}`} id="card-number" type="text" maxLength={19} inputMode="numeric" autoComplete="cc-number"
            value={card.number} onChange={e => setCard(c => ({ ...c, number: formatCard(e.target.value) }))} placeholder="4242 4242 4242 4242" />
          {errors.number && <p className="form-hint error">{errors.number}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="card-exp">Expiry</label>
            <input className={`form-input${errors.exp ? ' error' : ''}`} id="card-exp" type="text" maxLength={5} inputMode="numeric" autoComplete="cc-exp"
              value={card.exp} onChange={e => setCard(c => ({ ...c, exp: formatExp(e.target.value) }))} placeholder="MM/YY" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="card-cvv">CVV</label>
            <input className={`form-input${errors.cvv ? ' error' : ''}`} id="card-cvv" type="text" maxLength={4} inputMode="numeric" autoComplete="cc-csc"
              value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g,'').slice(0,4) }))} placeholder="123" />
          </div>
        </div>

        <div className="security-note">🔒 This is a demo store. No real charges are made.</div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button className="btn btn--outline-black" style={{ flex: 1, justifyContent: 'center' }} onClick={onBack}>← Back</button>
        <button className="btn btn--tan btn--lg" style={{ flex: 2, justifyContent: 'center' }} disabled={loading}
          onClick={() => { if (validate()) onPlace() }}>
          {loading ? 'Processing…' : 'Place Order →'}
        </button>
      </div>
    </div>
  )
}

function OrderSummary({ cart, cartTotal }) {
  const shipping = cartTotal > 0 ? 5.99 : 0
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      {cart.length === 0
        ? <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Your cart is empty. Go add something!</p>
        : cart.map(item => (
          <div className="order-line" key={item.id}>
            <span>{item.name} × {item.qty}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))
      }
      <div className="order-line" style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="order-line order-line--total">
        <span>Total</span>
        <span>${(cartTotal + shipping).toFixed(2)}</span>
      </div>
      <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
          🐾 A portion of every sale supports the<br />
          <a href="https://www.anticruelty.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal)' }}>
            Anti-Cruelty Society of Chicago
          </a>
        </p>
      </div>
    </div>
  )
}

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const { showToast } = useToast()
  const [step, setStep]       = useState(1)
  const [shipping, setShipping] = useState({ shipping: 'standard' })
  const [loading, setLoading]   = useState(false)
  const [orderNum, setOrderNum] = useState('')

  useEffect(() => {
    document.title = 'Checkout — Dan Dog Does Things'
    return () => { document.title = 'Dan Dog Does Things' }
  }, [])

  const updateShipping = (key, val) => setShipping(s => ({ ...s, [key]: val }))

  const placeOrder = () => {
    setLoading(true)
    setTimeout(() => {
      const num = 'DAN-' + Math.floor(100000 + Math.random() * 900000)
      setOrderNum(num)
      clearCart()
      setStep(3)
      setLoading(false)
    }, 1400)
  }

  return (
    <div className="checkout-page">
      <div className="container" style={{ maxWidth: 1000 }}>
        <Link to="/store" className="back-link">← Back to Store</Link>
        <StepsBar current={step} />

        {step === 3 ? (
          /* Confirmation */
          <div className="confirmation">
            <div className="confirmation__icon">🐾</div>
            <h1 style={{ color: 'var(--teal)' }}>Order Confirmed.</h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(10,10,10,0.6)' }}>
              Dan has acknowledged your purchase from the couch. He did not get up, but his ears moved.
              That means a lot.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--mid-gray)' }}>
              Order number: <strong style={{ color: 'var(--jet-black)' }}>{orderNum}</strong>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem' }}>
              <Link to="/store"  className="btn btn--tan btn--lg">Keep Shopping →</Link>
              <Link to="/"       className="btn btn--outline-black btn--lg">Back Home</Link>
            </div>
            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(58,158,143,0.08)', border: '2px solid rgba(58,158,143,0.25)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ color: 'var(--teal)', fontWeight: 700, fontSize: '0.9rem' }}>🐾 Your purchase matters beyond Dan's couch.</p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(10,10,10,0.6)', marginTop: '0.4rem' }}>
                A portion of every sale goes to the Anti-Cruelty Society of Chicago, where Dan began his journey.
              </p>
              <a href="https://www.anticruelty.org" target="_blank" rel="noopener noreferrer" className="btn btn--teal btn--sm" style={{ marginTop: '1rem' }}>
                Donate to Anti-Cruelty →
              </a>
            </div>
          </div>
        ) : (
          <div className="checkout-layout">
            <div>
              {step === 1 && (
                <ShippingForm data={shipping} onChange={updateShipping} onContinue={() => setStep(2)} />
              )}
              {step === 2 && (
                <PaymentForm onBack={() => setStep(1)} onPlace={placeOrder} loading={loading} />
              )}
            </div>
            <OrderSummary cart={cart} cartTotal={cartTotal} />
          </div>
        )}
      </div>
    </div>
  )
}
