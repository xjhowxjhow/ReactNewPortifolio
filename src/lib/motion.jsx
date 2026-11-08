import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const MotionContext = createContext({ reduced: false, paused: false });

export function MotionProvider({ children }) {
  const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_QUERY);
    const onChange = (e) => setReduced(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Animations only stop when the operating system asks for reduced motion.
  const paused = reduced;

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'running';
  }, [paused]);

  const value = useMemo(() => ({ reduced, paused }), [reduced, paused]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export const useMotion = () => useContext(MotionContext);
