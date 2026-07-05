import { useCallback } from 'react';
import gsap from 'gsap';

/**
 * Returns a function that smoothly scrolls to an element (by id or node)
 * using a GSAP-tweened scroll position for a premium eased feel.
 */
export default function useSmoothScrollTo() {
  return useCallback((target, { offset = 0, duration = 1.1 } = {}) => {
    const el =
      typeof target === 'string' ? document.getElementById(target) : target;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    if (reduced) {
      window.scrollTo({ top, behavior: 'auto' });
      return;
    }

    const proxy = { y: window.scrollY };
    gsap.to(proxy, {
      y: top,
      duration,
      ease: 'power3.inOut',
      onUpdate: () => window.scrollTo(0, proxy.y),
    });
  }, []);
}
