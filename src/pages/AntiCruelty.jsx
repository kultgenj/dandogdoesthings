import { Link } from 'react-router-dom'
import ImgSlot from '../components/ImgSlot'

export default function AntiCruelty() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="ac-page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="eyebrow">The Mission</span>
          <h1>Dan Was Rescued.<br />Now He Gives Back.</h1>
          <p className="subtitle">
            Dan started his life at the Anti-Cruelty Society of Chicago — one of the country's oldest and most
            important animal welfare organizations. He didn't stay long. But he never forgot where he came from.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2.5rem' }}>
            <a href="https://www.anticruelty.org" target="_blank" rel="noopener noreferrer" className="btn btn--outline-white btn--lg">
              Donate to Anti-Cruelty →
            </a>
            <Link to="/store" className="btn btn--black btn--lg">Shop — Proceeds Go Here</Link>
          </div>

          <div className="teal-stats">
            {[
              { number: '1899',     label: 'Year Founded' },
              { number: '125+',     label: 'Years of Service' },
              { number: 'Chicago',  label: 'Hometown' },
              { number: '1',        label: 'Very Good Boy Produced' },
            ].map(s => (
              <div className="teal-stat" key={s.label}>
                <span className="teal-stat__number">{s.number}</span>
                <span className="teal-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DAN'S STORY ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2.5rem,6vw,6rem)', alignItems: 'center' }}>
            <div>
              <img
                src="/images/dan-amplitude-sign.jpg"
                alt="Dan in front of the Amplitude sign"
                loading="lazy"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 'var(--radius-md)', display: 'block' }}
              />
            </div>
            <div>
              <span className="section-eyebrow" style={{ color: 'var(--teal)' }}>Dan's Origin Story</span>
              <h2 className="section-title">He Came From<br />Something Good.</h2>
              <div className="divider" style={{ background: 'var(--teal)' }} />
              <p>
                Before the lakefront miles, before the couch operations, before the flannel era — there was the
                Anti-Cruelty Society of Chicago. Dan arrived there as a mystery: black and tan, of unknown origin,
                possessed of both an unsettling calm and a barely-contained physical intensity that would later be
                called "the zoomies."
              </p>
              <div className="teal-quote">
                "I remember very little about that time. I was mostly thinking about the future.
                And also about running. Mostly running."
              </div>
              <p>
                He was adopted. He was brought to Chicago — properly, this time, with a home and a couch and a view
                of the lake. He settled in with the confidence of someone who always knew this is how it would go.
                He has never looked back, except sometimes at the lake, but that's different.
              </p>
              <p>
                The Anti-Cruelty Society made Dan possible. Supporting them is the least Dan can do. He's doing his
                part — with merch, with presence, and with the occasional Instagram post that raises awareness and
                also just shows his face.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE ORG ─────────────────────────────────── */}
      <section className="section section--light">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-eyebrow" style={{ color: 'var(--teal)' }}>The Organization</span>
            <h2>About the Anti-Cruelty<br />Society of Chicago</h2>
            <p className="section-intro" style={{ marginInline: 'auto', marginTop: '0.75rem' }}>
              One of America's oldest animal welfare organizations. Founded in 1899.
              Located in Chicago's River North neighborhood. Dan gives them a two-paw review — five stars.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h3 style={{ color: 'var(--teal)', marginBottom: '1rem' }}>What They Do</h3>
              <p>
                The Anti-Cruelty Society provides shelter, veterinary care, adoption services, humane education,
                and community programs for animals in the Chicago area. They operate one of the most comprehensive
                animal welfare programs in the Midwest.
              </p>
              <p className="mt-1">
                They find homes. They provide care. They run programs that keep pets and families together.
                They have been doing this since before the Cubs won anything significant.
              </p>
              <div className="teal-quote" style={{ marginTop: '2rem' }}>
                "They were good to me. I would like it if more people were good to them. That is my full statement."
                <br />
                <span style={{ fontSize: '0.85rem', color: 'rgba(10,10,10,0.45)', fontStyle: 'normal', fontWeight: 700 }}>— Dan</span>
              </div>
            </div>
            <div>
              <h3 style={{ color: 'var(--teal)', marginBottom: '1rem' }}>How Dan Gives Back</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: '🛍️', title: 'Every Purchase', desc: 'A portion of every Dan Dog Does Things store purchase goes to support the Anti-Cruelty Society directly.' },
                  { icon: '📣', title: 'Awareness', desc: 'Dan uses his platform — such as it is — to tell people about adoption, animal welfare, and why shelters matter.' },
                  { icon: '🏙️', title: 'Living Well in Chicago', desc: 'Dan represents what shelter animals become when given a chance. He is the testimonial. He is the argument.' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <p style={{ fontSize: '0.9rem', color: 'rgba(10,10,10,0.6)', marginTop: '0.25rem' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO HELP ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow" style={{ color: 'var(--teal)' }}>Take Action</span>
            <h2>Three Ways to Help.<br />Dan Approves All Three.</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: '💚', title: 'Donate Directly', desc: "The most direct path. Your money goes to the Anti-Cruelty Society of Chicago. Dan says this is the move. He does not say it in words, but his face communicates it.", cta: 'Donate Now →', href: 'https://www.anticruelty.org' },
              { icon: '🛍️', title: "Shop Dan's Store",  desc: "Buy a tote. Buy a print. Buy an enamel pin depicting Dan on the teal couch in a posture of aristocratic authority. All of it supports the mission.", cta: 'Shop the Store →', to: '/store' },
              { icon: '🐾', title: "Adopt, Don't Shop", desc: "Dan is a shelter dog. He turned out to be an athlete, a philosopher, a journalist, a couch operations director, and a Chicago icon. Go find yours.", cta: 'Find Your Dan →', href: 'https://www.anticruelty.org' },
            ].map(card => (
              <div className="help-card" key={card.title}>
                <span className="help-card__icon">{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                {card.href
                  ? <a href={card.href} target="_blank" rel="noopener noreferrer" className="btn btn--teal" style={{ width: '100%', justifyContent: 'center' }}>{card.cta}</a>
                  : <Link to={card.to} className="btn btn--teal" style={{ width: '100%', justifyContent: 'center' }}>{card.cta}</Link>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DONATE CTA ────────────────────────────────────── */}
      <section className="section--tight">
        <div className="container">
          <div className="donate-cta">
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🐾</span>
            <h2>Every Dog Deserves<br />a Lakefront View.</h2>
            <p>
              Dan got his. He didn't take it for granted — he stands at the edge of Lake Michigan and processes it
              for long periods of time. He wants this for every dog. The Anti-Cruelty Society makes that possible,
              one animal at a time.
            </p>
            <a href="https://www.anticruelty.org" target="_blank" rel="noopener noreferrer" className="btn btn--outline-white btn--lg">
              Donate to Anti-Cruelty Society of Chicago →
            </a>
            <p style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>
              Opens anticruelty.org — Chicago's animal welfare organization since 1899.
            </p>
          </div>
        </div>
      </section>

      {/* ── CLOSING PHOTO ─────────────────────────────────── */}
      <section className="section--tight section--light">
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <img
            src="/images/dan-rugged-beach.jpg"
            alt="Dan at the rugged beach — contemplative closing shot"
            loading="lazy"
            style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '2rem', display: 'block' }}
          />
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.3rem', color: 'rgba(10,10,10,0.65)', lineHeight: 1.6 }}>
            "I look at the lake and I think: there are many dogs out there who have not yet found their lake.
            That is not acceptable to me. I am doing what I can."
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--mid-gray)', marginTop: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            — Dan, probably
          </p>
        </div>
      </section>
    </>
  )
}
