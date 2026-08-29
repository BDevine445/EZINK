import { useState } from 'react'
import ActionGrid from '../ActionGrid'
import { EyeIcon, EyeOffIcon } from '../icons'
import { normalizeTx, iconFor, TYPE_GRADIENT } from '../../lib/txDisplay'
import { useTranslation } from '../../i18n/LanguageContext'

function greetingKey(hour) {
  if (hour < 12) return 'home.greetingMorning'
  if (hour < 18) return 'home.greetingAfternoon'
  return 'home.greetingEvening'
}

function RecentSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 shadow-sm animate-pulse">
      <span className="h-9 w-9 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="flex-1 flex flex-col gap-2">
        <span className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
        <span className="h-2.5 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  )
}

export default function Home({ onNavigate, balance, recent = [], loading }) {
  const { t } = useTranslation()
  const [hidden, setHidden] = useState(false)

  const greeting = t(greetingKey(new Date().getHours()))
  const rows = recent.slice(0, 4).map((tx) => normalizeTx(tx))
  const maskedBalance = (balance || '').replace(/[0-9]/g, '•')

  return (
    <div className="pb-4">
      <p className="mb-3 text-slate-500 dark:text-slate-400 animate-fade-in-up">{greeting}</p>

      <div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white shadow-xl shadow-indigo-500/20 animate-fade-in-up"
        style={{ animationDelay: '60ms' }}
      >
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center justify-between">
          <p className="text-sm text-white/80">{t('home.walletLabel')}</p>
          <button
            onClick={() => setHidden((v) => !v)}
            aria-label={hidden ? t('common.showBalance') : t('common.hideBalance')}
            className="text-white/80"
          >
            {hidden ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        <p className="relative mt-2 text-3xl font-bold">{hidden ? maskedBalance : balance}</p>
      </div>

      <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
        <ActionGrid onNavigate={onNavigate} />
      </div>

      <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '180ms' }}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            {t('home.recent')}
          </h2>
          <button
            onClick={() => onNavigate('history', 'all')}
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400"
          >
            {t('home.seeAll')}
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {loading && [0, 1, 2].map((i) => <RecentSkeleton key={i} />)}
          {!loading && rows.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-400 dark:text-slate-500">{t('home.empty')}</p>
          )}
          {!loading &&
            rows.map((tx, i) => {
              const Icon = iconFor(tx.type)
              return (
                <button
                  key={tx.id || `${tx.name}-${i}`}
                  onClick={() => onNavigate('transaction', tx)}
                  className="flex items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 text-left shadow-sm backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white ${
                      TYPE_GRADIENT[tx.type] || 'from-slate-400 to-slate-500'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{tx.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{tx.date}</p>
                  </div>
                  {tx.amountLabel && (
                    <span
                      className={`shrink-0 text-sm font-semibold ${
                        tx.direction === 'in'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {tx.amountLabel}
                    </span>
                  )}
                </button>
              )
            })}
        </div>
      </div>
    </div>
  )
}
