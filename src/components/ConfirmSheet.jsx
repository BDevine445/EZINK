import { useTranslation } from '../i18n/LanguageContext'

function formatLe(amount) {
  return `Le ${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Presentational bottom sheet that summarises a pending money movement.
// Orchestration (password gate, API call) lives in PaymentFlow.
export default function ConfirmSheet({ payment, balance, error, submitting, onConfirm, onCancel }) {
  const { t } = useTranslation()
  const inbound = payment.type === 'topup'
  const walletName = t('confirm.walletName')

  const rows = inbound
    ? [
        payment.counterparty && [t('confirm.from'), payment.counterparty],
        [t('confirm.to'), walletName],
      ]
    : [
        [t('confirm.from'), balance ? `${walletName} · ${balance}` : walletName],
        payment.counterparty && [t('confirm.to'), payment.counterparty],
      ]

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm sm:items-center animate-fade-in-up">
      <div className="w-full max-w-sm rounded-t-3xl border border-white/60 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl animate-scale-in sm:rounded-3xl">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          {t(inbound ? 'confirm.youAreAdding' : 'confirm.youArePaying')}
        </p>
        <p className="mt-1 text-center text-4xl font-bold text-slate-800 dark:text-white">
          {formatLe(payment.amount)}
        </p>

        <div className="mt-6 flex flex-col gap-2">
          {rows.filter(Boolean).map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/70 px-4 py-3 text-sm"
            >
              <span className="text-slate-500 dark:text-slate-400">{label}</span>
              <span className="max-w-[60%] truncate font-semibold text-slate-800 dark:text-slate-100">{value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/70 px-4 py-3 text-sm">
            <span className="text-slate-500 dark:text-slate-400">{t('confirm.fee')}</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{t('confirm.free')}</span>
          </div>
        </div>

        {error && <p className="mt-3 text-sm font-medium text-rose-500">{error}</p>}

        <div className="mt-5 flex gap-3">
          <button
            onClick={onCancel}
            disabled={submitting}
            className="flex-1 rounded-2xl border border-white/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all duration-200 active:scale-95 disabled:opacity-60"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={onConfirm}
            disabled={submitting}
            className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all duration-200 active:scale-95 disabled:opacity-60"
          >
            {submitting ? t('sendMoney.sending') : t('confirm.confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}
