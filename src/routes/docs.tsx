import { createFileRoute } from '@tanstack/react-router'

import { LegalPageLayout } from '@/features/legal/components/legal-page-layout'
import { DocsPage } from '@/features/docs/docs-page'

export const Route = createFileRoute('/docs')({
  component: () => (
    <LegalPageLayout>
      <DocsPage />
    </LegalPageLayout>
  ),
})
