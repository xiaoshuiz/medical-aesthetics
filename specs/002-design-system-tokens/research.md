# Research: Medical Aesthetics Design System

**Feature**: 002-design-system-tokens  
**Purpose**: Resolve technical choices for token delivery, contrast handling, and audit tooling.

## 1. Token delivery: CSS custom properties vs Tailwind theme only

**Decision**: Use both. CSS custom properties (kebab-case) in a single source file for design-tool and non-React consumers; extend Tailwind theme so React components use Tailwind utilities and theme() for the same values.

**Rationale**: Spec requires kebab-case, machine-consumable tokens (FR-001). Tailwind is already in use (001-online-appointment-booking); extending theme keeps one source of truth and avoids hardcoded values. CSS vars enable future non-Tailwind usage and easier contrast/audit scripting.

**Alternatives considered**: Tailwind-only (rejected: spec asks for named tokens and potential non-Tailwind use). Design tokens npm package (rejected: adds dependency; CSS vars + Tailwind extension sufficient for scope).

## 2. Contrast and darker-variant for accent-gold

**Decision**: Pre-compute contrast for accent-gold on surface-pearl; define a second token `accent-gold-dark` (or equivalent) with a value that meets 3:1. Use that token in UI elements when the default fails. No runtime contrast calculation in the UI bundle.

**Rationale**: Spec requires 3:1 for UI elements and “generate a darker-variant automatically” when default fails (FR-002). Pre-computed token satisfies “provide or generate” without client-side logic; build-time or design-time derivation is acceptable.

**Alternatives considered**: Runtime JS contrast check (rejected: adds bundle and complexity). Single accent token only (rejected: would not meet 3:1 on pearl in some cases).

## 3. Style audit and 8pt grid

**Decision**: Implement audit as a script (Node or npm script) that parses CSS/source for spacing values (margin, padding, gap) and reports values not on 8pt grid; 48px in CTA-to-Image context is treated as compliant per spec. Output: markdown or JSON listing file/component and value.

**Rationale**: Spec requires a Style Audit report (FR-014, SC-005). Script is reproducible and can run in CI; no new runtime dependency in the app.

**Alternatives considered**: Manual audit only (rejected: not repeatable). Full AST/CSS parser (acceptable if simple grep/regex insufficient for accuracy).

## 4. Mobile viewport breakpoint for Booking CTA

**Decision**: Define a single breakpoint (e.g. 768px or 640px) in theme/breakpoints and use it for the fixed-bottom Booking CTA. Document in plan/spec so behavior is testable.

**Rationale**: Spec requires fixed-bottom on “mobile viewports” and testable behavior; single breakpoint is simple and verifiable.

**Alternatives considered**: Multiple breakpoints (rejected: unnecessary for “mobile” vs desktop). Container queries (deferred: not required by spec).

## 5. Typographic scale and “2 units smaller”

**Decision**: Define a type scale (e.g. steps in tailwind theme or CSS vars) and document that “1 unit” = 1 step. Doctor-Card Title uses the step that is 2 steps below Name; font-weight 200% (double the card base) per spec.

**Rationale**: FR-011 and clarifications require Title 2 typographic units smaller than Name with 200% font-weight. Explicit scale makes this unambiguous for implementation and QA.

**Alternatives considered**: Px/rem only (rejected: “units” implies scale). No scale (rejected: would be ambiguous).
