import { useEffect, useState } from 'react'
import PhoneShell from './components/PhoneShell'
import Home from './components/screens/Home'
import Cards from './components/screens/Cards'
import History from './components/screens/History'
import WhatsAppConnect from './components/screens/WhatsAppConnect'
import Settings from './components/screens/Settings'
import SecuritySettings from './components/screens/SecuritySettings'
import LanguageSettings from './components/screens/LanguageSettings'
import HelpSupport from './components/screens/HelpSupport'
import ContactEzink from './components/screens/ContactEzink'
import TermsPrivacy from './components/screens/TermsPrivacy'
import Placeholder from './components/screens/Placeholder'
import TransactionDetail from './components/screens/TransactionDetail'
import SendMoney from './components/screens/SendMoney'
import Login from './components/screens/Login'
import QuickUnlock from './components/screens/QuickUnlock'
import VerifyPassword from './components/VerifyPassword'
import PaymentFlow from './components/PaymentFlow'
import { ScanIcon, ArrowDownLeftIcon, PlusIcon, ReceiptIcon, SignalIcon } from './components/icons'
import { useTheme } from './hooks/useTheme'
import { useAppState } from './hooks/useAppState'
import { useAuth } from './hooks/useAuth'

// Balances, card numbers, transaction history, and security settings are
// treated as sensitive: entering this cluster requires a password re-check,
// which stays valid while navigating within it but resets once the user
// leaves for Home/Settings. (Sending money isn't gated here — PaymentFlow
// re-verifies at the moment of confirming, which is the meaningful check.)
const SENSITIVE_SCREENS = ['cards', 'history', 'transaction', 'security']

// Sub-screens reached from Settings that aren't bottom-nav tabs — navigating
// to them should only change the current screen, not the active tab.
const SETTINGS_SUBSCREENS = ['security', 'language', 'help', 'contact', 'terms']

// Wallet-hub actions whose screens land in Phase 2 — until then they open a
// "coming soon" placeholder rather than a dead tile.
const COMING_SOON = {
  scan: { labelKey: 'home.actions.scan', Icon: ScanIcon, gradient: 'from-blue-500 to-indigo-500' },
  receive: { labelKey: 'home.actions.receive', Icon: ArrowDownLeftIcon, gradient: 'from-emerald-500 to-teal-500' },
  topup: { labelKey: 'home.actions.topup', Icon: PlusIcon, gradient: 'from-amber-400 to-orange-500' },
  bills: { labelKey: 'home.actions.bills', Icon: ReceiptIcon, gradient: 'from-cyan-500 to-blue-500' },
  airtime: { labelKey: 'home.actions.airtime', Icon: SignalIcon, gradient: 'from-rose-500 to-pink-500' },
}

export default function App() {
  const [tab, setTab] = useState('home')
  const [screen, setScreen] = useState('home')
  const [historyFilter, setHistoryFilter] = useState('all')
  const [placeholder, setPlaceholder] = useState(null)
  const [placeholderOrigin, setPlaceholderOrigin] = useState('settings')
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [payment, setPayment] = useState(null)
  const [theme, setTheme] = useTheme()
  const { onlineCard, sendMoneyCard, onlinePurchases, whatsAppTransactions, loading, refresh } = useAppState()
  const { authed, appUnlocked, rememberedEmail, login, unlockApp, logout, verifyPassword } = useAuth()
  const [unlocked, setUnlocked] = useState(false)
  const [pendingUnlock, setPendingUnlock] = useState(null)

  // Balances can change via the WhatsApp bot at any time, so re-fetch
  // whenever the user looks at a screen that shows them.
  useEffect(() => {
    if (screen === 'home' || screen === 'cards' || screen === 'history') refresh()
  }, [screen, refresh])

  function goTo(screenKey, apply) {
    if (SENSITIVE_SCREENS.includes(screenKey)) {
      if (unlocked) {
        apply()
      } else {
        setPendingUnlock(() => apply)
      }
    } else {
      setUnlocked(false)
      apply()
    }
  }

  function handleTabChange(key) {
    goTo(key, () => {
      setTab(key)
      setScreen(key)
    })
  }

  function handleNavigate(target, opts) {
    if (target === 'connect') {
      goTo('connect', () => setScreen('connect'))
      return
    }
    if (target === 'history') {
      goTo('history', () => {
        setHistoryFilter(opts ?? 'all')
        setTab('history')
        setScreen('history')
      })
      return
    }
    if (COMING_SOON[target]) {
      const origin = screen
      goTo('placeholder', () => {
        setPlaceholderOrigin(origin)
        setPlaceholder(COMING_SOON[target])
        setScreen('placeholder')
      })
      return
    }
    if (target === 'placeholder') {
      const origin = screen
      goTo('placeholder', () => {
        setPlaceholderOrigin(origin)
        setPlaceholder(opts)
        setScreen('placeholder')
      })
      return
    }
    if (SETTINGS_SUBSCREENS.includes(target)) {
      goTo(target, () => setScreen(target))
      return
    }
    if (target === 'transaction') {
      goTo('transaction', () => {
        setSelectedTransaction(opts)
        setScreen('transaction')
      })
      return
    }
    if (target === 'send') {
      goTo('send', () => setScreen('send'))
      return
    }
    goTo(target, () => {
      setTab(target)
      setScreen(target)
    })
  }

  function beginPayment(next) {
    setPayment(next)
  }

  function handleLogout() {
    logout()
    setUnlocked(false)
    setPendingUnlock(null)
    setPayment(null)
    setTab('home')
    setScreen('home')
  }

  if (!authed) {
    return <Login rememberedEmail={rememberedEmail} onLogin={login} />
  }

  if (!appUnlocked) {
    return <QuickUnlock rememberedEmail={rememberedEmail} onUnlock={unlockApp} />
  }

  return (
    <>
      <PhoneShell activeTab={tab} onTabChange={handleTabChange}>
        {screen === 'home' && (
          <Home
            onNavigate={handleNavigate}
            balance={sendMoneyCard.balance}
            recent={whatsAppTransactions}
            loading={loading}
          />
        )}
        {screen === 'cards' && (
          <Cards
            onNavigate={handleNavigate}
            onlineCard={onlineCard}
            sendMoneyCard={sendMoneyCard}
            loading={loading}
          />
        )}
        {screen === 'history' && (
          <History
            activeFilter={historyFilter}
            onFilterChange={setHistoryFilter}
            onlinePurchases={onlinePurchases}
            whatsAppTransactions={whatsAppTransactions}
            loading={loading}
            onSelectTransaction={(tx) => handleNavigate('transaction', tx)}
          />
        )}
        {screen === 'transaction' && selectedTransaction && (
          <TransactionDetail
            transaction={selectedTransaction}
            onBack={() => handleNavigate('history', historyFilter)}
          />
        )}
        {screen === 'settings' && (
          <Settings theme={theme} onThemeChange={setTheme} onNavigate={handleNavigate} onLogout={handleLogout} />
        )}
        {screen === 'security' && (
          <SecuritySettings onNavigate={handleNavigate} onBack={() => handleNavigate('settings')} />
        )}
        {screen === 'language' && <LanguageSettings onBack={() => handleNavigate('settings')} />}
        {screen === 'help' && <HelpSupport onBack={() => handleNavigate('settings')} />}
        {screen === 'contact' && <ContactEzink onBack={() => handleNavigate('settings')} />}
        {screen === 'terms' && <TermsPrivacy onBack={() => handleNavigate('settings')} />}
        {screen === 'connect' && <WhatsAppConnect />}
        {screen === 'send' && (
          <SendMoney
            balance={sendMoneyCard.balance}
            onBack={() => handleNavigate('cards')}
            onSubmit={({ amount, counterparty }) =>
              beginPayment({ type: 'send', amount, counterparty, returnTo: 'history' })
            }
          />
        )}
        {screen === 'placeholder' && placeholder && (
          <Placeholder {...placeholder} onBack={() => handleNavigate(placeholderOrigin)} />
        )}
      </PhoneShell>

      {pendingUnlock && (
        <VerifyPassword
          onVerify={verifyPassword}
          onSuccess={() => {
            const apply = pendingUnlock
            setUnlocked(true)
            setPendingUnlock(null)
            apply()
          }}
          onCancel={() => setPendingUnlock(null)}
        />
      )}

      {payment && (
        <PaymentFlow
          payment={payment}
          balance={sendMoneyCard.balance}
          verifyPassword={verifyPassword}
          onCancel={() => setPayment(null)}
          onComplete={() => {
            // The password entered in PaymentFlow is a fresh re-verification,
            // so drop the user straight into History without gating again.
            setPayment(null)
            setUnlocked(true)
            refresh()
            setHistoryFilter('all')
            setTab('history')
            setScreen('history')
          }}
        />
      )}
    </>
  )
}
