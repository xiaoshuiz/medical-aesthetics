import { PriceDisplay } from './PriceDisplay';

/**
 * FloatingPriceCard - Mist Shadow elevation, 24px radius (T015)
 */
export function FloatingPriceCard({
  amount,
  currency = '¥',
  label,
  className = '',
}: {
  amount: string | number;
  currency?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card bg-surface-pearl shadow-mist p-4 ${className}`}
      style={{ padding: 'calc(var(--grid-unit) * 2)' }}
    >
      {label && (
        <span
          className="block text-xs font-bold uppercase mb-1 text-functional-clinical"
          style={{
            fontSize: 'var(--status-label-font-size)',
            letterSpacing: 'var(--status-label-letter-spacing)',
            textTransform: 'var(--status-label-text-transform)',
          }}
        >
          {label}
        </span>
      )}
      <PriceDisplay amount={amount} currency={currency} />
    </div>
  );
}
