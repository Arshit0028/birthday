import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX, Volume2 } from 'lucide-react';

/**
 * Floating action button that toggles background music.
 * Shows a soft equalizer animation while playing.
 */
export default function MusicToggle({ isPlaying, available, onToggle }) {
  const label = !available
    ? 'Music unavailable'
    : isPlaying
      ? 'Pause music'
      : 'Play music';

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      disabled={!available}
      aria-label={label}
      title={label}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="glass fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center
        rounded-full text-lavender-500 shadow-glow-lavender transition-colors
        hover:text-blush-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-lavender-300/60
        disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <AnimatePresence mode="wait">
        {!available ? (
          <motion.span key="off" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VolumeX size={22} />
          </motion.span>
        ) : isPlaying ? (
          <motion.span
            key="on"
            className="relative flex items-end gap-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-current"
                animate={{ height: [6, 18, 9, 16, 6] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
              />
            ))}
          </motion.span>
        ) : (
          <motion.span key="paused" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Music size={22} />
          </motion.span>
        )}
      </AnimatePresence>

      {/* subtle glowing ring while playing */}
      {isPlaying && available && (
        <motion.span
          className="absolute inset-0 rounded-full border border-lavender-300/60"
          animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <span className="sr-only">
        {available ? '' : 'Add a music file to enable playback. '}
        <Volume2 size={0} />
      </span>
    </motion.button>
  );
}
