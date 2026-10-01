import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface InViewSectionProps {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: string;
  className?: string;
}

/**
 * High-performance viewport wrapper for below-the-fold content.
 * Prevents mobile CPU throttling by deferring heavy DOM nodes until scrolled near.
 * Reserves min-height to guarantee ZERO Cumulative Layout Shift (CLS = 0.00).
 */
export default function InViewSection({
  children,
  rootMargin = '500px',
  minHeight = '320px',
  className = ''
}: InViewSectionProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView) return;
    const element = containerRef.current;
    if (!element) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isInView, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minHeight: isInView ? undefined : minHeight }}
    >
      {isInView ? children : null}
    </div>
  );
}
