import { motion } from 'framer-motion';

/**
 * Reusable section container that smoothly reveals its children as they
 * scroll into view. Accepts an optional `id` for anchor navigation.
 */
export default function SectionWrapper({
  children,
  id,
  className = '',
  delay = 0,
  as: Tag = motion.section,
}) {
  return (
    <Tag
      id={id}
      className={`relative w-full ${className}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
