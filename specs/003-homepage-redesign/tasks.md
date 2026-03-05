# Tasks: Homepage Redesign

**Input**: Design documents from `/specs/003-homepage-redesign/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ui-contracts.md ✓, quickstart.md ✓

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to
- Each task includes exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies, load fonts, extend design system — must complete before all user stories

- [ ] T001 Install Framer Motion: run `pnpm add framer-motion` in repo root (adds to package.json + pnpm-lock.yaml)
- [ ] T002 Add Google Fonts to `index.html`: insert `<link rel="preconnect">` + `<link href="...Playfair+Display...Inter...">` inside `<head>` per `quickstart.md` Step 2
- [ ] T003 [P] Extend `src/theme/tokens.css`: append new `:root` block with typography, glassmorphism, glow, gradient mesh, and noise tokens per `quickstart.md` Step 3 (do NOT modify any existing token)
- [ ] T004 [P] Extend `tailwind.config.js`: add `backdropBlur.glass`, `boxShadow` (glow variants), `backgroundColor` (glass), `borderColor` (glass), `fontFamily` (display/body), `backgroundImage` (gradient mesh) to `theme.extend` per `quickstart.md` Step 4
- [ ] T005 Wrap app root with `MotionConfig` in `src/App.tsx`: import `{ MotionConfig }` from `framer-motion`, wrap existing JSX with `<MotionConfig reduceMotion="user">` per `quickstart.md` Step 5

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared data types, mock data, and animation primitives — MUST complete before any user story component can be built

**⚠️ CRITICAL**: No user story component work can begin until this phase is complete

- [ ] T006 Create `src/data/homepage-mock.ts`: export all TypeScript types (`HeroContent`, `StatMetric`, `TreatmentEntry`, `Practitioner`, `Testimonial`, `QuickAction`, `CtaButton`) and export named mock data constants (`HERO_CONTENT`, `STAT_METRICS` ×4, `TREATMENT_ENTRIES` ×3, `PRACTITIONERS` ×3, `TESTIMONIALS` ×3, `QUICK_ACTIONS` ×3) per `data-model.md`
- [ ] T007 Create `src/lib/animation-variants.ts`: export `fadeUpVariant` (opacity 0→1, y 24→0, 0.4s easeOut), `staggerContainerVariant` (staggerChildren 0.12, delayChildren 0.1), `cardHoverVariant` (scale 1→1.02, shadow-mist→glow-gold) per `contracts/ui-contracts.md` Animation Contract section
- [ ] T008 Scaffold `src/pages/Home.tsx`: replace the existing placeholder (Welcome heading + 3 buttons) with a minimal page skeleton — **no real component imports yet** (components don't exist until Phase 3–6); use commented-out `// import HeroSection from '@/components/homepage/HeroSection'` placeholders for each of the 6 future sections; wire `isAuthenticated`/`userName` from the existing auth hook (check `src/context/` or `src/hooks/` for the current auth pattern before wiring)

**Checkpoint**: Shared foundation ready — all user story phases can now proceed

---

## Phase 3: User Story 1 — First Impression & Hero Section (Priority: P1) 🎯 MVP

**Goal**: A full-viewport hero section with gradient mesh background, noise overlay, headline with glow, and auth-aware CTA — the single most impactful element of the redesign

**Independent Test**: Open `/` as a logged-out user → verify a full-viewport hero section is visible with Playfair Display headline, subheading, and at least one CTA button. Resize to 320px and 1280px — layout must adapt without overflow.

### Implementation

- [ ] T009 [US1] Create `src/components/homepage/HeroSection.tsx`: full-viewport section (`min-h-screen`) with `bg-gradient-mesh-warm` background, `--noise-texture` pseudo-element overlay (opacity 0.035), centered content column, Playfair Display headline styled with `--glow-gold` text-shadow, Inter subheading, and a single primary CTA button (`rounded-pill bg-gradient-cta text-white`)
- [ ] T010 [US1] Add staggered entrance animation to `src/components/homepage/HeroSection.tsx`: wrap root div as `<motion.div initial="hidden" animate="visible" variants={staggerContainerVariant}>`; wrap headline, subheading, and CTA each as `<motion.div variants={fadeUpVariant}>` (variants inherited from stagger parent); import `staggerContainerVariant` and `fadeUpVariant` from `src/lib/animation-variants.ts`
- [ ] T011 [US1] Implement auth-aware CTA logic in `src/components/homepage/HeroSection.tsx`: accept `isAuthenticated: boolean`, render `content.guestCta` when false and `content.authCta` when true; wrap CTA swap in `<AnimatePresence mode="wait">` with `key={isAuthenticated}` for smooth transition; validate against `HeroSectionProps` interface in `contracts/ui-contracts.md`
- [ ] T012 [US1] Wire `HeroSection` into `src/pages/Home.tsx`: replace the `// import HeroSection` placeholder with the real import; pass `content={HERO_CONTENT}` and `isAuthenticated` from auth hook; confirm HeroSection appears first in render order

### Tests for User Story 1

- [ ] T029 [US1] Write unit test for `HeroSection` auth-state branching in `src/components/homepage/__tests__/HeroSection.test.tsx`: if `__tests__/` directory does not exist, create it first with `mkdir -p src/components/homepage/__tests__`; render with `isAuthenticated=false` → assert guest CTA label is present and auth CTA is absent; render with `isAuthenticated=true` and `userName="Alice"` → assert "Welcome back, Alice" greeting is present and auth CTA label is present; use `@testing-library/react` render + `screen.getByText`

**Checkpoint**: User Story 1 fully functional — hero section visible, responsive, animated, auth-aware, and unit-tested independently of all other sections

---

## Phase 4: User Story 2 — Treatment Showcase (Priority: P2)

**Goal**: A visually rich grid of at least 3 treatment cards below the hero, using the existing `TreatmentCard` component in glassmorphism style, giving visitors a clear at-a-glance view of services

**Independent Test**: Scroll past hero → verify a treatment section grid with ≥3 cards is visible, each with image, title, and description. On mobile (320px), cards stack vertically. Hover a card → subtle elevation/glow feedback visible.

### Implementation

- [ ] T013 [US2] Create `src/components/homepage/TreatmentShowcase.tsx`: accept `treatments: TreatmentEntry[]`, render a responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`); wrap each `TreatmentCard` in `<motion.div initial="hidden" whileInView="visible" variants={fadeUpVariant} viewport={{ once: true }} whileHover={{ scale: 1.02, boxShadow: 'var(--glow-gold)' }}>` — note: use string variant names `"hidden"`/`"visible"` with `variants` prop, NOT `whileInView={fadeUpVariant.visible}`; apply glassmorphism class override on card wrapper: `bg-glass backdrop-blur-glass border border-glass rounded-card`
- [ ] T014 [US2] Add image fallback handling in `src/components/homepage/TreatmentShowcase.tsx`: on `<img>` `onError`, hide the img element and show a fallback `<div className="w-full aspect-video bg-surface-pearl">` placeholder to satisfy the edge case from `spec.md`
- [ ] T015 [US2] Wire `TreatmentShowcase` into `src/pages/Home.tsx`: replace the `// import TreatmentShowcase` placeholder with the real import; import `TREATMENT_ENTRIES`; render below `HeroSection`; wrap in `<section style={{ padding: 'var(--section-padding) 0' }}>`

### Tests for User Story 2

- [ ] T030 [US2] Write unit test for `TreatmentShowcase` image fallback in `src/components/homepage/__tests__/TreatmentShowcase.test.tsx`: render with one `TreatmentEntry` whose `imageUrl` is invalid; simulate `onError` on the `<img>` element; assert the fallback `<div>` placeholder is present and the broken `<img>` is not visible; use `@testing-library/react` + `fireEvent`

**Checkpoint**: User Story 2 complete — treatment showcase independently visible, interactive, image-fallback tested

---

## Phase 5: User Story 3 — Social Proof & Trust Signals (Priority: P3)

**Goal**: A trust-building sequence: clinic statistics strip → before/after slider → doctor profiles → patient testimonials, reassuring consideration-stage visitors

**Independent Test**: Scroll to the lower portion of the homepage → verify stats strip with 4 metrics, a before/after slider, doctor profiles (≥2 DoctorCards), and testimonials (≥2 quote cards) are all visible. Interact with before/after slider on mouse and touch.

### Implementation

- [ ] T016 [P] [US3] Create `src/components/homepage/StatsStrip.tsx`: accept `metrics: StatMetric[]` (4 items); render 4-col grid on md+ (`grid-cols-2 md:grid-cols-4`); each cell shows `value` in Playfair Display large gold text (`font-display text-3xl text-accent-gold`) and `label` in Inter small neutral text; wrap each stat cell in `<motion.div initial="hidden" whileInView="visible" variants={fadeUpVariant} viewport={{ once: true }}>` — use string variant name `"visible"`, not `fadeUpVariant.visible`
- [ ] T017 [P] [US3] Create `src/components/homepage/DoctorSection.tsx`: accept `practitioners: Practitioner[]` (2–3 items); render responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) as `<motion.div initial="hidden" whileInView="visible" variants={staggerContainerVariant} viewport={{ once: true }}>`; wrap each `DoctorCard` in `<motion.div variants={fadeUpVariant}>` (inherits stagger from parent whileInView trigger); apply glassmorphism `className` override on each `DoctorCard`: `bg-glass backdrop-blur-glass border border-glass`; missing `imageUrl` renders initials avatar (`bg-neutral-200 rounded-full flex items-center justify-center font-display`)
- [ ] T018 [P] [US3] Create `src/components/homepage/TestimonialsSection.tsx`: accept `testimonials: Testimonial[]`; render grid `<motion.div initial="hidden" whileInView="visible" variants={staggerContainerVariant} viewport={{ once: true }}> grid-cols-1 md:grid-cols-2 lg:grid-cols-3`; each item rendered as inline `TestimonialCard` wrapped in `<motion.div variants={fadeUpVariant}>` (inherits stagger from parent whileInView trigger); `TestimonialCard`: white/glass card with `border-l-4 border-accent-gold`, italic `<blockquote>` for `quote`, caption `<p>` for `patientName` + `treatmentReceived`
- [ ] T019 [US3] Wire all trust sections into `src/pages/Home.tsx` in order: (1) **first read `src/components/BeforeAfterSlider.tsx` to identify its required props and accepted image URL format**; supply placeholder before/after image URLs (e.g. two Unsplash CDN links of similar subject matter) as the slider's props; (2) replace all `// import` placeholders for `StatsStrip`, `DoctorSection`, `TestimonialsSection`, `BeforeAfterSlider` with real imports; (3) render sequence after `TreatmentShowcase`: `StatsStrip` → `BeforeAfterSlider` → `DoctorSection` → `TestimonialsSection`; each wrapped in `<section style={{ padding: 'var(--section-padding) 0' }}>` ; pass `STAT_METRICS`, `PRACTITIONERS`, `TESTIMONIALS` mock data

### Tests for User Story 3

- [ ] T031 [US3] Write unit test for `StatsStrip` metric rendering in `src/components/homepage/__tests__/StatsStrip.test.tsx`: render with 4 `StatMetric` items; assert all 4 `value` strings and all 4 `label` strings are present in the DOM; assert no fifth metric is rendered; use `@testing-library/react` `screen.getAllByRole` or `screen.getByText`

**Checkpoint**: User Story 3 complete — all trust-building sections independently visible, interactive, and StatsStrip unit-tested

---

## Phase 6: User Story 4 — Authenticated User Quick Actions (Priority: P4)

**Goal**: Returning logged-in patients see a personalized greeting with their name and 3 quick-action buttons (Book, History, Profile) in the hero, plus an auth-aware final CTA section at the bottom

**Independent Test**: Log in → visit homepage → verify personalized greeting with user display name and 3 quick-action buttons visible in the hero. Click "Book Appointment" → navigates to booking flow. Log out → verify guest CTA replaces quick actions.

### Implementation

- [ ] T020 [US4] Extend `src/components/homepage/HeroSection.tsx` with authenticated state: when `isAuthenticated === true`, render a greeting `<p>` below headline (`"Welcome back, {userName}"` with CSS `truncate max-w-xs`), then render `quickActions` as a row of 3 `<motion.button>` / `<Link>` elements (primary variant: `bg-gradient-cta text-white`, secondary variant: `bg-glass border-glass`) with `whileHover={{ scale: 1.04, boxShadow: 'var(--glow-interactive)' }}`; wrap action row in `<AnimatePresence mode="wait">` keyed on `isAuthenticated` for smooth mount/unmount
- [ ] T021 [US4] Create `src/components/homepage/FinalCTASection.tsx`: accept `isAuthenticated: boolean`, `guestCta: CtaButton`, `authCta: CtaButton`; full-width section with `bg-gradient-cta` background; centered heading ("Begin Your Transformation"), subtext, single CTA button using auth-aware label+href from props; animate with `<motion.div initial="hidden" whileInView="visible" variants={fadeUpVariant} viewport={{ once: true }}>`
- [ ] T022 [US4] Wire quick actions and `FinalCTASection` into `src/pages/Home.tsx`: replace remaining `// import` placeholders; pass `quickActions={QUICK_ACTIONS}` and `userName` from auth hook to `HeroSection`; add `FinalCTASection` as the last section, passing `guestCta={HERO_CONTENT.guestCta}` and `authCta={HERO_CONTENT.authCta}`

**Checkpoint**: User Story 4 complete — authenticated experience fully personalized; guest and logged-in CTAs verified independently

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Responsive integrity, accessibility, motion safety, contrast compliance, cross-browser verification, and build validation across all sections

- [ ] T023 [P] Responsive + above-fold audit — open dev tools at 320×568, 375×667, 768×1024, and 1280×800 viewports; verify (a) all sections have zero horizontal overflow, (b) correct column counts per breakpoint, (c) primary CTA button is visible **without scrolling** at every tested viewport size; if CTA is below fold on any size, reduce hero padding until CTA is above fold
- [ ] T024 [P] Focus states — ensure all interactive elements (CTA buttons, quick-action buttons, treatment cards, slider) in `src/components/homepage/` have `focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none` applied; verify keyboard Tab order matches visual order
- [ ] T025 [P] Contrast verification — check text contrast ratios across **all** new section components (`HeroSection.tsx`, `StatsStrip.tsx`, `DoctorSection.tsx`, `TestimonialsSection.tsx`, `FinalCTASection.tsx`); apply WCAG 2.1 thresholds: **≥4.5:1 for normal body text**; **≥3:1 for large headings (≥24px or ≥18.67px bold) and UI element indicators** (buttons, badges, icons with text); fix non-compliant instances by adjusting text color toward `#1a0f00` or `var(--functional-clinical)`
- [ ] T026 [P] Reduced motion — enable "Prefer reduced motion" in OS/browser settings and navigate to `/`; confirm all Framer Motion animations degrade to instant state changes with no visible translate/fade/spring transitions; verify `<MotionConfig reduceMotion="user">` in `src/App.tsx` is effective
- [ ] T027 8pt grid audit — inspect padding and gap values in all new section components in `src/components/homepage/` to confirm they use multiples of `8px` (or `calc(var(--grid-unit) * N)`); correct any arbitrary non-grid values
- [ ] T032 [P] Cross-browser smoke test — build and start preview server: run `pnpm build`, then `pnpm preview` (if that fails, try `pnpm exec rsbuild preview`); open the preview URL in Chrome, Safari, and Firefox (latest two versions each); verify: (a) glassmorphism `backdrop-blur` renders on cards, (b) gradient mesh background displays correctly, (c) Playfair Display font loads, (d) BeforeAfterSlider is interactive; note any `backdrop-filter` Safari quirks and add a CSS progressive-enhancement fallback (`@supports (backdrop-filter: blur()) { ... }`) if needed
- [ ] T033 LCP + CLS performance measurement — run Lighthouse against the `pnpm build` output on the homepage; confirm LCP ≤ 2.5s; confirm CLS = 0 with `font-display: swap` active (no layout shift from font load); if LCP > 2.5s, add `loading="lazy"` to below-fold images and/or preload the hero background; document Lighthouse score in the PR description
- [ ] T028 Production build validation — run `pnpm build` from repo root; confirm zero TypeScript errors across all new files; confirm zero Tailwind class warnings for new theme tokens; fix any type errors or missing imports before marking complete

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — **BLOCKS all user story phases**
- **US1 (Phase 3)**: Depends on Phase 2 — no dependency on US2/US3/US4
- **US2 (Phase 4)**: Depends on Phase 2 — no dependency on US1/US3/US4
- **US3 (Phase 5)**: Depends on Phase 2 — no dependency on US1/US2/US4
- **US4 (Phase 6)**: Depends on Phase 2 AND Phase 3 (extends `HeroSection.tsx`) — can proceed after US1 complete
- **Polish (Phase 7)**: Depends on all desired user story phases complete; T028 must be final

### User Story Dependencies

```
Phase 1 (Setup)
  └── Phase 2 (Foundational: T006, T007, T008)
        ├── Phase 3 (US1: T009-T012, T029) ←─── Phase 6 (US4) depends on this
        ├── Phase 4 (US2: T013-T015, T030)  [independent]
        └── Phase 5 (US3: T016-T019, T031)  [independent]
              └── Phase 7 (Polish: T023-T027, T032-T033, T028)
```

### Within Each User Story

- Foundational (mock data + variants) before any component
- Component implementation before wiring into `Home.tsx`
- `Home.tsx` wiring task always last in each story's implementation block
- Unit test task runs after implementation (verification approach, not TDD)

### Parallel Opportunities

- **Phase 1**: T003 and T004 can run in parallel (different files)
- **Phase 2**: T006 and T007 can run in parallel (different files)
- **Across stories**: US1, US2, US3 can all start in parallel after Phase 2 completes (T008 done)
- **Phase 5**: T016, T017, T018 can all run in parallel (independent component files)
- **Phase 7**: T023, T024, T025, T026, T032 can all run in parallel

---

## Parallel Examples

### Parallel opportunity — Phase 5 (US3):

```text
After Phase 2 (T008) completes, launch all 3 trust components in parallel:
  Task: T016 [P] — Create StatsStrip.tsx
  Task: T017 [P] — Create DoctorSection.tsx
  Task: T018 [P] — Create TestimonialsSection.tsx
Then T019 — Wire all into Home.tsx (depends on T016 + T017 + T018)
Then T031 — Unit test StatsStrip
```

### Parallel opportunity — Phase 7 (Polish):

```text
Launch all audit tasks in parallel:
  Task: T023 [P] — Responsive + above-fold audit
  Task: T024 [P] — Focus states
  Task: T025 [P] — Contrast verification (all sections)
  Task: T026 [P] — Reduced motion test
  Task: T032 [P] — Cross-browser smoke test
Then T027 — 8pt grid audit
Then T033 — LCP + CLS measurement
Then T028 — Production build (final gate)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T005)
2. Complete Phase 2: Foundational (T006–T008) — **critical, blocks everything**
3. Complete Phase 3: User Story 1 (T009–T012, T029)
4. **STOP and VALIDATE**: Open `/` — confirm hero section renders, animates, is responsive at 320px/1280px, CTA adapts to auth state, and HeroSection unit test passes
5. Demo-ready MVP with hero section alone

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready
2. Phase 3 (US1) → Hero MVP — demo to stakeholders
3. Phase 4 (US2) → Add treatment showcase — visible service offering
4. Phase 5 (US3) → Add trust signals — credibility layer
5. Phase 6 (US4) → Add authenticated quick actions — returning patient experience
6. Phase 7 → Polish and ship

### Parallel Team Strategy (2 developers)

1. Both complete Phase 1 + 2 together
2. Dev A: Phase 3 (US1 Hero + T029 test) → Phase 6 (US4 Quick Actions)
3. Dev B: Phase 4 (US2 Treatments + T030 test) → Phase 5 (US3 Trust Signals + T031 test)
4. Both collaborate on Phase 7 Polish

---

## Notes

- [P] tasks = different files, no shared state, safe to run concurrently
- [US#] label maps each task to a specific user story for traceability
- `Home.tsx` wiring tasks are always sequential (last implementation task in each story phase)
- All new tokens in `tokens.css` must be additive — never modify existing tokens
- **Framer Motion API**: always use string variant names — `initial="hidden" whileInView="visible" variants={variant}` — never pass variant value objects directly to `whileInView` or `initial`
- Commit after each complete phase to preserve story-level checkpoints
- Stop at each **Checkpoint** to validate the story independently before proceeding
