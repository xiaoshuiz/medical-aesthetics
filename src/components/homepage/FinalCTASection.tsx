// src/components/homepage/FinalCTASection.tsx
// US4: Auth-aware final CTA section — full-width gradient with scroll-triggered entrance
// (003-homepage-redesign T021)

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { CtaButton } from '../../data/homepage-mock';
import { fadeUpVariant } from '../../lib/animation-variants';

interface FinalCTASectionProps {
  isAuthenticated: boolean;
  guestCta: CtaButton;
  authCta: CtaButton;
}

export default function FinalCTASection({
  isAuthenticated,
  guestCta,
  authCta,
}: FinalCTASectionProps) {
  const cta = isAuthenticated ? authCta : guestCta;

  return (
    <section
      aria-label="Final Call to Action"
      className="relative overflow-hidden"
      style={{ background: 'var(--gradient-cta)', padding: 'var(--section-padding) 1.5rem' }}
    >
      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'var(--noise-texture)', opacity: 0.04 }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariant}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <h2
            className="font-display text-white"
            style={{
              fontSize: 'var(--h2-font-size)',
              lineHeight: 'var(--heading-line-height)',
              letterSpacing: 'var(--heading-letter-spacing)',
              textShadow: '0 2px 20px rgba(0,0,0,0.2)',
            }}
          >
            Begin Your Transformation
          </h2>

          {/* Subtext */}
          <p
            className="mx-auto mt-4 max-w-lg text-white/85"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              lineHeight: 'var(--body-line-height)',
            }}
          >
            {isAuthenticated
              ? 'Your personalised aesthetic journey awaits. Book your next appointment today.'
              : 'Join thousands of patients who have discovered their most confident selves.'}
          </p>

          {/* CTA button */}
          <div className="mt-8">
            <Link
              to={cta.href}
              className="inline-block rounded-pill border-2 border-white/70 bg-white/15 px-10 py-3.5 text-sm font-semibold text-white backdrop-blur-glass transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
            >
              {cta.label}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
