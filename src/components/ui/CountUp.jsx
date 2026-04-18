import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function CountUp({
  value,
  suffix = "",
  duration = 1600,
  decimals = 0,
  className = "",
  /** When set, animation starts from this flag instead of observing the inner span (fixes mobile IO on small targets). */
  startWhen,
}) {
  const ref = useRef(null);
  const selfInView = useInView(ref, { once: true, margin: "0px" });
  const active = startWhen !== undefined ? startWhen : selfInView;
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduceMotion === true) {
      setDisplay(value);
      return;
    }
    if (!active) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutExpo(progress);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, duration, reduceMotion]);

  const formatted = decimals
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();

  return (
    <span ref={startWhen === undefined ? ref : undefined} className={`tabular-nums ${className}`}>
      {formatted}
      {suffix}
    </span>
  );
}
