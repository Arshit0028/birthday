import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const ICONS = [Heart, Sparkles, Star];
const COLORS = ['#f76ca5', '#b090ff', '#e6c672', '#ff8fbb'];

/**
 * A gentle field of floating hearts / sparkles drifting upward.
 * @param {number} count    how many drifters
 * @param {boolean} intense larger + faster (used at the finale)
 */
function FloatingHearts({ count = 14, intense = false }) {
  const reduced = usePrefersReducedMotion();

  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        Icon: ICONS[i % ICONS.length],
        left: Math.random() * 100,
        size: (intense ? 18 : 12) + Math.random() * (intense ? 26 : 16),
        delay: Math.random() * 6,
        duration: (intense ? 6 : 9) + Math.random() * 6,
        color: COLORS[i % COLORS.length],
        drift: (Math.random() - 0.5) * 120,
      })),
    [count, intense]
  );

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map(({ id, Icon, left, size, delay, duration, color, drift }) => (
        <motion.div
          key={id}
          className="absolute bottom-[-40px]"
          style={{ left: `${left}%`, color }}
          initial={{ y: 0, opacity: 0, scale: 0.6 }}
          animate={{
            y: [0, -window.innerHeight - 80],
            x: [0, drift, 0],
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.6, 1, 0.9],
            rotate: [0, 20, -10, 0],
          }}
          transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={size} fill={intense ? color : 'none'} strokeWidth={1.6} />
        </motion.div>
      ))}
    </div>
  );
}

export default memo(FloatingHearts);
