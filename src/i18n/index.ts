import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import {
  DEFAULT_NS,
  FALLBACK_LNG,
  LANGUAGE_COOKIE_MAX_AGE,
  LANGUAGE_COOKIE_NAME,
  SUPPORTED_LNGS,
} from './config'
import { NAMESPACES, resources } from './resources'
import { languageFromDomain } from './domain-detection'

// Single i18next instance for the whole app. Importing this module once
// (from main.tsx + test-setup.ts) initializes it as a side effect;
// react-i18next's useTranslation() then resolves against this global
// instance with no <I18nextProvider> required.

// Custom detector (issue #1318): resolves the default language from the
// hostname TLD (.de -> German, anything else -> English). Registered on
// the LanguageDetector instance below and referenced by name in the
// detection order; i18next consults it only when the earlier lookups
// (cookie/localStorage) found nothing, so a stored user selection
// always wins over the domain.
const languageDetector = new LanguageDetector()
languageDetector.addDetector({
  name: 'domainDetector',
  lookup: () => languageFromDomain(),
})

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: FALLBACK_LNG,
    supportedLngs: SUPPORTED_LNGS,
    ns: NAMESPACES,
    defaultNS: DEFAULT_NS,
    interpolation: { escapeValue: false }, // React already escapes
    detection: {
      // Resolution order for a first visit (issue #1318): the user's
      // stored choice first, then the domain TLD (.de -> German), then
      // English. The navigator lookup is deliberately gone -- a German
      // visitor with an English-locale browser should still get German
      // on the .de domain, and everyone else gets English.
      order: ['cookie', 'localStorage', 'domainDetector'],
      lookupCookie: LANGUAGE_COOKIE_NAME,
      lookupLocalStorage: LANGUAGE_COOKIE_NAME,
      caches: ['cookie', 'localStorage'],
      cookieMinutes: LANGUAGE_COOKIE_MAX_AGE / 60,
    },
    returnNull: false,
  })

export default i18n
