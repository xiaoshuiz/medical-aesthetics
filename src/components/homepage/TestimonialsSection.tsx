// src/components/homepage/TestimonialsSection.tsx
// US3: Patient testimonials — staggered scroll-triggered grid of quote cards
// (003-homepage-redesign T018)

import { motion } from 'framer-motion';
import type { Testimonial } from '../../data/homepage-mock';
import { fadeUpVariant, staggerContainerVariant } from '../../lib/animation-variants';

// ─── TestimonialCard (inline) ─────────────────────────────────────────────────

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article
      className="flex h-full flex-col rounded-card border-l-4 p-6"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-backdrop-blur))',
        borderColor: 'var(--accent-gold)',
        border: '1px solid var(--glass-border)',
        borderLeftWidth: '4px',
        borderLeftColor: 'var(--accent-gold)',
      }}
    >
      {/* Star rating */}
      {testimonial.rating && (
        <div className="mb-3 flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i} className="text-accent-gold text-sm" aria-hidden="true">
              ★
            </span>
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote
        className="flex-1 italic text-functional-clinical/90"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          lineHeight: 'var(--body-line-height)',
        }}
      >
        "{testimonial.quote}"
      </blockquote>

      {/* Attribution */}
      <footer className="mt-4 border-t border-glass pt-4">
        <p
          className="font-semibold text-functional-clinical"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}
        >
          {testimonial.patientName}
        </p>
        <p
          className="text-xs text-functional-clinical/60 mt-0.5"
          style={{
            fontFamily: 'var(--font-body)',
            letterSpacing: 'var(--status-label-letter-spacing)',
            textTransform: 'uppercase',
          }}
        >
          {testimonial.treatmentReceived}
        </p>
      </footer>
    </article>
  );
}

// ─── Section component ────────────────────────────────────────────────────────

interface TestimonialsSectionProps {
  testimonials: Testimonial[]; // 2–3 items
  title?: string;
}

export default function TestimonialsSection({
  testimonials,
  title = 'What Our Patients Say',
}: TestimonialsSectionProps) {
  const colClass =
    testimonials.length === 2
      ? 'grid-cols-1 md:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      aria-label="Patient Testimonials"
      style={{
        padding: 'var(--section-padding) 1.5rem',
        background: 'var(--gradient-mesh-warm)',
      }}
    >
      <div className="mx-auto max-w-6xl">
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
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={fadeUpVariant}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
