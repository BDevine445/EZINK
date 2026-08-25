import { ClockIcon } from '../icons'

const AVATAR_GRADIENTS = [
  'from-blue-500 to-indigo-500',
  'from-fuchsia-500 to-violet-500',
  'from-cyan-500 to-teal-500',
  'from-amber-400 to-orange-500',
]

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

export default function History({ activeSubTab, onSubTabChange, onlinePurchases, whatsAppTransactions, loading, onSelectTransaction }) {
  const isOnline = activeSubTab === 'online'
  const items = isOnline ? onlinePurchases : whatsAppTransactions

  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-5 animate-fade-in-up">Transaction History</h1>

      <div
        className="relative flex rounded-full bg-slate-100/80 dark:bg-slate-800/80 p-1 mb-5 backdrop-blur-sm animate-fade-in-up"
        style={{ animationDelay: '60ms' }}
      >
        <div
          className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md shadow-indigo-500/30 transition-all duration-300 ease-out"
          style={{ left: isOnline ? '4px' : '50%', width: 'calc(50% - 4px)' }}
        />
        <button
          onClick={() => onSubTabChange('online')}
          className={`relative z-10 flex-1 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
            isOnline ? 'text-white' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Online Purchases
        </button>
        <button
          onClick={() => onSubTabChange('whatsapp')}
          className={`relative z-10 flex-1 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
            !isOnline ? 'text-white' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          WhatsApp History
        </button>
      </div>

      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
            <ClockIcon className="h-6 w-6" />
          </span>
          <p className="text-slate-400 dark:text-slate-500">No transactions yet.</p>
        </div>
      )}

      <ul className="flex flex-col gap-3">
        {loading && [0, 1, 2].map((i) => <RowSkeleton key={i} delay={100 + i * 60} />)}
        {!loading && items.map((tx, i) => (
          <li key={tx.name} className="animate-fade-in-up" style={{ animationDelay: `${100 + i * 60}ms` }}>
            <button
              onClick={() => onSelectTransaction(tx)}
              className="flex w-full items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 text-left shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white font-semibold ${
                  AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]
                }`}
              >
                {tx.name.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-800 dark:text-slate-100">{tx.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{tx.date}</p>
              </div>
              {tx.amount && <span className="shrink-0 font-semibold text-slate-800 dark:text-slate-100">{tx.amount}</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
