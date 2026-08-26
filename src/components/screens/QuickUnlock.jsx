import { useState } from 'react'
import { EyeIcon, EyeOffIcon, LockIcon } from '../icons'

export default function QuickUnlock({ rememberedEmail, onUnlock }) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const result = onUnlock(password)
    if (!result.ok) {
      setError(result.error)
      setPassword('')
    }
  }

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/60 to-cyan-50/50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950 transition-colors duration-300">
      <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-indigo-300/30 dark:bg-indigo-600/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-cyan-300/30 dark:bg-cyan-600/10 blur-3xl animate-float-slow" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg animate-fade-in-up">
          <LockIcon className="h-7 w-7" />
        </span>

        <div className="animate-fade-in-up" style={{ animationDelay: '60ms' }}>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Welcome back</h1>
          <p className="text-slate-500 dark:text-slate-400">Signed in as {rememberedEmail}</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-3">
          <div
            className="flex items-center gap-2 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 shadow-sm backdrop-blur-sm animate-fade-in-up"
            style={{ animationDelay: '120ms' }}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              autoFocus
              className="flex-1 bg-transparent text-slate-800 dark:text-slate-100 font-medium outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="text-slate-400 dark:text-slate-500"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="text-sm font-medium text-rose-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:shadow-xl active:scale-[0.98] animate-fade-in-up"
            style={{ animationDelay: '180ms' }}
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  )
}
