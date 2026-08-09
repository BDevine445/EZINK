import { onlinePurchases, whatsAppTransactions } from '../../data/mock'

export default function History({ activeSubTab, onSubTabChange }) {
  const isOnline = activeSubTab === 'online'

  return (
    <div className="pb-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-5">Transaction History</h1>

      <div className="flex bg-slate-100 rounded-xl p-1 mb-5">
        <button
          onClick={() => onSubTabChange('online')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
            isOnline ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'
          }`}
        >
          Online Purchases
        </button>
        <button
          onClick={() => onSubTabChange('whatsapp')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
            !isOnline ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500'
          }`}
        >
          WhatsApp History
        </button>
      </div>

      {isOnline ? (
        <ul className="flex flex-col gap-3">
          {onlinePurchases.map((tx) => (
            <li key={tx.name} className="flex items-center justify-between bg-white border border-slate-100 shadow-sm rounded-xl px-4 py-3">
              <div>
                <p className="font-semibold text-slate-800">{tx.name}</p>
                <p className="text-xs text-slate-400">{tx.date}</p>
              </div>
              <span className="font-semibold text-slate-800">{tx.amount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h2 className="font-bold text-slate-800 mb-3">WhatsApp Transactions</h2>
          <ul className="flex flex-col gap-3">
            {whatsAppTransactions.map((tx) => (
              <li key={tx.name} className="flex items-center justify-between bg-white border border-slate-100 shadow-sm rounded-xl px-4 py-3">
                <p className="font-semibold text-slate-800">{tx.name}</p>
                <span className="text-xs text-slate-400">{tx.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
