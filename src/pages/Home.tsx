// src/pages/Home.tsx
// Homepage redesign (003-homepage-redesign)

import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { fadeUpVariant } from '../lib/animation-variants';
import {
  HERO_CONTENT,
  STAT_METRICS,
  TREATMENT_ENTRIES,
  PRACTITIONERS,
  TESTIMONIALS,
  QUICK_ACTIONS,
} from '../data/homepage-mock';

// Phase 3 — US1
import HeroSection from '../components/homepage/HeroSection';

// Phase 4 — US2
import TreatmentShowcase from '../components/homepage/TreatmentShowcase';

// Phase 5 — US3
import StatsStrip from '../components/homepage/StatsStrip';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import DoctorSection from '../components/homepage/DoctorSection';
import TestimonialsSection from '../components/homepage/TestimonialsSection';

// Phase 6 — US4
import FinalCTASection from '../components/homepage/FinalCTASection';

export function Home() {
  const { user } = useAuth();
  const isAuthenticated = user !== null;
  const userName = user?.display_name;


  return (
    <div className="min-h-screen bg-surface-pearl">
      {/* US1: Hero */}
      <HeroSection
        content={HERO_CONTENT}
        isAuthenticated={isAuthenticated}
        userName={userName}
        quickActions={QUICK_ACTIONS}
      />

      {/* US2: Treatment Showcase */}
      <TreatmentShowcase treatments={TREATMENT_ENTRIES} />

      {/* US3: Stats Strip */}
      <StatsStrip metrics={STAT_METRICS} />

      {/* US3: Before / After Slider */}
      <section aria-label="Before and After" style={{ padding: 'var(--section-padding) 1.5rem' }}>
        <div className="mx-auto max-w-2xl">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUpVariant}
            viewport={{ once: true }}
            className="mb-10 text-center font-display text-functional-clinical"
            style={{
              fontSize: 'var(--h2-font-size)',
              lineHeight: 'var(--heading-line-height)',
              letterSpacing: 'var(--heading-letter-spacing)',
            }}
          >
            Real Results
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUpVariant}
            viewport={{ once: true }}
          >
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80"
              afterImage="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80"
            />
          </motion.div>
        </div>
      </section>

      {/* US3: Doctor Profiles */}
      <DoctorSection practitioners={PRACTITIONERS} />

      {/* US3: Patient Testimonials */}
      <TestimonialsSection testimonials={TESTIMONIALS} />

      {/* US4: Final CTA */}
      <FinalCTASection
        isAuthenticated={isAuthenticated}
        guestCta={HERO_CONTENT.guestCta}
        authCta={HERO_CONTENT.authCta}
      />
    </div>
  );
}
