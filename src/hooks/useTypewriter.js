import { useEffect, useRef, useState } from 'react';

/**
 * Typewriter effect.
 *
 * @param {string} text        Full text to reveal.
 * @param {object} options
 * @param {number} options.speed        ms per character (default 45)
 * @param {number} options.startDelay   ms before typing begins (default 0)
 * @param {boolean} options.start       gate to begin typing (default true)
 * @param {boolean} options.instant     skip animation entirely (reduced motion)
 * @returns {{ displayed: string, done: boolean }}
 */
export default function useTypewriter(
  text,
  { speed = 45, startDelay = 0, start = true, instant = false } = {}
) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    // reset
    setDisplayed('');
    setDone(false);
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    if (!start) return undefined;

    if (instant) {
      setDisplayed(text);
      setDone(true);
      return undefined;
    }

    let index = 0;
    const type = () => {
      if (index <= text.length) {
        setDisplayed(text.slice(0, index));
        index += 1;
        const t = setTimeout(type, speed);
        timeouts.current.push(t);
      } else {
        setDone(true);
      }
    };

    const starter = setTimeout(type, startDelay);
    timeouts.current.push(starter);

    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, start, instant]);

  return { displayed, done };
}
