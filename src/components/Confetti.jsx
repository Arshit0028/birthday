import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

/**
 * Lightweight, dependency-free canvas confetti.
 * Expose a `.burst()` method via ref to fire celebratory pieces.
 *
 * Usage:
 *   const confettiRef = useRef();
 *   <Confetti ref={confettiRef} />
 *   confettiRef.current.burst();     // one pop
 *   confettiRef.current.celebrate(); // repeated pops for a few seconds
 */
const COLORS = ['#f76ca5', '#b090ff', '#e6c672', '#ff8fbb', '#cbb4ff', '#ffd1e3', '#ffffff'];
const SHAPES = ['rect', 'circle', 'heart'];

const Confetti = forwardRef(function Confetti(_, ref) {
  const canvasRef = useRef(null);
  const piecesRef = useRef([]);
  const rafRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drawHeart = (x, y, s) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - s / 2, x - s, y - s / 2, x - s, y);
      ctx.bezierCurveTo(x - s, y + s / 2, x, y + s * 0.9, x, y + s * 1.2);
      ctx.bezierCurveTo(x, y + s * 0.9, x + s, y + s / 2, x + s, y);
      ctx.bezierCurveTo(x + s, y - s / 2, x, y - s / 2, x, y);
      ctx.closePath();
      ctx.fill();
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pieces = piecesRef.current;
      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        p.vy += 0.12; // gravity
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 1;
        const alpha = Math.max(p.life / p.maxLife, 0);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawHeart(0, -p.size / 2, p.size / 2);
        }
        ctx.restore();

        if (p.life <= 0 || p.y > canvas.height + 40) pieces.splice(i, 1);
      }

      if (pieces.length > 0) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const spawn = (count, origin) => {
      const cx = origin?.x ?? canvas.width / 2;
      const cy = origin?.y ?? canvas.height / 3;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 9;
        piecesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          size: 7 + Math.random() * 10,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          shape: SHAPES[(Math.random() * SHAPES.length) | 0],
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          life: 120 + Math.random() * 80,
          maxLife: 200,
        });
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(loop);
    };

    // imperative API stored on the canvas node for the ref handle
    canvas._spawn = spawn;

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      piecesRef.current = [];
    };
  }, []);

  useImperativeHandle(ref, () => ({
    burst(origin) {
      if (reduced) return;
      canvasRef.current?._spawn?.(90, origin);
    },
    celebrate() {
      if (reduced) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      let shots = 0;
      const fire = () => {
        canvas._spawn?.(70, {
          x: canvas.width * (0.2 + Math.random() * 0.6),
          y: canvas.height * (0.2 + Math.random() * 0.3),
        });
        shots += 1;
        if (shots < 8) setTimeout(fire, 450);
      };
      fire();
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
    />
  );
});

export default Confetti;
