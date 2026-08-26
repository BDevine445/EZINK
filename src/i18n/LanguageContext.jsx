import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { translations, RTL_LANGUAGES } from './translations'

const STORAGE_KEY = 'ezink-language'
const LanguageContext = createContext(null)

function getInitialLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored && translations[stored] ? stored : 'en'
}

function lookup(dict, key) {
  return key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict)
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)
  const isRtl = RTL_LANGUAGES.includes(language)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
  }, [language, isRtl])

  const t = useCallback(
    (key, vars) => {
      let str = lookup(translations[language], key) ?? lookup(translations.en, key) ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) str = str.replaceAll(`{{${k}}}`, v)
      }
      return str
    },
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRtl, t }}>{children}</LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useTranslation must be used within a LanguageProvider')
  return ctx
}
