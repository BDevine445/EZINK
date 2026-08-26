import { useTranslation } from '../../i18n/LanguageContext'
import { PhoneIcon, MailIcon, ChatIcon, ClockIcon } from '../icons'
import InfoRow from '../InfoRow'

export default function HelpSupport({ onBack }) {
  const { t, isRtl } = useTranslation()
  const faqs = [1, 2, 3].map((n) => ({ q: t(`help.faq${n}Q`), a: t(`help.faq${n}A`) }))

  return (
    <div className="pb-4">
      <button onClick={onBack} className="mb-6 text-sm font-semibold text-indigo-600 dark:text-indigo-400 animate-fade-in-up">
        {isRtl ? '→' : '←'} {t('common.back')}
      </button>

      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-1 animate-fade-in-up" style={{ animationDelay: '40ms' }}>
        {t('help.title')}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
        {t('help.intro')}
      </p>

      <div className="flex flex-col gap-3 mb-8">
        <InfoRow Icon={PhoneIcon} gradient="from-blue-500 to-indigo-500" label={t('help.callUs')} value={t('help.phoneValue')} delay={120} />
        <InfoRow Icon={MailIcon} gradient="from-sky-500 to-blue-500" label={t('help.emailUs')} value={t('help.emailValue')} delay={180} />
        <InfoRow Icon={ChatIcon} gradient="from-emerald-500 to-teal-500" label={t('help.chatWithUs')} value={t('help.chatValue')} delay={240} />
        <InfoRow Icon={ClockIcon} gradient="from-amber-400 to-orange-500" label={t('help.hours')} value={t('help.hoursValue')} delay={300} />
      </div>

      <h2
        className="text-lg font-bold text-slate-800 dark:text-white mb-3 animate-fade-in-up"
        style={{ animationDelay: '340ms' }}
      >
        {t('help.faqTitle')}
      </h2>
      <div className="flex flex-col gap-3">
        {faqs.map(({ q, a }, i) => (
          <div
            key={q}
            className="rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 shadow-sm backdrop-blur-sm animate-fade-in-up"
            style={{ animationDelay: `${380 + i * 70}ms` }}
          >
            <p className="font-semibold text-slate-800 dark:text-slate-100 mb-1">{q}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
