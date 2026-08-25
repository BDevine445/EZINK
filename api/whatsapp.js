import twilio from 'twilio'
import { Redis } from '@upstash/redis'
import { onlineCard, sendMoneyCard, onlinePurchases, whatsAppTransactions } from '../src/data/mock.js'

const { MessagingResponse } = twilio.twiml

// Vercel's Upstash marketplace integration names these KV_REST_API_*;
// a standalone Upstash project names them UPSTASH_REDIS_REST_*. Accept both.
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const redis = REDIS_URL && REDIS_TOKEN ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN }) : null

// Catches receive / received / receives / receiving, plus the common
// "recieve" misspelling of each.
const RECEIVE_REGEX = /\brec(?:ei|ie)ve[ds]?\b|\brec(?:ei|ie)ving\b/i
const AMOUNT_REGEX = /(\d[\d,]*(?:\.\d+)?)/
const SENDER_REGEX = /from\s+([a-z][a-z\s]*)/i

function parseLe(value) {
  return parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0
}

function formatLe(amount) {
  return `Le ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Falls back to a per-request in-memory ledger (seeded from mock data) if
// Redis isn't configured yet, so the bot still works while storage is
// being set up — it just won't remember anything between messages.
const memoryLedgers = new Map()

function freshLedger() {
  return {
    balance: parseLe(sendMoneyCard.balance),
    transactions: [...whatsAppTransactions],
  }
}

async function getLedger(sender) {
  if (!redis) {
    if (!memoryLedgers.has(sender)) memoryLedgers.set(sender, freshLedger())
    return memoryLedgers.get(sender)
  }
  const existing = await redis.get(`ezink:ledger:${sender}`)
  return existing || freshLedger()
}

async function saveLedger(sender, ledger) {
  if (!redis) {
    memoryLedgers.set(sender, ledger)
    return
  }
  await redis.set(`ezink:ledger:${sender}`, ledger)
}

function buildMenu() {
  return [
    'Hi! 👋 Welcome to *EZINK*.',
    'Reply with a number:',
    '1️⃣ Check card balances',
    '2️⃣ Recent online purchases',
    '3️⃣ Recent WhatsApp transactions',
    '4️⃣ Help',
  ].join('\n')
}

function buildBalances(ledger) {
  return [
    `💳 *${onlineCard.label}*`,
    `Balance: ${onlineCard.balance}`,
    '',
    `💳 *${sendMoneyCard.label}*`,
    `Balance: ${formatLe(ledger.balance)}`,
  ].join('\n')
}

function buildTransactions(list) {
  return list.map((tx) => `• ${tx.name}${tx.amount ? ` — ${tx.amount}` : ''} (${tx.date})`).join('\n')
}

function buildHelp() {
  return [
    'You can ask me to:',
    '- "balance" — see your card balances',
    '- "purchases" — recent online purchases',
    '- "history" — recent WhatsApp transactions',
    '- "menu" — show this menu again',
    '',
    'You can also just tell me "I received Le 50 from John" and I\'ll add it to your Send Money balance.',
  ].join('\n')
}

function handleReceive(ledger, rawBody) {
  const amountMatch = rawBody.match(AMOUNT_REGEX)
  if (!amountMatch) {
    return "How much did you receive? Reply like \"received Le 50 from John\"."
  }

  const amount = parseFloat(amountMatch[1].replace(/,/g, ''))
  const senderMatch = rawBody.match(SENDER_REGEX)
  const from = senderMatch ? senderMatch[1].trim().replace(/[.!?]+$/, '') : null

  ledger.balance += amount
  ledger.transactions.unshift({
    name: `Received ${formatLe(amount)}${from ? ` from ${from}` : ''}`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  })

  return [
    `✅ Got it — added ${formatLe(amount)} to your *${sendMoneyCard.label}*.`,
    `New balance: ${formatLe(ledger.balance)}`,
  ].join('\n')
}

function routeMessage(ledger, rawBody) {
  const text = (rawBody || '').trim()
  const lower = text.toLowerCase()

  if (['1', 'balance', 'balances'].includes(lower)) return buildBalances(ledger)
  if (['2', 'purchases', 'purchase'].includes(lower)) return buildTransactions(onlinePurchases)
  if (['3', 'history', 'transactions'].includes(lower)) return buildTransactions(ledger.transactions)
  if (['4', 'help'].includes(lower)) return buildHelp()
  if (['hi', 'hello', 'hey', 'menu', 'start'].includes(lower)) return buildMenu()

  if (RECEIVE_REGEX.test(lower)) return handleReceive(ledger, text)

  return `Sorry, I didn't get that. 🤔\n\n${buildMenu()}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
    return
  }

  const authToken = process.env.TWILIO_AUTH_TOKEN
  if (authToken) {
    const signature = req.headers['x-twilio-signature']
    const url = `https://${req.headers['x-forwarded-host'] || req.headers.host}${req.url}`
    const valid = twilio.validateRequest(authToken, signature, url, req.body)
    if (!valid) {
      res.status(403).send('Invalid signature')
      return
    }
  }

  const sender = req.body?.From || 'anonymous'
  const ledger = await getLedger(sender)
  const reply = routeMessage(ledger, req.body?.Body)
  await saveLedger(sender, ledger)

  const twiml = new MessagingResponse()
  twiml.message(reply)

  res.setHeader('Content-Type', 'text/xml')
  res.status(200).send(twiml.toString())
}
