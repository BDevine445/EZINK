import { useCallback, useState } from 'react'

const CREDENTIALS_KEY = 'ezink-credentials'
const SESSION_KEY = 'ezink-logged-in'

function getStoredCredentials() {
  try {
    return JSON.parse(localStorage.getItem(CREDENTIALS_KEY))
  } catch {
    return null
  }
}

export function useAuth() {
  const [credentials, setCredentials] = useState(getStoredCredentials)
  const [authed, setAuthed] = useState(() => Boolean(credentials) && localStorage.getItem(SESSION_KEY) === '1')
  const [appUnlocked, setAppUnlocked] = useState(false)

  const verifyPassword = useCallback((password) => {
    const stored = getStoredCredentials()
    return Boolean(stored) && stored.password === password
  }, [])

  const login = useCallback((email, password) => {
    const stored = getStoredCredentials()
    if (!stored) {
      const next = { email, password }
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(next))
      localStorage.setItem(SESSION_KEY, '1')
      setCredentials(next)
      setAuthed(true)
      setAppUnlocked(true)
      return { ok: true }
    }
    if (stored.email.toLowerCase() === email.toLowerCase() && stored.password === password) {
      localStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
      setAppUnlocked(true)
      return { ok: true }
    }
    return { ok: false, error: 'Incorrect email or password' }
  }, [])

  const unlockApp = useCallback(
    (password) => {
      if (!verifyPassword(password)) return { ok: false, error: 'Incorrect password' }
      setAppUnlocked(true)
      return { ok: true }
    },
    [verifyPassword]
  )

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setAuthed(false)
    setAppUnlocked(false)
  }, [])

  return {
    authed,
    appUnlocked,
    rememberedEmail: credentials?.email ?? '',
    login,
    unlockApp,
    logout,
    verifyPassword,
  }
}
