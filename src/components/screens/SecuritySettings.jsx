import { PinIcon, LockIcon, FingerprintIcon, DeviceIcon, SnowflakeIcon, KeyIcon, ChevronRightIcon } from '../icons'

const ITEMS = [
  { label: 'Change PIN', Icon: PinIcon, gradient: 'from-blue-500 to-indigo-500' },
  { label: 'Change password', Icon: LockIcon, gradient: 'from-indigo-500 to-violet-500' },
  { label: 'Biometric login', Icon: FingerprintIcon, gradient: 'from-fuchsia-500 to-pink-500' },
  { label: 'Manage active devices', Icon: DeviceIcon, gradient: 'from-cyan-500 to-blue-500' },
  { label: 'Freeze or report a card', Icon: SnowflakeIcon, gradient: 'from-sky-400 to-cyan-500' },
  { label: 'Two-factor authentication', Icon: KeyIcon, gradient: 'from-emerald-500 to-teal-500' },
]

export default function SecuritySettings({ onNavigate, onBack }) {
  return (
    <div className="pb-4">
      <button onClick={onBack} className="mb-6 text-sm font-semibold text-indigo-600 dark:text-indigo-400 animate-fade-in-up">
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: '40ms' }}>
        Security
      </h1>

      <div className="flex flex-col gap-3">
        {ITEMS.map(({ label, Icon, gradient }, i) => (
          <button
            key={label}
            onClick={() => onNavigate('placeholder', { label, Icon, gradient })}
            className="flex items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 text-left shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] animate-fade-in-up"
            style={{ animationDelay: `${100 + i * 70}ms` }}
          >
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${gradient}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="flex-1 font-semibold text-slate-800 dark:text-slate-100">{label}</span>
            <ChevronRightIcon className="h-4 w-4 text-slate-300 dark:text-slate-600" />
          </button>
        ))}
      </div>
    </div>
  )
}
