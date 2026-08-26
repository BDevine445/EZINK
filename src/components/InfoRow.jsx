export default function InfoRow({ Icon, gradient, label, value, delay = 0 }) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 shadow-sm backdrop-blur-sm animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${gradient}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</p>
        <p className="font-semibold text-slate-800 dark:text-slate-100">{value}</p>
      </div>
    </div>
  )
}
