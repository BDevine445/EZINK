import { CardsIcon, ChatIcon } from '../icons'
import { useTranslation } from '../../i18n/LanguageContext'

export default function Welcome({ onNavigate }) {
  const { t } = useTranslation()

  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-1 animate-fade-in-up">
        {t('welcome.title')}{' '}
        <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">EZINK</span>
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8 animate-fade-in-up" style={{ animationDelay: '60ms' }}>
        {t('welcome.subtitle')}
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => onNavigate('cards')}
          className="group flex items-center gap-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 py-4 px-5 text-left font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98] animate-fade-in-up"
          style={{ animationDelay: '120ms' }}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 transition-transform duration-300 group-hover:-translate-y-1">
            <CardsIcon className="h-5 w-5" />
          </span>
          {t('welcome.viewOnline')}
        </button>
        <button
          onClick={() => onNavigate('cards')}
          className="group flex items-center gap-4 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 py-4 px-5 text-left font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-fuchsia-500/30 active:scale-[0.98] animate-fade-in-up"
          style={{ animationDelay: '180ms' }}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 transition-transform duration-300 group-hover:-translate-y-1">
            <CardsIcon className="h-5 w-5" />
          </span>
          {t('welcome.viewSend')}
        </button>
        <button
          onClick={() => onNavigate('connect')}
          className="group flex items-center gap-4 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 py-4 px-5 text-left font-semibold text-slate-800 dark:text-slate-100 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md active:scale-[0.98] animate-fade-in-up"
          style={{ animationDelay: '240ms' }}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white transition-transform duration-300 group-hover:-translate-y-1">
            <ChatIcon className="h-5 w-5" />
          </span>
          {t('welcome.connectWhatsapp')}
        </button>
      </div>
    </div>
  )
}
