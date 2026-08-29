import { useMemo } from 'react'
import { ClockIcon } from '../icons'
import { normalizeTx, iconFor, TYPE_GRADIENT } from '../../lib/txDisplay'
import { useTranslation } from '../../i18n/LanguageContext'

const FILTERS = ['all', 'in', 'out', 'bills', 'online']

function matchesFilter(tx, filter) {
  switch (filter) {
    case 'in':
      return tx.direction === 'in'
    case 'out':
      return tx.direction === 'out'
    case 'bills':
      return tx.type === 'bill'
    case 'online':
      return tx.type === 'online'
    default:
      return true
  }
}

function RowSkeleton({ delay }) {
  return (
    <li
      className="flex items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 shadow-sm backdrop-blur-sm animate-pulse animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="h-10 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="min-w-0 flex-1 flex flex-col gap-2">
        <span className="h-3.5 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
        <span className="h-2.5 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </li>
  )
}

export default function History({
  activeFilter = 'all',
  onFilterChange,
  onlinePurchases = [],
  whatsAppTransactions = [],
  loading,
  onSelectTransaction,
}) {
  const { t } = useTranslation()

  const all = useMemo(() => {
    const wallet = whatsAppTransactions.map((tx) => normalizeTx(tx))
    const online = onlinePurchases.map((tx) => normalizeTx(tx, 'online'))
    return [...wallet, ...online].sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0))
  }, [whatsAppTransactions, onlinePurchases])

  const rows = all.filter((tx) => matchesFilter(tx, activeFilter))

  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-5 animate-fade-in-up">{t('history.title')}</h1>

      <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1 animate-fade-in-up" style={{ animationDelay: '60ms' }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
              activeFilter === f
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm shadow-indigo-500/30'
                : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400'
            }`}
          >
            {t(`history.filters.${f}`)}
          </button>
        ))}
      </div>

      {!loading && rows.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
            <ClockIcon className="h-6 w-6" />
          </span>
          <p className="text-slate-400 dark:text-slate-500">{t('history.empty')}</p>
        </div>
      )}

      <ul className="flex flex-col gap-3">
        {loading && [0, 1, 2].map((i) => <RowSkeleton key={i} delay={100 + i * 60} />)}
        {!loading &&
          rows.map((tx, i) => {
            const Icon = iconFor(tx.type)
            return (
              <li key={tx.id || tx.reference || `${tx.name}-${tx.date}-${i}`} className="animate-fade-in-up" style={{ animationDelay: `${100 + i * 50}ms` }}>
                <button
                  onClick={() => onSelectTransaction(tx)}
                  className="flex w-full items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 text-left shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white ${
                      TYPE_GRADIENT[tx.type] || 'from-slate-400 to-slate-500'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-800 dark:text-slate-100">{tx.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{tx.date}</p>
                  </div>
                  {tx.amountLabel && (
                    <span
                      className={`shrink-0 font-semibold ${
                        tx.direction === 'in'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      {tx.amountLabel}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
