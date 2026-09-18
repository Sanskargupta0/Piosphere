// Stub config for local `pnpm dev`. The container entrypoint at
// docker/runtime-config.sh overwrites this file at start with values
// from the runtime environment. Local dev falls through to VITE_*
// env vars via src/lib/runtime-config.ts.
//
// In production this file is rewritten on every container start; in
// local dev it stays as this stub.
window.__APP_CONFIG__ = {}