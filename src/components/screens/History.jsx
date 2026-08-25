const AVATAR_GRADIENTS = [
  'from-blue-500 to-indigo-500',
  'from-fuchsia-500 to-violet-500',
  'from-cyan-500 to-teal-500',
  'from-amber-400 to-orange-500',
]

export default function History({ activeSubTab, onSubTabChange, onlinePurchases, whatsAppTransactions }) {
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

      <ul className="flex flex-col gap-3">
        {items.map((tx, i) => (
          <li
            key={tx.name}
            className="flex items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md animate-fade-in-up"
            style={{ animationDelay: `${100 + i * 60}ms` }}
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
          </li>
        ))}
      </ul>
    </div>
  )
}
