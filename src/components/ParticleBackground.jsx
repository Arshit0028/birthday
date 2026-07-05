import { useEffect, useRef } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

/**
 * Ambient canvas layer: twinkling stars, glowing bokeh orbs and slow-drifting
 * flower petals. Reacts subtly to the cursor for a dreamy parallax feel.
 * Fixed, non-interactive, and paused entirely when reduced motion is on.
 */
const PALETTE = ['#ffb3d1', '#cbb4ff', '#e6c672', '#ffd1e3', '#b090ff', '#ffffff'];

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let raf;
    const pointer = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

    const density = Math.min(Math.floor((width * height) / 14000), 130);

    const rand = (min, max) => Math.random() * (max - min) + min;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const makeParticle = (kind) => {
      const base = {
        kind,
        x: rand(0, width),
        y: rand(0, height),
        color: pick(PALETTE),
        depth: rand(0.2, 1),
        angle: rand(0, Math.PI * 2),
        spin: rand(-0.01, 0.01),
      };
      if (kind === 'star') {
        return { ...base, r: rand(0.6, 1.8), twinkle: rand(0.002, 0.02), phase: rand(0, Math.PI * 2) };
      }
      if (kind === 'bokeh') {
        return { ...base, r: rand(14, 48), alpha: rand(0.05, 0.16), vy: rand(-0.08, -0.02), vx: rand(-0.05, 0.05) };
      }
      // petal
      return { ...base, r: rand(4, 9), vy: rand(0.15, 0.5), vx: rand(-0.35, 0.35), sway: rand(0.5, 1.5) };
    };

    let particles = [];
    const build = () => {
      particles = [];
      for (let i = 0; i < density; i++) particles.push(makeParticle('star'));
      for (let i = 0; i < Math.floor(density / 6); i++) particles.push(makeParticle('bokeh'));
      for (let i = 0; i < Math.floor(density / 7); i++) particles.push(makeParticle('petal'));
    };
    build();

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = 0.55 * p.depth;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.r, -p.r, p.r, p.r, 0, p.r * 1.6);
      ctx.bezierCurveTo(-p.r, p.r, -p.r, -p.r, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const offX = (pointer.x - width / 2) / width;
      const offY = (pointer.y - height / 2) / height;

      for (const p of particles) {
        const px = p.x + offX * 40 * p.depth;
        const py = p.y + offY * 40 * p.depth;

        if (p.kind === 'star') {
          p.phase += p.twinkle;
          const a = 0.4 + Math.abs(Math.sin(p.phase)) * 0.6;
          ctx.globalAlpha = a * p.depth;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(px, py, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'bokeh') {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y + p.r < 0) p.y = height + p.r;
          if (p.x < -p.r) p.x = width + p.r;
          if (p.x > width + p.r) p.x = -p.r;
          const grad = ctx.createRadialGradient(px, py, 0, px, py, p.r);
          grad.addColorStop(0, p.color);
          grad.addColorStop(1, 'transparent');
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          p.y += p.vy;
          p.x += p.vx + Math.sin(p.y * 0.01) * p.sway * 0.3;
          p.angle += p.spin;
          if (p.y - p.r > height) {
            p.y = -p.r;
            p.x = rand(0, width);
          }
          drawPetal({ ...p, x: px, y: py });
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      build();
    };
    const onPointer = (e) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
