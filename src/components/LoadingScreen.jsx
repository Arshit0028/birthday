import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

/**
 * Full-screen loader shown on first paint.
 * Fills a progress ring, then calls `onDone`.
 */
export default function LoadingScreen({ onDone, duration = 2600 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, onDone]);

  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dream-gradient"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-glow-radial" />

      <div className="relative flex items-center justify-center">
        <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
          <defs>
            <linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f76ca5" />
              <stop offset="50%" stopColor="#b090ff" />
              <stop offset="100%" stopColor="#e6c672" />
            </linearGradient>
          </defs>
          <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(176,144,255,0.18)" strokeWidth="6" />
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke="url(#loadGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C - (C * progress) / 100}
            style={{ filter: 'drop-shadow(0 0 8px rgba(176,144,255,0.6))' }}
          />
        </svg>
        <motion.div
          className="absolute text-blush-500"
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart size={40} fill="#f76ca5" strokeWidth={1.4} />
        </motion.div>
      </div>

      <motion.h2
        className="mt-10 font-display text-2xl font-medium tracking-wide text-plum sm:text-3xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Loading your surprise
        <AnimatedDots />
      </motion.h2>

      <p className="mt-3 font-body text-sm text-plum/60">{progress}%</p>
    </motion.div>
  );
}

function AnimatedDots() {
  return (
    <span className="inline-flex w-6 justify-start">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}
