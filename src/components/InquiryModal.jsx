import { useState, useEffect, useRef } from 'react'
import amplitude from '../amplitude.js'
import { product } from '../analytics/schema.js'

/**
 * Inquiry modal for service/collaboration requests.
 * Props:
 *   service — an object with { title, tagline } while open, or null when closed
 *   onClose — callback to close the modal
 */
const PACKAGE_COPY = {
  consulting: ['Canine Consulting', 'Strategy sessions and content guidance'],
  instagram: ['Instagram Collabs', 'Sponsored posts, stories, and reels'],
  appearances: ['Public Appearances', 'Live events, panels, and speaking'],
}

export default function InquiryModal({ service, services = [], variant = 'control', onClose }) {
  const bundled = variant === 'treatment'
  const [selected, setSelected] = useState([])
  const closeTimer = useRef(null)
  const submittedRef = useRef(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' })

  // Reset state whenever the modal opens for a new service
  useEffect(() => {
    if (service) {
      submittedRef.current = false
      setSubmitted(false)
      setSelected([service.id])
      setForm({ name: '', email: '', org: '', message: '' })
    }
    return () => clearTimeout(closeTimer.current)
  }, [service])

  // Escape-to-close
  useEffect(() => {
    if (!service) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [service, onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (submittedRef.current || !service) return
    const packages = bundled ? services.filter(item => selected.includes(item.id)) : [service]
    if (!packages.length) return
    submittedRef.current = true
    amplitude.track('Lead Form Completed', {
      products: packages.map(item => product(item, 'service')),
      source_page: 'business',
      package_count: packages.length,
      has_organization: form.org.trim().length > 0,
    })
    setSubmitted(true)
    closeTimer.current = setTimeout(onClose, 3500)
  }

  if (!service) return null

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className={`modal${bundled ? ' modal--bundled' : ''}`} role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
        <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        <span className="section-eyebrow">{service.title}</span>
        <h3 id="inquiry-title">Get in Touch</h3>
        <p className="subtitle">{service.tagline}</p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {bundled && (
              <fieldset className="inquiry-packages" aria-describedby="package-count">
                <legend>Select all that apply</legend>
                {['consulting', 'instagram', 'appearances'].map(id => {
                  const item = services.find(s => s.id === id)
                  if (!item) return null
                  const checked = selected.includes(id)
                  return (
                    <label className="inquiry-package" key={id}>
                      <input type="checkbox" checked={checked} onChange={() => setSelected(previous =>
                        previous.includes(id) ? previous.filter(value => value !== id) : [...previous, id]
                      )} />
                      {id === 'consulting'
                        ? <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="" width="40" height="40" />
                        : <span className="inquiry-package__icon" aria-hidden="true">{item.icon}</span>}
                      <span className="inquiry-package__copy"><strong>{PACKAGE_COPY[id][0]}</strong><small>{PACKAGE_COPY[id][1]}</small></span>
                      <span className="inquiry-package__status" aria-hidden="true">{checked ? 'Selected' : 'Select'}</span>
                    </label>
                  )
                })}
                <p id="package-count" aria-live="polite">{selected.length} selected · {selected.length ? 'You can choose one or more' : 'Choose at least one package'}</p>
              </fieldset>
            )}
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
              <label className="form-label" htmlFor="inq-message">{bundled ? 'Tell Dan About Your Campaign' : 'Tell Dan About It'}</label>
              <textarea className="form-input" id="inq-message" rows={4}
                placeholder={bundled ? 'Tell us about your campaign goals, audience, timing, and any other details.' : 'What are you thinking? Dan will think about it too.'} required
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            </div>
            <button type="submit" disabled={bundled && !selected.length} className="btn btn--tan" style={{ width: '100%', justifyContent: 'center' }}>
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
