// src/data/homepage-mock.ts
// Static mock data for homepage sections (003-homepage-redesign)

// ─── Types ────────────────────────────────────────────────────────────────────

export type CtaButton = {
  label: string;
  href: string;
};

export type HeroContent = {
  headline: string;
  subheading: string;
  backgroundImageUrl?: string;
  guestCta: CtaButton;
  authCta: CtaButton;
};

export type StatMetric = {
  id: string;
  value: string;
  label: string;
  icon?: string;
};

export type TreatmentEntry = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category?: string;
};

export type Practitioner = {
  id: string;
  name: string;
  title: string;
  qualificationBadge: string;
  imageUrl?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  patientName: string;
  treatmentReceived: string;
  rating?: number;
};

export type QuickAction = {
  id: string;
  label: string;
  icon: string;
  href: string;
  variant: 'primary' | 'secondary';
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const HERO_CONTENT: HeroContent = {
  headline: 'Redefine Your Natural Beauty',
  subheading:
    'Experience the pinnacle of medical aesthetics — where science meets artistry. Our board-certified specialists craft personalised treatments that enhance your natural radiance.',
  guestCta: { label: 'Explore Treatments', href: '/login' },
  authCta: { label: 'Book Appointment', href: '/booking' },
};

export const STAT_METRICS: StatMetric[] = [
  { id: 'patients', value: '5,000+', label: 'Patients Served' },
  { id: 'years', value: '12+', label: 'Years of Excellence' },
  { id: 'treatments', value: '30+', label: 'Treatment Options' },
  { id: 'satisfaction', value: '98%', label: 'Satisfaction Rate' },
];

export const TREATMENT_ENTRIES: TreatmentEntry[] = [
  {
    id: 'botox-fillers',
    name: 'Botox & Fillers',
    description:
      'Precision neuromodulator and filler treatments to smooth lines and restore youthful volume naturally.',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    category: 'Injectables',
  },
  {
    id: 'laser-skin',
    name: 'Laser Skin Resurfacing',
    description:
      'Advanced fractional laser technology to rejuvenate skin texture, tone, and luminosity with minimal downtime.',
    imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
    category: 'Laser',
  },
  {
    id: 'hydrafacial',
    name: 'HydraFacial MD',
    description:
      'Multi-step medical-grade facial that deeply cleanses, exfoliates, and hydrates for an immediate glow.',
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80',
    category: 'Facial',
  },
];

export const PRACTITIONERS: Practitioner[] = [
  {
    id: 'dr-chen',
    name: 'Dr. Sarah Chen',
    title: 'Aesthetic Medicine Specialist',
    qualificationBadge: 'MD, FACS',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  },
  {
    id: 'dr-patel',
    name: 'Dr. Arjun Patel',
    title: 'Dermatology & Laser Specialist',
    qualificationBadge: 'MD, FAAD',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
  },
  {
    id: 'dr-morgan',
    name: 'Dr. Emma Morgan',
    title: 'Facial Plastic Surgeon',
    qualificationBadge: 'MD, FRCS',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote:
      'The results exceeded my expectations. Dr. Chen truly understood my goals and the treatment felt completely personalised to me.',
    patientName: 'Sarah M.',
    treatmentReceived: 'Lip Filler Enhancement',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    quote:
      'I was nervous at first, but the team made me feel at ease instantly. My skin has never looked better — friends keep asking my secret!',
    patientName: 'James T.',
    treatmentReceived: 'HydraFacial MD',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    quote:
      'Professional, discreet, and genuinely transformative. The laser treatment gave me the confidence boost I had been looking for.',
    patientName: 'Priya K.',
    treatmentReceived: 'Laser Skin Resurfacing',
    rating: 5,
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'book', label: 'Book Appointment', icon: 'calendar', href: '/booking', variant: 'primary' },
  { id: 'history', label: 'My History', icon: 'clock', href: '/history', variant: 'secondary' },
  { id: 'profile', label: 'My Profile', icon: 'user', href: '/profile', variant: 'secondary' },
];
