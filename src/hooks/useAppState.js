import { useCallback, useEffect, useState } from 'react'
import { onlineCard, sendMoneyCard, onlinePurchases, whatsAppTransactions } from '../data/mock'

const FALLBACK_STATE = { onlineCard, sendMoneyCard, onlinePurchases, whatsAppTransactions }

export function useAppState() {
  const [state, setState] = useState(FALLBACK_STATE)
  const [loading, setLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  const refresh = useCallback(() => {
    setLoading(true)
    fetch('/api/state')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`status ${res.status}`))))
      .then((data) => setState(data))
      // /api isn't served by plain `vite dev` — keep the static mock data so
      // local UI work still has something to render.
      .catch(() => setState(FALLBACK_STATE))
      .finally(() => {
        setLoading(false)
        setHasLoaded(true)
      })
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  // Only surface "loading" for the very first fetch — background refreshes
  // (e.g. re-opening a tab) shouldn't flash a skeleton over real content.
  return { ...state, loading: loading && !hasLoaded, refresh }
}
