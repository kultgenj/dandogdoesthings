import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import amplitude from '../amplitude.js'

const STORAGE_KEY = 'dan-dog-ugc'
const MAX_WIDTH = 1200
const JPEG_QUALITY = 0.85

const CATEGORIES = [
  { value: 'distinguished', label: '🤵 A Distinguished Portrait' },
  { value: 'chaos',         label: '🌀 Full Chaos Mode' },
  { value: 'zoomies',       label: '💨 Zoomies Evidence' },
  { value: 'couch',         label: '🛋️ Couch Ops' },
  { value: 'chicago',       label: '🌆 Chicago Landmark Energy' },
  { value: 'adventure',     label: '🗺️ Adventure Documentation' },
  { value: 'other',         label: '🐾 Something Else Entirely' },
]

const catLabel = (value) => CATEGORIES.find(c => c.value === value)?.label || '🐾 Submission'

function getSubmissions() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') }
  catch { return [] }
}

// Resize + compress on client so localStorage stays under quota
async function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, MAX_WIDTH / img.width)
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY))
      }
      img.onerror = () => reject(new Error('Image could not be loaded'))
      img.src = e.target.result
    }
    reader.onerror = () => reject(new Error('File could not be read'))
    reader.readAsDataURL(file)
  })
}

export default function Wall() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const fileInputRef = useRef(null)

  const [submissions, setSubmissions] = useState(() => getSubmissions())
  const [form, setForm] = useState({
    name: user?.name || '',
    dogName: '',
    caption: '',
    category: 'distinguished',
    imageDataUrl: null,
  })
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  // Prefill name from auth when it becomes available
  useEffect(() => {
    if (user?.name && !form.name) setForm(f => ({ ...f, name: user.name }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError("That doesn't look like an image. Try again.")
      return
    }
    setError('')
    setProcessing(true)
    try {
      const dataUrl = await resizeImage(file)
      setForm(f => ({ ...f, imageDataUrl: dataUrl }))
    } catch {
      setError("Couldn't process that image. Try a different one.")
    } finally {
      setProcessing(false)
    }
  }

  const clearImage = () => {
    setForm(f => ({ ...f, imageDataUrl: null }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.imageDataUrl) { setError('Pick a photo first.'); return }
    if (!form.dogName.trim()) { setError("What's the dog's name?"); return }

    const entry = {
      id: Date.now() + '-' + Math.random().toString(36).slice(2),
      name: form.name.trim() || 'Anonymous Dog Person',
      dogName: form.dogName.trim(),
      caption: form.caption.trim(),
      category: form.category,
      imageDataUrl: form.imageDataUrl,
      submittedAt: new Date().toISOString(),
    }
    const updated = [entry, ...submissions]
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setSubmissions(updated)
      amplitude.track('UGC Submission Created', {
        category: entry.category,
        has_caption: entry.caption.length > 0,
        is_authenticated: !!user,
      })
      setForm({
        name: user?.name || form.name,
        dogName: '',
        caption: '',
        category: 'distinguished',
        imageDataUrl: null,
      })
      if (fileInputRef.current) fileInputRef.current.value = ''
      showToast('Submission received. Dan is reviewing from the couch 🐾')
    } catch {
      setError("Your browser's storage is full. Delete some submissions and try again.")
    }
  }

  const handleDelete = (id) => {
    const updated = submissions.filter(s => s.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setSubmissions(updated)
  }

  const visible = filter === 'all' ? submissions : submissions.filter(s => s.category === filter)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ background: 'var(--jet-black)', color: '#fff', paddingBlock: 'clamp(3.5rem,7vw,5.5rem)', textAlign: 'center' }}>
        <div className="container">
          <span className="section-eyebrow" style={{ color: 'var(--warm-tan)' }}>Open Submissions</span>
          <h1>The <span style={{ color: 'var(--warm-tan)' }}>Wall</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 580, marginInline: 'auto', marginTop: '1rem' }}>
            Dan accepts content. From other dogs. From their people. From the lakefront.
            He will review your submission. He will not provide notes. That is the relationship.
          </p>
        </div>
      </section>

      {/* ── SUBMISSION FORM ───────────────────────────────── */}
      <section className="section" id="submit">
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-eyebrow">Submit Something</span>
            <h2>Your Best Dan-Adjacent Content</h2>
            <p style={{ color: 'rgba(10,10,10,0.6)', marginTop: '0.75rem' }}>
              A distinguished portrait. A chaos incident. Your dog at a Chicago landmark.
              Whatever you've got that meets the standard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="wall-form">
            {error && <div className="auth-error">⚠️ {error}</div>}

            {/* Image uploader */}
            <div className="form-group">
              <label className="form-label">The Photo</label>
              {form.imageDataUrl ? (
                <div className="wall-preview">
                  <img src={form.imageDataUrl} alt="Preview" />
                  <button type="button" className="btn btn--outline-black btn--sm" onClick={clearImage}>
                    Replace Photo
                  </button>
                </div>
              ) : (
                <label className="wall-dropzone" htmlFor="wall-file">
                  <div style={{ fontSize: '2.5rem' }}>📸</div>
                  <strong>{processing ? 'Processing…' : 'Click to pick a photo'}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--mid-gray)' }}>
                    JPG, PNG, HEIC. Auto-resized so it fits.
                  </span>
                  <input
                    ref={fileInputRef}
                    id="wall-file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    disabled={processing}
                  />
                </label>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="wall-dogname">Dog's Name</label>
                <input className="form-input" id="wall-dogname" type="text" placeholder="e.g. Biscuit" required
                  value={form.dogName} onChange={e => setForm(f => ({ ...f, dogName: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="wall-name">Your Name</label>
                <input className="form-input" id="wall-name" type="text" placeholder="Human who took the photo"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="wall-category">Category</label>
              <select className="form-input" id="wall-category"
                value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="wall-caption">Caption (optional)</label>
              <textarea className="form-input" id="wall-caption" rows={3}
                placeholder="Tell Dan what happened here."
                value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} />
            </div>

            <button type="submit" className="btn btn--tan btn--lg"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={processing}>
              🐾 Submit for Dan's Review →
            </button>

            <p className="auth-demo-note" style={{ marginTop: '1.5rem' }}>
              🧪 Demo mode: your submission lives in this browser only.
              A curated public wall is on the list for a future version.
              For now, post a copy on Instagram and tag{' '}
              <a href="https://www.instagram.com/dandogdoesthings/" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--amber-brown)', fontWeight: 700 }}
                onClick={() => amplitude.track('Instagram Follow Clicked', { source_page: 'wall' })}>
                @dandogdoesthings
              </a> — he'll see it.
            </p>
          </form>
        </div>
      </section>

      {/* ── THE WALL ──────────────────────────────────────── */}
      <section className="section section--light">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <span className="section-eyebrow">The Wall</span>
              <h2>Your Submissions</h2>
              <p style={{ color: 'rgba(10,10,10,0.55)', marginTop: '0.5rem' }}>
                {submissions.length === 0
                  ? "Dan's waiting."
                  : `${submissions.length} submission${submissions.length === 1 ? '' : 's'} on this device.`}
              </p>
            </div>
            {submissions.length > 0 && (
              <select className="form-input" style={{ maxWidth: 280 }}
                value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">All categories</option>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            )}
          </div>

          {submissions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'clamp(3rem,6vw,5rem) 1rem', background: '#fff', borderRadius: 'var(--radius-lg)', border: '2px dashed var(--mid-gray)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐾</div>
              <h3>No Evidence Yet.</h3>
              <p style={{ color: 'rgba(10,10,10,0.6)', maxWidth: 420, marginInline: 'auto', marginTop: '0.75rem' }}>
                This is the part where you submit. Dan is waiting. He is patient. He is also maybe asleep.
              </p>
              <a href="#submit" className="btn btn--tan" style={{ marginTop: '1.5rem' }}>Start Submitting →</a>
            </div>
          ) : visible.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--mid-gray)' }}>
              <p>Nothing in that category yet.</p>
            </div>
          ) : (
            <div className="wall-grid">
              {visible.map(sub => (
                <article className="wall-card" key={sub.id}>
                  <img src={sub.imageDataUrl} alt={`${sub.dogName} submission`} loading="lazy" />
                  <div className="wall-card__body">
                    <div className="wall-card__tag">{catLabel(sub.category)}</div>
                    <h4 className="wall-card__dog">{sub.dogName}</h4>
                    {sub.caption && <p className="wall-card__caption">{sub.caption}</p>}
                    <div className="wall-card__meta">
                      <span>Submitted by <strong>{sub.name}</strong></span>
                      <span>{new Date(sub.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <button className="wall-card__delete" onClick={() => handleDelete(sub.id)}
                      aria-label="Delete submission" title="Delete submission">
                      🗑️
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
