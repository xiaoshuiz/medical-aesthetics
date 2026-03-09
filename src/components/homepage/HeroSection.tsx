// src/components/homepage/HeroSection.tsx
// US1: Full-viewport hero section with gradient mesh, noise overlay, staggered entrance,
// and auth-aware CTA (003-homepage-redesign)

import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { CtaButton, HeroContent, QuickAction } from '../../data/homepage-mock';
import { fadeUpVariant, staggerContainerVariant } from '../../lib/animation-variants';

// ─── Icon helpers (inline SVG — no icon library dependency) ──────────────────

function CalendarIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.ReactNode> = {
  calendar: <CalendarIcon />,
  clock: <ClockIcon />,
  user: <UserIcon />,
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeroSectionProps {
  content: HeroContent;
  isAuthenticated: boolean;
  userName?: string;
  quickActions?: QuickAction[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection({
  content,
  isAuthenticated,
  userName,
  quickActions,
}: HeroSectionProps) {
  const cta: CtaButton = isAuthenticated ? content.authCta : content.guestCta;

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-mesh-warm"
      aria-label="Hero"
    >
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'var(--noise-texture)', opacity: 0.035 }}
        aria-hidden="true"
      />

      {/* Content column */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariant}
      >
        {/* Headline */}
        <motion.h1
          variants={fadeUpVariant}
          className="font-display text-functional-clinical"
          style={{
            fontSize: 'var(--h1-font-size)',
            lineHeight: 'var(--heading-line-height)',
            letterSpacing: 'var(--heading-letter-spacing)',
            textShadow: '0 0 32px rgba(197,160,89,0.25)',
          }}
        >
          {content.headline}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUpVariant}
          className="mx-auto mt-6 max-w-xl text-functional-clinical/80"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            lineHeight: 'var(--body-line-height)',
          }}
        >
          {content.subheading}
        </motion.p>

        {/* Auth-aware CTA area */}
        <AnimatePresence mode="wait">
          {isAuthenticated ? (
            <motion.div
              key="auth"
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mt-10"
            >
              {/* Personalised greeting */}
              {userName && (
                <p
                  className="mb-4 truncate text-sm text-functional-clinical/70"
                  style={{ fontFamily: 'var(--font-body)', maxWidth: '20rem', margin: '0 auto 1rem' }}
                >
                  Welcome back,{' '}
                  <span className="font-medium text-accent-gold">{userName}</span>
                </p>
              )}

              {/* Primary auth CTA */}
              <Link
                to={cta.href}
                className="inline-block rounded-pill px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2"
                style={{ background: 'var(--gradient-cta)', boxShadow: 'var(--glow-gold)' }}
              >
                {cta.label}
              </Link>

              {/* Quick actions */}
              {quickActions && quickActions.length > 0 && (
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {quickActions.map((action) => (
                    <motion.div
                      key={action.id}
                      whileHover={{ scale: 1.04, boxShadow: 'var(--glow-interactive)' }}
                      transition={{ duration: 0.15 }}
                    >
                      <Link
                        to={action.href}
                        className={[
                          'flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-medium transition-shadow',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2',
                          action.variant === 'primary'
                            ? 'text-white'
                            : 'border border-glass bg-glass text-functional-clinical backdrop-blur-glass',
                        ].join(' ')}
                        style={
                          action.variant === 'primary'
                            ? { background: 'var(--gradient-cta)' }
                            : undefined
                        }
                      >
                        {ICON_MAP[action.icon]}
                        {action.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="guest"
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mt-10"
            >
              <Link
                to={cta.href}
                className="inline-block rounded-pill px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2"
                style={{ background: 'var(--gradient-cta)', boxShadow: 'var(--glow-gold)' }}
              >
                {cta.label}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
