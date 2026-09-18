import { createFileRoute } from '@tanstack/react-router'

import { LegalPageLayout } from '@/features/legal/components/legal-page-layout'
import { AboutPage } from '@/features/about/about-page'

export const Route = createFileRoute('/about')({
  component: () => (
    <LegalPageLayout>
      <AboutPage />
    </LegalPageLayout>
  ),
})
