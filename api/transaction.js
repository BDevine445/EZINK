import { getLedger, saveLedger, formatLe, applyTransaction, isKnownType } from './_lib/ledger.js'

// Unified entry point for every in-app money movement: Send, Scan-to-pay,
// Top Up, Pay Bills, Airtime. Body: { type, amount, counterparty?, meta? }.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  const body = req.body || {}
  const { type, counterparty, meta } = body

  if (!isKnownType(type)) {
    res.status(400).json({ error: 'invalid_type' })
    return
  }

  const amount = Number(body.amount)
  if (!Number.isFinite(amount) || amount <= 0) {
    res.status(400).json({ error: 'invalid_amount' })
    return
  }

  const ledger = await getLedger()
  const result = applyTransaction(ledger, {
    type,
    amount,
    counterparty: typeof counterparty === 'string' ? counterparty.trim() || null : null,
    meta: meta && typeof meta === 'object' && !Array.isArray(meta) ? meta : {},
  })

  if (!result.ok) {
    res.status(400).json({ error: result.error, balance: formatLe(ledger.balance) })
    return
  }

  await saveLedger(ledger)
  res.status(200).json({ ok: true, balance: formatLe(ledger.balance), transaction: result.transaction })
}
