# Implementation Plan: Medical Aesthetics Design System

**Branch**: `002-design-system-tokens` | **Date**: 2026-03-04 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/002-design-system-tokens/spec.md`

## Summary

Implement a design system for the medical aesthetics app: a single source of truth for colors (Glass & Skin, Nude palette), typography (Serif headings, Sans-serif body, status-label), spacing (8pt grid, section padding clamp, Special-Gap 48px), radius and elevation, and component specs (treatment card, price card, doctor card, Before/After slider, price display, Booking CTA). Tokens are delivered as kebab-case CSS custom properties and Tailwind theme extension. Contrast for accent-gold on surface-pearl is ensured via a pre-computed darker-variant when needed. Deliverables include a component manifest mapping specs to React components and a style audit for 8pt grid compliance.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: Rsbuild, React 18+, Tailwind CSS (existing). No new runtime dependencies; design system is theme + components + scripts.  
**Storage**: N/A; tokens and manifest are files (theme, JSON).  
**Testing**: Vitest for unit/component tests where applicable; contrast and layout verification via checklist and manual/automated checks. Test strategy per constitution: critical paths (token usage, contrast) covered by implementation checklist and CI lint/build.  
**Target Platform**: Modern browsers; dev and production build via Rsbuild.  
**Project Type**: Web application (design-system feature within existing frontend repo).  
**Performance Goals**: No additional runtime cost; theme and components are static. Build-time style audit script.  
**Constraints**: Minimal new dependencies; tokens in CSS vars + Tailwind; 8pt grid and spec-mandated values.  
**Scale/Scope**: Single design system for the medical aesthetics app; token set and component set as defined in spec.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify alignment with `.specify/memory/constitution.md`:

- **Code Quality (I)**: Structure reuses existing src/theme and src/components; no extra abstraction. Token and manifest contracts are documented; dependencies are minimal (no new UI framework).
- **Testing Standards (II)**: Test strategy: Vitest for new components if added; contrast and token usage validated via implementation checklist and quickstart. Contract (token/manifest shape) is documented in specs/002-design-system-tokens/contracts/.
- **User Experience Consistency (III)**: This feature is the design system; spec FR/SC and constitution III are satisfied by single token set, single component spec set, and manifest/audit.
- **Performance Requirements (IV)**: No new latency or resource goals; theme is static. Style audit runs at build/CI time.

## Project Structure

### Documentation (this feature)

```text
specs/002-design-system-tokens/
├── plan.md              # This file (/speckit.plan output)
├── research.md           # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/            # Phase 1: token contract, component-manifest schema
│   ├── README.md
│   └── component-manifest.schema.json
├── checklists/          # Spec quality + implementation verification
├── tasks.md             # From /speckit.tasks (not created by /speckit.plan)
└── spec.md
```

### Source Code (repository root)

```text
src/
├── theme/                # Design tokens: tokens.css (CSS vars), breakpoints, typography scale
├── components/           # TreatmentCard, FloatingPriceCard, DoctorCard, BeforeAfterSlider, PriceDisplay, BookingCTA, etc.
├── pages/                # Existing; consume theme and components
├── hooks/
├── services/
└── ...

tests/
├── unit/
├── integration/
└── contract/

# Design system artifacts (under specs or repo root)
specs/002-design-system-tokens/component-manifest.json   # Or docs/component-manifest.json
scripts/ or specs/002-design-system-tokens/              # Style audit script and report
```

**Structure decision**: Single frontend repo. Design system lives in `src/theme/` (tokens, breakpoints) and `src/components/` (design-system components). Contracts and manifest live under `specs/002-design-system-tokens/` for versioning with the spec. Style audit can be a script in `scripts/` or under the feature spec directory.

## Complexity Tracking

> No constitution violations. Table left empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none)    | —          | —                                   |
