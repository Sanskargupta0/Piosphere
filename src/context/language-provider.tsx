import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type AppLanguage, FALLBACK_LNG } from '@/i18n/config'

// Mirrors direction-provider.tsx: a thin context that owns the
// <html lang> side-effect and exposes a useLanguage() hook in the same
// shape as useDirection()/useTheme(). The browser-language-detector
// (configured in src/i18n) owns cookie/localStorage persistence, so the
// provider only drives i18next + the lang attribute + React state.

type LanguageContextType = {
  defaultLanguage: AppLanguage
  language: AppLanguage
  setLanguage: (lng: AppLanguage) => void
  resetLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const [language, _setLanguage] = useState<AppLanguage>(
    () => (i18n.resolvedLanguage as AppLanguage) || FALLBACK_LNG
  )

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lng: AppLanguage) => {
    i18n.changeLanguage(lng)
    _setLanguage(lng)
  }

  const resetLanguage = () => {
    i18n.changeLanguage(FALLBACK_LNG)
    _setLanguage(FALLBACK_LNG)
  }

  return (
    <LanguageContext
      value={{
        defaultLanguage: FALLBACK_LNG,
        language,
        setLanguage,
        resetLanguage,
      }}
    >
      {children}
    </LanguageContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
