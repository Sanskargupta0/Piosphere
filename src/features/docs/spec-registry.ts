// Registry of API specs rendered by the /docs/api reference.
//
// Each service repository syncs its own OpenAPI document into docs/ via
// GitHub Actions (see api-service → sync-docs workflow). To onboard a new
// service: point its sync workflow at docs/openapi-<service>.json here, add
// the file below, and it appears in the reference automatically.

import openApiSpec from '../../../docs/openapi.json'

export interface SpecEntry {
  /** URL-safe id used in the ?service= param. */
  id: string
  /** Display name shown in the reference header. */
  name: string
  /** The OpenAPI document, imported at build time. */
  // Scalar accepts a parsed spec object; the loose record matches its
  // content option without pulling in its types here.
  spec: Record<string, any>
}

export const SPEC_REGISTRY: SpecEntry[] = [
  {
    id: 'pioagent',
    name: 'PioAgent',
    spec: openApiSpec,
  },
]

export const DEFAULT_SPEC_ID = SPEC_REGISTRY[0].id

export function getSpec(id: string | undefined): SpecEntry {
  return SPEC_REGISTRY.find((entry) => entry.id === id) ?? SPEC_REGISTRY[0]
}
