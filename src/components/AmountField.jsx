import { useTranslation } from '../i18n/LanguageContext'

// Large numeric money entry with a fixed "Le" prefix. The input stays LTR
// so the minus / decimal keys behave, but the digits align to the reading
// direction.
export default function AmountField({ value, onChange, label, autoFocus = false }) {
  const { isRtl } = useTranslation()

  return (
    <label className="flex flex-col gap-2">
      {label && (
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</span>
      )}
      <div className="flex items-center gap-2 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 shadow-sm backdrop-blur-sm focus-within:ring-2 focus-within:ring-indigo-500">
        <span className="text-2xl font-bold text-slate-400 dark:text-slate-500">Le</span>
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          autoFocus={autoFocus}
          dir="ltr"
          className={`w-full min-w-0 bg-transparent text-3xl font-bold text-slate-800 dark:text-slate-100 outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 ${
            isRtl ? 'text-right' : 'text-left'
          }`}
        />
      </div>
    </label>
  )
}
