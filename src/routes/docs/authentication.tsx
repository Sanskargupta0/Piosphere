import { createFileRoute } from '@tanstack/react-router'

import { MarkdownPage } from '@/features/docs/markdown-page'
import source from '../../../docs/pages/authentication.md?raw'

export const Route = createFileRoute('/docs/authentication')({
  component: () => <MarkdownPage source={source} />,
})
