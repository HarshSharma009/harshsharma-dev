import { useLayoutEffect, useRef, useState } from "react";
import { elementLikelyVisible } from "./statsGridVisibility.js";

const IO_ROOT_MARGIN = "220px 120px 280px 120px";

/**
 * Fires once when an element enters (or already sits in) the viewport.
 * Native IntersectionObserver + takeRecords + double-rAF geometry fallback
 * for mobile WebKit where Framer useInView on small or nested nodes is flaky.
 */
export function useRevealOnce() {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let disposed = false;
    const mark = () => {
      if (disposed) return;
      setRevealed(true);
    };

    const tryGeometry = () => {
      if (disposed) return;
      const node = ref.current;
      if (!node) return;
      const vv = typeof window !== "undefined" ? window.visualViewport : null;
      if (
        elementLikelyVisible(node, {
          height: vv?.height ?? window.innerHeight,
          width: vv?.width ?? window.innerWidth,
        })
      ) {
        mark();
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) mark();
        }
      },
      { root: null, rootMargin: IO_ROOT_MARGIN, threshold: 0 },
    );

    io.observe(el);

    let records = [];
    try {
      records = io.takeRecords();
    } catch {
      /* takeRecords is optional in older engines */
    }
    for (const e of records) {
      if (e.isIntersecting) mark();
    }

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(tryGeometry);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf1);
      io.disconnect();
    };
  }, []);

  return [ref, revealed];
}
