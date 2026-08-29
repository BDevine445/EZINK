import { useState } from 'react'
import { ShareIcon } from '../icons'
import { normalizeTx, iconFor, TYPE_GRADIENT } from '../../lib/txDisplay'
import { shareReceipt } from '../../lib/share'
import { useTranslation } from '../../i18n/LanguageContext'

const TYPE_LABEL_KEY = {
  send: 'transactionDetail.typeSend',
  receive: 'transactionDetail.typeReceive',
  payment: 'transactionDetail.typePayment',
  bill: 'transactionDetail.typeBill',
  airtime: 'transactionDetail.typeAirtime',
  topup: 'transactionDetail.typeTopup',
  online: 'transactionDetail.typeOnline',
}

export default function TransactionDetail({ transaction, onBack }) {
  const { t, isRtl } = useTranslation()
  const [shareMsg, setShareMsg] = useState(null)

  if (!transaction) return null

  const tx = normalizeTx(transaction)
  const Icon = iconFor(tx.type)
  const amount = tx.amountLabel || tx.amount
  const inbound = tx.direction === 'in'
  const meta = tx.meta || {}

  const rows = [[t('transactionDetail.date'), tx.date]]
  rows.push([t('transactionDetail.status'), t('transactionDetail.completed'), 'ok'])
  if (TYPE_LABEL_KEY[tx.type]) rows.push([t('transactionDetail.type'), t(TYPE_LABEL_KEY[tx.type])])
  if (tx.reference) rows.push([t('transactionDetail.reference'), tx.reference])
  if (tx.type === 'bill' && meta.account) rows.push([t('transactionDetail.account'), meta.account])
  if (tx.type === 'bill' && meta.token) rows.push([t('transactionDetail.token'), meta.token])
  if (tx.type === 'airtime' && meta.phone) rows.push([t('transactionDetail.phone'), meta.phone])
  if (tx.type === 'airtime' && tx.counterparty) rows.push([t('transactionDetail.network'), tx.counterparty])
  if (tx.type === 'topup' && tx.counterparty) rows.push([t('transactionDetail.source'), tx.counterparty])

  async function handleShare() {
    const result = await shareReceipt(tx, t)
    if (result === 'copied') setShareMsg(t('common.copied'))
    else if (result === 'failed') setShareMsg(t('error.generic'))
  }

  return (
    <div className="pb-4">
      <button
        onClick={onBack}
        className="mb-8 text-sm font-semibold text-indigo-600 dark:text-indigo-400 animate-fade-in-up"
      >
        {isRtl ? '→' : '←'} {t('common.back')}
      </button>

      <div className="flex flex-col items-center gap-4 pt-6 text-center animate-fade-in-up" style={{ animationDelay: '60ms' }}>
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg ${
            TYPE_GRADIENT[tx.type] || 'from-indigo-500 to-blue-500'
          }`}
        >
          <Icon className="h-7 w-7" />
        </span>
        <h1 className="max-w-xs text-2xl font-bold text-slate-800 dark:text-white">{tx.name}</h1>
        {amount && (
          <p
            className={`text-3xl font-bold ${
              inbound ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-white'
            }`}
          >
            {amount}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
        {rows.map(([label, value, tone]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 px-4 py-4 shadow-sm backdrop-blur-sm"
          >
            <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
            <span
              className={`font-semibold ${
                tone === 'ok' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-100'
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {tx.reference && (
        <button
          onClick={handleShare}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-sm transition-all duration-200 active:scale-[0.98] animate-fade-in-up"
          style={{ animationDelay: '180ms' }}
        >
          <ShareIcon className="h-4 w-4" />
          {shareMsg || t('transactionDetail.shareReceipt')}
        </button>
      )}
    </div>
  )
}
