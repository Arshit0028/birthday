import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

/**
 * A glassmorphism memory card that gently tilts toward the cursor and glows.
 */
export default function MemoryCard({ memory, index }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 10 });
  };

  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="group relative"
    >
      {/* glow aura */}
      <div
        className={`pointer-events-none absolute -inset-0.5 rounded-[28px] bg-gradient-to-br ${memory.accent}
          opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60`}
      />

      <div className="glass relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 transition-shadow duration-500 group-hover:shadow-glow">
        {/* number eyebrow */}
        <span className="mb-4 font-display text-sm tracking-[0.3em] text-lavender-500/70">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div
          className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${memory.accent} text-3xl shadow-glow`}
          style={{ transform: 'translateZ(40px)' }}
        >
          <span aria-hidden="true">{memory.emoji}</span>
        </div>

        <h3
          className="mb-3 font-display text-2xl font-semibold text-plum"
          style={{ transform: 'translateZ(25px)' }}
        >
          {memory.title}
        </h3>
        <p className="font-body text-[15px] leading-relaxed text-plum/75">{memory.note}</p>

        {/* shimmer sweep on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </div>
    </motion.article>
  );
}
