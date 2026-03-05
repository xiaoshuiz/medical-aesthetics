/**
 * BookingCTA - fixed to bottom on mobile viewport (T020)
 * Uses mobile breakpoint from T003 (768px)
 */
import { Link } from 'react-router-dom';

export function BookingCTA({
  to,
  label,
  className = '',
}: {
  to: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 mobile:relative mobile:bottom-auto mobile:left-auto mobile:right-auto ${className}`}
      style={{ padding: 'var(--grid-unit)' }}
    >
      <Link
        to={to}
        className="block w-full rounded-pill bg-accent-gold-dark py-3 text-center text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2"
      >
        {label}
      </Link>
    </div>
  );
}
