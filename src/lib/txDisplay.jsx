import {
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
  ReceiptIcon,
  SignalIcon,
  ScanIcon,
  PlusIcon,
  CardsIcon,
  ClockIcon,
} from '../components/icons'

export const TYPE_ICON = {
  send: ArrowUpRightIcon,
  receive: ArrowDownLeftIcon,
  payment: ScanIcon,
  bill: ReceiptIcon,
  airtime: SignalIcon,
  topup: PlusIcon,
  online: CardsIcon,
}

export const TYPE_GRADIENT = {
  send: 'from-fuchsia-500 to-violet-500',
  receive: 'from-emerald-500 to-teal-500',
  payment: 'from-blue-500 to-indigo-500',
  bill: 'from-cyan-500 to-blue-500',
  airtime: 'from-rose-500 to-pink-500',
  topup: 'from-amber-400 to-orange-500',
  online: 'from-slate-500 to-slate-600',
}

export function iconFor(type) {
  return TYPE_ICON[type] || ClockIcon
}

// Fold the typed ledger shape and the legacy {name,date} / online-purchase
// {name,amount,date} shapes into one row model the UI can rely on.
export function normalizeTx(tx, forcedType) {
  const type = forcedType || tx.type || 'send'
  const direction =
    tx.direction ||
    (type === 'online' ? 'out' : type === 'receive' || type === 'topup' ? 'in' : 'out')
  const amountLabel =
    tx.amountLabel || (tx.amount ? `${direction === 'in' ? '+' : '−'}${tx.amount}` : null)
  return {
    ...tx,
    type,
    direction,
    amountLabel,
    name: tx.name || tx.label || '',
  }
}
