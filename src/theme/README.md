# Design System Theme

**Branch**: 002-design-system-tokens

## Token Usage

### Colors
- `surface-pearl` – Main surface background
- `accent-gold` – Brand accent (use `accent-gold-dark` for UI elements on surface-pearl when 3:1 required)
- `functional-clinical` – Trust Teal for clinical/functional elements
- `neutral-100` … `neutral-500` – Nude palette for section backgrounds

### Typography
- **H1/H2**: Serif font, `--heading-letter-spacing: -0.01em`
- **Body**: Sans-serif, `--body-letter-spacing: 0.03em`, `--body-line-height: 1.6`
- **status-label**: Uppercase, 10px, Bold, 2px letter-spacing

### Tailwind Classes
- `bg-surface-pearl`, `text-accent-gold`, `text-accent-gold-dark`, `text-functional-clinical`
- `font-serif`, `font-sans`
- `rounded-card` (24px), `rounded-pill` (50px)
- `shadow-mist`
- `py-section` for section padding (clamp)
