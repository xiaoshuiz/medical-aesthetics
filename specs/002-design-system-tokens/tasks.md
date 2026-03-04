# Tasks: Medical Aesthetics Design System

**Input**: Design documents from `specs/002-design-system-tokens/`  
**Prerequisites**: plan.md (required), spec.md (required). Optional: research.md, data-model.md, contracts/, quickstart.md.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently. Tech stack and paths from plan: TypeScript 5.x, Rsbuild, React 18+, Tailwind; `src/theme/`, `src/components/`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions (from plan.md)

- Tokens and theme: `src/theme/` (tokens.css, breakpoints, typography), `tailwind.config.js`
- Components: `src/components/` (TreatmentCard, DoctorCard, BeforeAfterSlider, PriceDisplay, BookingCTA, etc.)
- Contracts: `specs/002-design-system-tokens/contracts/` (token contract, component-manifest.schema.json)
- Manifest: `specs/002-design-system-tokens/component-manifest.json`
- Style audit: `scripts/` or `specs/002-design-system-tokens/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Design-system structure and token foundation

- [ ] T001 Create design token directory and base structure: src/theme/tokens.css (or extend tailwind.config.js) for kebab-case CSS variables
- [ ] T002 [P] Add theme entry in app: ensure src/theme/tokens.css (or equivalent) is imported in src/index.css or src/App.tsx
- [ ] T003 [P] Define mobile viewport breakpoint constant (e.g. in src/theme/breakpoints.ts or tailwind theme) for Booking CTA fixed-bottom

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core tokens and utilities that all user stories depend on

**⚠️ CRITICAL**: No user story implementation can begin until this phase is complete

- [ ] T004 Define Glass & Skin color tokens in src/theme/tokens.css (or tailwind theme): surface-pearl #FAF9F6, accent-gold #C5A059, functional-clinical #005A70; kebab-case names
- [ ] T005 [P] Define Nude palette @neutral-100 through @neutral-500 in src/theme/tokens.css (or tailwind theme) for section backgrounds
- [ ] T006 Implement contrast check and darker-variant for accent-gold: add utility or token in src/theme/ (e.g. contrast.ts or second token accent-gold-dark) so 3:1 on surface-pearl is satisfied when default fails
- [ ] T007 [P] Define typography tokens: Serif H1/H2 (letter-spacing -0.01em), Sans-serif Body (letter-spacing 0.03em, line-height 1.6), @status-label (Uppercase, 10px, Bold, 2px letter-spacing) in src/theme/tokens.css or tailwind.config.js
- [ ] T008 [P] Define radius and elevation tokens: 24px treatment card, 50px CTA pill, Mist Shadow 0 12px 40px rgba(0,0,0,0.04) in src/theme/tokens.css or tailwind.config.js
- [ ] T009 Define spacing and section padding: 8pt grid vars, section padding clamp(64px, 10vw, 120px), Special-Gap 48px (CTA-to-Image) in src/theme/tokens.css or tailwind.config.js

**Checkpoint**: Token set available; components can consume theme

---

## Phase 3: User Story 1 - Designers and Developers Apply Consistent Tokens (Priority: P1) 🎯 MVP

**Goal**: Single source of truth for colors, typography, and spacing; tokens consumable without hardcoding; contrast requirements met.

**Independent Test**: Apply token set to a sample page; verify surface/accent/clinical colors and that text meets WCAG AA (4.5:1) and accent-gold on surface-pearl meets 3:1 or uses darker-variant.

### Implementation for User Story 1

- [ ] T010 [US1] Apply surface-pearl and accent-gold (with darker-variant fallback) to at least one sample screen in src/pages/ or src/App.tsx so tokens are in use
- [ ] T011 [US1] Ensure all typography tokens (H1/H2 Serif, Body Sans-serif, status-label) are applied via theme in src/theme/ or Tailwind; document usage in src/theme/README.md or inline
- [ ] T012 [US1] Add section padding token (clamp(64px, 10vw, 120px)) to main layout or section wrapper in src/components/Layout.tsx (or equivalent)
- [ ] T013 [US1] Verify and document allowed background-to-text pairings and contrast (WCAG AA 4.5:1, UI 3:1) in specs/002-design-system-tokens/docs/contrast-matrix.md or checklist

**Checkpoint**: User Story 1 deliverable: token set applied and contrast verified

---

## Phase 4: User Story 2 - Treatment and Profile UI Matches Soft UI and Component Specs (Priority: P2)

**Goal**: Treatment cards, price cards, doctor cards, Before/After slider, and Booking CTA match spec (radius, elevation, aspect ratio, layout, glassmorphism, price format, fixed-bottom CTA).

**Independent Test**: Render each component type and verify against spec (radius, shadow, aspect ratio, labels, handle, Doctor-Card layout/title, price 0.7×, CTA fixed on mobile).

### Implementation for User Story 2

- [ ] T014 [P] [US2] Create or update TreatmentCard component: 24px radius, 8pt grid margins in src/components/TreatmentCard.tsx (or design-system subfolder)
- [ ] T015 [P] [US2] Create or update FloatingPriceCard component: Mist Shadow elevation, 24px radius if card surface in src/components/FloatingPriceCard.tsx
- [ ] T016 [P] [US2] Create or update primary CTA button component: 50px (pill) radius in src/components/Button.tsx or src/components/CTAButton.tsx
- [ ] T017 [US2] Create or update BeforeAfterSlider component: 4:5 or 1:1 aspect ratio, @status-label for Before/After labels, glassmorphism backdrop (blur 12px, border 1px solid rgba(255,255,255,0.3)), 2px #FFFFFF vertical handle in src/components/BeforeAfterSlider.tsx
- [ ] T018 [P] [US2] Create or update DoctorCard component: flex column 16px gap, qualification badge 32px height, Title 2 typographic units smaller than Name with 200% font-weight in src/components/DoctorCard.tsx
- [ ] T019 [P] [US2] Create or update PriceDisplay component: @currency at 0.7× amount font-size in src/components/PriceDisplay.tsx
- [ ] T020 [US2] Create or update BookingCTA component: fixed to bottom on mobile viewport (use breakpoint from T003) in src/components/BookingCTA.tsx
- [ ] T021 [US2] Ensure all Card-Overlay usages (including Before/After labels) use glassmorphism spec in src/components/ (backdrop-filter blur(12px), border 1px solid rgba(255,255,255,0.3))
- [ ] T022 [US2] Snap component margins to 8pt grid; use 48px Special-Gap only for CTA-to-Image in relevant components

**Checkpoint**: User Story 2 deliverable: all component types match spec and are independently verifiable

---

## Phase 5: User Story 3 - Stakeholders Verify Coverage and Spacing Compliance (Priority: P3)

**Goal**: Manifest maps every design spec to components; style audit flags spacing not on 8pt grid (48px CTA-to-Image compliant).

**Independent Test**: Generate manifest and style audit; confirm each pattern mapped and audit findings actionable.

### Implementation for User Story 3

- [ ] T023 [US3] Create component-manifest.json per contracts/component-manifest.schema.json mapping design specs (tokens + component patterns) to React components in specs/002-design-system-tokens/component-manifest.json
- [ ] T024 [US3] Add script or process to list unmapped components and unmapped specs (manifest unmappedSpecs/unmappedComponents or script in scripts/) per specs/002-design-system-tokens/contracts/README.md
- [ ] T025 [US3] Create Style Audit report (script or doc): scan src/ for spacing values not on 8pt grid, treat 48px for CTA-to-Image as compliant; output file/component and value in specs/002-design-system-tokens/style-audit-report.md or scripts/output

**Checkpoint**: User Story 3 deliverable: manifest and style audit available and actionable

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, consistency, and validation

- [ ] T026 [P] Update design system usage docs: token list, component list, and link to spec in specs/002-design-system-tokens/README.md or docs/design-system.md
- [ ] T027 Replace any hardcoded hex for surface, accent, or functional clinical color in src/ with theme tokens (SC-001)
- [ ] T028 [P] Run implementation-verification checklist and fix gaps: specs/002-design-system-tokens/checklists/implementation-verification.md
- [ ] T029 Define typographic scale (e.g. in src/theme/typography.ts or tailwind theme) so “2 typographic units smaller” for Doctor-Card Title is unambiguous

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS all user stories
- **Phase 3 (US1)**: Depends on Phase 2
- **Phase 4 (US2)**: Depends on Phase 2 (and token usage from Phase 3)
- **Phase 5 (US3)**: Depends on Phase 4 (components must exist to map and audit)
- **Phase 6 (Polish)**: Depends on Phases 3–5

### User Story Dependencies

- **US1 (P1)**: After Foundational only — tokens and contrast
- **US2 (P2)**: After Foundational; benefits from US1 token application
- **US3 (P3)**: After US2 (manifest and audit need components)

### Parallel Opportunities

- T002, T003 in Phase 1
- T005, T007, T008 in Phase 2
- T014, T015, T016 in Phase 4; T018, T019 in Phase 4
- T026, T028 in Phase 6

---

## Parallel Example: User Story 2

```text
# Parallel component tasks (different files):
T014 TreatmentCard in src/components/TreatmentCard.tsx
T015 FloatingPriceCard in src/components/FloatingPriceCard.tsx
T016 CTA button in src/components/Button.tsx or CTAButton.tsx
T018 DoctorCard in src/components/DoctorCard.tsx
T019 PriceDisplay in src/components/PriceDisplay.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup  
2. Complete Phase 2: Foundational  
3. Complete Phase 3: User Story 1  
4. **STOP and VALIDATE**: Apply tokens to a page; run contrast checks  
5. Demo token set and contrast compliance

### Incremental Delivery

1. Setup + Foundational → token set ready  
2. US1 → tokens applied and contrast verified (MVP)  
3. US2 → treatment card, price card, doctor card, Before/After slider, price display, Booking CTA  
4. US3 → manifest and style audit  
5. Polish → docs, checklist, no hardcoded colors

### Suggested MVP Scope

- Phases 1–3 (T001–T013): Design token set defined, applied, and contrast-verified.

---

## Notes

- [P] = different files, no dependencies  
- [USn] = task belongs to User Story n for traceability  
- Spec does not require TDD; add tests only if constitution or plan later requires them  
- Run `/speckit.plan` to add plan.md and align tech stack and file layout with this task list
