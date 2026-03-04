# Feature Specification: Medical Aesthetics Design System

**Feature Branch**: `002-design-system-tokens`  
**Created**: 2026-03-04  
**Status**: Draft  
**Input**: Refining tokens and component specs for a high-end clinical aesthetic. Design system extraction rules (colors, typography, soft UI), component-specific logic (Before/After, Doctor Profile Cards, Booking CTA), and outputs: design tokens in a consistent naming convention, a manifest mapping specs to the component library, and a style audit for spacing.

## Clarifications

### Session 2026-03-04 (Spatial Rhythm & Breathability)

- Q: Section padding for premium “breathability” across viewports? → A: Force vertical section padding to clamp(64px, 10vw, 120px).
- Q: Typography tracking for Serif headings vs Sans-serif body? → A: Serif H1/H2 letter-spacing -0.01em (tighten for luxury); Sans-serif Body letter-spacing 0.03em (loosen for readability).
- Q: Grid alignment and allowed exceptions? → A: All component margins snap to 8pt grid; allow a Special-Gap of 48px for CTA-to-Image relationships only.

### Session 2026-03-04 (Visual Fidelity & Texture)

- Q: Gold accent contrast against pearl surface for UI elements? → A: @accent-gold (#C5A059) must maintain at least 3:1 contrast against @surface-pearl (#FAF9F6) for UI elements; if it fails, the system MUST generate a darker-variant automatically.
- Q: Glassmorphism for overlay cards? → A: All elements tagged Card-Overlay use backdrop-filter blur(12px) and border 1px solid rgba(255,255,255,0.3) to simulate high-end clinical glassware.
- Q: Neutral section backgrounds? → A: A Skin-Tone (Nude) palette of 5 neutral shades extracted from the design, labeled @neutral-100 through @neutral-500, for subtle section backgrounds.

### Session 2026-03-04 (Business Component Logic)

- Q: Before/After slider labels and handle spec? → A: Before and After labels MUST use the @status-label token (Uppercase, 10px, Bold, 2px letter-spacing). The slider handle MUST be a 2px vertical line in #FFFFFF.
- Q: Doctor-Card title vs name typography? → A: Doctor-Card Title (e.g. Surgeon, Consultant) MUST be 2 typographic units smaller than the Name, with 200% font-weight.
- Q: Price display format? → A: All prices follow a uniform spec: the currency symbol (@currency) MUST be 0.7× the size of the amount.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Designers and Developers Apply Consistent Tokens (Priority: P1)

Designers and developers use a single source of truth for colors, typography, and spacing so that all screens and components look and feel like one high-end clinical aesthetic brand. Tokens are named consistently and can be consumed by UI code without hardcoding values.

**Why this priority**: Without a defined token set, the product will drift in visual style and accessibility; this is the foundation for all UI work.

**Independent Test**: Can be fully tested by applying the token set to a sample page and verifying that surface, accent, and functional colors appear as specified and that text meets contrast requirements.

**Acceptance Scenarios**:

1. **Given** the design system token set is available, **When** a developer applies the surface and accent tokens to a screen, **Then** the screen uses Pearl White (#FAF9F8) for main surface and Champagne Gold (#D4AF37) for brand accent.
2. **Given** the token set, **When** text is placed on any defined background, **Then** contrast ratios meet WCAG AA (minimum 4.5:1 for normal text).
3. **Given** heading and body typography tokens, **When** applied to headings and body copy, **Then** Serif headings (H1, H2) use letter-spacing -0.01em for a premium feel and Sans-serif body text uses letter-spacing 0.03em and line-height 1.6 for readability.

---

### User Story 2 - Treatment and Profile UI Matches Soft UI and Component Specs (Priority: P2)

Product and QA can verify that treatment cards, price cards, doctor profile cards, and CTAs follow the specified layout and visual rules (radius, elevation, aspect ratios, and key dimensions) so the experience feels cohesive and trustworthy.

**Why this priority**: Component-level consistency directly affects perceived quality and conversion; it builds on the token foundation.

**Independent Test**: Can be tested by rendering each component type (treatment card, floating price card, doctor profile card, Before/After slider, Booking CTA) and checking layout and style against the written spec.

**Acceptance Scenarios**:

1. **Given** a treatment card or similar card surface, **When** rendered, **Then** corner radius is 24px and floating price cards use the specified “Mist Shadow” elevation (0 12px 40px rgba(0,0,0,0.04)).
2. **Given** a primary CTA button, **When** rendered, **Then** it uses a pill shape (50px radius).
3. **Given** a Before/After comparison slider, **When** rendered, **Then** the media area respects a 4:5 or 1:1 aspect ratio, the Before/After labels use the @status-label token (Uppercase, 10px, Bold, 2px tracking) with a center-aligned glassmorphism backdrop, and the handle is a 2px vertical line in #FFFFFF.
4. **Given** a Doctor-Card (doctor profile card), **When** rendered, **Then** layout is a vertical flex column with 16px gap, the qualification badge has a fixed height of 32px, and the Title (e.g. Surgeon, Consultant) is 2 typographic units smaller than the Name with 200% font-weight.
5. **Given** any price display, **When** rendered, **Then** the currency symbol (@currency) is 0.7× the size of the amount.
6. **Given** the booking CTA on a mobile viewport, **When** the user scrolls, **Then** the CTA remains fixed at the bottom of the viewport to support conversion.

---

### User Story 3 - Stakeholders Verify Coverage and Spacing Compliance (Priority: P3)

Product and design can confirm that every design spec is mapped to the existing component library and that a style audit report identifies any spacing that does not follow the 8pt grid, so gaps and inconsistencies can be fixed.

**Why this priority**: Ensures the design system is actionable and that spacing stays systematic; it closes the loop between spec and implementation.

**Independent Test**: Can be tested by generating the manifest and the style audit, then checking that each listed component has a spec mapping and that audit findings are limited to intentional exceptions or real deviations.

**Acceptance Scenarios**:

1. **Given** the design system specs, **When** the manifest is produced, **Then** it maps each defined pattern (tokens and components) to the corresponding React/Vue component in the library.
2. **Given** the application or component library, **When** the style audit runs, **Then** it reports every spacing value that deviates from the 8pt grid (treating 48px Special-Gap for CTA-to-Image as compliant) so teams can align or document exceptions.

---

### Edge Cases

- What happens when a new component is added to the library but not yet in the manifest? The manifest or process must allow the gap to be visible (e.g. listed as unmapped) until the spec is added.
- How does the system handle contrast when accent or clinical colors are used on non-standard backgrounds? All token pairings (background + text) that are allowed in the system must be checked; any new pairing must meet WCAG AA or be explicitly marked as decorative/non-text. For accent-gold on surface-pearl in UI elements, if 3:1 is not met, a darker-variant must be generated and used automatically.
- What happens on very small viewports for fixed-bottom CTA? The spec applies to “mobile viewports”; the breakpoint at which fixed-bottom is applied must be defined so behavior is consistent and testable.

## Requirements *(mandatory)*

Requirements align with the project constitution: one design system, accessibility (contrast, responsiveness), and consistent UX.

### Functional Requirements

**Design tokens (extraction and naming)**

- **FR-001**: The design system MUST define a “Glass & Skin” color palette with at least: a main surface token (e.g. surface-pearl #FAF9F6, or Pearl White #FAF9F8), a brand accent token (e.g. accent-gold #C5A059, or Champagne Gold #D4AF37), and a functional clinical token (Trust Teal #005A70). A Skin-Tone (Nude) palette of five neutral shades MUST be defined and labeled @neutral-100 through @neutral-500, extracted from the design and used for subtle section backgrounds. Tokens MUST be named in a consistent, machine-consumable convention (e.g. kebab-case).
- **FR-002**: The design system MUST ensure that every allowed background-to-text combination using these tokens meets WCAG AA contrast (minimum 4.5:1 for normal text). For UI elements (icons, controls, borders) using accent-gold on surface-pearl, contrast MUST be at least 3:1; if the default accent-gold (#C5A059) fails this against surface-pearl (#FAF9F6), the system MUST provide or generate a darker-variant automatically so that 3:1 is satisfied.

**Typography (editorial hierarchy)**

- **FR-003**: The design system MUST define Heading styles so that H1 and H2 use a Serif font stack with letter-spacing -0.01em (tightened for luxury).
- **FR-004**: The design system MUST define Body styles using a Sans-serif stack with letter-spacing 0.03em and line-height 1.6 for medical readability.

**Soft UI (radius and elevation)**

- **FR-005**: The design system MUST specify 24px corner radius for all treatment cards.
- **FR-006**: The design system MUST specify a pill-shaped radius (50px) for primary CTA buttons.
- **FR-007**: The design system MUST specify a “Mist Shadow” elevation for floating price cards: 0 12px 40px rgba(0,0,0,0.04).

**Before/After comparison**

- **FR-008**: The Before/After slider component MUST constrain media to a 4:5 or 1:1 aspect ratio. The “Before” and “After” labels MUST use the @status-label token: Uppercase, 10px font-size, Bold weight, 2px letter-spacing; labels use a center-aligned semi-transparent backdrop (glassmorphism). The slider handle MUST be specified as a 2px vertical line in #FFFFFF.
- **FR-009**: All elements tagged or designated as Card-Overlay (including the Before/After label backdrop) MUST use the glassmorphism spec: backdrop-filter blur(12px) and border 1px solid rgba(255,255,255,0.3) to simulate high-end clinical glassware.

**Doctor profile cards (Doctor-Card)**

- **FR-010**: Doctor-Card (doctor profile card) MUST use a vertical flex layout with 16px gap between elements.
- **FR-011**: The qualification badge in the Doctor-Card MUST have a fixed height of 32px. The Title (e.g. Surgeon, Consultant) MUST always be 2 typographic units smaller than the Name and MUST use 200% font-weight relative to the card’s base weight.

**Price display**

- **FR-017**: All price displays MUST follow a uniform spec: the currency symbol MUST use the @currency token and MUST be rendered at 0.7× the font-size of the amount (numeric value).

**Booking CTA**

- **FR-012**: The Booking CTA MUST be fixed to the bottom of the viewport on mobile viewports to support conversion.

**Spatial rhythm and breathability**

- **FR-015**: The design system MUST define vertical section padding as clamp(64px, 10vw, 120px) so that layout “breathes” on all screen sizes.
- **FR-016**: All component margins MUST align to the 8pt grid, with one allowed exception: a Special-Gap of 48px MAY be used for CTA-to-Image relationships only. The style audit MUST treat 48px in that context as compliant.

**Deliverables**

- **FR-013**: The design system MUST provide a manifest that maps each design spec (tokens and component patterns) to the existing React/Vue component library so that coverage is traceable.
- **FR-014**: The design system MUST provide a Style Audit report that flags any spacing that deviates from the 8pt grid (except the 48px Special-Gap for CTA-to-Image) so that teams can correct or document exceptions.

### Key Entities

- **Design Token**: A named design decision (color, typography, radius, elevation, spacing) with a defined value and optional usage rules. Consumed by UI code to ensure consistency.
- **Component Spec**: A written specification for a UI pattern (e.g. Before/After slider, Doctor profile card, Booking CTA) describing layout, dimensions, and style rules without mandating a specific technology.
- **Card-Overlay**: A design role for elements that sit over content (e.g. labels, overlays) and MUST use the glassmorphism spec: blur(12px) and border 1px solid rgba(255,255,255,0.3).
- **Skin-Tone (Nude) palette**: The set of five neutral tokens @neutral-100 through @neutral-500 used for subtle section backgrounds; values are extracted from the design.
- **status-label**: A typography token for small status/category labels: Uppercase, 10px, Bold, 2px letter-spacing; used for Before/After labels and similar.
- **Doctor-Card**: The doctor profile card component; includes Name, Title (e.g. Surgeon, Consultant), and qualification badge with the specified typographic and layout rules.
- **@currency**: Token for the currency symbol in price displays; rendered at 0.7× the size of the amount for a uniform price spec.
- **Manifest**: A mapping from design specs and tokens to concrete components in the component library, used to verify coverage and guide implementation.
- **Style Audit Report**: An artifact that lists spacing (and optionally other) values that do not conform to the 8pt grid, used to maintain visual consistency.

## Assumptions

- Design assets (e.g. Figma) are the source for extracting token values; the spec does not assume a specific design tool but assumes that values such as surface-pearl (#FAF9F6), accent-gold (#C5A059), Trust Teal #005A70, the five Nude neutrals (@neutral-100–500), 24px, 50px, and the Mist Shadow definition are approved by design. When accent-gold fails 3:1 on surface-pearl, implementation may derive the darker-variant algorithmically or from a pre-defined token.
- The design system defines @status-label (for Before/After and similar labels) and @currency (for price displays). “Typographic unit” for Doctor-Card Title vs Name is defined in the design scale (e.g. 1 unit = 1 step in the type scale). The existing component library includes (or will include) React/Vue components that correspond to treatment cards, price cards, doctor profile cards, Before/After slider, and Booking CTA; the manifest will map to those.
- “Mobile viewport” for the fixed-bottom CTA will be defined in the implementation plan (e.g. breakpoint in px or em) so that behavior is testable.
- The 8pt grid is the standard for spacing; the style audit flags deviations except the allowed 48px Special-Gap for CTA-to-Image relationships. Section padding uses a responsive clamp for breathability and is not required to be an 8pt multiple.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All pages and components that use the design system use only the defined tokens for surface, accent, and functional clinical color; no hardcoded hex values for those roles.
- **SC-002**: 100% of text that uses the defined token pairings passes WCAG AA contrast (4.5:1 minimum for normal text) when measured with a standard contrast checker.
- **SC-003**: Every component type covered by the spec (treatment card, price card, doctor profile card, Before/After slider, Booking CTA) can be verified against the written spec in under 5 minutes per component.
- **SC-004**: The manifest lists every specified pattern and maps it to a component; unmapped components or unmapped specs are explicitly called out.
- **SC-005**: The style audit report runs against the codebase or design artifacts and lists every spacing value that is not a multiple of 8; audit findings are actionable (file/component and value identified).
- **SC-006**: On viewports defined as “mobile,” the Booking CTA remains visible and fixed at the bottom so that users can complete booking without scrolling to find the CTA.
- **SC-007**: All major page sections use vertical padding that respects the breathability rule (clamp(64px, 10vw, 120px)) so that layout does not feel dense on any supported viewport size.
- **SC-008**: All UI elements using accent-gold on surface-pearl meet at least 3:1 contrast (or use the design-system-provided darker-variant when the default fails).
- **SC-009**: All Card-Overlay elements use the specified glassmorphism (blur 12px, border 1px solid rgba(255,255,255,0.3)); section backgrounds that use neutrals use only the defined @neutral-100 through @neutral-500 tokens.
- **SC-010**: Before/After sliders use @status-label for labels (Uppercase, 10px, Bold, 2px tracking) and a 2px #FFFFFF vertical handle; Doctor-Cards show Title 2 units smaller than Name with 200% font-weight; all price displays show @currency at 0.7× the amount size.
