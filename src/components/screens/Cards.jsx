import VisaCard from '../VisaCard'
import { HistoryIcon, ChatIcon } from '../icons'
import { onlineCard, sendMoneyCard } from '../../data/mock'

export default function Cards({ onNavigate }) {
  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Your EZINK Visa Cards</h1>

      <VisaCard
        label={onlineCard.label}
        number={onlineCard.number}
        gradientClass="from-sky-500 to-blue-700"
        secondaryLabel="Online Transactions"
        secondaryIcon={HistoryIcon}
        onSecondaryClick={() => onNavigate('history', 'online')}
      />

      <VisaCard
        label={sendMoneyCard.label}
        number={sendMoneyCard.number}
        gradientClass="from-orange-400 to-amber-600"
        secondaryLabel="WhatsApp Transactions"
        secondaryIcon={ChatIcon}
        onSecondaryClick={() => onNavigate('history', 'whatsapp')}
      />
    </div>
  )
}
