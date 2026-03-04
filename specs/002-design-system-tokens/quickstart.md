# Quickstart: Medical Aesthetics Design System (002-design-system-tokens)

**Branch**: `002-design-system-tokens`

## Prerequisites

- **Node.js**: LTS (e.g. 18+).
- **pnpm** (or npm): From repo root, `pnpm install` (or `npm install`).

## Install

From the repository root:

```bash
pnpm install
```

## Build and run

```bash
pnpm build
pnpm dev
```

Opens the app so you can verify token application and components (treatment cards, doctor cards, Before/After slider, price display, Booking CTA) against [spec.md](./spec.md).

## Verify design system

1. **Tokens**: Ensure `src/theme/` (or equivalent) and `tailwind.config.js` expose the tokens listed in [specs/002-design-system-tokens/contracts/README.md](./contracts/README.md). No hardcoded hex for surface, accent, or functional clinical color (SC-001).
2. **Contrast**: Run a contrast checker on text/UI that uses accent-gold on surface-pearl; use darker-variant if default fails 3:1 (SC-008).
3. **Components**: Render TreatmentCard, FloatingPriceCard, DoctorCard, BeforeAfterSlider, PriceDisplay, BookingCTA and check layout and style against spec (SC-003, SC-010).
4. **Manifest**: Generate or update `component-manifest.json` per [contracts/component-manifest.schema.json](./contracts/component-manifest.schema.json); list unmapped specs/components (SC-004).
5. **Style audit**: Run the style-audit script (when implemented); confirm it reports spacing not on 8pt grid and treats 48px CTA-to-Image as compliant (SC-005).

## Test and lint

```bash
pnpm test
pnpm run lint
```

## Project layout (this feature)

- **Spec and plan**: `specs/002-design-system-tokens/` — spec.md, plan.md, research.md, data-model.md, contracts/, quickstart.md, tasks.md, checklists/.
- **Theme**: `src/theme/` — tokens (CSS vars and/or Tailwind theme), breakpoints.
- **Components**: `src/components/` — TreatmentCard, DoctorCard, BeforeAfterSlider, PriceDisplay, BookingCTA, etc.
- **Manifest**: `specs/002-design-system-tokens/component-manifest.json` or `docs/component-manifest.json`.
- **Style audit**: Script and report under `specs/002-design-system-tokens/` or `scripts/`.

## Mobile breakpoint

Booking CTA fixed-bottom uses the breakpoint defined in theme (e.g. 768px or 640px). See [research.md](./research.md) and plan.md.
