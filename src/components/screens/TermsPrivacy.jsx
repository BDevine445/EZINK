import { useTranslation } from '../../i18n/LanguageContext'

export default function TermsPrivacy({ onBack }) {
  const { t, isRtl } = useTranslation()
  const sections = [1, 2, 3, 4].map((n) => ({ title: t(`terms.s${n}Title`), body: t(`terms.s${n}Body`) }))

  return (
    <div className="pb-4">
      <button onClick={onBack} className="mb-6 text-sm font-semibold text-indigo-600 dark:text-indigo-400 animate-fade-in-up">
        {isRtl ? '→' : '←'} {t('common.back')}
      </button>

      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-1 animate-fade-in-up" style={{ animationDelay: '40ms' }}>
        {t('terms.title')}
      </h1>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-4 animate-fade-in-up" style={{ animationDelay: '60ms' }}>
        {t('terms.updated')}
      </p>
      <p className="text-slate-500 dark:text-slate-400 mb-6 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
        {t('terms.intro')}
      </p>

      <div className="flex flex-col gap-4">
        {sections.map(({ title, body }, i) => (
          <div key={title} className="animate-fade-in-up" style={{ animationDelay: `${120 + i * 70}ms` }}>
            <h2 className="font-bold text-slate-800 dark:text-white mb-1">{title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400 animate-fade-in-up" style={{ animationDelay: '420ms' }}>
        {t('terms.contactLine')}
      </p>
    </div>
  )
}
