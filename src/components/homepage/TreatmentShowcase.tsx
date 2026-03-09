// src/components/homepage/TreatmentShowcase.tsx
// US2: Treatment showcase grid with glassmorphism, scroll-triggered animations,
// and image fallback handling (003-homepage-redesign)

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { TreatmentEntry } from '../../data/homepage-mock';
import { fadeUpVariant } from '../../lib/animation-variants';

interface TreatmentShowcaseProps {
  treatments: TreatmentEntry[];
  title?: string;
}

// ─── Inline card with fallback image (extends TreatmentCard visual spec) ─────

function TreatmentCardWithFallback({ treatment }: { treatment: TreatmentEntry }) {
  const [imgErrored, setImgErrored] = useState(false);

  return (
    <article
      className="h-full overflow-hidden rounded-card border border-glass backdrop-blur-glass"
      style={{ background: 'var(--glass-bg)' }}
    >
      {/* Image area with onError fallback (T014) */}
      {imgErrored ? (
        <div
          className="flex w-full items-center justify-center"
          style={{ background: 'var(--gradient-mesh-warm)', aspectRatio: '4/5' }}
          data-testid="treatment-image-fallback"
          aria-hidden="true"
        >
          <svg
            className="h-12 w-12 opacity-25 text-functional-clinical"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 9.75h18M3.75 6h16.5A2.25 2.25 0 0122.5 8.25v7.5A2.25 2.25 0 0120.25 18H3.75A2.25 2.25 0 011.5 15.75V8.25A2.25 2.25 0 013.75 6z"
            />
          </svg>
        </div>
      ) : (
        <div className="w-full overflow-hidden" style={{ aspectRatio: '4/5' }}>
          <img
            src={treatment.imageUrl}
            alt={treatment.name}
            className="h-full w-full object-cover"
            onError={() => setImgErrored(true)}
          />
        </div>
      )}

      {/* Card text content */}
      <div style={{ padding: 'calc(var(--grid-unit) * 2)' }}>
        <h3
          className="font-display text-functional-clinical"
          style={{
            fontSize: 'var(--h3-font-size)',
            lineHeight: 'var(--heading-line-height)',
            letterSpacing: 'var(--heading-letter-spacing)',
          }}
        >
          {treatment.name}
        </h3>
        {treatment.category && (
          <span
            className="mt-1 inline-block text-xs uppercase text-accent-gold"
            style={{ letterSpacing: 'var(--status-label-letter-spacing)' }}
          >
            {treatment.category}
          </span>
        )}
        <p
          className="mt-2 text-sm text-functional-clinical/80"
          style={{
            fontFamily: 'var(--font-body)',
            lineHeight: 'var(--body-line-height)',
            letterSpacing: 'var(--body-letter-spacing)',
          }}
        >
          {treatment.description}
        </p>
      </div>
    </article>
  );
}

// ─── Section component ────────────────────────────────────────────────────────

export default function TreatmentShowcase({
  treatments,
  title = 'Our Treatments',
}: TreatmentShowcaseProps) {
  return (
    <section
      aria-label="Treatment Showcase"
      style={{ padding: 'var(--section-padding) 1.5rem' }}
    >
      <div className="mx-auto max-w-7xl">
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

        {/* Treatments grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <motion.div
              key={treatment.id}
              initial="hidden"
              whileInView="visible"
              variants={fadeUpVariant}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, boxShadow: 'var(--glow-gold)' }}
              transition={{ duration: 0.2 }}
              className="rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2"
            >
              <TreatmentCardWithFallback treatment={treatment} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
