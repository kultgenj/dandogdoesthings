import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import amplitude from '../amplitude.js'

export default function SignIn() {
  const { signIn } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const redirectTo = location.state?.from || '/account'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const signed = await signIn(form)
      amplitude.setUserId(signed.id)
      amplitude.track('Sign In Completed', { signin_method: 'email' })
      showToast('Welcome back 🐾')
      navigate(redirectTo, { replace: true })
    } catch (err) {
      amplitude.track('Sign In Failed', { error_reason: err.message })
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__eyebrow">Welcome Back</div>
        <h1 className="auth-card__title">Sign In</h1>
        <p className="auth-card__subtitle">Dan remembers you. (Metaphorically.)</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error">⚠️ {error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-input"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className="form-input"
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
          </div>

          <button type="submit" className="btn btn--tan btn--lg" disabled={loading}
            style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>

          <div className="auth-links">
            <Link to="/reset-password">Forgot password?</Link>
            <span>
              New here? <Link to="/signup">Create an account</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
