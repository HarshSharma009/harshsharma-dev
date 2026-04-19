import { useLayoutEffect, useState } from "react";

const MIN_VISIBLE_MS = 1100;

/**
 * Resolves when fonts + a short minimum delay have passed and layout has had
 * two animation frames — static sections mount behind the loader during this window.
 */
export function useAppBootReady() {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }

    let cancelled = false;

    const run = async () => {
      const fontWait = document.fonts?.ready?.catch(() => {}) ?? Promise.resolve();
      await Promise.all([fontWait, new Promise((r) => setTimeout(r, MIN_VISIBLE_MS))]);
      if (cancelled) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setReady(true);
        });
      });
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
