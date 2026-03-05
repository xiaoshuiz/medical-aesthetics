# Contracts: Medical Aesthetics Design System

**Branch**: `002-design-system-tokens`

This feature does not expose external APIs or gRPC services. Contracts here define the **design system’s public surface**: token naming, theme shape, and component-manifest format so that consumers and tooling can rely on a stable contract.

## Contract artifacts

| Artifact | Purpose |
|----------|---------|
| **Token contract** (see below) | Canonical list of token names (kebab-case) and categories. Implementations (CSS vars, Tailwind theme) MUST expose these names. |
| **component-manifest.schema.json** | JSON schema for `component-manifest.json`. Ensures every design spec maps to a component path and unmapped items are identifiable. |

## Token contract

All tokens MUST be named in kebab-case and MUST fall into one of the categories below. Values are defined in [spec.md](../spec.md) and [research.md](../research.md).

- **Color**: `surface-pearl`, `accent-gold`, `accent-gold-dark` (when needed for 3:1), `functional-clinical`, `neutral-100` … `neutral-500`
- **Typography**: Heading (Serif, -0.01em), Body (Sans-serif, 0.03em, line-height 1.6), `status-label` (Uppercase, 10px, Bold, 2px letter-spacing), `currency` (symbol for price)
- **Spacing**: 8pt grid scale; `section-padding` clamp(64px, 10vw, 120px); `special-gap` 48px (CTA-to-Image only)
- **Radius**: `radius-card` 24px, `radius-pill` 50px
- **Elevation**: `shadow-mist` 0 12px 40px rgba(0,0,0,0.04)
- **Glassmorphism**: Card-Overlay uses `backdrop-filter: blur(12px)` and `border: 1px solid rgba(255,255,255,0.3)` (not a single token; a rule)

Implementations MUST provide at least the tokens above; they MAY add more (e.g. typographic scale steps) as long as the canonical set is present.

## Component-manifest format

The manifest is a JSON file that maps design patterns to component paths:

- **patterns**: Array of `{ "specId": string, "componentPath": string }` (e.g. `TreatmentCard` → `src/components/TreatmentCard.tsx`).
- **tokens**: Array of `{ "tokenId": string, "definedIn": string }` (e.g. where each token is implemented).
- Unmapped specs or components MUST be listed in a dedicated section or script output (FR-013, SC-004).

See `component-manifest.schema.json` (if present) for the exact schema.

## Versioning

- New tokens or new component specs may be added in a backward-compatible way.
- Renaming or removing tokens is breaking; require a design-system version bump and migration notes.
