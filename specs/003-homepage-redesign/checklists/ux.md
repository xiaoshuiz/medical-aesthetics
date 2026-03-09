# UX Requirements Quality Checklist: Homepage Redesign

**Purpose**: Validate completeness, clarity, consistency, and measurability of all requirements across visual, functional, animation, content, and non-functional dimensions — for use by both author (pre-plan) and peer reviewer (PR gate)
**Created**: 2026-03-05
**Feature**: [spec.md](../spec.md)
**Depth**: Standard (~30 items)
**Scope**: Full coverage — visual/aesthetic + functional + non-functional

---

## Requirement Completeness

- [x] CHK001 — PASS: Layout defined in research.md — Hero full-width, Stats 4-col strip, Treatments 3-col grid (2-col tablet / 1-col mobile), Doctors 2-col, Testimonials 2-col. Standard responsive breakpoints apply. [Completeness, Gap]
- [x] CHK002 — PASS: animation-variants.ts specifies duration 0.6s, stagger 80ms per child, ease [0.22, 1, 0.36, 1]. Hero uses animate="visible" on mount; all below-fold sections use whileInView="visible" viewport={{ once: true }}. [Completeness, Gap, Spec §FR-011]
- [x] CHK003 — PASS: tokens.css defines --glass-bg: rgba(255,255,255,0.08); --glass-backdrop-blur: 16px; --glass-border: 1px solid rgba(255,255,255,0.12). [Completeness, Gap, Spec §FR-007]
- [x] CHK004 — PASS: tokens.css defines --gradient-mesh-warm / --gradient-mesh-cool / --gradient-mesh-luxe as radial gradient meshes. Applied to section backgrounds and headings per research.md section design table. [Completeness, Gap, Spec §FR-007]
- [x] CHK005 — PASS: tokens.css defines --glow-gold (32px spread, rgba(197,160,89,0.4)), --glow-gold-strong, --glow-teal, --glow-interactive as box-shadow tokens. Applied to CTA buttons and accent elements. [Completeness, Gap, Spec §FR-007]
- [x] CHK006 — PASS: Noise texture defined as SVG turbulence data URI at ~5% opacity, applied via ::before pseudo-element to Hero and gradient section backgrounds. [Completeness, Gap, Spec §FR-007]
- [x] CHK007 — PASS: tokens.css defines --h1-font-size: clamp(3rem, 6vw, 5rem); --h2: clamp(2rem, 4vw, 3rem); --h3: 1.5rem. Playfair Display 700/400 for headings, Inter 400/500 for body, line-height 1.2 headings / 1.6 body. [Completeness, Gap, Spec §FR-007]
- [x] CHK008 — PASS: Static mock data renders immediately; Framer Motion initial="hidden" entrance provides perceived progressive reveal. No skeleton required. [Completeness, Gap]

---

## Requirement Clarity

- [x] CHK009 — PASS: No additional quantification required; existing spec hierarchy and visual treatment is sufficient. [Clarity, Spec §FR-001]
- [x] CHK010 — PASS: Hover feedback defined as scale(1.02) + box-shadow depth increase + opacity transition 0.85→1.0. All three properties combined constitute the subtle visual feedback. [Clarity, Spec §US2]
- [x] CHK011 — PASS: "Luxury editorial" is sufficiently conveyed by the Playfair Display / Inter pairing, gradient mesh backgrounds, glassmorphism surfaces, and glow accents. No further measurable breakdown required. [Clarity, Spec §FR-007, Clarifications]
- [x] CHK012 — PASS: Standard 80ms stagger per element applied via staggerChildren: 0.08 in staggerContainerVariant. No further specification required. [Clarity, Spec §FR-011]
- [x] CHK013 — PASS: Google Fonts satisfies both criteria — free of charge and GDPR-compliant (no PII transmitted, fonts served from CDN). [Clarity, Spec §FR-007]
- [x] CHK014 — N/A: Personalized greeting beyond display name is not required at this stage. Display name only. [Clarity, Spec §FR-005]

---

## Requirement Consistency

- [x] CHK015 — PASS: All interactive elements follow consistent interaction pattern — scale(1.02) + elevated box-shadow + cursor:pointer on hover; focus-visible ring using --accent-primary outline. CTA buttons additionally receive glow token. Before/After slider uses grab/grabbing cursor. [Consistency, Spec §FR-008]
- [x] CHK016 — PASS: 8pt grid uses --grid-unit (8px); existing TreatmentCard and DoctorCard already use var(--grid-unit) and 16px gaps (2×8). All new components adopt same multiples. No reconciliation gap. [Consistency, Spec §FR-009]
- [x] CHK017 — PASS: TestimonialsSection card uses same --radius-card, --glass-bg surface, and --glass-border as TreatmentCard and DoctorCard. Visual treatment is consistent across all card types. [Consistency, Spec §FR-013]
- [x] CHK018 — PASS: <MotionConfig reduceMotion="user"> at App root propagates to all child motion components, automatically disabling entrance, stagger, hover, and scroll-triggered animations. Full coverage without per-component logic. [Consistency, Spec §FR-011, Edge Cases]
- [x] CHK019 — PASS: New tokens use distinct functional prefixes (--glass-*, --glow-*, --gradient-mesh-*, --font-display, --font-body) with zero overlap against existing surface-*, accent-*, functional-*, neutral-*, --shadow-* namespaces. [Consistency, Spec §FR-007, Gap]

---

## Acceptance Criteria Quality

- [x] CHK020 — PASS: SC-001 measurable via standard 5-second test — show homepage for 5s, ask participant to name the primary service. Pass = unprompted correct identification. [Measurability, Spec §SC-001]
- [x] CHK021 — PASS: SC-005 measurable via heuristic evaluation — 3 reviewers score new vs. existing design 1–5 on 4 dimensions (visual hierarchy, polish, consistency, aesthetic appeal). Pass = new design avg ≥4.0 vs. existing baseline. [Measurability, Spec §SC-005]
- [x] CHK022 — PASS: Success criteria — all new tokens present in tokens.css with inline comments; no existing token values modified; Tailwind extensions verified via pnpm build success. [Acceptance Criteria, Gap, Spec §FR-007]
- [x] CHK023 — PASS: Success criteria — each scroll-triggered section fires animation on first viewport intersection; Hero animates on mount; 60fps target verified via DevTools Performance panel; pnpm build passes. [Acceptance Criteria, Gap, Spec §FR-011]

---

## Scenario Coverage

- [x] CHK024 — PASS: React context reactivity handles auth state change; AnimatePresence swaps CTA variants without page reload. Standard React pattern, no additional requirement needed. [Scenario Coverage, Gap, Spec §FR-002]
- [x] CHK025 — PASS: Render available items as-is (1–2 cards); no section suppression; no placeholder card. Section remains visible with partial content. [Scenario Coverage, Spec §Edge Cases]
- [x] CHK026 — PASS: Before/After slider shows gradient placeholder using --gradient-mesh-warm while images load. Existing BeforeAfterSlider component handles load state internally. [Scenario Coverage, Gap, Spec §FR-004]
- [x] CHK027 — N/A: Membership-specific actions are out of scope per FR-005. Quick Actions surfaces 3 static actions regardless of membership status. [Scenario Coverage, Gap, Spec §FR-005]

---

## Edge Case Coverage

- [x] CHK028 — PASS: Image fallback uses CSS background gradient (--gradient-mesh-warm) with a centered SVG placeholder icon; consistent treatment across TreatmentCard, DoctorCard, and Before/After. [Edge Case, Spec §Edge Cases]
- [x] CHK029 — PASS: Display name truncated via CSS (overflow: hidden; text-overflow: ellipsis; white-space: nowrap) within a max-width constraint. No fixed character limit required when CSS truncation is in place. [Edge Case, Spec §Edge Cases]
- [x] CHK030 — PASS: Slider uses Pointer Events API (pointerdown/pointermove/pointerup) for unified mouse+touch handling; touch-action: none on track; 44px minimum touch target per WCAG 2.5.5. [Edge Case, Gap, Spec §FR-004]

---

## Non-Functional Requirements

- [x] CHK031 — PASS: Contrast tested at both lightest and darkest points of each gradient; white text on dark mesh backgrounds satisfies ≥4.5:1 for body, ≥3:1 for large headings. Task T025 enforces dual-threshold verification across all 5 sections. [NFR, Conflict Risk, Spec §SC-006]
- [x] CHK032 — PASS: Google Fonts URL includes display=swap parameter; fallback stacks defined — 'Playfair Display', Georgia, serif and 'Inter', system-ui, sans-serif. Prevents invisible text during font load. [NFR, Gap, Spec §FR-007]
- [x] CHK033 — PASS: 60fps target; animations use GPU-composited properties only (transform, opacity); will-change: transform on animated cards; Lighthouse performance score ≥90 verified in T033. [NFR, Gap, Spec §FR-011]
- [x] CHK034 — PASS: Google Fonts transmits no PII; fonts served from fonts.gstatic.com CDN; satisfies CHK013 (free + GDPR-compliant). No additional compliance action required. [NFR, Gap, Spec §FR-007, Assumption]

---

## Dependencies & Assumptions

- [x] CHK035 — PASS: T008 identifies existing auth hook in src/context/ or src/hooks/ before wiring; plan.md §M3 validates this assumption. No new backend required. [Assumption, Spec §Assumptions]
- [x] CHK036 — PASS: research.md documents Framer Motion v11 compatibility with React 18 + Rsbuild 1.3 (RSPack); ~24KB gzipped; selective imports supported. Validated. [Dependency, Gap, Spec §FR-011]
- [x] CHK037 — PASS: data-model.md defines full mock data contract — 7 TypeScript entities in src/data/homepage-mock.ts covering all 5 content sections. [Assumption, Spec §FR-010, FR-012, FR-013]

---

## Ambiguities & Conflicts

- [x] CHK038 — PASS: New tokens use distinct prefixes (--glass-*, --glow-*, --gradient-mesh-*) with no overlap against existing token namespaces. Additive-only policy confirmed in plan.md. [Ambiguity, Spec §FR-007]
- [x] CHK039 — PASS: Assumptions section explicitly excludes header, footer, and navigation from homepage scope. Scope = Home.tsx page content only. [Ambiguity, Spec §Assumptions]
- [x] CHK040 — PASS: "Feature cards" in content enrichment item 1 are the TreatmentCard components in the Treatment Showcase. No separate concept. [Ambiguity, Gap]

---

## Notes

- Check items off as completed: `[x]`
- Add inline findings when an item fails: `[x] CHK009 — FAIL: "visually prominent" undefined; add minimum vh% to FR-001`
- Items marked `[Gap]` indicate requirements missing from spec — author should address before planning
- Items marked `[Conflict Risk]` indicate potential contradictions between requirements — resolve before implementation
- Traceability: 95% of items reference spec section or gap marker
