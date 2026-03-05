# UI Contracts: Homepage Redesign

**Phase**: 1 — Design & Contracts
**Generated**: 2026-03-05
**Feature**: [spec.md](../spec.md)

Defines the prop interfaces for all new homepage components. Existing components (`TreatmentCard`, `DoctorCard`, `BeforeAfterSlider`) retain their existing contracts unchanged.

---

## New Components

### `HeroSection`

**File**: `src/components/homepage/HeroSection.tsx`

```ts
interface HeroSectionProps {
  content: HeroContent;
  isAuthenticated: boolean;
  userName?: string;           // used for personalized greeting when authenticated
  quickActions?: QuickAction[]; // rendered below greeting if authenticated
}
```

**Rendering rules**:
- If `isAuthenticated === false`: show `content.guestCta`
- If `isAuthenticated === true`: show personalized greeting + `content.authCta` + `quickActions`
- `userName` must truncate at ~24 chars with CSS `truncate` to prevent layout break

---

### `StatsStrip`

**File**: `src/components/homepage/StatsStrip.tsx`

```ts
interface StatsStripProps {
  metrics: StatMetric[];   // exactly 4 items expected
}
```

**Rendering rules**:
- 4-column grid on tablet+ → 2×2 grid on mobile
- Each metric displays `value` (large, gold, font-display) and `label` (small, neutral)

---

### `TreatmentShowcase`

**File**: `src/components/homepage/TreatmentShowcase.tsx`

```ts
interface TreatmentShowcaseProps {
  treatments: TreatmentEntry[];  // minimum 3
  title?: string;                // section heading, defaults to "Our Treatments"
}
```

**Rendering rules**:
- Maps `TreatmentEntry[]` to existing `TreatmentCard` component
- Applies glassmorphism override class to each card wrapper
- Mobile: 1 column → tablet: 2 columns → desktop: 3 columns

---

### `DoctorSection`

**File**: `src/components/homepage/DoctorSection.tsx`

```ts
interface DoctorSectionProps {
  practitioners: Practitioner[];  // 2–3 items
  title?: string;                 // section heading, defaults to "Meet Our Specialists"
}
```

**Rendering rules**:
- Maps `Practitioner[]` to existing `DoctorCard` component
- Mobile: 1 column → tablet+: equal-width columns (2 or 3)

---

### `TestimonialsSection`

**File**: `src/components/homepage/TestimonialsSection.tsx`

```ts
interface TestimonialsSectionProps {
  testimonials: Testimonial[];  // 2–3 items
  title?: string;               // defaults to "What Our Patients Say"
}
```

**Rendering rules**:
- Each testimonial renders as a `TestimonialCard` (new inline component)
- Layout: 1 col mobile → 2 col tablet → 3 col desktop (or 2 centered if only 2 items)

---

### `TestimonialCard` (inline in TestimonialsSection)

```ts
interface TestimonialCardProps {
  testimonial: Testimonial;
}
```

Visual spec: white/glass card, left border `4px solid --accent-gold`, italic quote, patient name + treatment as caption.

---

### `FinalCTASection`

**File**: `src/components/homepage/FinalCTASection.tsx`

```ts
interface FinalCTASectionProps {
  isAuthenticated: boolean;
  guestCta: CtaButton;
  authCta: CtaButton;
}
```

**Rendering rules**:
- Full-width section with `gradient-cta` background
- Centered headline + subtext + single CTA button
- CTA href/label switches on `isAuthenticated`

---

## Shared Data Types

Types are co-located with mock data in `src/data/homepage-mock.ts` and imported by components:

```ts
// src/data/homepage-mock.ts
export type CtaButton = { label: string; href: string };
export type HeroContent = { headline: string; subheading: string; backgroundImageUrl?: string; guestCta: CtaButton; authCta: CtaButton };
export type StatMetric = { id: string; value: string; label: string; icon?: string };
export type TreatmentEntry = { id: string; name: string; description: string; imageUrl: string; category?: string };
export type Practitioner = { id: string; name: string; title: string; qualificationBadge: string; imageUrl?: string };
export type Testimonial = { id: string; quote: string; patientName: string; treatmentReceived: string; rating?: number };
export type QuickAction = { id: string; label: string; icon: string; href: string; variant: 'primary' | 'secondary' };
```

---

## Animation Contract

All new section components accept an optional `animationVariants` override. Default variants (used when prop omitted):

```ts
// Shared default variants — exported from src/lib/animation-variants.ts
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const staggerContainerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const cardHoverVariant = {
  rest: { scale: 1, boxShadow: 'var(--shadow-mist)' },
  hover: { scale: 1.02, boxShadow: 'var(--glow-gold)' },
};
```

**Constraint**: When `<MotionConfig reduceMotion="user">` is active, all variant transitions degrade to instant state changes automatically.

---

## Existing Component Contracts (unchanged)

| Component | File | Key props |
|---|---|---|
| `TreatmentCard` | `src/components/TreatmentCard.tsx` | `name`, `description`, `imageUrl`, `className?` |
| `DoctorCard` | `src/components/DoctorCard.tsx` | `name`, `title`, `qualificationBadge?`, `imageUrl?`, `className?` |
| `BeforeAfterSlider` | `src/components/BeforeAfterSlider.tsx` | existing interface — not modified |
