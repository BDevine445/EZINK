import { useState } from 'react'
import { CheckIcon, ShareIcon } from './icons'
import { shareReceipt } from '../lib/share'
import { useTranslation } from '../i18n/LanguageContext'

// Full-screen success state shown after any completed money movement.
export default function Receipt({ transaction, onDone }) {
  const { t } = useTranslation()
  const [shareMsg, setShareMsg] = useState(null)

  const tx = transaction
  const inbound = tx.direction === 'in'
  const amount = tx.amountLabel || tx.amount || ''

  async function handleShare() {
    const result = await shareReceipt(tx, t)
    if (result === 'copied') setShareMsg(t('common.copied'))
    else if (result === 'failed') setShareMsg(t('error.generic'))
  }

  const rows = [
    tx.reference && [t('receipt.reference'), tx.reference],
    tx.date && [t('transactionDetail.date'), tx.date],
  ].filter(Boolean)

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 overflow-y-auto bg-gradient-to-b from-slate-50 via-indigo-50/60 to-cyan-50/50 px-8 py-12 text-center dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-xl shadow-teal-500/30 animate-scale-in">
        <CheckIcon className="h-9 w-9" />
      </span>

      <div className="animate-fade-in-up">
        <p className="text-slate-500 dark:text-slate-400">{t('receipt.success')}</p>
        <p
          className={`mt-1 text-4xl font-bold ${
            inbound ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-white'
          }`}
        >
          {amount}
        </p>
        {tx.counterparty && (
          <p className="mt-2 text-slate-600 dark:text-slate-300">{tx.counterparty}</p>
        )}
      </div>

      {rows.length > 0 && (
        <div className="w-full max-w-xs flex flex-col gap-2 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-3 text-sm shadow-sm backdrop-blur-sm"
            >
              <span className="text-slate-500 dark:text-slate-400">{label}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">{value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="w-full max-w-xs flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: '140ms' }}>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-sm transition-all duration-200 active:scale-95"
        >
          <ShareIcon className="h-4 w-4" />
          {shareMsg || t('receipt.share')}
        </button>
        <button
          onClick={onDone}
          className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 active:scale-[0.98]"
        >
          {t('receipt.done')}
        </button>
      </div>
    </div>
  )
}
