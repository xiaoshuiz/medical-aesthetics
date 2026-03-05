/**
 * Primary CTA button - 50px (pill) radius (T016)
 */
export function CTAButton({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-pill bg-accent-gold-dark px-6 py-3 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
