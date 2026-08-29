import { useState } from 'react'
import AmountField from '../AmountField'
import { useTranslation } from '../../i18n/LanguageContext'

// Collects an amount + optional recipient, then hands off to PaymentFlow
// (via onSubmit) which owns the confirm / password / API / receipt steps.
export default function SendMoney({ balance, initialAmount = '', initialTo = '', onBack, onSubmit }) {
  const { t, isRtl } = useTranslation()
  const [amount, setAmount] = useState(initialAmount)
  const [to, setTo] = useState(initialTo)
  const [error, setError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const parsed = Number(amount)
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setError(t('sendMoney.errorInvalidAmount'))
      return
    }
    setError(null)
    onSubmit({ amount: parsed, counterparty: to.trim() || undefined })
  }

  return (
    <div className="pb-4">
      <button
        onClick={onBack}
        className="mb-8 text-sm font-semibold text-indigo-600 dark:text-indigo-400 animate-fade-in-up"
      >
        {isRtl ? '→' : '←'} {t('common.back')}
      </button>

      <h1
        className="text-3xl font-bold text-slate-800 dark:text-white mb-1 animate-fade-in-up"
        style={{ animationDelay: '40ms' }}
      >
        {t('sendMoney.title')}
      </h1>
      <p
        className="text-slate-500 dark:text-slate-400 mb-8 animate-fade-in-up"
        style={{ animationDelay: '80ms' }}
      >
        {t('sendMoney.availableBalance', { balance })}
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 animate-fade-in-up"
        style={{ animationDelay: '120ms' }}
      >
        <AmountField value={amount} onChange={setAmount} label={t('sendMoney.amountLabel')} autoFocus />

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{t('sendMoney.toLabel')}</span>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder={t('sendMoney.toPlaceholder')}
            className="rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 font-medium text-slate-800 dark:text-slate-100 shadow-sm backdrop-blur-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        {error && <p className="text-sm font-medium text-rose-500">{error}</p>}

        <button
          type="submit"
          className="mt-2 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-4 font-semibold text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:shadow-xl active:scale-[0.98]"
        >
          {t('sendMoney.send')}
        </button>
      </form>
    </div>
  )
}
