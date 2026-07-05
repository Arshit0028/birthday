import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';
import QuestionCard from './QuestionCard';
import SectionWrapper from './SectionWrapper';
import FloatingHearts from './FloatingHearts';

/**
 * Walks through the cute questions one at a time.
 * Calls `onFinalYes` when the last (final) question is answered.
 */
export default function CuteQuestions({ onFinalYes }) {
  const [step, setStep] = useState(0);
  const current = questions[step];

  const handleAnswered = (option, idx) => {
    if (current.isFinal) {
      // any final option triggers the celebration
      if (idx !== undefined) onFinalYes();
      return;
    }
    setStep((s) => Math.min(s + 1, questions.length - 1));
  };

  return (
    <SectionWrapper id="questions" className="mx-auto max-w-4xl px-5 py-24 sm:py-32">
      <FloatingHearts count={8} />

      <header className="mb-12 text-center">
        <span className="mb-4 inline-block font-body text-sm uppercase tracking-[0.4em] text-lavender-500/80">
          A few cute questions
        </span>
        <h2 className="font-display text-4xl font-semibold text-plum sm:text-5xl">
          Just between{' '}
          <span className="font-script text-gradient text-5xl sm:text-6xl">you & me</span>
        </h2>
      </header>

      {/* progress dots */}
      <div className="mb-10 flex items-center justify-center gap-2">
        {questions.map((q, i) => (
          <motion.span
            key={q.id}
            className="h-2 rounded-full"
            animate={{
              width: i === step ? 26 : 8,
              backgroundColor:
                i < step ? '#b090ff' : i === step ? '#f76ca5' : 'rgba(176,144,255,0.25)',
            }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>

      <div className="relative min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <QuestionCard
              question={current}
              isFinal={!!current.isFinal}
              onAnswered={handleAnswered}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-8 text-center font-body text-sm text-plum/50">
        {step + 1} of {questions.length}
      </p>
    </SectionWrapper>
  );
}
