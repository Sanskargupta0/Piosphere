// Runtime config bridge. Replaces direct `import.meta.env.VITE_*` reads.
//
// Vite bakes `import.meta.env.VITE_*` into the bundle at `vite build`
// time. The nginx entrypoint writes a tiny /config.js at container
// start from environment variables; index.html loads /config.js BEFORE
// the React bundle, which exposes `window.__APP_CONFIG__`. Everything
// that varies per environment reads from here.
//
// Build-time VITE_* values stay as a fallback so local `pnpm dev`
// (no nginx, no /config.js) still works.

export interface AppConfig {
  // CRM webhook the /contact form posts to (n8n workflow). The URL
  // carries no secret (it is called from the browser), so the prod
  // workflow URL is the baked-in default; override per env only if a
  // separate workflow is stood up for dev/stg.
  CRM_CONTACT_WEBHOOK_URL: string
}

declare global {
  interface Window {
    __APP_CONFIG__?: Partial<AppConfig>
  }
}

function read<K extends keyof AppConfig>(
  key: K,
  buildTimeFallback: string | undefined
): string {
  const runtime = typeof window !== 'undefined' ? window.__APP_CONFIG__?.[key] : undefined
  return runtime ?? buildTimeFallback ?? ''
}

export const APP_CONFIG: AppConfig = {
  CRM_CONTACT_WEBHOOK_URL: read(
    'CRM_CONTACT_WEBHOOK_URL',
    (import.meta.env.VITE_CRM_CONTACT_WEBHOOK_URL as string | undefined) ??
      'https://crm.piosphere.ai/webhooks/workflows/4c567c06-7f9b-4ac5-b265-73aabdedf7dc/eb51de3c-861d-465f-9b3d-26f956e2f427'
  ),
}
