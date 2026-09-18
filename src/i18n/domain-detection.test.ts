import { afterEach, describe, expect, it } from 'vitest'
import { languageFromDomain, languageFromHostname } from './domain-detection'

// Issue #1318: hostname TLD drives the default language for first-time
// visitors. Pure mapping tests + a window.location-backed test for the
// browser entry point.

describe('languageFromHostname', () => {
  it.each([
    ['piosphere.de', 'de'],
    ['app.piosphere.de', 'de'],
    ['www.example.de', 'de'],
    // Case-insensitive TLD match.
    ['app.example.DE', 'de'],
  ])('%s resolves to de', (hostname, expected) => {
    expect(languageFromHostname(hostname)).toBe(expected)
  })

  it.each([
    ['localhost'],
    ['piosphere.com'],
    ['app.piosphere.io'],
    ['staging.example.dev'],
    // A domain merely containing "de" is not German.
    ['design.example.com'],
    // IP literals never match.
    ['192.168.1.10'],
  ])('%s resolves to en', (hostname) => {
    expect(languageFromHostname(hostname)).toBe('en')
  })
})

describe('languageFromDomain', () => {
  // jsdom's history.replaceState refuses cross-origin URLs, so swap the
  // hostname property directly and restore it after each test.
  const originalHostname = window.location.hostname

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: originalHostname },
      writable: true,
    })
  })

  it('reads the hostname from window.location', () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'app.example.de' },
      writable: true,
    })
    expect(languageFromDomain()).toBe('de')
  })

  it('falls back to en on a non-.de origin', () => {
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'example.com' },
      writable: true,
    })
    expect(languageFromDomain()).toBe('en')
  })
})
