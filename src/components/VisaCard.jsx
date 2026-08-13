import { useState } from 'react'
import { PinIcon, HistoryIcon } from './icons'

export default function VisaCard({
  label,
  number,
  gradientClass,
  secondaryLabel,
  secondaryIcon: SecondaryIcon = HistoryIcon,
  onSecondaryClick,
  delay = 0,
}) {
  const [pinVisible, setPinVisible] = useState(false)

  return (
    <div className="mb-6 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <div className={`relative overflow-hidden rounded-3xl p-6 text-white shadow-xl bg-gradient-to-br ${gradientClass}`}>
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

        <div className="relative flex items-center justify-between mb-8">
          <p className="font-semibold text-lg">{label}</p>
          <span className="h-7 w-9 rounded-md bg-white/25 backdrop-blur-sm" />
        </div>
        <p className="relative text-xl tracking-[0.2em] font-medium mb-6">{number}</p>
        <div className="relative flex items-end justify-between">
          <span className="text-xs uppercase tracking-wide text-white/80">
            {pinVisible ? 'PIN 4471' : 'See PIN'}
          </span>
          <span className="italic font-bold text-lg">VISA</span>
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => setPinVisible((v) => !v)}
          className="flex-1 flex items-center justify-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/60 dark:border-slate-700/60 rounded-2xl py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 shadow-sm transition-all duration-200 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md active:scale-95"
        >
          <PinIcon className="h-4 w-4" />
          View PIN
        </button>
        <button
          onClick={onSecondaryClick}
          className="flex-1 flex items-center justify-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/60 dark:border-slate-700/60 rounded-2xl py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 shadow-sm transition-all duration-200 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md active:scale-95"
        >
          <SecondaryIcon className="h-4 w-4" />
          {secondaryLabel}
        </button>
      </div>
    </div>
  )
}
