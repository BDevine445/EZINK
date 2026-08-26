import { useTranslation } from '../../i18n/LanguageContext'
import { LANGUAGES } from '../../i18n/translations'

export default function LanguageSettings({ onBack }) {
  const { t, language, setLanguage, isRtl } = useTranslation()

  return (
    <div className="pb-4">
      <button onClick={onBack} className="mb-6 text-sm font-semibold text-indigo-600 dark:text-indigo-400 animate-fade-in-up">
        {isRtl ? '→' : '←'} {t('common.back')}
      </button>

      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 animate-fade-in-up" style={{ animationDelay: '40ms' }}>
        {t('languagePicker.title')}
      </h1>

      <div className="flex flex-col gap-3">
        {LANGUAGES.map(({ code, name }, i) => {
          const selected = code === language
          return (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left shadow-sm backdrop-blur-sm transition-all duration-200 active:scale-[0.98] animate-fade-in-up ${
                selected
                  ? 'border-indigo-400 dark:border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40'
                  : 'border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80'
              }`}
              style={{ animationDelay: `${100 + i * 60}ms` }}
            >
              <span className="font-semibold text-slate-800 dark:text-slate-100">{name}</span>
              {selected && <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
