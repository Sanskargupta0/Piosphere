# Docs Portal: custom pages + multi-service API reference

## Goal

Turn `/docs` into a documentation portal like Zudoku had: sub-navigation with
Introduction, Quickstart, Authentication (markdown pages), and the Scalar API
reference — structured so multiple services can each sync their own OpenAPI
spec.

## Decisions (user-confirmed)

- Content pages: **markdown files** rendered with react-markdown
- Language: **English only** for docs content (nav labels still i18n)
- Multi-service: **registry pattern** — one spec today (PioAgent), each future
  service adds its own `docs/openapi-<service>.json` + one registry line

## Structure

```
docs/
  openapi.json              ← existing, synced by api-service (renamed conceptually to "PioAgent" in registry)
  pages/                    ← existing MDX files, converted to .md
    introduction.md
    quickstart.md
    authentication.md
src/features/docs/
  docs-layout.tsx           ← portal shell: sub-nav tabs + <Outlet/>
  docs-page.tsx             ← existing Scalar reference (becomes /docs/api)
  markdown-page.tsx         ← generic renderer: reads .md via ?raw import, react-markdown
  spec-registry.ts          ← [{ id: 'pioagent', name: 'PioAgent', spec: openApiSpec }]
src/routes/
  docs.tsx                  → layout route wrapping DocsLayout
  docs/                     → child routes (TanStack file-based):
      index.tsx             → redirect to /docs/introduction
      introduction.tsx      → MarkdownPage('introduction')
      quickstart.tsx        → MarkdownPage('quickstart')
      authentication.tsx    → MarkdownPage('authentication')
      api.tsx               → DocsPage (Scalar) — reads ?service= param, defaults 'pioagent'
```

Note: TanStack Router file-based routing supports directory routes (`docs/`
folder). The existing flat `docs.tsx` becomes the layout; children live in
`docs/`. Need to verify the routeTree generation handles this (it does —
`docs.tsx` + `docs/index.tsx` is the standard pattern).

## Implementation steps

1. **Install deps**: `react-markdown` + `remark-gfm` (tables) — pnpm add -w
2. **Convert MDX → MD**: strip frontmatter from the three docs/pages/*.mdx,
   rewrite internal links (/docs/authentication etc. — they already match the
   new routes), delete guides/*.mdx (or convert later if user wants guides)
3. **spec-registry.ts**: import openApiSpec, export array with id/name/spec.
   DocsPage looks up by `?service=` search param (validated against registry).
4. **docs-layout.tsx**: sticky sub-nav under the fixed site header (pt offset
   like other pages), tabs: Introduction · Quickstart · Authentication · API
   Reference. Active state from useLocation/useRouteContext. Uses
   LegalPageLayout chrome (header/footer) — layout route wraps children.
5. **markdown-page.tsx**: Vite `?raw` import of the .md file, react-markdown
   with remark-gfm, Tailwind typography via manual class mapping (no
   @tailwindcss/typography plugin installed — check; if absent, style via
   component overrides on the Markdown components prop). Code blocks get a
   dark card style consistent with the site.
6. **Routes**: restructure as above; `/docs` redirects to `/docs/introduction`.
7. **i18n**: add nav labels to common.json (en/de): docs.nav.introduction,
   quickstart, authentication, apiReference. Header "Documentation" link keeps
   pointing at /docs.
8. **Delete leftover MDX** after conversion.

## What stays untouched

- api-service repo and its sync workflow (still writes docs/openapi.json)
- Architecture page, deploy workflows, vercel.json
- Scalar config in docs-page.tsx (only the content source changes to registry lookup)

## Verification

- pnpm build passes
- /docs → redirects to /docs/introduction, all four tabs render
- /docs/api shows Scalar with PioAgent spec, theme sync intact
- Deep links work on Vercel (rewrite already in place)
