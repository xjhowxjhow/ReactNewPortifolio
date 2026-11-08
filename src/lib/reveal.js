import { useEffect } from 'react';

// Adds `is-in` to every [data-reveal] element the first time it enters the viewport.
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!('IntersectionObserver' in window)) return undefined;
    root.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove('js-reveal');
    };
  }, []);
}

export function useInView(ref, callback, options) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      callback(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => callback(entry.isIntersecting), options);
    io.observe(el);
    return () => io.disconnect();
    // Options are static per call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, callback]);
}
