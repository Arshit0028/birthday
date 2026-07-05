import { useEffect, useState } from 'react';

/**
 * Returns true when the user has requested reduced motion.
 * Used to gracefully disable heavy animations for accessibility.
 */
export default function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (event) => setPrefersReduced(event.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
