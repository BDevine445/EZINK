import VisaCard from '../VisaCard'
import { HistoryIcon, ChatIcon } from '../icons'

function CardSkeleton({ delay }) {
  return (
    <div className="mb-6 animate-pulse animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" />
      <div className="flex gap-3 mt-3">
        <div className="h-12 flex-1 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-12 flex-1 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  )
}

export default function Cards({ onNavigate, onlineCard, sendMoneyCard, loading }) {
  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 animate-fade-in-up">Your EZINK Visa Cards</h1>

      {loading && (
        <>
          <CardSkeleton delay={80} />
          <CardSkeleton delay={160} />
        </>
      )}

      {!loading && (
        <>
          <VisaCard
            label={onlineCard.label}
            number={onlineCard.number}
            balance={onlineCard.balance}
            gradientClass="from-blue-500 via-indigo-500 to-cyan-500"
            secondaryLabel="Online Transactions"
            secondaryIcon={HistoryIcon}
            onSecondaryClick={() => onNavigate('history', 'online')}
            delay={80}
          />

          <VisaCard
            label={sendMoneyCard.label}
            number={sendMoneyCard.number}
            balance={sendMoneyCard.balance}
            gradientClass="from-fuchsia-500 via-violet-500 to-indigo-600"
            secondaryLabel="WhatsApp Transactions"
            secondaryIcon={ChatIcon}
            onSecondaryClick={() => onNavigate('history', 'whatsapp')}
            delay={160}
          />
        </>
      )}
    </div>
  )
}
