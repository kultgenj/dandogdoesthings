import { useEffect } from 'react'

/**
 * Instagram feed powered by Behold.so.
 *
 * ──────────────────────────────────────────────────────────────
 * SETUP (one time):
 *   1. Sign up at https://behold.so and connect @dandogdoesthings
 *   2. Create a widget (pick the "Reel" or "Grid" style)
 *   3. Copy the feed ID from the Install page — it looks like an
 *      alphanumeric string, e.g. "AbCdEfGhI1234"
 *   4. Paste it into BEHOLD_FEED_ID below
 *   5. Save. Commit. Push. Done.
 * ──────────────────────────────────────────────────────────────
 */
const BEHOLD_FEED_ID = ''

export default function InstagramFeed() {
  useEffect(() => {
    if (!BEHOLD_FEED_ID) return
    // Load the Behold widget script once per page
    if (document.querySelector('script[data-behold]')) return
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://w.behold.so/widget.js'
    script.dataset.behold = ''
    document.body.appendChild(script)
  }, [])

  // Not configured yet — show a friendly placeholder
  if (!BEHOLD_FEED_ID) {
    return (
      <div
        style={{
          maxWidth: 720,
          marginInline: 'auto',
          padding: '3rem 2rem',
          background: 'rgba(200,132,58,0.06)',
          border: '2px dashed rgba(200,132,58,0.3)',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
        <h3 style={{ color: 'var(--warm-tan)', marginBottom: '0.75rem' }}>
          Instagram Feed Coming Soon
        </h3>
        <p style={{ color: 'rgba(10,10,10,0.6)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          Once Dan&apos;s Behold widget is connected, his latest Instagram posts will live here.
          In the meantime, follow him directly — he&apos;s posting.
        </p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1000, marginInline: 'auto' }}>
      {/* The custom element will be upgraded by w.behold.so/widget.js on mount */}
      <behold-widget feed-id={BEHOLD_FEED_ID}></behold-widget>
    </div>
  )
}
