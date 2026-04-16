import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ImgSlot from '../components/ImgSlot'

const GOOGLE_PHOTOS_URL = 'https://photos.google.com/share/AF1QipMH1lnWgJkZH2FUZxeIUPZYhmTMzo7WVZ1KntczVqmikEa_LRVuFXdV3xljwZVTfA?key=ellDVFdVQjJqMERRY05xT2JMcnhiUzlLV05JbWxR'

const PHOTOS = [
  // Chicago
  { id:  1, src: '/images/dan-grinning-skyline.jpg',     alt: 'Dan grinning with the Chicago skyline across Lake Michigan', category: 'chicago',    size: 'wide'   },
  { id:  2, src: '/images/dan-full-cityscape.jpg',       alt: 'Dan with the full Chicago cityscape',                         category: 'chicago',    size: 'normal' },
  { id:  3, src: '/images/dan-mouth-cityscape.jpg',      alt: 'Dan, mouth open, Chicago skyline behind',                     category: 'chicago',    size: 'normal' },
  { id:  4, src: '/images/dan-chicago-river.jpg',        alt: 'Dan covering the Chicago River — six angles',                 category: 'chicago',    size: 'wide'   },
  { id:  5, src: '/images/night-dan.jpg',                alt: 'Dan at night',                                                category: 'chicago',    size: 'normal' },

  // Zoomies & chaos
  { id:  6, src: '/images/dan-screaming-skyline.jpg',    alt: 'Dan screaming at the sky — sunset Chicago behind',            category: 'zoomies',    size: 'tall'   },
  { id:  7, src: '/images/dan-mouth-open-lakefront.jpg', alt: 'Dan with maximum mouth open at the lakefront',                category: 'zoomies',    size: 'normal' },
  { id:  8, src: '/images/dan-balloon.jpg',              alt: 'Dan with a balloon — chaos unit deployed',                    category: 'chaos',      size: 'normal' },
  { id:  9, src: '/images/dan-bath.jpg',                 alt: 'Dan during bath time — chaos mode tempered',                  category: 'chaos',      size: 'normal' },

  // Adventures
  { id: 10, src: '/images/dan-on-beach-gazing.jpg',      alt: 'Dan on the beach gazing at the horizon — stoic mode',         category: 'adventures', size: 'normal' },
  { id: 11, src: '/images/dan-rugged-beach.jpg',         alt: 'Dan at a rugged beach — windswept',                           category: 'adventures', size: 'normal' },
  { id: 12, src: '/images/dan-field.jpg',                alt: 'Dan in a field',                                              category: 'adventures', size: 'wide'   },
  { id: 13, src: '/images/dan-park.jpg',                 alt: 'Dan at the park',                                             category: 'adventures', size: 'normal' },
  { id: 14, src: '/images/dan-amplitude-sign.jpg',       alt: 'Dan in front of the Amplitude sign',                          category: 'adventures', size: 'normal' },
  { id: 15, src: '/images/dan-pumpkin.jpg',              alt: 'Dan with a pumpkin — seasonal operations',                    category: 'adventures', size: 'normal' },
  { id: 16, src: '/images/dan-snow.jpg',                 alt: 'Dan in the snow',                                             category: 'adventures', size: 'normal' },
  { id: 17, src: '/images/dan-standing.jpg',             alt: 'Dan standing — distinguished portrait',                       category: 'adventures', size: 'normal' },

  // Couch ops
  { id: 18, src: '/images/dan-couch-lounging.jpg',       alt: 'Dan on the teal couch with aristocratic posture',             category: 'couch',      size: 'normal' },
  { id: 19, src: '/images/dan-flannel.jpg',              alt: 'Dan in red flannel — profound indoor dignity',                category: 'couch',      size: 'tall'   },
  { id: 20, src: '/images/dan-xmas.jpg',                 alt: 'Dan at Christmas — indoor holiday mode',                      category: 'couch',      size: 'normal' },
]

const CATEGORIES = [
  { key: 'all',        label: 'All Photos' },
  { key: 'chicago',    label: '🌆 Chicago' },
  { key: 'adventures', label: '🗺️ Adventures' },
  { key: 'zoomies',    label: '💨 Zoomies' },
  { key: 'chaos',      label: '🌀 Chaos Mode' },
  { key: 'couch',      label: '🛋️ Couch Ops' },
]

function Lightbox({ photos, index, onClose, onNav }) {
  const photo = photos[index]

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onNav(-1)
      if (e.key === 'ArrowRight') onNav(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNav])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!photo) return null

  return (
    <div className="lightbox open">
      <div className="lightbox__overlay" onClick={onClose} />
      <div className="lightbox__inner">
        <button className="lightbox__close" onClick={onClose} aria-label="Close lightbox">✕</button>
        <button className="lightbox__prev" onClick={() => onNav(-1)} aria-label="Previous photo">‹</button>
        <div className="lightbox__content">
          {photo.src
            ? <img src={photo.src} alt={photo.alt} />
            : <ImgSlot alt={photo.alt} variant={`img-slot--landscape img-slot--${photo.color}`} style={{ maxWidth: 600, maxHeight: 480, margin: 'auto' }} />
          }
        </div>
        <button className="lightbox__next" onClick={() => onNav(1)} aria-label="Next photo">›</button>
        <div className="lightbox__caption">{photo.alt}</div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = activeCategory === 'all' ? PHOTOS : PHOTOS.filter(p => p.category === activeCategory)

  const openLightbox  = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const navLightbox   = useCallback((dir) => {
    setLightboxIndex(i => (i + dir + filtered.length) % filtered.length)
  }, [filtered.length])

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--jet-black)', color: '#fff', paddingBlock: 'clamp(3.5rem,7vw,5.5rem)', textAlign: 'center' }}>
        <div className="container">
          <span className="section-eyebrow" style={{ color: 'var(--warm-tan)' }}>The Full Archive</span>
          <h1>Dan in <span style={{ color: 'var(--warm-tan)' }}>Photos</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 520, marginInline: 'auto', marginTop: '0.75rem' }}>
            A visual record of Dan's activities. Curated, categorized, and presented with the seriousness they deserve.
          </p>
        </div>
      </section>

      {/* ── GALLERY GRID ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="filter-bar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`gallery-filter-btn${activeCategory === cat.key ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div id="gallery-grid">
            {filtered.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--mid-gray)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐾</div>
                <p>No photos in this category yet. Dan is working on it.</p>
              </div>
            ) : (
              filtered.map((photo, i) => (
                <div
                  key={photo.id}
                  className={`gallery-item${photo.size === 'wide' ? ' gallery-item--wide' : ''}${photo.size === 'tall' ? ' gallery-item--tall' : ''}`}
                  onClick={() => openLightbox(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && openLightbox(i)}
                  aria-label={`View photo: ${photo.alt}`}
                >
                  <ImgSlot
                    src={photo.src}
                    alt={photo.alt}
                    variant={`img-slot--${photo.color}`}
                    style={{ width: '100%', height: '100%', borderRadius: 0 }}
                  />
                </div>
              ))
            )}
          </div>

          {/* Owner guide */}
          <div style={{ background: 'rgba(200,132,58,0.06)', border: '2px dashed rgba(200,132,58,0.3)', borderRadius: 'var(--radius-md)', padding: '2rem', marginTop: '3rem', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--warm-tan)', marginBottom: '0.75rem' }}>📸 Adding Real Photos</h3>
            <p style={{ color: 'rgba(10,10,10,0.55)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Open <code style={{ background: 'var(--light-gray)', padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.82rem', color: 'var(--amber-brown)' }}>src/pages/Gallery.jsx</code> and
              update each entry's <code style={{ background: 'var(--light-gray)', padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.82rem', color: 'var(--amber-brown)' }}>src</code> field
              with the real image path — e.g. <code style={{ background: 'var(--light-gray)', padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.82rem', color: 'var(--amber-brown)' }}>src: '/images/gallery/chicago-skyline.jpg'</code>.
              Place photos in <code style={{ background: 'var(--light-gray)', padding: '0.15rem 0.4rem', borderRadius: 4, fontSize: '0.82rem', color: 'var(--amber-brown)' }}>public/images/gallery/</code>.
              The <code>alt</code> text tells you exactly which photo goes where.
            </p>
          </div>
        </div>
      </section>

      {/* ── GOOGLE PHOTOS ALBUM ───────────────────────────── */}
      <section className="section--tight">
        <div className="container">
          <div style={{ background: 'var(--jet-black)', borderRadius: 'var(--radius-lg)', padding: 'clamp(2.5rem,5vw,4rem)', textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
            <h2 style={{ color: '#fff', marginBottom: '0.75rem' }}>The Full Google Photos Album</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 520, marginInline: 'auto', marginBottom: '2rem' }}>
              Every photo, every angle, every moment Dan has allowed to be documented. The complete archive.
            </p>
            <a href={GOOGLE_PHOTOS_URL} target="_blank" rel="noopener noreferrer" className="btn btn--tan btn--lg">
              Open Full Album →
            </a>
            <p style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)' }}>
              Opens in Google Photos. Dan did not take these photos but he reviewed them.
            </p>
          </div>
        </div>
      </section>

      {/* ── CATEGORY CARDS ────────────────────────────────── */}
      <section className="section section--light">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">By Category</span>
            <h2>Every Chapter,<br />Documented</h2>
          </div>
          <div className="grid-3">
            {[
              { cat: 'chicago',    label: '🌆 Chicago',       heading: 'The City',        desc: "Dan is a Chicago dog. The skyline, the river, the lake. He documents it all.",                                         color: 'blue'  },
              { cat: 'zoomies',   label: '💨 Zoomies',       heading: 'The Running',     desc: "The lakefront. The scream. The oval. Documented in real time by people who tried to keep up.",                        color: 'black' },
              { cat: 'couch',     label: '🛋️ Couch Ops',     heading: 'Headquarters',   desc: "The teal couch. The red flannel. The aristocratic posture. The governance of soft surfaces.",                       color: 'teal'  },
            ].map(c => (
              <div className="card" key={c.cat} style={{ cursor: 'pointer' }} onClick={() => { setActiveCategory(c.cat); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
                <ImgSlot alt={`${c.heading} photos`} variant={`img-slot--landscape img-slot--${c.color}`} style={{ borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }} />
                <div className="card__body">
                  <div className="card__tag">{c.label}</div>
                  <h4>{c.heading}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(10,10,10,0.55)' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNav={navLightbox}
        />
      )}
    </>
  )
}
