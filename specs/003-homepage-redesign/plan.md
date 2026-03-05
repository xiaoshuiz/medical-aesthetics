# Implementation Plan: Homepage Redesign

**Branch**: `003-homepage-redesign` | **Date**: 2026-03-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-homepage-redesign/spec.md`

## Summary

Redesign `src/pages/Home.tsx` from a minimal placeholder into a luxury medical aesthetics homepage. The approach extends the existing design system additively (new CSS tokens for glassmorphism, glow, gradient mesh, and editorial fonts), introduces Framer Motion v11 for scroll-triggered and staggered animations, and composes a set of new section components backed by static mock data. No routing, API, or backend changes are required.

## Technical Context

**Language/Version**: TypeScript 5.6 + React 18.3
**Primary Dependencies**: Rsbuild 1.3, Tailwind CSS 3.4, Framer Motion 11.x (new), Google Fonts CDN (Playfair Display + Inter)
**Storage**: N/A — all data is static mock
**Testing**: Vitest 2.1 + React Testing Library (existing test setup)
**Target Platform**: Web (Chrome, Safari, Firefox — two most recent versions)
**Project Type**: Web application (SPA)
**Performance Goals**: LCP ≤ 2.5s on broadband; no layout shift from font loading (`font-display: swap`)
**Constraints**: Framer Motion bundle ≈ 24KB gzipped (acceptable); no new backend; `prefers-reduced-motion` must degrade all animations
**Scale/Scope**: Single page redesign; 7 homepage sections; 6 new components; 1 mock data file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

- **Code Quality (I)**: ✅ All new components are single-responsibility sections. Framer Motion is the only new runtime dependency — justified by staggered spring animation requirements unachievable with CSS alone. No unnecessary abstractions.
- **Testing Standards (II)**: ✅ Unit tests for new section components using Vitest + React Testing Library. Snapshot or structure tests for mock data rendering. Accessibility checks via `@testing-library/jest-dom` role queries.
- **User Experience Consistency (III)**: ✅ Extends existing design system token set (no existing tokens modified). Uses existing `TreatmentCard`, `DoctorCard`, `BeforeAfterSlider` components. All focus states use existing gold ring pattern.
- **Performance Requirements (IV)**: ✅ Google Fonts loaded with `preconnect` + `font-display: swap`. Framer Motion imported selectively. Images use `loading="lazy"` where applicable.

**Post-Phase-1 re-check**: No violations introduced by design decisions. Glassmorphism `backdrop-filter` is progressive enhancement (degrades gracefully in unsupported browsers). All new CSS tokens are additive.

## Project Structure

### Documentation (this feature)

```text
specs/003-homepage-redesign/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── ui-contracts.md  # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created here)
```

### Source Code (repository root)

```text
src/
├── data/
│   └── homepage-mock.ts            # NEW: static mock data + TypeScript types
├── lib/
│   └── animation-variants.ts       # NEW: shared Framer Motion variant configs
├── components/
│   ├── homepage/                   # NEW: all homepage section components
│   │   ├── HeroSection.tsx
│   │   ├── StatsStrip.tsx
│   │   ├── TreatmentShowcase.tsx
│   │   ├── DoctorSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── FinalCTASection.tsx
│   ├── TreatmentCard.tsx           # EXISTING (unchanged)
│   ├── DoctorCard.tsx              # EXISTING (unchanged)
│   └── BeforeAfterSlider.tsx       # EXISTING (unchanged)
├── pages/
│   └── Home.tsx                    # MODIFIED: replaced with composed sections
└── theme/
    └── tokens.css                  # MODIFIED: new additive tokens appended

index.html                          # MODIFIED: Google Fonts <link> tags added
tailwind.config.js                  # MODIFIED: new theme.extend entries
src/App.tsx                         # MODIFIED: MotionConfig wrapper added
```

**Structure Decision**: Single-project web application (Option 1 variant). Frontend only — no backend or test directory changes beyond existing Vitest setup.

## Complexity Tracking

No constitution violations requiring justification.

## Phase 0: Research Output

All research completed and documented in [research.md](./research.md).

**Key decisions resolved:**

| Decision | Outcome |
|---|---|
| Animation library | Framer Motion v11 — fully compatible with React 18.3 + Rsbuild 1.3; ~24KB gzipped |
| Font loading | Google Fonts `<link>` in `index.html` with `preconnect` + `font-display=swap` |
| Font pairing | Playfair Display (headings) + Inter (body) |
| Design style | Liquid Glass (ui-ux-pro-max recommendation) |
| Token strategy | Additive extension to `src/theme/tokens.css` — zero existing tokens modified |
| Reduced motion | `<MotionConfig reduceMotion="user">` wrapping app root |
| `prefers-reduced-motion` | Handled automatically by Framer Motion's MotionConfig |
| Mock data location | `src/data/homepage-mock.ts` |

## Phase 1: Design & Contracts Output

All design artifacts completed.

### Data Model

See [data-model.md](./data-model.md) for full entity definitions.

**Entities**: `HeroContent`, `StatMetric`, `TreatmentEntry`, `Practitioner`, `Testimonial`, `QuickAction`, `CtaButton`

All data is static/mock. No API integration. Auth-state-aware rendering via existing `AuthContext` (or props passed from `Home.tsx`).

### UI Contracts

See [contracts/ui-contracts.md](./contracts/ui-contracts.md) for full component prop interfaces.

**New components**: `HeroSection`, `StatsStrip`, `TreatmentShowcase`, `DoctorSection`, `TestimonialsSection`, `FinalCTASection`

**Existing components used unchanged**: `TreatmentCard`, `DoctorCard`, `BeforeAfterSlider`

**Shared animation variants**: `fadeUpVariant`, `staggerContainerVariant`, `cardHoverVariant` (exported from `src/lib/animation-variants.ts`)

### Section Design Specification

| Section | Visual treatment | Animation |
|---|---|---|
| Hero | Full-viewport; `--gradient-mesh-warm` bg + noise overlay; headline glow | Staggered entrance: headline → subtitle → CTA (staggerChildren 0.12) |
| Stats strip | Pearl bg; gold `--accent-gold` value text; Playfair Display numbers | `useInView` fade-up stagger |
| Treatment showcase | Glassmorphism cards: `--glass-bg`, `backdrop-blur-glass`, `border-glass` | `whileInView` stagger; `whileHover` elevation + glow-gold |
| Before/After | Existing BeforeAfterSlider, full-width constrained container | `whileInView` fade-in |
| Doctor profiles | Glassmorphism DoctorCard wrappers, 2–3 col grid | `whileInView` stagger from bottom |
| Testimonials | White/glass cards, 4px gold left border, italic quote | `whileInView` stagger |
| Final CTA | `--gradient-cta` background, centered, auth-aware | `whileInView` scale + fade |

### New Design Tokens Summary

| Category | New tokens |
|---|---|
| Typography | `--font-display`, `--font-body`, `--h1/h2/h3-font-size`, `--heading-line-height`, `--body-line-height` |
| Glassmorphism | `--glass-bg`, `--glass-bg-dark`, `--glass-backdrop-blur`, `--glass-border`, `--glass-border-strong` |
| Glow | `--glow-gold`, `--glow-gold-strong`, `--glow-teal`, `--glow-interactive` |
| Gradients | `--gradient-mesh-warm`, `--gradient-mesh-cool`, `--gradient-mesh-luxe`, `--gradient-gold-fade`, `--gradient-cta` |
| Texture | `--noise-texture` |

### Setup

See [quickstart.md](./quickstart.md) for step-by-step environment setup including:
- `pnpm add framer-motion`
- Google Fonts injection into `index.html`
- Token extension steps for `tokens.css` and `tailwind.config.js`
- `MotionConfig` wrapper in `App.tsx`
