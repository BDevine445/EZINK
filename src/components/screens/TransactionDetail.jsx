export default function TransactionDetail({ transaction, onBack }) {
  if (!transaction) return null
  const { name, amount, date } = transaction

  return (
    <div className="pb-4">
      <button
        onClick={onBack}
        className="mb-8 text-sm font-semibold text-indigo-600 dark:text-indigo-400 animate-fade-in-up"
      >
        ← Back
      </button>

      <div className="flex flex-col items-center gap-4 pt-6 text-center animate-fade-in-up" style={{ animationDelay: '60ms' }}>
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-2xl font-semibold text-white shadow-lg">
          {name.charAt(0)}
        </span>
        <h1 className="max-w-xs text-2xl font-bold text-slate-800 dark:text-white">{name}</h1>
        {amount && <p className="text-3xl font-bold text-slate-800 dark:text-white">{amount}</p>}
      </div>

      <div className="mt-8 flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
        <div className="flex items-center justify-between rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 shadow-sm backdrop-blur-sm">
          <span className="text-sm text-slate-500 dark:text-slate-400">Date</span>
          <span className="font-semibold text-slate-800 dark:text-slate-100">{date}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 shadow-sm backdrop-blur-sm">
          <span className="text-sm text-slate-500 dark:text-slate-400">Status</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Completed</span>
        </div>
      </div>
    </div>
  )
}
