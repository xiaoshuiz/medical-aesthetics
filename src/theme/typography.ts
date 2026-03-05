/**
 * Typographic scale for design system (T029).
 * 1 unit = 1 step in the scale. Doctor-Card Title is 2 units smaller than Name.
 */
export const TYPOGRAPHIC_SCALE = {
  /** H1 - largest heading */
  h1: '2.5rem',
  /** H2 - section heading */
  h2: '2rem',
  /** H3 - subsection */
  h3: '1.5rem',
  /** Body large */
  bodyLg: '1.125rem',
  /** Body default */
  body: '1rem',
  /** Body small */
  bodySm: '0.875rem',
  /** Doctor-Card Name */
  name: '1.125rem',
  /** Doctor-Card Title: 2 units smaller than Name → bodySm (0.875rem) */
  title: '0.875rem',
  /** status-label */
  statusLabel: '10px',
} as const;
