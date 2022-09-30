import { useState, useLayoutEffect, useMemo } from 'react';

export const useSize = <T extends HTMLElement = HTMLElement>(
  ref: React.MutableRefObject<T | null>,
): { width: number; height: number } => {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  const resizeObserver = useMemo(
    () =>
      new ResizeObserver((entries) => {
        entries.forEach(({ contentRect: { width, height } }) => {
          setSize({ width, height });
        });
      }),
    [],
  );

  useLayoutEffect(() => {
    const target = ref.current;

    if (target) {
      resizeObserver.observe(target);
      return () => {
        resizeObserver.unobserve(target);
      };
    }
  }, [ref, resizeObserver]);

  return size;
};
