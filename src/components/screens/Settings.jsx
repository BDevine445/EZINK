import { ProfileIcon, BellIcon, ShieldIcon, HelpIcon, ChevronRightIcon, SunIcon, MoonIcon } from '../icons'

const ITEMS = [
  { label: 'Profile', Icon: ProfileIcon, gradient: 'from-blue-500 to-indigo-500' },
  { label: 'Notifications', Icon: BellIcon, gradient: 'from-fuchsia-500 to-violet-500' },
  { label: 'Security', Icon: ShieldIcon, gradient: 'from-cyan-500 to-teal-500' },
  { label: 'Help & Support', Icon: HelpIcon, gradient: 'from-amber-400 to-orange-500' },
]

export default function Settings({ theme, onThemeChange, onNavigate }) {
  const isDark = theme === 'dark'

  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 animate-fade-in-up">Settings</h1>

      <div className="flex flex-col gap-3">
        <div
          className="flex items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 shadow-sm backdrop-blur-sm animate-fade-in-up"
          style={{ animationDelay: '40ms' }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
            {isDark ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </span>
          <span className="flex-1 font-semibold text-slate-800 dark:text-slate-100">Appearance</span>
          <div className="relative flex rounded-full bg-slate-100/80 dark:bg-slate-900/60 p-1">
            <div
              className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 shadow-sm shadow-indigo-500/30 transition-all duration-300 ease-out"
              style={{ left: isDark ? '50%' : '4px', width: 'calc(50% - 4px)' }}
            />
            <button
              onClick={() => onThemeChange('light')}
              aria-label="Light mode"
              className={`relative z-10 flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 ${
                !isDark ? 'text-white' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <SunIcon className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              aria-label="Dark mode"
              className={`relative z-10 flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <MoonIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {ITEMS.map(({ label, Icon, gradient }, i) => (
          <button
            key={label}
            onClick={() => onNavigate('placeholder', { label, Icon, gradient })}
            className="flex items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 text-left shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] animate-fade-in-up"
            style={{ animationDelay: `${110 + i * 70}ms` }}
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
