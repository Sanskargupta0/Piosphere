import { createFileRoute } from '@tanstack/react-router'

import { LegalPageLayout } from '@/features/legal/components/legal-page-layout'
import { DocsLayout } from '@/features/docs/docs-layout'

export const Route = createFileRoute('/docs')({
  component: () => (
    <LegalPageLayout>
      <DocsLayout />
    </LegalPageLayout>
  ),
})
