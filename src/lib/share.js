// Build a plain-text receipt for a transaction and share it via the Web
// Share API, falling back to the clipboard when share isn't available
// (desktop) or is declined.

export function receiptText(tx, t) {
  const amount = tx.amountLabel || tx.amount || ''
  return [
    `EZINK — ${t('receipt.title')}`,
    tx.name || tx.label || '',
    amount && `${t('receipt.amount')}: ${amount}`,
    tx.counterparty && `${t('receipt.party')}: ${tx.counterparty}`,
    tx.reference && `${t('receipt.reference')}: ${tx.reference}`,
    tx.date && `${t('transactionDetail.date')}: ${tx.date}`,
  ]
    .filter(Boolean)
    .join('\n')
}

// Returns 'shared' | 'copied' | 'cancelled' | 'failed'
export async function shareReceipt(tx, t) {
  const text = receiptText(tx, t)

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title: 'EZINK', text })
      return 'shared'
    } catch (err) {
      if (err && err.name === 'AbortError') return 'cancelled'
      // fall through to clipboard
    }
  }

  try {
    await navigator.clipboard.writeText(text)
    return 'copied'
  } catch {
    return 'failed'
  }
}
