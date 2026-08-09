import { HomeIcon, CardsIcon, HistoryIcon, SettingsIcon } from './icons'

const TABS = [
  { key: 'home', label: 'Home', Icon: HomeIcon },
  { key: 'cards', label: 'Cards', Icon: CardsIcon },
  { key: 'history', label: 'History', Icon: HistoryIcon },
  { key: 'settings', label: 'Settings', Icon: SettingsIcon },
]

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <div className="shrink-0 border-t border-slate-200 px-4 pt-2 pb-5 bg-white">
      <div className="flex items-center justify-between">
        {TABS.map(({ key, label, Icon }) => {
          const isActive = activeTab === key
          return (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`flex flex-col items-center gap-1 flex-1 py-1 transition-colors ${
                isActive ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
