import twilio from 'twilio'
import { onlineCard, sendMoneyCard, onlinePurchases, whatsAppTransactions } from '../src/data/mock.js'

const { MessagingResponse } = twilio.twiml

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

function buildBalances() {
  return [
    `💳 *${onlineCard.label}*`,
    `Balance: ${onlineCard.balance}`,
    '',
    `💳 *${sendMoneyCard.label}*`,
    `Balance: ${sendMoneyCard.balance}`,
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
  ].join('\n')
}

function routeMessage(rawBody) {
  const text = (rawBody || '').trim().toLowerCase()

  if (['1', 'balance', 'balances'].includes(text)) return buildBalances()
  if (['2', 'purchases', 'purchase'].includes(text)) return buildTransactions(onlinePurchases)
  if (['3', 'history', 'transactions'].includes(text)) return buildTransactions(whatsAppTransactions)
  if (['4', 'help'].includes(text)) return buildHelp()
  if (['hi', 'hello', 'hey', 'menu', 'start'].includes(text)) return buildMenu()

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

  const reply = routeMessage(req.body?.Body)

  const twiml = new MessagingResponse()
  twiml.message(reply)

  res.setHeader('Content-Type', 'text/xml')
  res.status(200).send(twiml.toString())
}
