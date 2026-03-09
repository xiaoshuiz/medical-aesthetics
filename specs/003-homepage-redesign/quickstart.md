# Quickstart: Homepage Redesign

**Phase**: 1 — Setup Guide
**Generated**: 2026-03-05

---

## Prerequisites

- Node.js 20+
- pnpm (project package manager)
- Existing repo cloned on branch `003-homepage-redesign`

---

## Step 1: Install Framer Motion

```bash
pnpm add framer-motion
```

Verify installation:
```bash
pnpm list framer-motion
# Expected: framer-motion 11.x.x
```

No Rsbuild config changes required — RSPack handles ESM tree-shaking automatically.

---

## Step 2: Add Google Fonts to index.html

Open `index.html` in the repo root and add the following inside `<head>`, before the closing tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

---

## Step 3: Extend Design Tokens

Append the following new token block to `src/theme/tokens.css` after the existing `:root` closing brace — do **not** modify existing tokens:

```css
/* === 003-homepage-redesign: Additive tokens === */
:root {
  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --h1-font-size: clamp(2.5rem, 6vw, 4.5rem);
  --h2-font-size: clamp(1.75rem, 4vw, 2.75rem);
  --h3-font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  --heading-line-height: 1.15;
  --body-line-height: 1.65;

  /* Glassmorphism */
  --glass-bg: rgba(250, 249, 246, 0.72);
  --glass-bg-dark: rgba(0, 90, 112, 0.12);
  --glass-backdrop-blur: 16px;
  --glass-border: rgba(197, 160, 89, 0.18);
  --glass-border-strong: rgba(197, 160, 89, 0.35);

  /* Glow */
  --glow-gold: 0 0 24px rgba(197, 160, 89, 0.35);
  --glow-gold-strong: 0 0 48px rgba(197, 160, 89, 0.55), 0 0 96px rgba(197, 160, 89, 0.2);
  --glow-teal: 0 0 32px rgba(0, 90, 112, 0.3);
  --glow-interactive: 0 8px 32px rgba(197, 160, 89, 0.4);

  /* Gradient meshes */
  --gradient-mesh-warm: radial-gradient(ellipse 80% 60% at 20% 10%, rgba(197,160,89,0.18) 0%, transparent 60%),
                        radial-gradient(ellipse 60% 80% at 80% 90%, rgba(0,90,112,0.12) 0%, transparent 60%),
                        radial-gradient(ellipse 50% 50% at 50% 50%, rgba(250,249,246,0.8) 0%, transparent 100%);
  --gradient-mesh-cool: radial-gradient(ellipse 70% 70% at 30% 20%, rgba(0,90,112,0.14) 0%, transparent 60%),
                        radial-gradient(ellipse 80% 60% at 70% 80%, rgba(197,160,89,0.10) 0%, transparent 60%);
  --gradient-mesh-luxe: linear-gradient(135deg, rgba(197,160,89,0.08) 0%, rgba(250,249,246,0.0) 50%, rgba(0,90,112,0.06) 100%);
  --gradient-gold-fade: linear-gradient(180deg, rgba(197,160,89,0.15) 0%, transparent 100%);
  --gradient-cta: linear-gradient(135deg, #c5a059 0%, #9a7b4a 100%);

  /* Noise texture */
  --noise-texture: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
}
```

---

## Step 4: Extend Tailwind Config

In `tailwind.config.js`, add the following inside `theme.extend`:

```js
backdropBlur: {
  glass: '16px',
},
boxShadow: {
  'glow-gold': 'var(--glow-gold)',
  'glow-gold-strong': 'var(--glow-gold-strong)',
  'glow-teal': 'var(--glow-teal)',
  'glow-interactive': 'var(--glow-interactive)',
},
backgroundColor: {
  glass: 'var(--glass-bg)',
  'glass-dark': 'var(--glass-bg-dark)',
},
borderColor: {
  glass: 'var(--glass-border)',
  'glass-strong': 'var(--glass-border-strong)',
},
fontFamily: {
  display: 'var(--font-display)',
  body: 'var(--font-body)',
},
backgroundImage: {
  'gradient-mesh-warm': 'var(--gradient-mesh-warm)',
  'gradient-mesh-cool': 'var(--gradient-mesh-cool)',
  'gradient-mesh-luxe': 'var(--gradient-mesh-luxe)',
  'gradient-cta': 'var(--gradient-cta)',
},
```

---

## Step 5: Wrap App Root with MotionConfig

In `src/App.tsx` (or the nearest root component), wrap with `MotionConfig`:

```tsx
import { MotionConfig } from 'framer-motion';

export function App() {
  return (
    <MotionConfig reduceMotion="user">
      {/* existing app content */}
    </MotionConfig>
  );
}
```

---

## Step 6: Create Mock Data File

```bash
mkdir -p src/data
touch src/data/homepage-mock.ts
```

Populate with mock content per the data model in [data-model.md](./data-model.md).

---

## Step 7: Run Dev Server

```bash
pnpm dev
# Expected: http://localhost:3000 (or Rsbuild's configured port)
```

Navigate to `/` to see the homepage.

---

## File Structure After Implementation

```
src/
├── data/
│   └── homepage-mock.ts          # All static mock data + TypeScript types
├── lib/
│   └── animation-variants.ts     # Shared Framer Motion variant configs
├── components/
│   └── homepage/
│       ├── HeroSection.tsx
│       ├── StatsStrip.tsx
│       ├── TreatmentShowcase.tsx
│       ├── DoctorSection.tsx
│       ├── TestimonialsSection.tsx
│       └── FinalCTASection.tsx
├── pages/
│   └── Home.tsx                  # Redesigned — composes all section components
└── theme/
    └── tokens.css                # Extended with new additive tokens
```
