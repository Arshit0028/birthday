import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Cake, Heart } from "lucide-react";
import useTypewriter from "../hooks/useTypewriter";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import FloatingHearts from "./FloatingHearts";

const INTRO_LINES = [
  "Today isn't just your YOU speacial...",
  "It's a celebration of one of the most beautiful souls I've ever known.",
];

const CONFESSION = `You are the purest and the most hardworking soul I have ever seen.
Your kindness, your smile, your dedication, and the way you care about people make you incredibly special.
Every conversation with you feels different...
Every moment somehow becomes brighter.
And maybe...
I'm beginning to feel something real between us.
Maybe...
I'm slowly falling for you. ❤️`;

export default function Hero({ onContinue }) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(0); // 0 title, 1 intro, 2 confession
  const { displayed, done } = useTypewriter(CONFESSION, {
    speed: 38,
    start: phase >= 2,
    instant: reduced,
  });

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 py-20 text-center">
      <FloatingHearts count={12} />
      <div className="pointer-events-none absolute inset-0 bg-glow-radial" />

      {/* Title */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => setPhase((p) => (p < 1 ? 1 : p))}
      >
        <motion.span
          className="mb-4 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm font-medium text-lavender-500"
          animate={reduced ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cake size={16} /> A little surprise, just for you
        </motion.span>

        <h1 className="font-display text-4xl font-semibold leading-tight text-shadow-soft sm:text-6xl md:text-7xl lg:text-8xl">
          <span aria-hidden="true">🎂 </span>
          <span className="text-gradient">Cutieee</span>
          <br />
          <span className="font-script text-5xl text-blush-500 sm:text-7xl md:text-8xl lg:text-9xl">
            reemal
          </span>{" "}
          <motion.span
            aria-hidden="true"
            className="inline-block text-blush-400"
            animate={reduced ? {} : { scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ❤️
          </motion.span>
        </h1>
      </motion.div>

      {/* Intro two lines */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="relative z-10 mt-8 max-w-2xl space-y-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            onAnimationComplete={() => setPhase((p) => (p < 2 ? 2 : p))}
          >
            {INTRO_LINES.map((line, i) => (
              <motion.p
                key={i}
                className="font-display text-xl text-plum/85 sm:text-2xl md:text-3xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.5 }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confession typewriter */}
      {phase >= 2 && (
        <motion.div
          className="glass relative z-10 mt-10 max-w-2xl rounded-3xl px-6 py-7 sm:px-10 sm:py-9"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="whitespace-pre-line font-body text-base leading-relaxed text-plum/90 sm:text-lg">
            {displayed}
            {!done && (
              <motion.span
                className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-blush-500"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </p>
        </motion.div>
      )}

      {/* Continue button */}
      <AnimatePresence>
        {done && (
          <motion.button
            type="button"
            onClick={onContinue}
            className="btn-premium group relative z-10 mt-10 text-base sm:text-lg"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Heart size={18} fill="currentColor" />
            Continue
            <ChevronRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        animate={reduced ? {} : { y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-lavender-400/60 p-1">
          <span className="h-2 w-1 rounded-full bg-lavender-400" />
        </div>
      </motion.div>
    </section>
  );
}
