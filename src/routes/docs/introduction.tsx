import { createFileRoute } from '@tanstack/react-router'

import { MarkdownPage } from '@/features/docs/markdown-page'
import source from '../../../docs/pages/introduction.md?raw'

export const Route = createFileRoute('/docs/introduction')({
  component: () => <MarkdownPage source={source} />,
})
