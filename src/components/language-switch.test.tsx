// Issue #1318: the language switcher's trigger shows the flag of the
// ACTIVE language (German flag when de, Union Jack when en) instead of
// a generic globe icon, and the dropdown pairs each native name with
// its flag. These tests pin that contract.
import { beforeAll, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import i18n from '@/i18n'
import { LanguageSwitch } from './language-switch'
import { LanguageProvider } from '@/context/language-provider'

// Radix DropdownMenu's open path relies on Pointer Events APIs that
// jsdom does not implement (same stubs as node-actions-menu.test.tsx).
beforeAll(() => {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {}
  }
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = () => {}
  }
})

async function renderSwitch() {
  // The i18n singleton is shared across the whole suite (initialized in
  // test-setup.ts), so a switch in one test leaks into the next via
  // resolvedLanguage. Reset to English and await it -- changeLanguage
  // settles asynchronously, so rendering before it lands would still
  // show the previous language.
  if (i18n.resolvedLanguage !== 'en') await i18n.changeLanguage('en')
  return render(
    <LanguageProvider>
      <LanguageSwitch />
    </LanguageProvider>
  )
}

function getTrigger(): HTMLElement {
  // The trigger's accessible label is translated ("Language"/"Sprache"),
  // so locate it structurally -- it is the only dropdown-menu-trigger
  // button in this isolated render.
  return screen.getByRole('button', { name: /^(language|sprache)$/i })
}

function openMenu() {
  const trigger = getTrigger()
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false })
  fireEvent.click(trigger)
}

function activeFlagLabel(): string {
  // The trigger's svg child is the flag of the active language; its
  // clipPath id (lang-flag-en / lang-flag-de) identifies which.
  const svg = getTrigger().querySelector('svg')
  return svg?.querySelector('clipPath')?.id ?? ''
}

describe('LanguageSwitch', () => {
  it('shows the English flag on the trigger by default', async () => {
    await renderSwitch()
    expect(activeFlagLabel()).toBe('lang-flag-en')
  })

  it('switches the trigger flag to German when Deutsch is selected', async () => {
    await renderSwitch()

    openMenu()
    fireEvent.click(screen.getByRole('menuitem', { name: /Deutsch/i }))

    expect(activeFlagLabel()).toBe('lang-flag-de')
    // The document lang attribute follows the switch (language-provider
    // side effect), proving the i18n instance actually changed too.
    expect(document.documentElement.lang).toBe('de')
  })

  it('switches back to the English flag when English is selected', async () => {
    await renderSwitch()

    openMenu()
    fireEvent.click(screen.getByRole('menuitem', { name: /Deutsch/i }))
    openMenu()
    fireEvent.click(screen.getByRole('menuitem', { name: /English/i }))

    expect(activeFlagLabel()).toBe('lang-flag-en')
    expect(document.documentElement.lang).toBe('en')
  })
})
