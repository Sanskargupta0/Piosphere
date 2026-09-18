import { createFileRoute, redirect } from '@tanstack/react-router'

// /docs is the portal; send readers to the introduction first.
export const Route = createFileRoute('/docs/')({
  beforeLoad: () => {
    throw redirect({ to: '/docs/introduction' })
  },
})
