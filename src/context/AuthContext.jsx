import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import amplitude from '../amplitude.js'

/**
 * DEMO-ONLY authentication.
 * Accounts and password hashes live in localStorage. Anyone with browser
 * access can inspect or forge data. This is NOT a secure auth system — it
 * exists to demonstrate the UX pattern alongside the fake-commerce flow.
 */

const AuthContext = createContext(null)

// ── Helpers ──────────────────────────────────────────────
async function sha256(text) {
  const buf = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

const KEY_USERS = 'dan-dog-users'
const KEY_CURRENT = 'dan-dog-current-user'
const ordersKey = (email) => `dan-dog-orders-${email.toLowerCase()}`

function getUsers() {
  try { return JSON.parse(localStorage.getItem(KEY_USERS) || '[]') }
  catch { return [] }
}

function saveUsers(users) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users))
}

function sanitizeUser(u) {
  return { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt, membership: u.membership || null }
}

function makeUserId() {
  // Non-PII, stable alphanumeric identifier — suitable for analytics user IDs.
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'u-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

// ── Provider ──────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem(KEY_CURRENT)
    if (!email) return null
    const found = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase())
    return found ? sanitizeUser(found) : null
  })

  // Hydrate Amplitude user id on mount if a session already exists
  useEffect(() => {
    if (user?.id) amplitude.setUserId(user.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signUp = useCallback(async ({ name, email, password }) => {
    const users = getUsers()
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with that email already exists.')
    }
    const passwordHash = await sha256(password)
    const newUser = { id: makeUserId(), name, email, passwordHash, createdAt: new Date().toISOString() }
    saveUsers([...users, newUser])
    localStorage.setItem(KEY_CURRENT, newUser.email)
    setUser(sanitizeUser(newUser))
    return sanitizeUser(newUser)
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const users = getUsers()
    const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase())
    if (idx === -1) throw new Error('No account found with that email.')
    const passwordHash = await sha256(password)
    if (users[idx].passwordHash !== passwordHash) throw new Error('Incorrect password.')
    // Backfill: older accounts created before we started assigning IDs
    if (!users[idx].id) {
      users[idx].id = makeUserId()
      saveUsers(users)
    }
    localStorage.setItem(KEY_CURRENT, users[idx].email)
    setUser(sanitizeUser(users[idx]))
    return sanitizeUser(users[idx])
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem(KEY_CURRENT)
    setUser(null)
  }, [])

  const resetPassword = useCallback(async ({ email, newPassword }) => {
    const users = getUsers()
    const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase())
    if (idx === -1) throw new Error('No account found with that email.')
    users[idx].passwordHash = await sha256(newPassword)
    saveUsers(users)
  }, [])

  const changePassword = useCallback(async ({ currentPassword, newPassword }) => {
    if (!user) throw new Error('Not signed in.')
    const users = getUsers()
    const idx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase())
    if (idx === -1) throw new Error('Account not found.')
    const currentHash = await sha256(currentPassword)
    if (users[idx].passwordHash !== currentHash) throw new Error('Current password is incorrect.')
    users[idx].passwordHash = await sha256(newPassword)
    saveUsers(users)
  }, [user])

  const getOrders = useCallback(() => {
    if (!user) return []
    try { return JSON.parse(localStorage.getItem(ordersKey(user.email)) || '[]') }
    catch { return [] }
  }, [user])

  const joinMembership = useCallback(({ tier, price, acsPercent }) => {
    if (!user) throw new Error('Not signed in.')
    const users = getUsers()
    const idx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase())
    if (idx === -1) throw new Error('Account not found.')
    const now = new Date()
    const expires = new Date(now)
    expires.setFullYear(now.getFullYear() + 1)
    const membership = {
      tier,
      price,
      acs_donation: +(price * acsPercent / 100).toFixed(2),
      joined_at: now.toISOString(),
      expires_at: expires.toISOString(),
    }
    users[idx].membership = membership
    saveUsers(users)
    setUser(sanitizeUser(users[idx]))
    return membership
  }, [user])

  const saveOrder = useCallback((order) => {
    if (!user) return null
    const existing = (() => {
      try { return JSON.parse(localStorage.getItem(ordersKey(user.email)) || '[]') }
      catch { return [] }
    })()
    const placed = { ...order, placedAt: new Date().toISOString() }
    localStorage.setItem(ordersKey(user.email), JSON.stringify([placed, ...existing]))
    return placed
  }, [user])

  return (
    <AuthContext.Provider value={{
      user,
      signUp, signIn, signOut,
      resetPassword, changePassword,
      getOrders, saveOrder,
      joinMembership,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
