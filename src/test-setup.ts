import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
// Initialize the i18next singleton synchronously (eager-bundled
// resources) so components calling useTranslation() resolve real English
// strings under test, with no provider wrapper needed.
import i18n from '@/i18n'

// React Testing Library auto-registers `cleanup()` ONLY when `afterEach`
// exists as a global (see @testing-library/react/dist/index.js). This repo
// runs vitest with `globals: false`, so that registration never happens and
// every rendered tree in the suite stays mounted for the lifetime of its
// worker. Unmounting between tests runs the effect teardowns components
// already implement, so no work outlives the test that scheduled it.
afterEach(() => {
  cleanup()
})

if (i18n.resolvedLanguage !== 'en') {
  i18n.changeLanguage('en')
}

vi.stubEnv('VITE_CRM_CONTACT_WEBHOOK_URL', 'http://localhost/webhook')

// jsdom does not implement ResizeObserver; Radix primitives that measure
// content (Popover internals) instantiate one in a layout effect. The stub
// returns no-op observe/disconnect/unobserve so component mounts don't
// ReferenceError in tests.
class StubResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
;(globalThis as unknown as { ResizeObserver: typeof StubResizeObserver }).ResizeObserver = StubResizeObserver

if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView(): void {}
}

if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList,
  })
}
