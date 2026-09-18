import { createFileRoute } from '@tanstack/react-router'

import { LegalPageLayout } from '@/features/legal/components/legal-page-layout'
import { ArchitecturePage } from '@/features/docs/architecture-page'

export const Route = createFileRoute('/architecture')({
  component: () => (
    <LegalPageLayout>
      <ArchitecturePage />
    </LegalPageLayout>
  ),
})
