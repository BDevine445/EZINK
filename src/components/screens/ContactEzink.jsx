import { useTranslation } from '../../i18n/LanguageContext'
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, GlobeIcon } from '../icons'
import InfoRow from '../InfoRow'

export default function ContactEzink({ onBack }) {
  const { t, isRtl } = useTranslation()

  return (
    <div className="pb-4">
      <button onClick={onBack} className="mb-6 text-sm font-semibold text-indigo-600 dark:text-indigo-400 animate-fade-in-up">
        {isRtl ? '→' : '←'} {t('common.back')}
      </button>

      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-1 animate-fade-in-up" style={{ animationDelay: '40ms' }}>
        {t('contact.title')}
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
        {t('contact.intro')}
      </p>

      <div className="flex flex-col gap-3">
        <InfoRow Icon={PhoneIcon} gradient="from-blue-500 to-indigo-500" label={t('contact.phoneLabel')} value={t('contact.phoneValue')} delay={120} />
        <InfoRow Icon={MailIcon} gradient="from-sky-500 to-blue-500" label={t('contact.emailLabel')} value={t('contact.emailValue')} delay={180} />
        <InfoRow Icon={MapPinIcon} gradient="from-emerald-500 to-teal-500" label={t('contact.addressLabel')} value={t('contact.addressValue')} delay={240} />
        <InfoRow Icon={ClockIcon} gradient="from-amber-400 to-orange-500" label={t('contact.hoursLabel')} value={t('contact.hoursValue')} delay={300} />
        <InfoRow Icon={GlobeIcon} gradient="from-fuchsia-500 to-violet-500" label={t('contact.socialLabel')} value={t('contact.socialValue')} delay={360} />
      </div>
    </div>
  )
}
