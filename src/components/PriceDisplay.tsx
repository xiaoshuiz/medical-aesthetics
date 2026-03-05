/**
 * PriceDisplay - @currency at 0.7× amount font-size (T019)
 */
export function PriceDisplay({
  amount,
  currency = '¥',
  className = '',
}: {
  amount: string | number;
  currency?: string;
  className?: string;
}) {
  const amountStr = typeof amount === 'number' ? amount.toFixed(2) : String(amount);
  return (
    <span className={`inline-flex items-baseline text-functional-clinical ${className}`}>
      <span
        className="mr-0.5"
        style={{ fontSize: '0.7em', verticalAlign: 'baseline' }}
        aria-hidden
      >
        {currency}
      </span>
      <span>{amountStr}</span>
    </span>
  );
}
