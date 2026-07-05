import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

import LoadingScreen from './components/LoadingScreen';
import ParticleBackground from './components/ParticleBackground';
import Butterflies from './components/Butterflies';
import ScrollProgress from './components/ScrollProgress';
import MusicToggle from './components/MusicToggle';
import Confetti from './components/Confetti';
import Hero from './components/Hero';

import useAudio from './hooks/useAudio';
import useSmoothScrollTo from './hooks/useSmoothScrollTo';

// Lazy-load the heavier below-the-fold sections for performance.
const LoveJourney = lazy(() => import('./components/LoveJourney'));
const CuteQuestions = lazy(() => import('./components/CuteQuestions'));
const FinalMessage = lazy(() => import('./components/FinalMessage'));
const EndingAnimation = lazy(() => import('./components/EndingAnimation'));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false); // hero "Continue" pressed
  const [celebrated, setCelebrated] = useState(false); // final question answered

  const confettiRef = useRef(null);
  const scrollTo = useSmoothScrollTo();
  const { isPlaying, available, toggle, swell } = useAudio('/music/soft-piano.mp3', 0.4);

  const handleContinue = useCallback(() => {
    setStarted(true);
    // wait for lazy sections to mount, then glide down
    setTimeout(() => scrollTo('journey', { offset: 20, duration: 1.3 }), 250);
  }, [scrollTo]);

  const handleFinalYes = useCallback(() => {
    setCelebrated(true);
    confettiRef.current?.celebrate();
    swell(); // gently raise the music
    setTimeout(() => scrollTo('message', { offset: 20, duration: 1.4 }), 500);
  }, [scrollTo, swell]);

  return (
    <>
      {/* Ambient layers */}
      <ParticleBackground />
      <Butterflies count={5} />
      <Confetti ref={confettiRef} />
      <ScrollProgress />
      <MusicToggle isPlaying={isPlaying} available={available} onToggle={toggle} />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          <Hero onContinue={handleContinue} />

          <AnimatePresence>
            {started && (
              <Suspense fallback={<SectionFallback />}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <LoveJourney />
                  <CuteQuestions onFinalYes={handleFinalYes} />

                  <AnimatePresence>
                    {celebrated && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <FinalMessage />
                        <EndingAnimation />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Suspense>
            )}
          </AnimatePresence>

          <footer className="flex items-center justify-center gap-1.5 py-10 text-center font-body text-xs text-plum/40">
            Crafted with
            <motion.span
              className="text-blush-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <FaHeart aria-hidden="true" />
            </motion.span>
            for Muskan
          </footer>
        </motion.main>
      )}
    </>
  );
}

function SectionFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <motion.div
        className="h-10 w-10 rounded-full border-2 border-lavender-300 border-t-blush-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
