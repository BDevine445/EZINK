import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from '../icons'
import { useTranslation } from '../../i18n/LanguageContext'

export default function Login({ rememberedEmail, onLogin }) {
  const { t } = useTranslation()
  const [email, setEmail] = useState(rememberedEmail || '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.includes('@') || !password) {
      setError(t('login.errorInvalid'))
      return
    }
    const result = onLogin(email.trim(), password)
    if (!result.ok) {
      setError(t('login.errorCreds'))
      setPassword('')
    }
  }

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/60 to-cyan-50/50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950 transition-colors duration-300">
      <div className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-indigo-300/30 dark:bg-indigo-600/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-cyan-300/30 dark:bg-cyan-600/10 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute bottom-16 left-1/4 h-64 w-64 rounded-full bg-fuchsia-200/30 dark:bg-fuchsia-600/10 blur-3xl animate-float" />

      <div className="relative z-10 flex h-full flex-col justify-center overflow-y-auto px-6 pt-[calc(env(safe-area-inset-top)+1.25rem)] pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-1 animate-fade-in-up">
          {rememberedEmail ? t('login.welcomeBack') : t('login.welcomeNew')}{' '}
          <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">EZINK</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 animate-fade-in-up" style={{ animationDelay: '60ms' }}>
          {rememberedEmail ? t('login.subtitleBack') : t('login.subtitleNew')}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div
            className="rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 shadow-sm backdrop-blur-sm animate-fade-in-up"
            style={{ animationDelay: '120ms' }}
          >
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
              {t('login.emailLabel')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('login.emailPlaceholder')}
              autoComplete="email"
              className="w-full bg-transparent text-slate-800 dark:text-slate-100 font-medium outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>

          <div
            className="flex items-center gap-2 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 shadow-sm backdrop-blur-sm animate-fade-in-up"
            style={{ animationDelay: '180ms' }}
          >
            <div className="flex-1">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
                {t('login.passwordLabel')}
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.passwordPlaceholder')}
                autoComplete="current-password"
                className="w-full bg-transparent text-slate-800 dark:text-slate-100 font-medium outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? t('common.hidePassword') : t('common.showPassword')}
              className="text-slate-400 dark:text-slate-500"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="text-sm font-medium text-rose-500 animate-fade-in-up">{error}</p>}

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:shadow-xl active:scale-[0.98] animate-fade-in-up"
            style={{ animationDelay: '240ms' }}
          >
            {rememberedEmail ? t('login.submitBack') : t('login.submitNew')}
          </button>
        </form>
      </div>
    </div>
  )
}
