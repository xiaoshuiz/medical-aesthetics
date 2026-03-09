// src/lib/animation-variants.ts
// Shared Framer Motion variant configs for homepage sections (003-homepage-redesign)
// Usage: initial="hidden" animate="visible" (or whileInView="visible") variants={variant}
// NOTE: Always use string variant names — never pass variant value objects directly.

import type { Variants } from 'framer-motion';

/** Fade up entrance: opacity 0→1, y 24→0, 0.4s easeOut */
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/**
 * Stagger container: wraps children that each use fadeUpVariant.
 * Children inherit the "visible" trigger from the parent whileInView/animate.
 * staggerChildren: 0.12s — each child enters 120ms after the previous.
 * delayChildren: 0.1s  — initial pause before first child enters.
 */
export const staggerContainerVariant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/**
 * Card hover variant — for use with initial="rest" whileHover="hover".
 * Applies subtle scale + glow box-shadow.
 */
export const cardHoverVariant: Variants = {
  rest: { scale: 1, boxShadow: 'var(--shadow-mist)' },
  hover: { scale: 1.02, boxShadow: 'var(--glow-gold)' },
};
