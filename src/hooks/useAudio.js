import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Background-music controller.
 *
 * Loops a source, supports play/pause toggle and smooth volume fades.
 * Handles autoplay restrictions gracefully — playback starts on first
 * user gesture (the toggle click).
 *
 * @param {string} src         audio file path (public folder)
 * @param {number} baseVolume  default volume 0..1
 */
export default function useAudio(src, baseVolume = 0.4) {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = baseVolume;
    audio.preload = 'auto';
    audio.addEventListener('canplaythrough', () => setReady(true));
    audio.addEventListener('error', () => {
      setAvailable(false);
      setReady(false);
    });
    audioRef.current = audio;

    return () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [src, baseVolume]);

  const fadeTo = useCallback((target, duration = 900) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);

    const start = audio.volume;
    const startTime = performance.now();

    const step = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      audio.volume = start + (target - start) * t;
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else if (target === 0) {
        audio.pause();
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !available) return;

    if (isPlaying) {
      fadeTo(0);
      setIsPlaying(false);
    } else {
      try {
        audio.volume = 0;
        await audio.play();
        fadeTo(baseVolume);
        setIsPlaying(true);
      } catch {
        // Autoplay blocked or file missing — fail quietly.
        setAvailable(false);
      }
    }
  }, [isPlaying, available, baseVolume, fadeTo]);

  /** Gently raise volume for a climactic moment. */
  const swell = useCallback(
    (target = Math.min(baseVolume + 0.25, 1)) => {
      if (isPlaying) fadeTo(target, 1600);
    },
    [isPlaying, baseVolume, fadeTo]
  );

  return { isPlaying, ready, available, toggle, swell };
}
