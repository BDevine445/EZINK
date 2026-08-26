import { useState } from 'react'
import { EyeIcon, EyeOffIcon, LockIcon } from './icons'
import { useTranslation } from '../i18n/LanguageContext'

export default function VerifyPassword({ onVerify, onSuccess, onCancel }) {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (onVerify(password)) {
      onSuccess()
    } else {
      setError(t('verify.error'))
      setPassword('')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center animate-fade-in-up">
      <div className="w-full max-w-sm rounded-t-3xl sm:rounded-3xl border border-white/60 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl animate-scale-in">
        <div className="flex flex-col items-center gap-3 text-center mb-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white">
            <LockIcon className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">{t('verify.title')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('verify.subtitle')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 shadow-sm">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('verify.passwordPlaceholder')}
              autoComplete="current-password"
              autoFocus
              className="flex-1 bg-transparent text-slate-800 dark:text-slate-100 font-medium outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? t('common.hidePassword') : t('common.showPassword')}
              className="text-slate-400 dark:text-slate-500"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="text-sm font-medium text-rose-500">{error}</p>}

          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all duration-200 active:scale-95"
            >
              {t('verify.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all duration-200 active:scale-95"
            >
              {t('verify.confirm')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
