import { useTranslation } from 'react-i18next'
import GlobeFeatureSection from '@/components/ui/globe-feature-section'

export function LandingPageGlobe() {
  const { t } = useTranslation('landing')

  return (
    <GlobeFeatureSection
      title={
        <h2 className="text-3xl font-normal text-gray-900 dark:text-white">
          {t('globe.titlePart1')}{' '}
          <span className="text-primary">{t('globe.titlePart2')}</span>{' '}
          <span className="text-gray-500 dark:text-gray-400">
            {t('globe.description')}
          </span>
        </h2>
      }
      ctaText={t('globe.cta')}
      onCtaClick={() => { window.location.href = '/contact' }}
    />
  )
}

