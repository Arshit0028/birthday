import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";

/**
 * Presents one cute question with two options.
 * - Records an answer and reveals a playful response.
 * - For `shyOnNo` questions, the second (No) button playfully dodges/shakes
 *   a couple of times before it lets itself be clicked.
 */
export default function QuestionCard({
  question,
  onAnswered,
  onSelect,
  isFinal,
}) {
  const [answer, setAnswer] = useState(null);
  const [dodges, setDodges] = useState(0);
  const [shake, setShake] = useState(false);

  const choose = (option, idx) => {
    // shy "No" behaviour: index 1 dodges the first two attempts
    if (question.shyOnNo && idx === 1 && dodges < 2) {
      setShake(true);
      setDodges((d) => d + 1);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setAnswer(option);
    onSelect?.(option, idx); // report the chosen answer upward
    if (isFinal) onAnswered(option, idx);
  };

  const shyOffset = (idx) => {
    if (!question.shyOnNo || idx !== 1) return {};
    const shifts = [
      { x: 0, y: 0 },
      { x: 90, y: -10 },
      { x: -70, y: 12 },
    ];
    return shifts[Math.min(dodges, shifts.length - 1)];
  };

  return (
    <div className="glass mx-auto w-full max-w-xl rounded-[32px] px-6 py-10 text-center sm:px-10">
      <motion.p
        className="font-display text-2xl font-medium leading-snug text-plum sm:text-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {question.text}
      </motion.p>

      <AnimatePresence mode="wait">
        {!answer ? (
          <motion.div
            key="options"
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.35 }}
          >
            {question.options.map((option, idx) => {
              const isPrimary = idx === 0;
              const off = shyOffset(idx);
              return (
                <motion.button
                  key={option.label}
                  type="button"
                  onClick={() => choose(option, idx)}
                  className={isPrimary ? "btn-premium" : "btn-ghost"}
                  animate={{
                    x: off.x || 0,
                    y: off.y || 0,
                    rotate: shake && idx === 1 ? [0, -6, 6, -4, 4, 0] : 0,
                  }}
                  transition={{
                    type: shake ? "tween" : "spring",
                    duration: 0.5,
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option.label}
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="response"
            className="mt-8 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          >
            <motion.div
              className="mb-4 text-blush-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Heart size={34} fill="#f76ca5" strokeWidth={1.3} />
            </motion.div>

            {!isFinal && (
              <>
                <p className="max-w-md font-body text-lg leading-relaxed text-plum/90">
                  {answer.response}
                </p>
                <motion.button
                  type="button"
                  onClick={onAnswered}
                  className="btn-premium group mt-7"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Next
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
