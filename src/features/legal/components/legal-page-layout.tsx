import type { ReactNode } from 'react'

import { LandingPageFooter } from '@/features/landing-page/components/landing-page-footer'
import { LandingPageHeader } from '@/features/landing-page/components/landing-page-header'

interface LegalPageLayoutProps {
  children: ReactNode
}

/**
 * Chrome for the legal surfaces: the same fixed header and cinematic
 * footer as the landing page, so the legal pages read as part of one
 * site. The footer reserves its own final screen of scroll space via its
 * h-screen wrapper, so main needs no bottom padding.
 *
 * No overflow-x-hidden here on purpose: a non-visible overflow on an
 * ancestor turns it into the scroll container for position:sticky
 * descendants, which pins the section index to a container that never
 * scrolls and the index stops sticking. The footer clips its own marquee
 * overflow internally, so nothing needs clipping at this level.
 */
export function LegalPageLayout({ children }: LegalPageLayoutProps) {
  return (
    <div className='relative min-h-svh w-full bg-background font-sans text-foreground'>
      <LandingPageHeader />
      <main className='relative z-10 w-full'>{children}</main>
      <LandingPageFooter />
    </div>
  )
}
