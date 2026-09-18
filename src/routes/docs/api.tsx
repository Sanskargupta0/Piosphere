import { createFileRoute } from '@tanstack/react-router'

import { DocsPage } from '@/features/docs/docs-page'

interface ApiSearch {
  service?: string
}

export const Route = createFileRoute('/docs/api')({
  validateSearch: (search: Record<string, unknown>): ApiSearch => ({
    service: typeof search.service === 'string' ? search.service : undefined,
  }),
  component: function ApiReference() {
    const { service } = Route.useSearch()
    return <DocsPage serviceId={service} />
  },
})
