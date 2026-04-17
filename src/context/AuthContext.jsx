import { createContext, useContext, useState, useCallback } from 'react'

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
  return { name: u.name, email: u.email, createdAt: u.createdAt }
}

// ── Provider ──────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem(KEY_CURRENT)
    if (!email) return null
    const found = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase())
    return found ? sanitizeUser(found) : null
  })

  const signUp = useCallback(async ({ name, email, password }) => {
    const users = getUsers()
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with that email already exists.')
    }
    const passwordHash = await sha256(password)
    const newUser = { name, email, passwordHash, createdAt: new Date().toISOString() }
    saveUsers([...users, newUser])
    localStorage.setItem(KEY_CURRENT, newUser.email)
    setUser(sanitizeUser(newUser))
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const found = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!found) throw new Error('No account found with that email.')
    const passwordHash = await sha256(password)
    if (found.passwordHash !== passwordHash) throw new Error('Incorrect password.')
    localStorage.setItem(KEY_CURRENT, found.email)
    setUser(sanitizeUser(found))
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
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
