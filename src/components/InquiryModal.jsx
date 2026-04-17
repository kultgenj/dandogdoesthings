import { useState, useEffect } from 'react'
import amplitude from '../amplitude.js'

/**
 * Inquiry modal for service/collaboration requests.
 * Props:
 *   service — an object with { title, tagline } while open, or null when closed
 *   onClose — callback to close the modal
 */
export default function InquiryModal({ service, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', org: '', message: '' })

  // Reset state whenever the modal opens for a new service
  useEffect(() => {
    if (service) {
      setSubmitted(false)
      setForm({ name: '', email: '', org: '', message: '' })
    }
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
    amplitude.track('Lead Submitted', {
      service_type: service?.id,
      has_organization: form.org.trim().length > 0,
    })
    setSubmitted(true)
    setTimeout(onClose, 3500)
  }

  if (!service) return null

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
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
