import { onlineCard, sendMoneyCard, onlinePurchases } from '../src/data/mock.js'
import { getLedger, formatLe } from './_lib/ledger.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed')
    return
  }

  const ledger = await getLedger()

  res.status(200).json({
    onlineCard,
    sendMoneyCard: { ...sendMoneyCard, balance: formatLe(ledger.balance) },
    onlinePurchases,
    whatsAppTransactions: ledger.transactions,
  })
}
