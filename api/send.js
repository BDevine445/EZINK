import { getLedger, saveLedger, formatLe, applySend } from './_lib/ledger.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  const amount = Number(req.body?.amount)
  if (!Number.isFinite(amount) || amount <= 0) {
    res.status(400).json({ error: 'invalid_amount' })
    return
  }

  const to = typeof req.body?.to === 'string' ? req.body.to.trim() || null : null

  const ledger = await getLedger()
  const result = applySend(ledger, amount, to)

  if (!result.ok) {
    res.status(400).json({ error: result.error, balance: formatLe(ledger.balance) })
    return
  }

  await saveLedger(ledger)
  res.status(200).json({ ok: true, balance: formatLe(ledger.balance), transaction: result.transaction })
}
