import twilio from 'twilio'
import { onlineCard, sendMoneyCard, onlinePurchases } from '../src/data/mock.js'
import { getLedger, saveLedger, formatLe } from './_lib/ledger.js'

const { MessagingResponse } = twilio.twiml

// Catches receive / received / receives / receiving, plus the common
// "recieve" misspelling of each.
const RECEIVE_REGEX = /\brec(?:ei|ie)ve[ds]?\b|\brec(?:ei|ie)ving\b/i
const AMOUNT_REGEX = /(\d[\d,]*(?:\.\d+)?)/
const SENDER_REGEX = /from\s+([a-z][a-z\s]*)/i

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

  const ledger = await getLedger()
  const reply = routeMessage(ledger, req.body?.Body)
  await saveLedger(ledger)

  const twiml = new MessagingResponse()
  twiml.message(reply)

  res.setHeader('Content-Type', 'text/xml')
  res.status(200).send(twiml.toString())
}
