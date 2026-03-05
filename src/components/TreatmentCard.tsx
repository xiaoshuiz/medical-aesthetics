/**
 * TreatmentCard - 24px radius, 8pt grid margins (T014)
 */
export function TreatmentCard({
  title,
  description,
  imageUrl,
  children,
  className = '',
}: {
  title: string;
  description?: string;
  imageUrl?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`rounded-card bg-surface-pearl shadow-mist overflow-hidden ${className}`}
      style={{ margin: 'var(--grid-unit)' }}
    >
      {imageUrl && (
        <div className="aspect-[4/5] w-full bg-neutral-200" style={{ marginBottom: 'var(--grid-unit)' }}>
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-4" style={{ padding: 'calc(var(--grid-unit) * 2)' }}>
        <h3 className="font-serif text-functional-clinical" style={{ letterSpacing: 'var(--heading-letter-spacing)' }}>
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-functional-clinical text-sm" style={{ letterSpacing: 'var(--body-letter-spacing)', lineHeight: 'var(--body-line-height)' }}>
            {description}
          </p>
        )}
        {children}
      </div>
    </article>
  );
}
