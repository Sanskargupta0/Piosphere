import { createFileRoute } from '@tanstack/react-router'

import { LegalPageLayout } from '@/features/legal/components/legal-page-layout'
import { ContactPage } from '@/features/contact/contact-page'

export const Route = createFileRoute('/contact')({
  component: () => (
    <LegalPageLayout>
      <ContactPage />
    </LegalPageLayout>
  ),
})
