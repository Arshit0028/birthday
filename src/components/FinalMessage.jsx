import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import FloatingHearts from "./FloatingHearts";

const LINES = [
  "Thank you for making my world brighter.",
  "No matter where life takes us,",
  "I genuinely wish you endless happiness,",
  "countless smiles,",
  "beautiful dreams,",
  "and every success you deserve.",
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.35, delayChildren: 0.2 },
  },
};

const line = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/** The heartfelt closing message with a soft, staggered reveal. */
export default function FinalMessage() {
  return (
    <SectionWrapper
      id="message"
      className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32"
    >
      <FloatingHearts count={16} intense />
      <div className="pointer-events-none absolute inset-0 bg-glow-radial" />

      <motion.div
        className="glass relative z-10 rounded-[36px] px-6 py-12 shadow-glow-lavender sm:px-14 sm:py-16"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="mb-6 flex justify-center text-champagne-400"
          animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={40} />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-2"
        >
          {LINES.map((text, i) => (
            <motion.p
              key={i}
              variants={line}
              className="font-display text-xl leading-relaxed text-plum/90 sm:text-2xl"
            >
              {text}
            </motion.p>
          ))}

          <motion.p
            variants={line}
            className="pt-6 font-script text-4xl text-blush-500 sm:text-5xl"
          >
            Cutieee once again, reemal.
          </motion.p>

          <motion.p
            variants={line}
            className="pt-2 font-display text-lg text-plum/80 sm:text-xl"
          >
            You'll always be someone truly special to me.{" "}
            <span aria-hidden="true">❤️</span>
          </motion.p>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
