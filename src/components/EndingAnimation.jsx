import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

/**
 * A glowing heart that slowly assembles itself from drifting particles,
 * followed by the closing signature.
 */
export default function EndingAnimation() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = 360;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const COLORS = ['#f76ca5', '#b090ff', '#e6c672', '#ff8fbb', '#cbb4ff'];
    const center = size / 2;

    // parametric heart target points
    const targets = [];
    const N = 220;
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      targets.push({
        x: center + x * 8.5,
        y: center - y * 8.5,
      });
    }

    const particles = targets.map((tp) => ({
      x: center + (Math.random() - 0.5) * size,
      y: center + (Math.random() - 0.5) * size,
      tx: tp.x,
      ty: tp.y,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      r: 1.6 + Math.random() * 2.2,
      speed: 0.02 + Math.random() * 0.04,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf;
    let start = performance.now();
    const render = (now) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, size, size);

      // soft glow backdrop
      const g = ctx.createRadialGradient(center, center, 10, center, center, size / 2);
      g.addColorStop(0, 'rgba(247,108,165,0.12)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);

      for (const p of particles) {
        p.x += (p.tx - p.x) * p.speed;
        p.y += (p.ty - p.y) * p.speed;
        p.phase += 0.04;
        const breathe = elapsed > 2500 ? Math.sin(p.phase) * 1.4 : 0;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.arc(p.x, p.y + breathe, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <SectionWrapper id="ending" className="flex flex-col items-center px-5 py-24 text-center sm:py-32">
      <div className="relative flex items-center justify-center">
        {reduced ? (
          <div className="text-8xl" aria-hidden="true">
            💖
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{ width: 360, height: 360 }}
            className="max-w-full"
          />
        )}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-glow-radial blur-2xl" />
      </div>

      <motion.p
        className="mt-6 font-display text-xl text-plum/85 sm:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Made with love, smiles, and a little courage.
      </motion.p>

      <motion.p
        className="mt-4 font-script text-3xl text-gradient sm:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        — From Someone Who Truly Cares ❤️
      </motion.p>

      <motion.div
        className="mt-14 h-px w-40 origin-center"
        style={{ background: 'linear-gradient(90deg,transparent,#b090ff,transparent)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1 }}
      />
    </SectionWrapper>
  );
}
