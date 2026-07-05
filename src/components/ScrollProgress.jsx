import { motion, useScroll, useSpring } from 'framer-motion';

/** A slim shimmering progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left rounded-full"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg,#f76ca5,#b090ff,#e6c672,#ff8fbb,#9a70f5)',
        boxShadow: '0 0 14px rgba(176,144,255,0.6)',
      }}
    />
  );
}
