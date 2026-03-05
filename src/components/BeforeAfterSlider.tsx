/**
 * BeforeAfterSlider - 4:5 or 1:1 aspect ratio, @status-label for labels, glassmorphism, 2px #FFFFFF handle (T017)
 * Card-Overlay: backdrop-filter blur(12px), border 1px solid rgba(255,255,255,0.3) (T021)
 */
import { useState } from 'react';

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  className = '',
}: {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const [position, setPosition] = useState(50);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  };

  const labelStyle = {
    fontSize: 'var(--status-label-font-size)',
    fontWeight: 'var(--status-label-font-weight)',
    letterSpacing: 'var(--status-label-letter-spacing)',
    textTransform: 'var(--status-label-text-transform)' as const,
  };

  return (
    <div
      className={`relative overflow-hidden rounded-card select-none ${className}`}
      style={{ aspectRatio: '4/5' }}
      onMouseMove={handleMove}
      onMouseLeave={() => setPosition(50)}
      onTouchMove={handleTouch}
    >
      {/* Before image (full) */}
      <div className="absolute inset-0">
        <img src={beforeImage} alt="Before" className="h-full w-full object-cover" />
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-white"
          style={{
            ...labelStyle,
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '4px',
          }}
        >
          {beforeLabel}
        </div>
      </div>
      {/* After image (clipped by position) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={afterImage} alt="After" className="h-full w-full object-cover" />
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-white"
          style={{
            ...labelStyle,
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '4px',
          }}
        >
          {afterLabel}
        </div>
      </div>
      {/* 2px #FFFFFF vertical handle */}
      <div
        className="absolute top-0 bottom-0 bg-white cursor-ew-resize pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)', width: '2px' }}
      />
    </div>
  );
}
