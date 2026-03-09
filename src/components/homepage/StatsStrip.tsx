// src/components/homepage/StatsStrip.tsx
// US3: Clinic statistics strip — 4-column grid with scroll-triggered stagger animation
// (003-homepage-redesign T016)

import { motion } from 'framer-motion';
import type { StatMetric } from '../../data/homepage-mock';
import { fadeUpVariant, staggerContainerVariant } from '../../lib/animation-variants';

interface StatsStripProps {
  metrics: StatMetric[]; // exactly 4 items expected
}

export default function StatsStrip({ metrics }: StatsStripProps) {
  return (
    <section
      aria-label="Clinic Statistics"
      className="border-y border-glass"
      style={{
        background: 'var(--gradient-mesh-cool)',
        padding: 'calc(var(--section-padding) * 0.5) 1.5rem',
      }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          variants={staggerContainerVariant}
          viewport={{ once: true }}
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.id}
              variants={fadeUpVariant}
              className="flex flex-col items-center text-center"
              style={{ padding: 'calc(var(--grid-unit) * 2)' }}
            >
              {/* Value — large, gold, Playfair Display */}
              <span
                className="font-display text-accent-gold-dark"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.1,
                  fontWeight: 700,
                  textShadow: '0 0 16px rgba(197,160,89,0.3)',
                }}
              >
                {metric.value}
              </span>

              {/* Label — small, clinical neutral, Inter */}
              <span
                className="mt-2 text-sm text-functional-clinical/70"
                style={{
                  fontFamily: 'var(--font-body)',
                  letterSpacing: 'var(--body-letter-spacing)',
                  lineHeight: 'var(--body-line-height)',
                }}
              >
                {metric.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
