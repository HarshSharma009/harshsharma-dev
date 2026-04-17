import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GithubIcon } from "../ui/BrandIcons.jsx";
import { personal, heroMetrics } from "../../data/portfolio.js";

const TYPEWRITER_PHRASES = [
  "Distributed Systems",
  "Fintech Infrastructure",
  "Rust · Python · Go",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function PipelineSVG() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="h-full w-full"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="flow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00F5C4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00F5C4" stopOpacity="0.1" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g stroke="url(#flow)" strokeWidth="1" opacity="0.6">
        <path d="M50 80 L180 80 L180 180 L350 180" />
        <path d="M50 160 L120 160 L120 260 L350 260" />
        <path d="M50 240 L180 240 L180 340 L350 340" />
        <path d="M50 320 L150 320 L150 420 L350 420" />
      </g>

      {[
        { x: 50, y: 80, label: "ingest" },
        { x: 50, y: 160, label: "auth" },
        { x: 50, y: 240, label: "stripe" },
        { x: 50, y: 320, label: "kafka" },
        { x: 180, y: 80, label: "queue" },
        { x: 120, y: 160, label: "jwt" },
        { x: 180, y: 240, label: "pay" },
        { x: 150, y: 320, label: "stream" },
        { x: 350, y: 180, label: "warehouse" },
        { x: 350, y: 260, label: "risk" },
        { x: 350, y: 340, label: "ledger" },
        { x: 350, y: 420, label: "analytics" },
      ].map((n, i) => (
        <g key={i} filter="url(#glow)">
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="5"
            fill="#00F5C4"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
          <text
            x={n.x + 12}
            y={n.y + 4}
            fill="#6B6B80"
            fontSize="10"
            fontFamily="monospace"
          >
            {n.label}
          </text>
        </g>
      ))}

      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={`p-${i}`}
          r="3"
          fill="#00F5C4"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
          style={{
            offsetPath:
              i === 0
                ? "path('M50 80 L180 80 L180 180 L350 180')"
                : i === 1
                  ? "path('M50 160 L120 160 L120 260 L350 260')"
                  : i === 2
                    ? "path('M50 240 L180 240 L180 340 L350 340')"
                    : "path('M50 320 L150 320 L150 420 L350 420')",
          }}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setPhraseIdx((n) => (n + 1) % TYPEWRITER_PHRASES.length),
      2800,
    );
    return () => clearInterval(id);
  }, []);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, -120]);
  const bgOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute inset-0 -z-10 dot-grid-bg"
      />
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-[400px] w-[80%] max-w-3xl rounded-full bg-[var(--color-accent)] opacity-[0.08] blur-[140px]" />

      <div className="container-tight grid w-full grid-cols-1 items-center gap-12 pt-32 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:pt-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 sm:gap-8"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-px w-48 bg-gradient-to-r from-[var(--color-accent)] to-transparent"
          />

          <motion.div
            variants={item}
            className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]"
          >
            <span className="text-[var(--color-accent)]">{"<"}</span>
            {personal.title}
            <span className="text-[var(--color-accent)]">{" />"}</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance font-mono text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-[var(--color-text-primary)] sm:text-7xl md:text-[clamp(4rem,9vw,8rem)]"
          >
            {personal.name.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </motion.h1>

          <motion.div
            variants={item}
            className="flex min-h-[2.5rem] items-center font-mono text-lg text-[var(--color-text-muted)] sm:text-2xl"
          >
            <span className="mr-3 text-[var(--color-accent)]">{">"}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-[var(--color-text-primary)]"
              >
                {TYPEWRITER_PHRASES[phraseIdx]}
              </motion.span>
            </AnimatePresence>
            <span className="ml-2 cursor-blink text-[var(--color-accent)]">▌</span>
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-xl text-pretty text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base"
          >
            {personal.summary}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-bg)] transition-all duration-300 hover:shadow-glow-soft"
            >
              View my work
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-5 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-text-primary)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/60 hover:text-[var(--color-accent)]"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--color-border)] pt-6 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]"
          >
            {heroMetrics.map((m, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-lg text-[var(--color-accent)] sm:text-xl">
                  {m.value}
                </span>
                <span>{m.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden aspect-[4/5] w-full max-w-md lg:block"
        >
          <div className="absolute inset-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm" />
          <div className="absolute inset-0 p-4">
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              <span>payment.pipeline</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
                LIVE
              </span>
            </div>
            <div className="h-[calc(100%-2rem)]">
              <PipelineSVG />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-accent)]"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          scroll
          <ArrowDown className="size-3" />
        </motion.span>
      </motion.a>
    </section>
  );
}
