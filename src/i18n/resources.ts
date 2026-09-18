import deCommon from './locales/de/common.json'
import deErrors from './locales/de/errors.json'
import deLanding from './locales/de/landing.json'
import enCommon from './locales/en/common.json'
import enErrors from './locales/en/errors.json'
import enLanding from './locales/en/landing.json'

export const NAMESPACES = ['common', 'errors', 'landing'] as const

export const resources = {
  en: {
    common: enCommon,
    errors: enErrors,
    landing: enLanding,
  },
  de: {
    common: deCommon,
    errors: deErrors,
    landing: deLanding,
  },
} as const
