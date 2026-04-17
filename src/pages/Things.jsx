import { Link } from 'react-router-dom'
import ImgSlot from '../components/ImgSlot'
import InstagramFeed from '../components/InstagramFeed'
import { trackClick } from '../amplitude.js'

function ChaosMeter({ value }) {
  return (
    <div className="chaos-meter">
      <span className="chaos-meter__label">Chaos Level</span>
      <div className="chaos-meter__bar">
        <div className="chaos-meter__fill" style={{ width: `${value}%` }} />
      </div>
      <span className="chaos-meter__value">{(value / 10).toFixed(1)} / 10</span>
    </div>
  )
}

export default function Things() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="things-hero">
        <div className="container">
          <span className="section-eyebrow" style={{ color: 'var(--warm-tan)' }}>The Full Dossier</span>
          <h1>The <span>Things</span><br />Dan Does</h1>
          <p>
            A serious, documented account of Dan's activities. Compiled by people who have witnessed them.
            Verified by Dan (he was asleep at the time of verification).
          </p>
        </div>
      </section>

      {/* ── THING 01: ZOOMIES ─────────────────────────────── */}
      <section className="thing-block">
        <div className="container">
          <div className="thing-layout">
            <div>
              <img
                src="/images/dan-screaming-skyline.jpg"
                alt="Dan with mouth open, city skyline at sunset behind him"
                loading="lazy"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 'var(--radius-md)', display: 'block' }}
              />
            </div>
            <div>
              <span className="thing-number">01</span>
              <span className="section-eyebrow">Zoomies &amp; Running</span>
              <h2>He Runs.<br />No One Knows Why.</h2>
              <ChaosMeter value={95} />
              <div className="thing-tags">
                <span className="tag tag--tan">Lakefront Regular</span>
                <span className="tag">5:47am Specialist</span>
                <span className="tag">Full Send</span>
              </div>
              <p>Dan is an athlete. This is not a metaphor. He logs serious miles on the lakefront path, maintains a pace that causes joggers to reconsider their life choices, and finishes each run by gazing out at Lake Michigan with the composure of a man who has just solved something.</p>
              <p>He also does zoomies. The zoomies are different. The zoomies have no explanation, no warning, and no finish line. Dan simply decides it is time to move at full speed in a large oval and that is what happens. There will be noise. There will be debris.</p>
              <p>He is sorry about your flower pot. He is not sorry in a way that suggests he will stop.</p>
              <Link to="/gallery" className="btn btn--tan" style={{ marginTop: '0.5rem' }}>See the Action Shots →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── THING 02: NAPPING ─────────────────────────────── */}
      <section className="thing-block section--light">
        <div className="container">
          <div className="thing-layout" style={{ direction: 'rtl' }}>
            <div style={{ direction: 'ltr' }}>
              <img
                src="/images/dan-couch-lounging.jpg"
                alt="Dan lounging on the teal couch — aristocratic posture"
                loading="lazy"
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 'var(--radius-md)', display: 'block' }}
              />
            </div>
            <div style={{ direction: 'ltr' }}>
              <span className="thing-number">02</span>
              <span className="section-eyebrow">Napping in Specific Spots</span>
              <h2>A Careful Man.<br />About His Rest.</h2>
              <ChaosMeter value={5} />
              <div className="thing-tags">
                <span className="tag tag--teal">Teal Couch Certified</span>
                <span className="tag">Patch of Sun Expert</span>
                <span className="tag">Strategic Napper</span>
              </div>
              <p>Dan does not nap randomly. Dan naps with intention. There is the Teal Couch, which is his primary operations headquarters. There is the Patch of Afternoon Sun on the left side of the living room, available approximately 2:15 to 4:40pm. And there is The Corner, purpose and coordinates classified.</p>
              <p>He has been known to spend up to eleven minutes evaluating his nap location before committing. This is not indecision. This is precision.</p>
              <p>He will be fully asleep in four seconds. He will continue to be asleep through anything you need.</p>
              <Link to="/store" className="btn btn--outline-black" style={{ marginTop: '0.5rem' }}>Shop Couch Ops Merch →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── THING 03: ADVENTURES ──────────────────────────── */}
      <section className="thing-block">
        <div className="container">
          <div className="thing-layout">
            <div>
              <img
                src="/images/dan-rugged-beach.jpg"
                alt="Dan at the beach — adventures mode"
                loading="lazy"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 'var(--radius-md)', display: 'block' }}
              />
            </div>
            <div>
              <span className="thing-number">03</span>
              <span className="section-eyebrow">Adventures &amp; Travel</span>
              <h2>He Goes Places.<br />He Thinks About Them.</h2>
              <ChaosMeter value={40} />
              <div className="thing-tags">
                <span className="tag tag--tan">Lake Michigan Devotee</span>
                <span className="tag">Horizon Watcher</span>
                <span className="tag">Beach Intellectual</span>
              </div>
              <p>Dan travels. He has stood at the edge of Lake Michigan and stared into the middle distance for long enough that people began to worry. He was fine. He was processing. Something about the size of the water and the smallness of things. He will not be elaborating further.</p>
              <p>He has also been to the Amplitude office, which he found acceptable. The signage was good. He sat in front of it for a photograph with the energy of someone accepting an award they feel they have long deserved.</p>
              <p>Every beach, every trail, every new smell: absorbed fully, filed, referenced later at unexpected moments.</p>
              <Link to="/gallery" className="btn btn--tan" style={{ marginTop: '0.5rem', background: 'var(--lake-blue)', borderColor: 'var(--lake-blue)' }}>See Adventure Photos →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM: LIVE FROM THE FIELD ────────────────── */}
      <section className="section section--dark">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">Live From Instagram</span>
            <h2 style={{ color: '#fff' }}>The Current Broadcast</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 520, marginInline: 'auto', marginTop: '0.75rem' }}>
              Dan posts. Dan performs. Dan does not explain himself. Updates in real time.
            </p>
          </div>

          <InstagramFeed />

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a
              href="https://www.instagram.com/dandogdoesthings/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--tan btn--lg"
              onClick={trackClick('Instagram Follow Clicked', { source_page: 'things' })}
            >
              📸 Follow @dandogdoesthings →
            </a>
          </div>
        </div>
      </section>

      {/* ── THING 04: COUCH OPS ───────────────────────────── */}
      <section className="thing-block section--light">
        <div className="container">
          <div className="thing-layout" style={{ direction: 'rtl' }}>
            <div style={{ direction: 'ltr' }}>
              <img
                src="/images/dan-flannel.jpg"
                alt="Dan wearing a red flannel shirt with profound dignity"
                loading="lazy"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 'var(--radius-md)', display: 'block' }}
              />
            </div>
            <div style={{ direction: 'ltr' }}>
              <span className="thing-number">04</span>
              <span className="section-eyebrow">Couch Takeover Operations</span>
              <h2>The Couch<br />Is His Office.</h2>
              <ChaosMeter value={20} />
              <div className="thing-tags">
                <span className="tag">Flannel Era Veteran</span>
                <span className="tag">Operations Director</span>
                <span className="tag tag--tan">CEO of Couch</span>
              </div>
              <p>The red flannel era was a pivotal period in Dan's development. He wore it once, indoors, during what sources describe as a period of "profound domestic authority." He sat with the bearing of a man reviewing quarterly reports he had already approved.</p>
              <p>His couch operations are ongoing. He manages them with quiet efficiency: advance to a new position, hold it, consolidate all blanket resources, sleep. Repeat until the couch is no longer recognizable as shared space.</p>
              <p>This is not aggression. This is governance.</p>
              <Link to="/store" className="btn btn--tan" style={{ marginTop: '0.5rem' }}>Flannel Era Sticker Pack →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNALIST ERA ────────────────────────────────── */}
      <section className="thing-block section--dark">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">Bonus: The Journalist Era</span>
            <h2 style={{ color: '#fff' }}>Dan Covered<br />the Chicago River.</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 520, marginInline: 'auto', marginTop: '0.75rem' }}>
              Multiple angles. Sustained presence. No comment given. Dan was on assignment and he took it seriously.
            </p>
          </div>
          {/* Dan's actual 6-panel river coverage */}
          <div style={{ maxWidth: 720, marginInline: 'auto' }}>
            <img
              src="/images/dan-chicago-river.jpg"
              alt="Dan covering the Chicago River from six different angles"
              loading="lazy"
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', display: 'block', boxShadow: 'var(--shadow-heavy)' }}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', fontSize: '0.95rem' }}>
              "The river was doing something. Dan noted it. He will be returning."
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────── */}
      <section className="section--tight">
        <div className="container">
          <div style={{ background: 'var(--jet-black)', borderRadius: 'var(--radius-lg)', padding: 'clamp(2.5rem,5vw,4rem)', textAlign: 'center', color: '#fff' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🐾</span>
            <h2 style={{ color: '#fff', marginBottom: '0.75rem' }}>All of This Is Available<br />As Merchandise.</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480, marginInline: 'auto', marginBottom: '2rem' }}>
              The chaos. The dignity. The flannel era. All of it, captured in high-quality goods designed for people who understand Dan.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/store"   className="btn btn--tan btn--lg">Shop the Store →</Link>
              <Link to="/gallery" className="btn btn--outline-white btn--lg">View the Gallery</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
