// src/components/homepage/DoctorSection.tsx
// US3: Doctor profiles section — staggered scroll-triggered grid (003-homepage-redesign T017)

import { motion } from 'framer-motion';
import { DoctorCard } from '../DoctorCard';
import type { Practitioner } from '../../data/homepage-mock';
import { fadeUpVariant, staggerContainerVariant } from '../../lib/animation-variants';

interface DoctorSectionProps {
  practitioners: Practitioner[]; // 2–3 items
  title?: string;
}

/**
 * Custom card for practitioners without an imageUrl — renders initials avatar
 * above the DoctorCard text content (DoctorCard does not accept children).
 */
function PractitionerCard({ practitioner }: { practitioner: Practitioner }) {
  if (!practitioner.imageUrl) {
    const initials = practitioner.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');

    return (
      <div
        className="flex h-full flex-col rounded-card border border-glass bg-glass backdrop-blur-glass"
        style={{ padding: 'calc(var(--grid-unit) * 2)', gap: '16px' }}
      >
        {/* Initials avatar */}
        <div
          className="flex aspect-square w-16 items-center justify-center rounded-full bg-neutral-200 font-display text-xl font-bold text-functional-clinical"
          aria-label={`${practitioner.name} avatar`}
        >
          {initials}
        </div>
        <div>
          <h3
            className="font-serif text-functional-clinical"
            style={{ fontSize: '1.125rem', letterSpacing: 'var(--heading-letter-spacing)' }}
          >
            {practitioner.name}
          </h3>
          <p
            className="mt-1 text-functional-clinical"
            style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: 'var(--body-letter-spacing)' }}
          >
            {practitioner.title}
          </p>
        </div>
        <div
          className="flex items-center justify-center rounded-card bg-neutral-200 text-xs font-bold text-functional-clinical"
          style={{ height: '32px', padding: '0 8px' }}
        >
          {practitioner.qualificationBadge}
        </div>
      </div>
    );
  }

  return (
    <DoctorCard
      name={practitioner.name}
      title={practitioner.title}
      qualificationBadge={practitioner.qualificationBadge}
      imageUrl={practitioner.imageUrl}
      className="h-full border border-glass bg-glass backdrop-blur-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2"
    />
  );
}

export default function DoctorSection({
  practitioners,
  title = 'Meet Our Specialists',
}: DoctorSectionProps) {
  const colClass =
    practitioners.length === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      aria-label="Doctor Profiles"
      style={{ padding: 'var(--section-padding) 1.5rem' }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariant}
          viewport={{ once: true }}
          className="mb-12 text-center font-display text-functional-clinical"
          style={{
            fontSize: 'var(--h2-font-size)',
            lineHeight: 'var(--heading-line-height)',
            letterSpacing: 'var(--heading-letter-spacing)',
          }}
        >
          {title}
        </motion.h2>

        {/* Stagger grid */}
        <motion.div
          className={`grid gap-8 ${colClass}`}
          initial="hidden"
          whileInView="visible"
          variants={staggerContainerVariant}
          viewport={{ once: true }}
        >
          {practitioners.map((practitioner) => (
            <motion.div key={practitioner.id} variants={fadeUpVariant}>
              <PractitionerCard practitioner={practitioner} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
