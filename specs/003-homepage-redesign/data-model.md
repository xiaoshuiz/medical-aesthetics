# Data Model: Homepage Redesign

**Phase**: 1 — Design & Contracts
**Generated**: 2026-03-05
**Feature**: [spec.md](./spec.md)

All data is **static/mock** — no API integration. Types are defined for TypeScript prop interfaces and data shape validation.

---

## Entities

### HeroContent

Content that populates the hero section. Auth-state-aware CTA is handled by the component using `AuthContext`.

```ts
interface HeroContent {
  headline: string;           // e.g. "Redefine Your Natural Beauty"
  subheading: string;         // value proposition, 1–2 sentences
  backgroundImageUrl?: string; // optional: full-bleed image behind gradient mesh
  guestCta: CtaButton;        // CTA for unauthenticated visitors
  authCta: CtaButton;         // CTA for logged-in users
}

interface CtaButton {
  label: string;   // e.g. "Book Appointment" | "Get Started"
  href: string;    // route path, e.g. "/booking" | "/login"
}
```

**State transitions**: None — content is static; CTA routing determined by `isAuthenticated`.

---

### StatMetric

A single clinic statistic displayed in the trust strip.

```ts
interface StatMetric {
  id: string;          // e.g. "patients"
  value: string;       // e.g. "500+" — display string (pre-formatted)
  label: string;       // e.g. "Patients Served"
  icon?: string;       // optional icon name or SVG path reference
}
```

**Validation**: `value` must not be empty. `label` max 40 chars for layout integrity.
**Mock data shape**: 4 entries — patients, years in operation, treatments offered, satisfaction rate.

---

### TreatmentEntry

A treatment service item displayed via the existing `TreatmentCard` component.

```ts
interface TreatmentEntry {
  id: string;
  name: string;          // e.g. "Botox & Fillers"
  description: string;   // 1–2 sentences; max ~120 chars for card layout
  imageUrl: string;      // placeholder image URL
  category?: string;     // optional grouping label
}
```

**Validation**: minimum 3 entries required (FR-003). `description` must fit single TreatmentCard without truncation at 320px width.
**Edge case**: If `imageUrl` fails to load, card must display fallback background color (`--surface-pearl`).

---

### Practitioner

A doctor/specialist profile displayed via the existing `DoctorCard` component.

```ts
interface Practitioner {
  id: string;
  name: string;              // e.g. "Dr. Sarah Chen"
  title: string;             // e.g. "Aesthetic Medicine Specialist"
  qualificationBadge: string; // e.g. "MD, FACS" — rendered as badge
  imageUrl?: string;         // optional portrait; avatar fallback if absent
}
```

**Validation**: 2–3 entries (FR-012). `qualificationBadge` max 12 chars for 32px badge height.
**Edge case**: Missing `imageUrl` → avatar placeholder with initials from `name`.

---

### Testimonial

A short patient quote displayed in the testimonials section.

```ts
interface Testimonial {
  id: string;
  quote: string;           // patient review text; max ~180 chars
  patientName: string;     // first name + last initial, e.g. "Sarah M."
  treatmentReceived: string; // e.g. "Lip Filler Enhancement"
  rating?: number;          // 1–5; optional star display
}
```

**Validation**: 2–3 entries (FR-013). `quote` must not exceed 180 chars to maintain card height consistency.

---

### QuickAction

A quick-access shortcut button displayed to authenticated users.

```ts
interface QuickAction {
  id: string;
  label: string;   // e.g. "Book Appointment"
  icon: string;    // icon name from icon set
  href: string;    // route path
  variant: 'primary' | 'secondary';
}
```

**Validation**: Exactly 3 required (FR-005): book, history, profile.
**State**: Only rendered when `isAuthenticated === true`.

---

## Relationships

```
HomePage
├── HeroSection (1)
│   ├── HeroContent (1)
│   └── QuickAction[] (3) — logged-in only
├── StatsStrip (1)
│   └── StatMetric[] (4)
├── TreatmentShowcase (1)
│   └── TreatmentEntry[] (3+) → TreatmentCard
├── BeforeAfterSection (1)
│   └── BeforeAfterSlider (existing component)
├── DoctorSection (1)
│   └── Practitioner[] (2–3) → DoctorCard
├── TestimonialsSection (1)
│   └── Testimonial[] (2–3)
└── FinalCTA (1)
    └── HeroContent.guestCta | HeroContent.authCta
```

---

## Mock Data Registry

All mock data lives in `src/data/homepage-mock.ts`:

| Export | Type | Count |
|---|---|---|
| `HERO_CONTENT` | `HeroContent` | 1 |
| `STAT_METRICS` | `StatMetric[]` | 4 |
| `TREATMENT_ENTRIES` | `TreatmentEntry[]` | 3 |
| `PRACTITIONERS` | `Practitioner[]` | 3 |
| `TESTIMONIALS` | `Testimonial[]` | 3 |
| `QUICK_ACTIONS` | `QuickAction[]` | 3 |
