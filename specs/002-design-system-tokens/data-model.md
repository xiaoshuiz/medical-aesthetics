# Data Model: Medical Aesthetics Design System

**Feature**: 002-design-system-tokens  
**Purpose**: Logical entities for tokens, component specs, and deliverables. No persistent database; these are design-time and build-time artifacts.

## 1. Design token

Logical entity representing a named design decision consumable by UI code.

| Attribute       | Description |
|----------------|-------------|
| Name           | Machine-consumable, kebab-case (e.g. `surface-pearl`, `accent-gold`, `status-label`) |
| Value          | Color (hex/rgba), size (px/rem), shadow, etc. |
| Category       | color \| typography \| spacing \| radius \| elevation |
| Usage rules    | Optional (e.g. “UI elements only”, “section backgrounds”) |

**Relationships**: Tokens are referenced by component specs and by the manifest. Color tokens may have a related “darker-variant” token when contrast requires it.

## 2. Token groups

- **Glass & Skin**: surface-pearl, accent-gold, functional-clinical; Nude @neutral-100…@neutral-500.
- **Typography**: Heading (Serif, -0.01em), Body (Sans-serif, 0.03em, 1.6), status-label (Uppercase, 10px, Bold, 2px).
- **Spacing**: 8pt grid; section padding clamp(64px, 10vw, 120px); Special-Gap 48px (CTA-to-Image only).
- **Radius / elevation**: 24px card, 50px pill, Mist Shadow.

## 3. Component spec

Logical entity describing a UI pattern (layout, dimensions, style rules).

| Attribute     | Description |
|--------------|-------------|
| Id           | e.g. TreatmentCard, BeforeAfterSlider, DoctorCard, PriceDisplay, BookingCTA |
| Layout       | e.g. flex column, 16px gap |
| Dimensions   | e.g. badge height 32px, aspect ratio 4:5 or 1:1 |
| Style rules  | Tokens to use (radius, shadow, glassmorphism, typography) |
| Role         | Optional tag (e.g. Card-Overlay) for shared rules (glassmorphism) |

**Relationships**: Each component spec maps to one or more React components in the manifest.

## 4. Manifest entry

Maps a design spec or token group to the implementation.

| Attribute   | Description |
|------------|-------------|
| Spec/pattern | Token group or component spec id |
| Component path | e.g. `src/components/DoctorCard.tsx` |
| Status     | mapped \| unmapped |

**Relationships**: Manifest is the set of these entries; unmapped specs or components are explicitly listed (FR-013, SC-004).

## 5. Style audit finding

Single spacing deviation from the 8pt grid (excluding allowed 48px CTA-to-Image).

| Attribute   | Description |
|------------|-------------|
| File/path  | Source file or component |
| Property   | margin \| padding \| gap \| etc. |
| Value      | Non–8pt value |
| Compliant  | false (or true only for 48px in CTA-to-Image context) |

**Relationships**: Style Audit Report is the list of findings (FR-014, SC-005).

## 6. State / lifecycle

- **Tokens**: Defined at build/design time; consumed at runtime via CSS or theme.
- **Component specs**: Defined in spec; implemented in components; manifest updated when components are added or changed.
- **Style audit**: Generated on demand or in CI; findings are fixed in code or documented as exceptions.

No persistence layer; all artifacts are files (theme, manifest JSON, audit report).
