import { Redis } from '@upstash/redis'
import { sendMoneyCard, whatsAppTransactions } from '../../src/data/mock.js'

// Vercel's Upstash marketplace integration names these KV_REST_API_*;
// a standalone Upstash project names them UPSTASH_REDIS_REST_*. Accept both.
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const redis = REDIS_URL && REDIS_TOKEN ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN }) : null

// EZINK has one account (no login/multi-user support anywhere in the app
// yet), so the bot and the app share a single ledger rather than one per
// WhatsApp number.
const LEDGER_KEY = 'ezink:ledger:main'

export function parseLe(value) {
  return parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0
}

export function formatLe(amount) {
  return `Le ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function freshLedger() {
  return {
    balance: parseLe(sendMoneyCard.balance),
    transactions: [...whatsAppTransactions],
  }
}

// Falls back to a per-process in-memory ledger if Redis isn't configured
// yet, so the bot still works while storage is being set up — it just
// won't remember anything between cold starts.
let memoryLedger = null

export async function getLedger() {
  if (!redis) {
    if (!memoryLedger) memoryLedger = freshLedger()
    return memoryLedger
  }
  const existing = await redis.get(LEDGER_KEY)
  return existing || freshLedger()
}

export async function saveLedger(ledger) {
  if (!redis) {
    memoryLedger = ledger
    return
  }
  await redis.set(LEDGER_KEY, ledger)
}

function addTransaction(ledger, name) {
  const tx = {
    name,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }
  ledger.transactions.unshift(tx)
  return tx
}

// Shared business rules, used by both the WhatsApp bot and the in-app
// send-money form, so "insufficient funds" and transaction formatting
// can't drift between the two entry points.
export function applyReceive(ledger, amount, from) {
  ledger.balance += amount
  const transaction = addTransaction(ledger, `Received ${formatLe(amount)}${from ? ` from ${from}` : ''}`)
  return { ok: true, transaction }
}

export function applySend(ledger, amount, to) {
  if (amount > ledger.balance) {
    return { ok: false, error: 'insufficient_funds' }
  }
  ledger.balance -= amount
  const transaction = addTransaction(ledger, `Sent ${formatLe(amount)}${to ? ` to ${to}` : ''}`)
  return { ok: true, transaction }
}
