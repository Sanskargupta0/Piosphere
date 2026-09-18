import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiReferenceReact } from '@scalar/api-reference-react'
import '@scalar/api-reference-react/style.css'
import { useTheme } from '@/context/theme-provider'
// Spec is synced into docs/ by GitHub Actions from the PioAgent service.
import openApiSpec from '../../../docs/openapi.json'

export function DocsPage() {
  const { t } = useTranslation('common')
  const { resolvedTheme } = useTheme()

  // Scalar's internal color-mode hook reads localStorage("colorMode") with
  // priority over the darkMode config option, and applies its own
  // light-mode/dark-mode class on <body>. Keep both in sync with the site
  // theme so the reference never disagrees with the header switch.
  useEffect(() => {
    try {
      window.localStorage.setItem('colorMode', resolvedTheme)
      document.body.classList.remove('light-mode', 'dark-mode')
      document.body.classList.add(
        resolvedTheme === 'dark' ? 'dark-mode' : 'light-mode',
      )
    } catch {
      // localStorage can be unavailable (private mode); Scalar falls back
      // to the darkMode config option in that case.
    }
  }, [resolvedTheme])

  const configuration = useMemo(
    () => ({
      darkMode: resolvedTheme === 'dark',
      content: openApiSpec,
      theme: 'fastify' as const,
      layout: 'modern' as const,
      showSidebar: true,
      // Scalar's agent (Ask AI) and MCP button auto-enable on localhost;
      // disable both explicitly so they never show up.
      agent: { disabled: true },
      mcp: { disabled: true },
      // The site header already has a theme switch; Scalar's own toggle
      // in the sidebar footer would fight it.
      hideDarkModeToggle: true,
      hideModels: true,
      hideTestRequestButton: true,
      hideClientButton: false,
      hideSearch: false,
      showOperationId: false,
      showDeveloperTools: 'localhost' as const,
      operationTitleSource: 'summary' as const,
      persistAuth: false,
      telemetry: true,
      isEditable: false,
      documentDownloadType: 'both' as const,
      withDefaultFonts: true,
      defaultOpenFirstTag: true,
      defaultOpenAllTags: false,
      expandAllModelSections: false,
      expandAllResponses: false,
      expandAllSchemaProperties: false,
      orderSchemaPropertiesBy: 'alpha' as const,
      orderRequiredPropertiesFirst: true,
      schemaKeyboardNav: false,
      modelsSectionLabel: 'Models',
      _integration: 'react' as const,
    }),
    [resolvedTheme],
  )

  return (
    <div className='docs-page mx-auto w-full max-w-8xl px-4 pb-24 pt-28 sm:px-6 lg:px-8'>
      <h1 className='sr-only'>{t('docs.title')}</h1>
      <ApiReferenceReact configuration={configuration} />
      {/* Scalar's sidebar footer has no config option to hide its
          "Powered by Scalar" link (it's a slot default), so hide it here. */}
      <style>{`
        .docs-page a[href*='scalar.com'] { display: none; }
        /* The site header is fixed at the top of the viewport (h-16). Scalar
           positions its sticky sidebar and computes its height from
           --scalar-custom-header-height, so telling it about our header keeps
           the sidebar from sliding underneath the nav when scrolling. */
        .docs-page .scalar-app {
          --scalar-custom-header-height: 4rem;
        }
      `}</style>
    </div>
  )
}
