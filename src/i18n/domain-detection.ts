import { type AppLanguage, FALLBACK_LNG } from './config'

// Domain-based default language (issue #1318): a first visit on a .de
// hostname starts in German, everything else starts in English. The
// browser-language-detector consults this before its navigator lookup,
// and the user's stored choice (cookie/localStorage) still wins over
// both -- see src/i18n/index.ts for the detection order.

// Hostnames that end in `.de` (so `example.de` and `app.example.de`
// both match) resolve to German; every other hostname (including
// `localhost` and IP literals) resolves to the English fallback.
export function languageFromHostname(hostname: string): AppLanguage {
  return hostname.toLowerCase().endsWith('.de') ? 'de' : FALLBACK_LNG
}

// Window is typed as unknown in this module's consumers' test context;
// read the hostname defensively so importing this outside a browser
// (e.g. node-based scripts) cannot throw.
export function languageFromDomain(): AppLanguage {
  if (typeof window === 'undefined') return FALLBACK_LNG
  const hostname = window.location?.hostname
  if (!hostname) return FALLBACK_LNG
  return languageFromHostname(hostname)
}
