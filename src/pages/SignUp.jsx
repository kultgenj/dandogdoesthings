import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import amplitude from '../amplitude.js'

export default function SignUp() {
  const { signUp } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const signed = await signUp({ name: form.name, email: form.email, password: form.password })
      amplitude.setUserId(signed.id)
      amplitude.track('Sign Up Completed', { signup_method: 'email' })
      showToast(`Welcome to Dan's world, ${form.name.split(' ')[0]} 🐾`)
      navigate('/account', { replace: true })
    } catch (err) {
      amplitude.track('Sign Up Failed', { error_reason: err.message })
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__eyebrow">Join the Pack</div>
        <h1 className="auth-card__title">Create an Account</h1>
        <p className="auth-card__subtitle">Dan will note your arrival. Possibly from the couch.</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">⚠️ {error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="name">Your Name</label>
            <input
              className="form-input" id="name" type="text" autoComplete="name"
              placeholder="Jane Smith" required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-input" id="email" type="email" autoComplete="email"
              placeholder="you@example.com" required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className="form-input" id="password" type="password" autoComplete="new-password"
              placeholder="At least 6 characters" required minLength={6}
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirm">Confirm Password</label>
            <input
              className="form-input" id="confirm" type="password" autoComplete="new-password"
              placeholder="Same thing again" required
              value={form.confirm}
              onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
            />
          </div>

          <button type="submit" className="btn btn--tan btn--lg" disabled={loading}
            style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Creating…' : 'Create Account →'}
          </button>

          <p className="auth-demo-note">
            🧪 Demo accounts: credentials live in your browser only.
            Nothing leaves this device.
          </p>

          <div className="auth-links">
            <span>
              Already have an account? <Link to="/signin">Sign in</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
