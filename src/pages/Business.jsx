import { useState } from 'react'
import { Link } from 'react-router-dom'
import InquiryModal from '../components/InquiryModal'
import amplitude from '../amplitude.js'

const SERVICES = [
  {
    id: 'instagram',
    icon: '📱',
    title: 'Instagram Collaborations',
    tagline: '"Dan has reach. Let\'s talk."',
    desc: "Dan maintains a dignified and occasionally unhinged social presence. His audience understands him. If your brand also understands him — or wants to — he is open to a conversation. He will stare at the product first. Then decide.",
    cta: 'Get in Touch →',
    deliverables: ['Feed post with product', 'Story set (3–5 frames)', 'Reels appearance', 'Optional: behind-the-scenes content'],
  },
  {
    id: 'appearances',
    icon: '🎤',
    title: 'Public Appearances',
    tagline: '"He will show up. He will be calm. Then he won\'t be."',
    desc: "Dan is available for events, openings, corporate wellness walks, lakefront press junkets, and occasions that call for a distinguished black and tan presence. He will bring gravitas. He may also bring zoomies. Both are part of the package.",
    cta: 'Book Dan →',
    deliverables: ['In-person attendance', 'Photo op windows', 'Handler included', 'Custom content from the event'],
  },
  {
    id: 'consulting',
    icon: '📊',
    title: 'Canine Social Media Management Consulting',
    tagline: '"Years of experience. Zero regrets."',
    desc: "Dan has studied the algorithm from the inside. He knows what performs (grinning at skylines), what doesn't (explaining yourself), and how to build an audience that genuinely does not know what you're going to do next. That is the brand. That is the strategy.",
    cta: 'Inquire →',
    deliverables: ['Strategy session (90 min)', 'Content audit', 'Posting cadence recommendations', 'Tone-of-voice framework'],
  },
]

const PROCESS_STEPS = [
  { num: '01', title: 'You Reach Out', desc: 'Tell Dan what you\'re thinking. The inquiry form routes straight to the couch.' },
  { num: '02', title: 'Dan Reviews',   desc: 'From the couch. Possibly with his eyes closed. He will consider.' },
  { num: '03', title: 'We Respond',    desc: 'A human will get back to you within a few days with terms, availability, and next steps.' },
  { num: '04', title: 'We Proceed',    desc: 'Timeline locked, scope agreed, Dan notified. He will arrive prepared. Or at least present.' },
]

export default function Business() {
  const [activeService, setActiveService] = useState(null)

  const openInquiry = (service) => {
    amplitude.track('Lead Form Started', {
      service_type: service.id,
      source_page: 'business',
    })
    setActiveService(service)
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--jet-black)', color: '#fff', paddingBlock: 'clamp(4rem,8vw,6.5rem)', textAlign: 'center' }}>
        <div className="container">
          <span className="section-eyebrow" style={{ color: 'var(--warm-tan)' }}>Dan Means Business</span>
          <h1>Let's <span style={{ color: 'var(--warm-tan)' }}>Collaborate.</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 620, marginInline: 'auto', marginTop: '1rem', fontSize: 'clamp(1rem,1.8vw,1.2rem)' }}>
            Dan has a platform. Dan takes it seriously. He is open to select professional engagements —
            brand collaborations, public appearances, consulting on matters of canine social strategy.
            All inquiries reviewed from the couch.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem' }}>
            <a href="#services" className="btn btn--tan btn--lg">See Services →</a>
            <a href="#process" className="btn btn--outline-white btn--lg">How It Works</a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────── */}
      <section className="section" id="services">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-eyebrow">Services</span>
            <h2>What Dan Offers</h2>
            <p className="section-intro" style={{ marginInline: 'auto', marginTop: '0.75rem' }}>
              Three core engagements. Each with clear deliverables. All subject to Dan's approval, which is usually given but not always given quickly.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map(s => (
              <div className="service-card" key={s.id}>
                <div className="service-card__icon">{s.icon}</div>
                <div className="service-card__title">{s.title}</div>
                <div className="service-card__tagline">{s.tagline}</div>
                <p>{s.desc}</p>

                <ul style={{ marginTop: '1rem', padding: 0 }}>
                  {s.deliverables.map(d => (
                    <li key={d} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--warm-tan)' }}>✓</span> {d}
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn--tan"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '1.25rem' }}
                  onClick={() => openInquiry(s)}
                >
                  {s.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className="section section--light" id="process">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">The Process</span>
            <h2>How Working With Dan<br />Actually Works</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem' }}>
            {PROCESS_STEPS.map(step => (
              <div key={step.num} style={{ background: '#fff', padding: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', borderTop: '4px solid var(--warm-tan)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.5rem', color: 'rgba(200,132,58,0.25)', lineHeight: 1, marginBottom: '0.5rem' }}>
                  {step.num}
                </div>
                <h4 style={{ marginBottom: '0.5rem' }}>{step.title}</h4>
                <p style={{ color: 'rgba(10,10,10,0.6)', fontSize: '0.92rem', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ / NOTES ───────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ maxWidth: 780, marginInline: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">The Fine Print</span>
            <h2>Things To Know</h2>
          </div>

          {[
            { q: 'Is Dan expensive?', a: "Rates are reasonable and scale with scope. Tell us your situation and we'll find a fit. Dan is not operating at Baller Dog Rates. He is operating at Good Dog Rates." },
            { q: 'Where does Dan travel?', a: "Chicago and surrounding areas by default. Further afield negotiable — he has thoughts about other cities but has not yet verified them in person." },
            { q: 'What if it goes wrong?', a: "It won't. But if Dan experiences a zoomies incident at your event, we will handle it with professionalism and a towel. He recovers fast." },
            { q: 'Turnaround time on inquiries?', a: "Usually a few business days. Dan does not work weekends. Dan does not really work weekdays either, but his humans do." },
          ].map(item => (
            <div key={item.q} style={{ background: '#fff', padding: '1.5rem 1.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', boxShadow: 'var(--shadow-card)' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--warm-tan)' }}>{item.q}</h4>
              <p style={{ color: 'rgba(10,10,10,0.7)', fontSize: '0.95rem', lineHeight: 1.7 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────── */}
      <section className="section--tight">
        <div className="container">
          <div style={{ background: 'var(--warm-tan)', borderRadius: 'var(--radius-lg)', padding: 'clamp(2.5rem,5vw,4rem)', textAlign: 'center', color: '#fff' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🐾</span>
            <h2 style={{ color: '#fff', marginBottom: '0.75rem' }}>Ready When You Are.</h2>
            <p style={{ color: 'rgba(255,255,255,0.88)', maxWidth: 480, marginInline: 'auto', marginBottom: '2rem' }}>
              Send the inquiry. Dan will see it. He may not say so immediately, but he will see it.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn--black btn--lg" onClick={() => openInquiry(SERVICES[0])}>
                Start an Inquiry →
              </button>
              <Link to="/store" className="btn btn--outline-white btn--lg">Or Shop Merch</Link>
            </div>
          </div>
        </div>
      </section>

      <InquiryModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  )
}
