import { useTranslation } from 'react-i18next'

import { FAQSection } from '@/components/ui/faq-section-shadcnui'

export function LandingPageFaq() {
  const { t } = useTranslation('landing')

  return (
    <FAQSection
      title={t('faq.title')}
      subtitle={t('faq.subtitle')}
      items={t('faq.items', { returnObjects: true }) as { question: string; answer: string }[]}
    />
  )
}
