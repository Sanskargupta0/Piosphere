// In-page navigation for the landing page. The header and the section CTAs
// point at element ids (#products, #bucket, ...), but a bare anchor jump
// lands instantly and, from the mobile menu, races the body-unpin that
// happens when the menu closes. Every in-page link instead preventDefaults
// and routes through here, so the scroll is smooth and the target's
// scroll-mt-* keeps it clear of the fixed header.
export function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}
