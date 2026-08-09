import { useState } from 'react'
import { PinIcon, HistoryIcon, ChatIcon } from './icons'

export default function VisaCard({ label, number, gradientClass, secondaryLabel, secondaryIcon: SecondaryIcon = HistoryIcon, onSecondaryClick }) {
  const [pinVisible, setPinVisible] = useState(false)

  return (
    <div className="mb-6">
      <div className={`rounded-2xl p-5 text-white shadow-lg bg-gradient-to-br ${gradientClass}`}>
        <p className="font-semibold text-lg mb-6">{label}</p>
        <p className="text-xl tracking-widest font-medium mb-4">{number}</p>
        <div className="flex items-end justify-between">
          <span className="text-xs uppercase tracking-wide text-white/80">
            {pinVisible ? 'PIN 4471' : 'See PIN'}
          </span>
          <span className="italic font-bold text-lg">VISA</span>
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => setPinVisible((v) => !v)}
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 transition-colors"
        >
          <PinIcon className="h-4 w-4" />
          View PIN
        </button>
        <button
          onClick={onSecondaryClick}
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 transition-colors"
        >
          <SecondaryIcon className="h-4 w-4" />
          {secondaryLabel}
        </button>
      </div>
    </div>
  )
}
