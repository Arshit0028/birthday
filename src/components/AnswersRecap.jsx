import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, MessageCircle, Mail } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

/**
 * Shows every answer reemal chose across the 10 questions.
 * Since this is a static site (no server), it also offers one-tap Copy /
 * WhatsApp / Email so she can send her replies back to you. If a Formspree
 * endpoint is configured (see src/config.js) they're also emailed to you
 * automatically the moment she finishes.
 */
export default function AnswersRecap({ answers = [] }) {
  const [copied, setCopied] = useState(false);

  // Fall back to any answers saved in this browser (e.g. after a refresh).
  const resolved = useMemo(() => {
    if (answers.length) return answers;
    try {
      const saved = JSON.parse(localStorage.getItem("reemal-answers") || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }, [answers]);

  const text = useMemo(
    () =>
      "reemal's answers 💖\n\n" +
      resolved
        .map((a, i) => `${i + 1}. ${a.question}\n   → ${a.answer}`)
        .join("\n\n"),
    [resolved],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waHref = `https://wa.me/?text=${encodeURIComponent(text)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(
    "reemal's answers 💖",
  )}&body=${encodeURIComponent(text)}`;

  return (
    <SectionWrapper id="answers" className="mx-auto max-w-2xl px-5 py-20">
      <header className="mb-8 text-center">
        <span className="mb-3 inline-block font-body text-sm uppercase tracking-[0.4em] text-lavender-500/80">
          Her replies
        </span>
        <h2 className="font-display text-3xl font-semibold text-plum sm:text-4xl">
          What{" "}
          <span className="font-script text-gradient text-4xl sm:text-5xl">
            reemal
          </span>{" "}
          said
        </h2>
      </header>

      <div className="glass rounded-[28px] p-6 sm:p-8">
        {resolved.length === 0 ? (
          <p className="py-6 text-center font-body text-plum/70">
            No answers were captured yet. They appear here once the questions
            have been answered. 🌸
          </p>
        ) : (
          <>
            <ol className="space-y-4">
              {resolved.map((a, i) => (
                <motion.li
                  key={a.id ?? i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col gap-1 border-b border-white/40 pb-4 last:border-none last:pb-0"
                >
                  <span className="font-body text-sm text-plum/70">
                    {i + 1}. {a.question}
                  </span>
                  <span className="font-display text-lg font-medium text-blush-500">
                    {a.answer}
                  </span>
                </motion.li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <motion.button
                type="button"
                onClick={copy}
                className="btn-premium"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied!" : "Copy answers"}
              </motion.button>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
              <a href={mailHref} className="btn-ghost">
                <Mail size={18} /> Email
              </a>
            </div>

            <p className="mt-4 text-center font-body text-xs text-plum/50">
              Tip: tap “Copy answers”, then paste them anywhere to send them
              back. 💌
            </p>
          </>
        )}
      </div>
    </SectionWrapper>
  );
}
