export const onlineCard = {
  label: 'Online Purchases Visa',
  number: '1234  5678  9012  3456',
  balance: 'Le 482.10',
}

export const sendMoneyCard = {
  label: 'Send Money Visa',
  number: '9876  5432  2109  8765',
  balance: 'Le 120.00',
}

export const onlinePurchases = [
  { name: 'Amazon', amount: 'Le 45.99', date: 'Mar 22, 2026' },
  { name: 'Netflix', amount: 'Le 12.99', date: 'Mar 22, 2026' },
  { name: 'AliExpress', amount: 'Le 89.50', date: 'Mar 18, 2026' },
]

// Offline fallback for the wallet ledger — mirrors freshLedger() in
// api/_lib/ledger.js so `vite dev` (no /api) renders the same shapes prod does.
export const whatsAppTransactions = [
  {
    id: 'seed-send',
    type: 'send',
    direction: 'out',
    label: 'Sent Le 50.00 to Aisha',
    name: 'Sent Le 50.00 to Aisha',
    amountValue: 50,
    amountLabel: '−Le 50.00',
    counterparty: 'Aisha',
    reference: 'EZ-SEED1',
    meta: {},
    date: 'Mar 7, 2026',
  },
  {
    id: 'seed-receive',
    type: 'receive',
    direction: 'in',
    label: 'Received Le 20.00 from John',
    name: 'Received Le 20.00 from John',
    amountValue: 20,
    amountLabel: '+Le 20.00',
    counterparty: 'John',
    reference: 'EZ-SEED2',
    meta: {},
    date: 'Mar 5, 2026',
  },
  {
    id: 'seed-bill',
    type: 'bill',
    direction: 'out',
    label: 'Paid Le 15.00 · Electricity Bill',
    name: 'Paid Le 15.00 · Electricity Bill',
    amountValue: 15,
    amountLabel: '−Le 15.00',
    counterparty: 'Electricity Bill',
    reference: 'EZ-SEED3',
    meta: {},
    date: 'Mar 3, 2026',
  },
]
