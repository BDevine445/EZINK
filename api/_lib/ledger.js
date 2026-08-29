import { Redis } from '@upstash/redis'
import { sendMoneyCard } from '../../src/data/mock.js'

// Vercel's Upstash marketplace integration names these KV_REST_API_*;
// a standalone Upstash project names them UPSTASH_REDIS_REST_*. Accept both.
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const redis = REDIS_URL && REDIS_TOKEN ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN }) : null

// EZINK has one account (no login/multi-user support anywhere in the app
// yet), so the bot and the app share a single ledger rather than one per
// WhatsApp number.
//
// `:v2` — the ledger moved from untyped {name,date} rows to typed
// transactions (type/direction/amount/reference). Bumping the key orphans
// the old data and reseeds fresh rather than migrating in place.
const LEDGER_KEY = 'ezink:ledger:v2'

export function parseLe(value) {
  return parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0
}

export function formatLe(amount) {
  return `Le ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Outgoing money is guarded by the balance; incoming money always succeeds.
const OUTFLOW_TYPES = new Set(['send', 'payment', 'bill', 'airtime'])
const INFLOW_TYPES = new Set(['receive', 'topup'])

export function isKnownType(type) {
  return OUTFLOW_TYPES.has(type) || INFLOW_TYPES.has(type)
}

const REF_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

export function makeRef() {
  let out = ''
  for (let i = 0; i < 5; i++) out += REF_ALPHABET[Math.floor(Math.random() * REF_ALPHABET.length)]
  return `EZ-${out}`
}

function makeId() {
  return `tx_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

function today() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Human-readable one-liner. Still the primary display string — the WhatsApp
// bot renders transactions as plain text, and older UI reads `tx.name`.
function labelFor(type, amount, counterparty, meta) {
  const amt = formatLe(amount)
  switch (type) {
    case 'send':
      return `Sent ${amt}${counterparty ? ` to ${counterparty}` : ''}`
    case 'receive':
      return `Received ${amt}${counterparty ? ` from ${counterparty}` : ''}`
    case 'payment':
      return `Paid ${amt}${counterparty ? ` to ${counterparty}` : ''}`
    case 'bill':
      return `Paid ${amt}${counterparty ? ` · ${counterparty}` : ''}`
    case 'airtime':
      return `Airtime ${amt}${meta && meta.phone ? ` · ${meta.phone}` : ''}`
    case 'topup':
      return `Top up ${amt}${counterparty ? ` · ${counterparty}` : ''}`
    default:
      return amt
  }
}

function buildTransaction(type, amount, counterparty, meta, date) {
  const direction = OUTFLOW_TYPES.has(type) ? 'out' : 'in'
  const label = labelFor(type, amount, counterparty, meta)
  return {
    id: makeId(),
    type,
    direction,
    label,
    // Back-compat: History and the bot's transaction list read `tx.name`.
    name: label,
    amountValue: amount,
    amountLabel: `${direction === 'out' ? '−' : '+'}${formatLe(amount)}`,
    counterparty: counterparty || null,
    reference: makeRef(),
    meta: meta || {},
    date: date || today(),
  }
}

function freshLedger() {
  return {
    balance: parseLe(sendMoneyCard.balance),
    transactions: [
      buildTransaction('send', 50, 'Aisha', {}, 'Mar 7, 2026'),
      buildTransaction('receive', 20, 'John', {}, 'Mar 5, 2026'),
      buildTransaction('bill', 15, 'Electricity Bill', {}, 'Mar 3, 2026'),
    ],
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

// Single business rule for every money movement — used by the in-app flows
// (via /api/transaction) and the WhatsApp bot (via the applySend/applyReceive
// wrappers below), so "insufficient funds" and transaction formatting can't
// drift between entry points.
//
//   applyTransaction(ledger, { type, amount, counterparty?, meta? })
//     type 'send' | 'receive' | 'payment' | 'bill' | 'airtime' | 'topup'
//     -> { ok: true, transaction } | { ok: false, error }
export function applyTransaction(ledger, { type, amount, counterparty = null, meta = {} } = {}) {
  const amt = Number(amount)
  if (!Number.isFinite(amt) || amt <= 0) {
    return { ok: false, error: 'invalid_amount' }
  }
  if (!isKnownType(type)) {
    return { ok: false, error: 'invalid_type' }
  }

  const outgoing = OUTFLOW_TYPES.has(type)
  if (outgoing && amt > ledger.balance) {
    return { ok: false, error: 'insufficient_funds' }
  }

  ledger.balance += outgoing ? -amt : amt
  const transaction = buildTransaction(type, amt, counterparty, meta)
  ledger.transactions.unshift(transaction)
  return { ok: true, transaction }
}

// Thin wrappers kept so the WhatsApp bot (api/whatsapp.js) needs no changes.
export function applyReceive(ledger, amount, from) {
  return applyTransaction(ledger, { type: 'receive', amount, counterparty: from })
}

export function applySend(ledger, amount, to) {
  return applyTransaction(ledger, { type: 'send', amount, counterparty: to })
}
