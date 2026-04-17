import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import amplitude from '../amplitude.js'

function ChangePasswordCard() {
  const { changePassword } = useAuth()
  const { showToast } = useToast()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.next.length < 6) { setError('New password must be at least 6 characters.'); return }
    if (form.next !== form.confirm) { setError('New passwords do not match.'); return }
    setLoading(true)
    try {
      await changePassword({ currentPassword: form.current, newPassword: form.next })
      amplitude.track('Password Changed')
      showToast('Password updated 🔑')
      setForm({ current: '', next: '', confirm: '' })
      setOpen(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
      <button className="btn btn--outline-black btn--sm" onClick={() => setOpen(true)}>
        Change Password
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      {error && <div className="auth-error">⚠️ {error}</div>}
      <div className="form-group">
        <label className="form-label">Current Password</label>
        <input className="form-input" type="password" autoComplete="current-password" required
          value={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.value }))} />
      </div>
      <div className="form-group">
        <label className="form-label">New Password</label>
        <input className="form-input" type="password" autoComplete="new-password" required minLength={6}
          value={form.next} onChange={e => setForm(f => ({ ...f, next: e.target.value }))} />
      </div>
      <div className="form-group">
        <label className="form-label">Confirm New Password</label>
        <input className="form-input" type="password" autoComplete="new-password" required
          value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button type="button" className="btn btn--outline-black btn--sm" onClick={() => { setOpen(false); setError('') }}>
          Cancel
        </button>
        <button type="submit" className="btn btn--tan btn--sm" disabled={loading}>
          {loading ? 'Updating…' : 'Update Password'}
        </button>
      </div>
    </form>
  )
}

function OrderCard({ order }) {
  const placed = new Date(order.placedAt)
  const dateStr = placed.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  return (
    <div className="order-card">
      <div className="order-card__header">
        <div>
          <div className="order-card__number">{order.orderNumber}</div>
          <div className="order-card__date">{dateStr}</div>
        </div>
        <div className="order-card__total">${order.total.toFixed(2)}</div>
      </div>
      <ul className="order-card__items">
        {order.items.map(item => (
          <li key={item.id}>
            <span>{item.name} × {item.qty}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Account() {
  const { user, signOut, getOrders } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/signin" state={{ from: '/account' }} replace />

  const orders = getOrders()
  const joined = new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const handleSignOut = () => {
    amplitude.track('Sign Out')
    amplitude.setUserId(undefined)
    signOut()
    showToast('Signed out. Dan noticed. He is unbothered.')
    navigate('/')
  }

  return (
    <div className="account-page">
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="account-header">
          <div>
            <span className="section-eyebrow">Your Account</span>
            <h1>Hi, {user.name.split(' ')[0]}.</h1>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>
              Dan has acknowledged your return. He is not going to make a big deal about it.
            </p>
          </div>
          <button className="btn btn--outline-white" onClick={handleSignOut}>Sign Out</button>
        </div>

        <div className="account-grid">
          {/* Profile card */}
          <div className="account-card">
            <h3>Profile</h3>
            <div className="account-field">
              <span className="account-field__label">Name</span>
              <span className="account-field__value">{user.name}</span>
            </div>
            <div className="account-field">
              <span className="account-field__label">Email</span>
              <span className="account-field__value">{user.email}</span>
            </div>
            <div className="account-field">
              <span className="account-field__label">Member since</span>
              <span className="account-field__value">{joined}</span>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <ChangePasswordCard />
            </div>
          </div>

          {/* Orders card */}
          <div className="account-card">
            <h3>Order History</h3>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--mid-gray)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🛍️</div>
                <p>No orders yet. Dan suggests the Flannel Era Sticker Pack.</p>
                <Link to="/store" className="btn btn--tan btn--sm" style={{ marginTop: '1rem' }}>
                  Browse the Store →
                </Link>
              </div>
            ) : (
              <div className="order-list">
                {orders.map(order => (
                  <OrderCard key={order.orderNumber} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
            🧪 Demo account — data lives only in this browser.
          </p>
        </div>
      </div>
    </div>
  )
}
