import { useEffect, useState } from 'react'
import PhoneShell from './components/PhoneShell'
import Welcome from './components/screens/Welcome'
import Cards from './components/screens/Cards'
import History from './components/screens/History'
import WhatsAppConnect from './components/screens/WhatsAppConnect'
import Settings from './components/screens/Settings'
import Placeholder from './components/screens/Placeholder'
import TransactionDetail from './components/screens/TransactionDetail'
import { useTheme } from './hooks/useTheme'
import { useAppState } from './hooks/useAppState'

export default function App() {
  const [tab, setTab] = useState('home')
  const [screen, setScreen] = useState('home')
  const [historySubTab, setHistorySubTab] = useState('online')
  const [placeholder, setPlaceholder] = useState(null)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [theme, setTheme] = useTheme()
  const { onlineCard, sendMoneyCard, onlinePurchases, whatsAppTransactions, loading, refresh } = useAppState()

  // Balances can change via the WhatsApp bot at any time, so re-fetch
  // whenever the user looks at a screen that shows them.
  useEffect(() => {
    if (screen === 'cards' || screen === 'history') refresh()
  }, [screen, refresh])

  function handleTabChange(key) {
    setTab(key)
    setScreen(key)
  }

  function handleNavigate(target, opts) {
    if (target === 'connect') {
      setScreen('connect')
      return
    }
    if (target === 'history') {
      setHistorySubTab(opts ?? 'online')
      setTab('history')
      setScreen('history')
      return
    }
    if (target === 'placeholder') {
      setPlaceholder(opts)
      setScreen('placeholder')
      return
    }
    if (target === 'transaction') {
      setSelectedTransaction(opts)
      setScreen('transaction')
      return
    }
    setTab(target)
    setScreen(target)
  }

  return (
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
        <Settings theme={theme} onThemeChange={setTheme} onNavigate={handleNavigate} />
      )}
      {screen === 'connect' && <WhatsAppConnect />}
      {screen === 'placeholder' && placeholder && (
        <Placeholder {...placeholder} onBack={() => handleNavigate('settings')} />
      )}
    </PhoneShell>
  )
}
