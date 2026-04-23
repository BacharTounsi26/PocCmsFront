import { useRef, useCallback } from "react";

export function useDebounce(fn, delay = 300) {
  const timerRef = useRef(null);

  return useCallback(
    (...args) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay]
  );
}
