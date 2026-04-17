import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import amplitude from '../amplitude.js'

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', newPassword: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }
    if (form.newPassword !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      await resetPassword({ email: form.email, newPassword: form.newPassword })
      amplitude.track('Password Reset Completed')
      showToast('Password reset. Sign in with your new one 🔑')
      navigate('/signin', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__eyebrow">Forgot It?</div>
        <h1 className="auth-card__title">Reset Password</h1>
        <p className="auth-card__subtitle">Happens to everyone. Dan forgot his own name once.</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">⚠️ {error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="email">Account Email</label>
            <input
              className="form-input" id="email" type="email" autoComplete="email"
              placeholder="you@example.com" required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newPassword">New Password</label>
            <input
              className="form-input" id="newPassword" type="password" autoComplete="new-password"
              placeholder="At least 6 characters" required minLength={6}
              value={form.newPassword}
              onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirm">Confirm New Password</label>
            <input
              className="form-input" id="confirm" type="password" autoComplete="new-password"
              required
              value={form.confirm}
              onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
            />
          </div>

          <button type="submit" className="btn btn--tan btn--lg" disabled={loading}
            style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Resetting…' : 'Reset Password →'}
          </button>

          <p className="auth-demo-note">
            🧪 In this demo, there&apos;s no confirmation email — the reset happens immediately
            if the email is registered on this device.
          </p>

          <div className="auth-links">
            <Link to="/signin">← Back to sign in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
