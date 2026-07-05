import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { memories } from '../data/memories';
import MemoryCard from './MemoryCard';
import SectionWrapper from './SectionWrapper';

/** The interactive "love journey" — a grid of animated memory cards. */
export default function LoveJourney() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yHead = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <SectionWrapper
      id="journey"
      className="mx-auto max-w-6xl px-5 py-24 sm:py-32"
    >
      <div ref={ref}>
        <motion.header style={{ y: yHead }} className="mb-16 text-center">
          <span className="mb-4 inline-block font-body text-sm uppercase tracking-[0.4em] text-lavender-500/80">
            Our little journey
          </span>
          <h2 className="font-display text-4xl font-semibold text-plum sm:text-5xl md:text-6xl">
            A few of the reasons
            <br />
            <span className="text-gradient font-script text-5xl sm:text-6xl md:text-7xl">
              you're unforgettable
            </span>
          </h2>
        </motion.header>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
