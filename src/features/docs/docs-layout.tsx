import { Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

/**
 * Portal shell for /docs: a sticky sub-navigation bar under the fixed site
 * header, with the active page rendered via the router outlet. The tabs are
 * ordered the way a reader arrives: orientation first, then the reference.
 */
export function DocsLayout() {
  const { t } = useTranslation('common')

  const tabs = [
    { label: t('docs.nav.introduction'), href: '/docs/introduction' },
    { label: t('docs.nav.quickstart'), href: '/docs/quickstart' },
    { label: t('docs.nav.authentication'), href: '/docs/authentication' },
    { label: t('docs.nav.apiReference'), href: '/docs/api' },
  ]

  return (
    <div className='pt-16'>
      {/* Sticky under the fixed h-16 site header; scroll-margin keeps deep
          links from hiding content behind both bars. */}
      <nav
        aria-label={t('docs.title')}
        className='sticky top-16 z-30 border-b border-border/60 bg-background/90 backdrop-blur-md'
      >
        <div className='mx-auto flex w-full max-w-7xl items-center gap-1 overflow-x-auto px-6 md:px-8 lg:px-12'>
          {tabs.map((tab) => (
            <a
              key={tab.href}
              href={tab.href}
              data-tab={tab.href}
              className='shrink-0 border-b-2 border-transparent px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground'
            >
              {tab.label}
            </a>
          ))}
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
