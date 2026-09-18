import { describe, expect, it } from 'vitest'
import { NAMESPACES, resources } from './resources'
import { SUPPORTED_LNGS } from './config'

// Guard against the two most common i18n regressions:
//   1. Key drift between locales -- a key added on `en` but forgotten
//      on `de` (or vice versa) silently falls back to the fallback
//      language at runtime. The check below treats it as a hard
//      assertion at test time.
//   2. The `_plural` suffix going back in. i18next v4+ uses the
//      CLDR-based `_one` / `_other` / `_few` / `_many` family; the
//      legacy `_plural` form is silently NEVER matched, which would
//      render the singular text for every count >1.
//
// Both classes survive typecheck and grep (string keys are typed
// as plain `string` in the i18next config). Pinning here is the
// cheapest way to catch them.

type Json = string | number | boolean | null | Json[] | { [k: string]: Json }

function collectLeafKeys(node: Json, prefix = ''): string[] {
  if (node === null || typeof node !== 'object' || Array.isArray(node)) {
    return prefix ? [prefix] : []
  }
  const out: string[] = []
  for (const [k, v] of Object.entries(node)) {
    // _meta is a per-locale annotation block (e.g. reviewStatus on the
    // de side). Intentionally NOT a translation key -- skip when
    // computing parity so an extra annotation does not look like drift.
    if (prefix === '' && k === '_meta') continue
    const next = prefix ? `${prefix}.${k}` : k
    out.push(...collectLeafKeys(v as Json, next))
  }
  return out.sort()
}

describe('i18n resources key parity', () => {
  // The fallback (en) is the source of truth. Every other supported
  // language must carry exactly the same key set so a t() call with a
  // valid en key always resolves on every active language.
  const FALLBACK = 'en'
  const OTHER_LNGS = SUPPORTED_LNGS.filter((l) => l !== FALLBACK)

  it('every namespace declared in NAMESPACES has en + de resources', () => {
    for (const ns of NAMESPACES) {
      for (const lng of SUPPORTED_LNGS) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tree = (resources as any)[lng]?.[ns]
        expect(tree, `${lng}/${ns}.json must exist`).toBeDefined()
      }
    }
  })

  for (const ns of NAMESPACES) {
    describe(`${ns} namespace`, () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const enKeys = collectLeafKeys((resources as any)[FALLBACK][ns] as Json)
      for (const lng of OTHER_LNGS) {
        it(`${lng} has the same key set as ${FALLBACK}`, () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const otherKeys = collectLeafKeys((resources as any)[lng][ns] as Json)
          const missing = enKeys.filter((k) => !otherKeys.includes(k))
          const extra = otherKeys.filter((k) => !enKeys.includes(k))
          expect(
            { missing, extra },
            `${lng}/${ns}.json key drift vs ${FALLBACK}/${ns}.json`
          ).toEqual({ missing: [], extra: [] })
        })
      }
    })
  }

  it('no key uses the legacy `_plural` suffix (i18next v4+ dropped it in favour of CLDR `_one`/`_other`)', () => {
    const offenders: string[] = []
    for (const lng of SUPPORTED_LNGS) {
      for (const ns of NAMESPACES) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const keys = collectLeafKeys((resources as any)[lng][ns] as Json)
        for (const k of keys) {
          if (k.endsWith('_plural') || k.includes('_plural.')) {
            offenders.push(`${lng}/${ns}: ${k}`)
          }
        }
      }
    }
    expect(offenders).toEqual([])
  })
})
