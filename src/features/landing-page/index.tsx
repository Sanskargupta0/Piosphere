import { LandingPageHeader } from './components/landing-page-header'
import { LandingPageHero } from './components/landing-page-hero'
import { LandingPageFeatures } from './components/landing-page-features'
import { LandingPageBucket } from './components/landing-page-bucket'
import { LandingPageStats } from './components/landing-page-stats'
import { LandingPageIntegrations } from './components/landing-page-integrations'
import { LandingPageGlobe } from './components/landing-page-globe'
import { LandingPageFaq } from './components/landing-page-faq'
import { LandingPageFooter } from './components/landing-page-footer'

export function LandingPage() {
  return (
    <div className='relative w-full bg-background min-h-screen font-sans overflow-x-hidden'>
      <LandingPageHeader />

      {/*
        MAIN CONTENT AREA
        We use z-10 and a background color so it slides over the fixed footer beneath it.
      */}
      <main className='relative z-10 w-full bg-background flex flex-col'>
        <LandingPageHero />
        <LandingPageFeatures />
        <LandingPageBucket />
        <LandingPageStats />
        <LandingPageIntegrations />
        <LandingPageGlobe />
        <LandingPageFaq />
      </main>

      {/* The Cinematic Footer is injected here (it handles its own fixed positioning) */}
      <LandingPageFooter />
    </div>
  )
}
