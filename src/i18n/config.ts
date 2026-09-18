// Central i18n constants. Kept separate from the init module so the
// language-provider and switcher can import them without pulling in the
// whole i18next instance.

export const SUPPORTED_LNGS = ['en', 'de'] as const
export type AppLanguage = (typeof SUPPORTED_LNGS)[number]

export const FALLBACK_LNG: AppLanguage = 'en'
export const DEFAULT_NS = 'common'

// Same cookie convention as the other UI prefs (`dir`, `font`): a short
// name + 1-year lifetime. The browser-language-detector owns this cookie.
export const LANGUAGE_COOKIE_NAME = 'lang'
export const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year (seconds)
