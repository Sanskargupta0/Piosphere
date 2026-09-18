import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { fonts } from './fonts'

const root = process.cwd()
const read = (rel: string) => readFileSync(join(root, rel), 'utf8')

describe('font registry is wired all the way to CSS (FE #1251)', () => {
  // The original defect: FontProvider set `font-<name>` on <html> and the
  // switcher looked like it worked, but theme.css defined no matching
  // token, so every choice resolved to --font-sans and nothing changed.
  // A dead entry is invisible at runtime, which is why this is a test and
  // not a code review item.
  it('defines a --font-<name> token for every selectable font', () => {
    const theme = read('src/styles/theme.css')
    const missing = fonts.filter((f) => !theme.includes(`--font-${f}:`))
    expect(missing).toEqual([])
  })

  // FE #1283: FontProvider builds `font-<name>` dynamically, so Tailwind's
  // scanner never sees the literals and emits no utility unless it is
  // safelisted. A registry entry missing from the @source inline list is a
  // dead menu entry that silently renders as --font-sans.
  it('safelists a font-<name> utility for every selectable font', () => {
    const css = read('src/styles/index.css')
    const safelist = css.match(/@source inline\("([^"]*)"\)/)?.[1] ?? ''
    const missing = fonts.filter((f) => !safelist.split(/\s+/).includes(`font-${f}`))
    expect(missing).toEqual([])
  })

  it('keeps montserrat first so the default rendered face does not change', () => {
    // --font-sans is Montserrat, so montserrat is what the app has always
    // rendered. FontProvider falls back to fonts[0] when no cookie is set,
    // so reordering this array restyles every user who never chose a font.
    expect(fonts[0]).toBe('montserrat')
    expect(read('src/styles/theme.css')).toContain(
      "--font-sans: 'Montserrat Variable'"
    )
  })
})

describe('fonts are self-hosted so air-gapped deployments render correctly (FE #1251)', () => {
  // A CDN face fails SILENTLY: the browser falls back to a system font
  // rather than erroring, so a reintroduced URL would not show up as a
  // broken build, only as the wrong typeface on an offline deployment.
  const surfaces = [
    'index.html',
    'src/styles/index.css',
    'src/styles/theme.css',
    'src/config/fonts.ts',
    'src/features/landing-page/components/landing-page-footer.tsx',
  ]

  it.each(surfaces)('%s pulls no font over the network', (rel) => {
    const src = read(rel)
    // Scheme-qualified on purpose: the prose warnings in these files name
    // the host without a scheme, and those must stay readable.
    expect(src).not.toContain('https://fonts.googleapis.com')
    expect(src).not.toContain('https://fonts.gstatic.com')
  })

  it('imports every selectable face from a bundled package', () => {
    const css = read('src/styles/index.css')
    for (const f of fonts) {
      if (f === 'system') continue // system stack, no package to bundle
      expect(css).toContain(`@import '@fontsource-variable/${f}'`)
    }
  })
})
