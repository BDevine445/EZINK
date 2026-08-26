import { useEffect, useState } from 'react'
import PhoneShell from './components/PhoneShell'
import Welcome from './components/screens/Welcome'
import Cards from './components/screens/Cards'
import History from './components/screens/History'
import WhatsAppConnect from './components/screens/WhatsAppConnect'
import Settings from './components/screens/Settings'
import Placeholder from './components/screens/Placeholder'
import TransactionDetail from './components/screens/TransactionDetail'
import SendMoney from './components/screens/SendMoney'
import Login from './components/screens/Login'
import QuickUnlock from './components/screens/QuickUnlock'
import VerifyPassword from './components/VerifyPassword'
import { useTheme } from './hooks/useTheme'
import { useAppState } from './hooks/useAppState'
import { useAuth } from './hooks/useAuth'

// Balances, card numbers, and transaction history are treated as sensitive:
// entering this cluster requires a password re-check, which stays valid
// while navigating within it but resets once the user leaves for Home/Settings.
const SENSITIVE_SCREENS = ['cards', 'history', 'transaction', 'send']

export default function App() {
  const [tab, setTab] = useState('home')
  const [screen, setScreen] = useState('home')
  const [historySubTab, setHistorySubTab] = useState('online')
  const [placeholder, setPlaceholder] = useState(null)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [theme, setTheme] = useTheme()
  const { onlineCard, sendMoneyCard, onlinePurchases, whatsAppTransactions, loading, refresh } = useAppState()
  const { authed, appUnlocked, rememberedEmail, login, unlockApp, logout, verifyPassword } = useAuth()
  const [unlocked, setUnlocked] = useState(false)
  const [pendingUnlock, setPendingUnlock] = useState(null)

  // Balances can change via the WhatsApp bot at any time, so re-fetch
  // whenever the user looks at a screen that shows them.
  useEffect(() => {
    if (screen === 'cards' || screen === 'history') refresh()
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
        setHistorySubTab(opts ?? 'online')
        setTab('history')
        setScreen('history')
      })
      return
    }
    if (target === 'placeholder') {
      goTo('placeholder', () => {
        setPlaceholder(opts)
        setScreen('placeholder')
      })
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

  function handleLogout() {
    logout()
    setUnlocked(false)
    setPendingUnlock(null)
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
        {screen === 'home' && <Welcome onNavigate={handleNavigate} />}
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
            activeSubTab={historySubTab}
            onSubTabChange={setHistorySubTab}
            onlinePurchases={onlinePurchases}
            whatsAppTransactions={whatsAppTransactions}
            loading={loading}
            onSelectTransaction={(tx) => handleNavigate('transaction', tx)}
          />
        )}
        {screen === 'transaction' && selectedTransaction && (
          <TransactionDetail
            transaction={selectedTransaction}
            onBack={() => handleNavigate('history', historySubTab)}
          />
        )}
        {screen === 'settings' && (
          <Settings theme={theme} onThemeChange={setTheme} onNavigate={handleNavigate} onLogout={handleLogout} />
        )}
        {screen === 'connect' && <WhatsAppConnect />}
        {screen === 'send' && (
          <SendMoney
            balance={sendMoneyCard.balance}
            onBack={() => handleNavigate('cards')}
            onSuccess={() => {
              refresh()
              handleNavigate('history', 'whatsapp')
            }}
          />
        )}
        {screen === 'placeholder' && placeholder && (
          <Placeholder {...placeholder} onBack={() => handleNavigate('settings')} />
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
    </>
  )
}
