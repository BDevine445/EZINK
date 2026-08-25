export default function Placeholder({ label, Icon, gradient, onBack }) {
  return (
    <div className="pb-4">
      <button
        onClick={onBack}
        className="mb-8 text-sm font-semibold text-indigo-600 dark:text-indigo-400 animate-fade-in-up"
      >
        ← Back
      </button>

      <div className="flex flex-col items-center gap-4 pt-6 text-center animate-fade-in-up" style={{ animationDelay: '60ms' }}>
        <span className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${gradient}`}>
          <Icon className="h-7 w-7" />
        </span>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{label}</h1>
        <p className="max-w-xs text-slate-500 dark:text-slate-400">
          {label} isn't wired up yet — this screen is a placeholder for what's coming next.
        </p>
      </div>
    </div>
  )
}
