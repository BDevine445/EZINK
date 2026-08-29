import { ScanIcon, ArrowUpRightIcon, ArrowDownLeftIcon, PlusIcon, ReceiptIcon, SignalIcon } from './icons'
import { useTranslation } from '../i18n/LanguageContext'

const ACTIONS = [
  { key: 'scan', Icon: ScanIcon, gradient: 'from-blue-500 to-indigo-500' },
  { key: 'send', Icon: ArrowUpRightIcon, gradient: 'from-fuchsia-500 to-violet-500' },
  { key: 'receive', Icon: ArrowDownLeftIcon, gradient: 'from-emerald-500 to-teal-500' },
  { key: 'topup', Icon: PlusIcon, gradient: 'from-amber-400 to-orange-500' },
  { key: 'bills', Icon: ReceiptIcon, gradient: 'from-cyan-500 to-blue-500' },
  { key: 'airtime', Icon: SignalIcon, gradient: 'from-rose-500 to-pink-500' },
]

export default function ActionGrid({ onNavigate }) {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-3 gap-3">
      {ACTIONS.map(({ key, Icon, gradient }) => (
        <button
          key={key}
          onClick={() => onNavigate(key)}
          className="flex flex-col items-center gap-2 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-2 py-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
        >
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white ${gradient}`}>
            <Icon className="h-5 w-5" />
          </span>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            {t(`home.actions.${key}`)}
          </span>
        </button>
      ))}
    </div>
  )
}
