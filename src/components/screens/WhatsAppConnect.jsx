import { DownloadIcon, LinkTapIcon, ChatIcon } from '../icons'
import { useTranslation } from '../../i18n/LanguageContext'

const STEPS = [
  { Icon: DownloadIcon, gradient: 'from-blue-500 to-indigo-500', key: 'step1' },
  { Icon: LinkTapIcon, gradient: 'from-cyan-500 to-teal-500', key: 'step2' },
  { Icon: ChatIcon, gradient: 'from-fuchsia-500 to-violet-500', key: 'step3' },
]

// Twilio's shared WhatsApp Sandbox number — same for every account testing
// the sandbox. Override via env vars once you have a dedicated number.
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '14155238886'
const WHATSAPP_PREFILL = import.meta.env.VITE_WHATSAPP_JOIN_CODE || 'join tongue-either'

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`

export default function WhatsAppConnect() {
  const { t } = useTranslation()
  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-1 animate-fade-in-up">{t('whatsappConnect.title')}</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8 animate-fade-in-up" style={{ animationDelay: '60ms' }}>
        {t('whatsappConnect.subtitle')}
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {STEPS.map(({ Icon, gradient, key }, i) => (
          <div
            key={key}
            className="flex items-center gap-4 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md animate-fade-in-up"
            style={{ animationDelay: `${120 + i * 90}ms` }}
          >
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${gradient}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-100">
              <span className="mr-1 text-slate-400 dark:text-slate-500">{i + 1}.</span>
              {t(`whatsappConnect.${key}`)}
            </span>
          </div>
        ))}
      </div>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-4 text-center font-semibold text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30 active:scale-[0.98] animate-fade-in-up"
        style={{ animationDelay: '420ms' }}
      >
        {t('whatsappConnect.link')}
      </a>
    </div>
  )
}
