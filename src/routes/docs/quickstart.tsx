import { createFileRoute } from '@tanstack/react-router'

import { MarkdownPage } from '@/features/docs/markdown-page'
import source from '../../../docs/pages/quickstart.md?raw'

export const Route = createFileRoute('/docs/quickstart')({
  component: () => <MarkdownPage source={source} />,
})
