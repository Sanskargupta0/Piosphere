import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownPageProps {
  /** Raw markdown source, imported with Vite's ?raw suffix. */
  source: string
}

/**
 * Renders a docs content page from markdown. The site has no typography
 * plugin, so element styles are mapped explicitly on the Markdown
 * components — this keeps the pages consistent with the rest of the site
 * (tokens, code cards) without a new dependency.
 */
export function MarkdownPage({ source }: MarkdownPageProps) {
  const components = useMemo(
    () => ({
      // Internal links route through TanStack Router; external links open
      // in a new tab.
      a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
        if (href?.startsWith('/')) {
          return <Link to={href}>{children}</Link>
        }
        return (
          <a href={href} target='_blank' rel='noreferrer noopener'>
            {children}
          </a>
        )
      },
    }),
    [],
  )

  return (
    <div className='mx-auto w-full max-w-7xl px-6 pb-24 pt-12 md:px-8 lg:px-12'>
      <div className='docs-markdown'>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {source}
        </ReactMarkdown>
      </div>
      <style>{`
        .docs-markdown h1 {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        .docs-markdown h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          scroll-margin-top: 8rem;
        }
        .docs-markdown p {
          color: hsl(var(--muted-foreground));
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .docs-markdown ul {
          list-style: disc;
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .docs-markdown li {
          color: hsl(var(--muted-foreground));
          line-height: 1.75;
          margin-bottom: 0.25rem;
        }
        .docs-markdown a {
          color: hsl(var(--primary));
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .docs-markdown pre {
          background: hsl(var(--muted));
          border: 1px solid hsl(var(--border));
          border-radius: 0.5rem;
          padding: 1rem 1.25rem;
          overflow-x: auto;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          line-height: 1.7;
        }
        .docs-markdown code {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        .docs-markdown table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }
        .docs-markdown th,
        .docs-markdown td {
          border: 1px solid hsl(var(--border));
          padding: 0.5rem 0.75rem;
          text-align: left;
        }
        .docs-markdown th {
          background: hsl(var(--muted));
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
