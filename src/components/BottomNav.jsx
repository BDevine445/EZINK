import { HomeIcon, CardsIcon, HistoryIcon, SettingsIcon } from './icons'
import { useTranslation } from '../i18n/LanguageContext'

const TABS = [
  { key: 'home', Icon: HomeIcon },
  { key: 'cards', Icon: CardsIcon },
  { key: 'history', Icon: HistoryIcon },
  { key: 'settings', Icon: SettingsIcon },
]

export default function BottomNav({ activeTab, onTabChange }) {
  const { t } = useTranslation()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/80 p-1.5 shadow-xl shadow-indigo-900/10 dark:shadow-black/30 backdrop-blur-xl">
        {TABS.map(({ key, Icon }) => {
          const label = t(`nav.${key}`)
          const isActive = activeTab === key
          return (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className="relative flex flex-col items-center justify-center gap-0.5 rounded-full px-4 py-2 transition-transform duration-200 active:scale-90"
            >
              {isActive && (
                <span className="absolute inset-0 animate-scale-in rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 shadow-md shadow-indigo-500/40" />
              )}
              <Icon
                className={`relative h-5 w-5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-300'}`}
              />
              <span
                className={`relative text-[10px] transition-colors duration-300 ${
                  isActive ? 'font-semibold text-white' : 'font-medium text-slate-500 dark:text-slate-300'
                }`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
