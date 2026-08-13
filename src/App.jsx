import { useState } from 'react'
import PhoneShell from './components/PhoneShell'
import Welcome from './components/screens/Welcome'
import Cards from './components/screens/Cards'
import History from './components/screens/History'
import WhatsAppConnect from './components/screens/WhatsAppConnect'
import Settings from './components/screens/Settings'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const [tab, setTab] = useState('home')
  const [screen, setScreen] = useState('home')
  const [historySubTab, setHistorySubTab] = useState('online')
  const [theme, setTheme] = useTheme()

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
    setTab(target)
    setScreen(target)
  }

  function handleLinkWhatsApp() {
    handleTabChange('home')
  }

  return (
    <PhoneShell activeTab={tab} onTabChange={handleTabChange}>
      {screen === 'home' && <Welcome onNavigate={handleNavigate} />}
      {screen === 'cards' && <Cards onNavigate={handleNavigate} />}
      {screen === 'history' && (
        <History activeSubTab={historySubTab} onSubTabChange={setHistorySubTab} />
      )}
      {screen === 'settings' && <Settings theme={theme} onThemeChange={setTheme} />}
      {screen === 'connect' && <WhatsAppConnect onLink={handleLinkWhatsApp} />}
    </PhoneShell>
  )
}
