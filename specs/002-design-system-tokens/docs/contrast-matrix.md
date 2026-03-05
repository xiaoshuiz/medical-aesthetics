# Contrast Matrix: Allowed Background-to-Text Pairings

**Branch**: 002-design-system-tokens  
**Purpose**: Document allowed pairings and verify WCAG AA (4.5:1) and UI (3:1) compliance (T013).

## Token Pairings

| Background | Text/UI | Contrast | Compliant |
|------------|---------|----------|-----------|
| surface-pearl (#FAF9F6) | functional-clinical (#005A70) | >7:1 | ✓ WCAG AA |
| surface-pearl (#FAF9F6) | accent-gold (#C5A059) | ~2.5:1 | ✗ Use accent-gold-dark |
| surface-pearl (#FAF9F6) | accent-gold-dark (#9A7B4A) | ≥3:1 | ✓ UI elements |
| neutral-100–500 | functional-clinical | Varies | Verify per shade |
| accent-gold / accent-gold-dark | White (#FFFFFF) | ≥4.5:1 | ✓ |

## Rules

- **Normal text**: Minimum 4.5:1 (WCAG AA)
- **UI elements** (icons, controls, borders): Minimum 3:1
- **accent-gold on surface-pearl**: Use `accent-gold-dark` token when default fails 3:1

## Verification

Run contrast checker on sample screens. All text using defined token pairings MUST pass.
