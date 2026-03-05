/**
 * DoctorCard - flex column 16px gap, qualification badge 32px, Title 2 units smaller than Name, 200% font-weight (T018)
 */
export function DoctorCard({
  name,
  title,
  qualificationBadge,
  imageUrl,
  className = '',
}: {
  name: string;
  title: string;
  qualificationBadge?: React.ReactNode;
  imageUrl?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col rounded-card bg-surface-pearl shadow-mist overflow-hidden ${className}`}
      style={{ gap: '16px', padding: 'calc(var(--grid-unit) * 2)' }}
    >
      {imageUrl && (
        <div className="aspect-square w-16 rounded-full overflow-hidden bg-neutral-200">
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-col" style={{ gap: '16px' }}>
        <div>
          <h3 className="font-serif text-functional-clinical" style={{ fontSize: '1.125rem', letterSpacing: 'var(--heading-letter-spacing)' }}>
            {name}
          </h3>
          <p
            className="text-functional-clinical mt-1"
            style={{ fontSize: '0.875rem', fontWeight: 800, letterSpacing: 'var(--body-letter-spacing)' }}
          >
            {title}
          </p>
        </div>
        {qualificationBadge && (
          <div
            className="flex items-center justify-center rounded-card bg-neutral-200 text-functional-clinical text-xs font-bold"
            style={{ height: '32px', padding: '0 8px' }}
          >
            {qualificationBadge}
          </div>
        )}
      </div>
    </div>
  );
}
