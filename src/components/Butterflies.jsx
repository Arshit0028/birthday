import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

/** A single SVG butterfly with flapping wings. */
function Butterfly({ color = '#b090ff', size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <motion.g
        style={{ transformOrigin: '32px 32px' }}
        animate={{ scaleX: [1, 0.55, 1] }}
        transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M32 32C26 14 12 12 8 22c-4 10 6 18 24 12Z"
          fill={color}
          opacity="0.85"
        />
        <path
          d="M32 32C38 14 52 12 56 22c4 10-6 18-24 12Z"
          fill={color}
          opacity="0.7"
        />
        <path
          d="M32 32C27 40 16 44 12 40c-3-3 2-11 20-8Z"
          fill={color}
          opacity="0.6"
        />
        <path
          d="M32 32C37 40 48 44 52 40c3-3-2-11-20-8Z"
          fill={color}
          opacity="0.5"
        />
      </motion.g>
      <rect x="31" y="18" width="2" height="28" rx="1" fill="#2a1a45" opacity="0.6" />
    </svg>
  );
}

const COLORS = ['#f76ca5', '#b090ff', '#e6c672', '#ff8fbb', '#cbb4ff'];

/** A few butterflies fluttering across the whole page. */
function Butterflies({ count = 5 }) {
  const reduced = usePrefersReducedMotion();

  const flock = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        size: 26 + Math.random() * 22,
        top: 10 + Math.random() * 70,
        delay: Math.random() * 8,
        duration: 16 + Math.random() * 12,
        amp: 40 + Math.random() * 80,
        dir: i % 2 === 0 ? 1 : -1,
      })),
    [count]
  );

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      {flock.map(({ id, color, size, top, delay, duration, amp, dir }) => (
        <motion.div
          key={id}
          className="absolute"
          style={{ top: `${top}%` }}
          initial={{ x: dir === 1 ? -80 : window.innerWidth + 80, opacity: 0 }}
          animate={{
            x: dir === 1 ? window.innerWidth + 80 : -80,
            y: [0, -amp, amp * 0.6, -amp * 0.4, 0],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Butterfly color={color} size={size} />
        </motion.div>
      ))}
    </div>
  );
}

export default memo(Butterflies);
