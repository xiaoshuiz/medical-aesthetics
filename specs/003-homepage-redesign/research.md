# Research: Homepage Redesign

**Phase**: 0 — Outline & Research
**Generated**: 2026-03-05
**Feature**: [spec.md](./spec.md)

---

## 1. Framer Motion + Rsbuild Compatibility

**Decision**: Framer Motion v11 (latest stable) with React 18.3
**Rationale**: Full compatibility confirmed. Rsbuild (RSPack-based) supports ESM tree-shaking natively — no config changes required. Framer Motion selective imports keep bundle impact minimal.
**Bundle impact**: ~24KB gzipped with selective imports (`motion`, `AnimatePresence`, `useInView`, `useReducedMotion`)
**Alternatives considered**: React Spring (heavier API surface, less declarative for scroll-triggered), CSS-only animations (insufficient for staggered spring sequences and scroll-triggered orchestration)

### Key API patterns

| Use case | API | Notes |
|---|---|---|
| Scroll-triggered section reveals | `useInView` + `variants` | Recommended over `whileInView` for complex stagger orchestration |
| Simple card hover | `whileHover` prop | Direct prop, no hook needed |
| Staggered entrance | `staggerChildren` + `delayChildren` in parent variant | Typical values: `staggerChildren: 0.12`, `delayChildren: 0.1` |
| Reduced motion | `reduceMotion="user"` on `<MotionConfig>` root | Degrades all animations to instant state changes |
| AnimatePresence | Wrap conditional elements (auth-state CTA swap) | Smooth mount/unmount transitions |

### Accessibility
- Wrap root layout with `<MotionConfig reduceMotion="user">` — reads `prefers-reduced-motion` media query automatically
- All animation variants must define both `visible` and `hidden` states so degradation is clean

---

## 2. Font Loading Strategy

**Decision**: Google Fonts `<link>` tag in `index.html` with `rel="preconnect"` and `font-display=swap`
**Rationale**: Rsbuild SPA does not use `_document.tsx` (Next.js only). The `index.html` in repo root is the correct injection point. `font-display=swap` prevents render blocking; `preconnect` cuts DNS/TCP latency by ~100–300ms.
**Alternatives considered**: `@import` in CSS (render-blocking, worse performance), self-hosted fonts (extra build complexity out of scope)

### Implementation

```html
<!-- index.html — add inside <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### CSS token mapping
```css
--font-display: 'Playfair Display', Georgia, serif;   /* headings */
--font-body:    'Inter', system-ui, sans-serif;         /* body copy */
```

---

## 3. Design Tokens — New Additive Set

**Decision**: Extend `src/theme/tokens.css` with new tokens under existing `:root` block. Zero existing tokens modified.
**Rationale**: FR-007 mandates additive extension. Keeping all tokens in one file prevents drift.

### Typography tokens
```css
--font-display: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', system-ui, sans-serif;
--h1-font-size: clamp(2.5rem, 6vw, 4.5rem);
--h2-font-size: clamp(1.75rem, 4vw, 2.75rem);
--h3-font-size: clamp(1.25rem, 2.5vw, 1.75rem);
--heading-line-height: 1.15;
--body-line-height: 1.65;
```

### Glassmorphism tokens
```css
--glass-bg: rgba(250, 249, 246, 0.72);          /* --surface-pearl at 72% */
--glass-bg-dark: rgba(0, 90, 112, 0.12);        /* --functional-clinical tint */
--glass-backdrop-blur: 16px;
--glass-border: rgba(197, 160, 89, 0.18);       /* --accent-gold at 18% */
--glass-border-strong: rgba(197, 160, 89, 0.35);
```

### Glow tokens
```css
--glow-gold: 0 0 24px rgba(197, 160, 89, 0.35);
--glow-gold-strong: 0 0 48px rgba(197, 160, 89, 0.55), 0 0 96px rgba(197, 160, 89, 0.2);
--glow-teal: 0 0 32px rgba(0, 90, 112, 0.3);
--glow-interactive: 0 8px 32px rgba(197, 160, 89, 0.4);
```

### Gradient mesh tokens
```css
--gradient-mesh-warm: radial-gradient(ellipse 80% 60% at 20% 10%, rgba(197,160,89,0.18) 0%, transparent 60%),
                      radial-gradient(ellipse 60% 80% at 80% 90%, rgba(0,90,112,0.12) 0%, transparent 60%),
                      radial-gradient(ellipse 50% 50% at 50% 50%, rgba(250,249,246,0.8) 0%, transparent 100%);
--gradient-mesh-cool: radial-gradient(ellipse 70% 70% at 30% 20%, rgba(0,90,112,0.14) 0%, transparent 60%),
                      radial-gradient(ellipse 80% 60% at 70% 80%, rgba(197,160,89,0.10) 0%, transparent 60%);
--gradient-mesh-luxe: linear-gradient(135deg, rgba(197,160,89,0.08) 0%, rgba(250,249,246,0.0) 50%, rgba(0,90,112,0.06) 100%);
--gradient-gold-fade: linear-gradient(180deg, rgba(197,160,89,0.15) 0%, transparent 100%);
--gradient-cta: linear-gradient(135deg, #c5a059 0%, #9a7b4a 100%);
```

### Noise/grain texture
```css
--noise-texture: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
```

---

## 4. Tailwind Config Extensions

**Decision**: Extend `tailwind.config.js` theme to expose new tokens as Tailwind utilities.

```js
// additions to theme.extend:
backdropBlur: { glass: '16px' }
boxShadow: {
  'glow-gold': 'var(--glow-gold)',
  'glow-gold-strong': 'var(--glow-gold-strong)',
  'glow-teal': 'var(--glow-teal)',
  'glow-interactive': 'var(--glow-interactive)',
}
backgroundColor: {
  'glass': 'var(--glass-bg)',
  'glass-dark': 'var(--glass-bg-dark)',
}
borderColor: {
  'glass': 'var(--glass-border)',
  'glass-strong': 'var(--glass-border-strong)',
}
fontFamily: {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
}
backgroundImage: {
  'gradient-mesh-warm': 'var(--gradient-mesh-warm)',
  'gradient-mesh-cool': 'var(--gradient-mesh-cool)',
  'gradient-mesh-luxe': 'var(--gradient-mesh-luxe)',
  'gradient-cta': 'var(--gradient-cta)',
}
```

---

## 5. Design System Recommendations (ui-ux-pro-max)

**Style**: Liquid Glass
**Pattern**: Storytelling + Feature-Rich
**Color strategy**: Existing brand palette (gold + pearl + teal) is ideal for luxury medical positioning — no palette change needed
**Animation timing**: 300–400ms for primary transitions; 150–200ms for micro-interactions
**Motion principle**: transform + opacity only (GPU-composited); avoid animating width/height/padding

### Section-by-section design specification

| Section | Layout | Visual treatment | Animation |
|---|---|---|---|
| Hero | Full-viewport, centered content | Gradient mesh bg + noise overlay; headline glow | Staggered entrance: headline → subtitle → CTA (staggerChildren 0.12) |
| Stats strip | 4-col grid (2x2 mobile) | Pearl bg, gold accent numbers, subtle border-b | Count-up effect via `useInView` + Framer Motion number animation |
| Treatment showcase | 3-col grid (1-col mobile) | Glassmorphism cards (glass-bg, backdrop-blur, glass-border) | `whileInView` stagger; `whileHover` elevation + glow |
| Before/After | Full-width constrained | Existing BeforeAfterSlider component | `whileInView` fade-in |
| Doctor profiles | 2-3 col grid | Glassmorphism DoctorCard | `whileInView` stagger from bottom |
| Testimonials | 2-3 col grid | Minimal quote cards, gold accent left-border | `whileInView` stagger |
| Final CTA | Full-width | gradient-cta background, centered content | `whileInView` scale + fade |

---

## 6. Accessibility

- `<MotionConfig reduceMotion="user">` at app root handles all `prefers-reduced-motion` degradation
- All focus states must be visible (2px gold ring: `focus-visible:ring-2 focus-visible:ring-accent-gold`)
- Contrast: headings on gradient-mesh backgrounds must maintain ≥4.5:1 — use dark text (#2d2016 or --functional-clinical) over light gradient zones
- Before/after slider: existing component retains its keyboard/touch behavior

---

## 7. Dependency to Install

```bash
pnpm add framer-motion
```

No other new runtime dependencies required. Google Fonts loaded via CDN link tag (no npm package).
