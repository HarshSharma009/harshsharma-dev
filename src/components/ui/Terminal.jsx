import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function Terminal({
  lines = [],
  typingSpeed = 22,
  lineDelay = 260,
  startOnView = true,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [typed, setTyped] = useState([]);
  const [activeLine, setActiveLine] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (startOnView && !inView) return;
    if (activeLine >= lines.length) {
      setDone(true);
      return;
    }
    const currentLine = lines[activeLine] ?? "";
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped((prev) => {
        const next = [...prev];
        next[activeLine] = currentLine.slice(0, i);
        return next;
      });
      if (i >= currentLine.length) {
        clearInterval(interval);
        setTimeout(() => setActiveLine((n) => n + 1), lineDelay);
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [inView, activeLine, lines, typingSpeed, lineDelay, startOnView]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-sm shadow-2xl ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-black/30 px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-[var(--color-text-muted)]">
          harsh@portfolio ~ %
        </span>
      </div>
      <pre className="whitespace-pre-wrap break-words p-6 text-sm leading-relaxed text-[var(--color-text-primary)] sm:text-base">
        {lines.map((line, idx) => {
          const rendered = typed[idx] ?? "";
          const isActive = idx === activeLine && !done;
          const isCommand = line.startsWith("> ");
          return (
            <span key={idx} className="block">
              <span
                className={
                  isCommand
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text-primary)]"
                }
              >
                {rendered}
              </span>
              {isActive && <span className="cursor-blink text-[var(--color-accent)]">▌</span>}
              {!isActive && idx < activeLine ? "" : null}
            </span>
          );
        })}
        {done && (
          <span className="block text-[var(--color-accent)]">
            {"> "}<span className="cursor-blink">▌</span>
          </span>
        )}
      </pre>
    </div>
  );
}
