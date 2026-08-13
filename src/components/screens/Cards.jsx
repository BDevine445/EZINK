import VisaCard from '../VisaCard'
import { HistoryIcon, ChatIcon } from '../icons'
import { onlineCard, sendMoneyCard } from '../../data/mock'

export default function Cards({ onNavigate }) {
  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 animate-fade-in-up">Your EZINK Visa Cards</h1>

      <VisaCard
        label={onlineCard.label}
        number={onlineCard.number}
        gradientClass="from-blue-500 via-indigo-500 to-cyan-500"
        secondaryLabel="Online Transactions"
        secondaryIcon={HistoryIcon}
        onSecondaryClick={() => onNavigate('history', 'online')}
        delay={80}
      />

      <VisaCard
        label={sendMoneyCard.label}
        number={sendMoneyCard.number}
        gradientClass="from-fuchsia-500 via-violet-500 to-indigo-600"
        secondaryLabel="WhatsApp Transactions"
        secondaryIcon={ChatIcon}
        onSecondaryClick={() => onNavigate('history', 'whatsapp')}
        delay={160}
      />
    </div>
  )
}
