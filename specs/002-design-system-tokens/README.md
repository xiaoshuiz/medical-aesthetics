# Medical Aesthetics Design System

**Branch**: 002-design-system-tokens  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Tasks**: [tasks.md](./tasks.md)

## Token List

| Category | Tokens |
|----------|--------|
| **Colors** | surface-pearl, accent-gold, accent-gold-dark, functional-clinical, neutral-100…500 |
| **Typography** | Serif H1/H2 (-0.01em), Body (0.03em, 1.6), status-label (10px, Bold, 2px) |
| **Spacing** | 8pt grid, section-padding clamp(64px, 10vw, 120px), special-gap 48px |
| **Radius** | radius-card 24px, radius-pill 50px |
| **Elevation** | shadow-mist 0 12px 40px rgba(0,0,0,0.04) |

## Component List

| Component | Path |
|-----------|------|
| TreatmentCard | src/components/TreatmentCard.tsx |
| FloatingPriceCard | src/components/FloatingPriceCard.tsx |
| CTAButton | src/components/CTAButton.tsx |
| BeforeAfterSlider | src/components/BeforeAfterSlider.tsx |
| DoctorCard | src/components/DoctorCard.tsx |
| PriceDisplay | src/components/PriceDisplay.tsx |
| BookingCTA | src/components/BookingCTA.tsx |

## Links

- [Contracts](./contracts/README.md) – Token contract and component-manifest schema
- [Contrast Matrix](./docs/contrast-matrix.md) – Allowed background-to-text pairings
- [Implementation Checklist](./checklists/implementation-verification.md)
- [Style Audit Report](./style-audit-report.md)
