import {
  ProfileIcon,
  BellIcon,
  ShieldIcon,
  HelpIcon,
  ChatIcon,
  DocumentIcon,
  GlobeIcon,
  ChevronRightIcon,
  SunIcon,
  MoonIcon,
  LockIcon,
} from '../icons'
import { useTranslation } from '../../i18n/LanguageContext'

const GROUPS = [
  {
    titleKey: 'groupAccount',
    items: [
      { key: 'profile', Icon: ProfileIcon, gradient: 'from-blue-500 to-indigo-500' },
      { key: 'security', Icon: ShieldIcon, gradient: 'from-cyan-500 to-teal-500', target: 'security' },
      { key: 'notifications', Icon: BellIcon, gradient: 'from-fuchsia-500 to-violet-500' },
    ],
  },
  {
    titleKey: 'groupApp',
    items: [{ key: 'language', Icon: GlobeIcon, gradient: 'from-emerald-500 to-teal-500', target: 'language' }],
  },
  {
    titleKey: 'groupSupport',
    items: [
      { key: 'help', Icon: HelpIcon, gradient: 'from-amber-400 to-orange-500', target: 'help' },
      { key: 'contact', Icon: ChatIcon, gradient: 'from-sky-500 to-blue-500', target: 'contact' },
      { key: 'terms', Icon: DocumentIcon, gradient: 'from-slate-500 to-slate-600', target: 'terms' },
    ],
  },
]

export default function Settings({ theme, onThemeChange, onNavigate, onLogout }) {
  const { t } = useTranslation()
  const isDark = theme === 'dark'
  let rowIndex = 0

  function renderItem({ key, Icon, gradient, target }) {
    const delay = 40 + rowIndex++ * 70
    const labelKey = `settings.${key}`
    return (
      <button
        key={key}
        onClick={() => onNavigate(target ?? 'placeholder', target ? undefined : { labelKey, Icon, gradient })}
        className="flex items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 text-left shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] animate-fade-in-up"
        style={{ animationDelay: `${delay}ms` }}
      >
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white ${gradient}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="flex-1 font-semibold text-slate-800 dark:text-slate-100">{t(labelKey)}</span>
        <ChevronRightIcon className="h-4 w-4 text-slate-300 dark:text-slate-600" />
      </button>
    )
  }

  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 animate-fade-in-up">{t('settings.title')}</h1>

      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 animate-fade-in-up">
        {t(`settings.${GROUPS[0].titleKey}`)}
      </p>
      <div className="flex flex-col gap-3 mb-6">{GROUPS[0].items.map(renderItem)}</div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 animate-fade-in-up">
        {t(`settings.${GROUPS[1].titleKey}`)}
      </p>
      <div className="flex flex-col gap-3 mb-6">
        <div
          className="flex items-center gap-3 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 shadow-sm backdrop-blur-sm animate-fade-in-up"
          style={{ animationDelay: `${40 + rowIndex++ * 70}ms` }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
            {isDark ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </span>
          <span className="flex-1 font-semibold text-slate-800 dark:text-slate-100">{t('settings.appearance')}</span>
          <div className="relative flex rounded-full bg-slate-100/80 dark:bg-slate-900/60 p-1">
            <div
              className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 shadow-sm shadow-indigo-500/30 transition-all duration-300 ease-out"
              style={{ left: isDark ? '50%' : '4px', width: 'calc(50% - 4px)' }}
            />
            <button
              onClick={() => onThemeChange('light')}
              aria-label={t('common.lightMode')}
              className={`relative z-10 flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 ${
                !isDark ? 'text-white' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <SunIcon className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              aria-label={t('common.darkMode')}
              className={`relative z-10 flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <MoonIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {GROUPS[1].items.map(renderItem)}
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 animate-fade-in-up">
        {t(`settings.${GROUPS[2].titleKey}`)}
      </p>
      <div className="flex flex-col gap-3 mb-6">{GROUPS[2].items.map(renderItem)}</div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 rounded-2xl border border-rose-200/60 dark:border-rose-900/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 text-left shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] animate-fade-in-up"
          style={{ animationDelay: `${40 + rowIndex++ * 70}ms` }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-500 text-white">
            <LockIcon className="h-5 w-5" />
          </span>
          <span className="flex-1 font-semibold text-rose-600 dark:text-rose-400">{t('settings.logout')}</span>
        </button>
      </div>
    </div>
  )
}
