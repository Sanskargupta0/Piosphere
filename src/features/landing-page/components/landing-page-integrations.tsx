import { useTranslation } from 'react-i18next'
import {
  FloatingIconsHero,
  type FloatingIconsHeroProps,
} from './floating-icons-hero-section'
import { TextRotate } from './text-rotate'

// PioAgent Connector SVG Icons

const IconSlack = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <path d="M5.04 15.16a2.01 2.01 0 1 1-2.02-2.01h2.02v2.01Zm1.02 0a2.01 2.01 0 1 1 4.03 0v5.04a2.01 2.01 0 1 1-4.03 0v-5.04Z" fill="#E01E5A"/>
    <path d="M8.85 5.04a2.01 2.01 0 1 1 2.01-2.02v2.02H8.85Zm0 1.02a2.01 2.01 0 1 1 0 4.03H3.8a2.01 2.01 0 1 1 0-4.03h5.04Z" fill="#36C5F0"/>
    <path d="M18.96 8.85a2.01 2.01 0 1 1 2.02 2.01h-2.02V8.85Zm-1.02 0a2.01 2.01 0 1 1-4.03 0V3.8a2.01 2.01 0 1 1 4.03 0v5.04Z" fill="#2EB67D"/>
    <path d="M15.15 18.96a2.01 2.01 0 1 1-2.01 2.02v-2.02h2.01Zm0-1.02a2.01 2.01 0 1 1 0-4.03h5.04a2.01 2.01 0 1 1 0 4.03h-5.04Z" fill="#ECB22E"/>
  </svg>
)
const IconGmail = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <path d="M2 6l10 7 10-7v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Z" fill="#EA4335" fillOpacity=".15"/>
    <path d="M22 6l-10 7L2 6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#EA4335" strokeWidth="2" fill="none"/>
  </svg>
)
const IconWhatsApp = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.2 1.1-1.7 1.2-.4 0-.9.2-3-1-2.5-1.3-4.1-3.9-4.2-4.1-.2-.2-1.2-1.6-1.2-3 0-1.5.7-2.2 1-2.5.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.5.8 2 .9 2.1.1.1.1.3 0 .5-.1.2-.2.3-.3.4l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1.2-.2.8-1 1-1.3.2-.3.5-.3.7-.2.3.1 1.8.8 2 1 .3.1.5.2.6.3.1.1.1.7-.1 1.3Z" fill="#25D366"/>
  </svg>
)
const IconGCal = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" fill="#4285F4" fillOpacity=".15" stroke="#4285F4" strokeWidth="1.5"/>
    <path d="M3 9h18" stroke="#4285F4" strokeWidth="1.5"/>
    <path d="M8 2v4M16 2v4" stroke="#4285F4" strokeWidth="2" strokeLinecap="round"/>
    <rect x="7" y="12" width="3" height="3" rx=".5" fill="#4285F4"/><rect x="12" y="12" width="3" height="3" rx=".5" fill="#4285F4" fillOpacity=".6"/>
  </svg>
)
const IconSalesforce = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <path d="M10 5.5a4.5 4.5 0 0 1 7.5 2A3.5 3.5 0 0 1 20 14.5H5a3 3 0 0 1-.5-6A4.5 4.5 0 0 1 10 5.5Z" fill="#00A1E0"/>
  </svg>
)
const IconHubSpot = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <circle cx="16" cy="12" r="3" fill="#FF7A59"/><circle cx="8" cy="8" r="2" fill="#FF7A59"/>
    <circle cx="8" cy="16" r="2" fill="#FF7A59"/><path d="M10 8.5l4 2.5M10 15.5l4-2.5" stroke="#FF7A59" strokeWidth="1.5"/>
    <circle cx="16" cy="12" r="1" fill="white"/>
  </svg>
)
const IconNotion = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor" className="text-foreground/80">
    <path d="M4.5 3.5h10l5 3v14h-15v-17Zm3 5h9M7.5 12h9M7.5 15.5h6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="4.5" y="3.5" width="15" height="17" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)
const IconJira = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <path d="M12.005 2L2 12.005l4.397 4.397L12.005 22l10.004-10.005L12.005 2Zm0 5.603l4.397 4.397-4.397 4.397L7.608 12 12.005 7.6Z" fill="#2684FF"/>
  </svg>
)
const IconStripe = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="3" fill="#635BFF"/>
    <path d="M11.5 9.5c-1.5-.5-2-.8-2-1.3s.5-.8 1.3-.8c1 0 2 .4 2.7.8l.5-2.5c-.7-.4-1.8-.7-3.2-.7-2.5 0-4 1.3-4 3.2 0 3.2 4.5 2.7 4.5 4 0 .6-.5 1-1.5 1-1.2 0-2.5-.6-3.3-1.2L6 15c.9.6 2.4 1 3.5 1 2.7 0 4.2-1.2 4.2-3.2C13.7 10.8 11.5 10.5 11.5 9.5Z" fill="white"/>
  </svg>
)
const IconGitHub = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="currentColor" className="text-foreground/80">
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.3 1.8 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.6-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.7 18 5 18 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/>
  </svg>
)
const IconZendesk = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <path d="M11 6v12L3 18V6h8Z" fill="#03363D"/><path d="M13 6l8 0v12l-8-12Z" fill="#03363D"/>
    <circle cx="17" cy="8" r="2" fill="#03363D"/>
  </svg>
)
const IconTeams = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="14" height="14" rx="2" fill="#6264A7"/>
    <path d="M8 10h5v1H8v-1Zm0 2.5h5v1H8v-1Z" fill="white"/>
    <circle cx="19" cy="8" r="3" fill="#6264A7" fillOpacity=".6"/>
    <rect x="17" y="11" width="5" height="7" rx="1" fill="#6264A7" fillOpacity=".4"/>
  </svg>
)
const IconLinear = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <path d="M3 18.8 5.2 21l13-13a8 8 0 0 0-2.2-2.2L3 18.8Z" fill="#5E6AD2"/>
    <path d="M3.1 14.7A9 9 0 0 1 9.3 3.1L3.1 14.7Z" fill="#5E6AD2" fillOpacity=".7"/>
    <path d="M20.9 9.3a9 9 0 0 1-6.2 11.6L20.9 9.3Z" fill="#5E6AD2" fillOpacity=".7"/>
  </svg>
)
const IconTwilio = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#F22F46"/>
    <circle cx="9" cy="9" r="1.8" fill="white"/><circle cx="15" cy="9" r="1.8" fill="white"/>
    <circle cx="9" cy="15" r="1.8" fill="white"/><circle cx="15" cy="15" r="1.8" fill="white"/>
  </svg>
)
const IconTelegram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#2AABEE"/>
    <path d="M7 12.5l2.5 2.3.8 3.2 1.7-2 2.5 1.8 2-9.8-9.5 4.5Z" fill="white"/>
    <path d="M9.5 14.8l-.3 2.8 1.8-1.6" fill="#B0DCF5"/>
  </svg>
)
const IconHuggingFace = (p: React.SVGProps<SVGSVGElement>) => (
  <svg {...p} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#FFD21E"/>
    <circle cx="8.5" cy="10" r="1.5" fill="#1A1A2E"/>
    <circle cx="15.5" cy="10" r="1.5" fill="#1A1A2E"/>
    <path d="M8 15c1.5 2 6.5 2 8 0" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const connectorIcons: FloatingIconsHeroProps['icons'] = [
  { id: 1, icon: IconSlack, className: 'top-[10%] left-[8%]' },
  { id: 2, icon: IconGmail, className: 'top-[18%] right-[10%]' },
  { id: 3, icon: IconWhatsApp, className: 'top-[75%] left-[12%]' },
  { id: 4, icon: IconGCal, className: 'bottom-[12%] right-[8%]' },
  { id: 5, icon: IconSalesforce, className: 'top-[6%] left-[32%]' },
  { id: 6, icon: IconHubSpot, className: 'top-[8%] right-[28%]' },
  { id: 7, icon: IconStripe, className: 'bottom-[10%] left-[28%]' },
  { id: 8, icon: IconNotion, className: 'top-[42%] left-[5%]' },
  { id: 9, icon: IconJira, className: 'top-[70%] right-[20%]' },
  { id: 10, icon: IconTelegram, className: 'bottom-[5%] left-[65%]' },
  { id: 11, icon: IconGitHub, className: 'top-[48%] right-[6%]' },
  { id: 13, icon: IconZendesk, className: 'top-[5%] left-[55%]' },
  { id: 14, icon: IconTeams, className: 'bottom-[8%] right-[42%]' },
  { id: 15, icon: IconLinear, className: 'top-[28%] right-[18%]' },
  { id: 16, icon: IconTwilio, className: 'top-[62%] left-[35%]' },
  { id: 17, icon: IconHuggingFace, className: 'top-[55%] left-[18%]' },
]

export function LandingPageIntegrations() {
  const { t } = useTranslation('landing')
  return (
    <FloatingIconsHero
      className="bg-transparent"
      title={
        <div className="flex flex-col items-center justify-center gap-x-3 gap-y-1">
          <span>{t('integrations.connectorsCount')} </span>
          <TextRotate
            texts={t('integrations.rotatingTexts', { returnObjects: true }) as string[]}
            mainClassName="bg-primary text-primary-foreground overflow-hidden rounded-xl px-3 py-1"
            splitLevelClassName="overflow-hidden pb-0.5"
            staggerDuration={0.02}
            staggerFrom="first"
            rotationInterval={3000}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          />
        </div>
      }
      subtitle={t('integrations.description')}
      ctaText={t('integrations.cta')}
      ctaHref="/contact"
      icons={connectorIcons}
    />
  )
}
