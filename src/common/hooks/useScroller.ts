import { useState, useLayoutEffect } from 'react';

export const useScroller = <T extends HTMLElement = HTMLElement>(
  ref: React.MutableRefObject<T | null>,
): { scrollTop: number; isScrolling: boolean } => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useLayoutEffect(() => {
    const target = ref.current;
    let tick = 0;

    if (target) {
      const handleScroll = () => {
        if (tick) {
          return;
        }
        tick = window.requestAnimationFrame(() => {
          setScrollTop(target.scrollTop);
          tick = 0;
        });
      };

      target.addEventListener('scroll', handleScroll);
      return () => {
        target.removeEventListener('scroll', handleScroll);
        if (tick) {
          window.cancelAnimationFrame(tick);
        }
      };
    }
  }, [ref]);

  useLayoutEffect(() => {
    setIsScrolling(true);
    const id = window.setTimeout(() => {
      // This is here to prevent premature bail outs while maintaining high resolution
      // unsets. Without it there will always bee a lot of unnecessary DOM writes to style.
      setIsScrolling(false);
    }, 1000 / 10);
    return () => window.clearTimeout(id);
  }, [scrollTop]);

  return { scrollTop, isScrolling };
};
