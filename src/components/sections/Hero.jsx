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

const PIPELINE_W = 400;
const PIPELINE_H = 480;

const LAYERS = [
  {
    label: "01 · CLIENT",
    y: 32,
    nodes: [
      { x: 60, w: 110, label: "Merchant App", color: "#00F5C4" },
      { x: 230, w: 110, label: "Customer", color: "#00F5C4" },
    ],
  },
  {
    label: "02 · EDGE GATEWAY",
    y: 102,
    nodes: [
      { x: 80, w: 240, label: "Kong API Gateway", color: "#22D3EE" },
    ],
  },
  {
    label: "03 · ORCHESTRATION",
    y: 172,
    nodes: [
      { x: 20, w: 130, label: "Orchestrator", color: "#A855F7" },
      { x: 155, w: 125, label: "Risk Engine", color: "#F59E0B" },
      { x: 285, w: 95, label: "Idempotency", color: "#A855F7" },
    ],
  },
  {
    label: "04 · EVENT BUS",
    y: 242,
    nodes: [{ x: 20, w: 360, label: "Apache Kafka · 5M+ events/day", color: "#F97316", wide: true }],
  },
  {
    label: "05 · PAYMENT RAILS",
    y: 312,
    nodes: [
      { x: 20, w: 115, label: "NPCI · UPI", color: "#10B981" },
      { x: 140, w: 120, label: "Visa · MasterCard", color: "#3B82F6" },
      { x: 265, w: 115, label: "Stripe", color: "#635BFF" },
    ],
  },
  {
    label: "06 · STORAGE",
    y: 382,
    nodes: [
      { x: 20, w: 115, label: "PostgreSQL", color: "#336791" },
      { x: 140, w: 120, label: "ClickHouse", color: "#FBBF24" },
      { x: 265, w: 115, label: "Redis", color: "#DC382D" },
    ],
  },
];

const NODE_H = 28;

function connectorCenters(from, to) {
  const links = [];
  for (const a of from.nodes) {
    for (const b of to.nodes) {
      links.push({
        x1: a.x + a.w / 2,
        y1: from.y + NODE_H,
        x2: b.x + b.w / 2,
        y2: to.y,
      });
    }
  }
  return links;
}

function PipelineSVG() {
  const connectors = [];
  for (let i = 0; i < LAYERS.length - 1; i++) {
    connectors.push(...connectorCenters(LAYERS[i], LAYERS[i + 1]));
  }

  return (
    <svg
      viewBox={`0 0 ${PIPELINE_W} ${PIPELINE_H}`}
      className="h-full w-full"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00F5C4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00F5C4" stopOpacity="0.05" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern
          id="kafka-stripes"
          x="0"
          y="0"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="12" height="12" fill="#F9731608" />
          <line x1="0" y1="0" x2="0" y2="12" stroke="#F9731620" strokeWidth="1" />
        </pattern>
      </defs>

      {connectors.map((c, i) => (
        <motion.line
          key={`c-${i}`}
          x1={c.x1}
          y1={c.y1}
          x2={c.x2}
          y2={c.y2}
          stroke="url(#flow)"
          strokeWidth="1"
          strokeDasharray="2 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.8 + i * 0.03, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {LAYERS.map((layer, li) => (
        <g key={layer.label}>
          <motion.text
            x={20}
            y={layer.y - 8}
            fill="#6B6B80"
            fontSize="7.5"
            fontFamily="'Geist Mono', monospace"
            letterSpacing="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 + li * 0.1 }}
          >
            {layer.label}
          </motion.text>

          {layer.nodes.map((n, ni) => {
            const delay = 1 + li * 0.12 + ni * 0.05;
            return (
              <motion.g
                key={`${layer.label}-${ni}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
              >
                <rect
                  x={n.x}
                  y={layer.y}
                  width={n.w}
                  height={NODE_H}
                  rx={6}
                  fill={n.wide ? "url(#kafka-stripes)" : `${n.color}12`}
                  stroke={`${n.color}80`}
                  strokeWidth="1"
                />
                <motion.circle
                  cx={n.x + 10}
                  cy={layer.y + NODE_H / 2}
                  r="3"
                  fill={n.color}
                  filter="url(#glow)"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: ni * 0.35 + li * 0.15,
                    ease: "easeInOut",
                  }}
                />
                <text
                  x={n.x + 20}
                  y={layer.y + NODE_H / 2 + 3.2}
                  fill="#E8E8F0"
                  fontSize="9"
                  fontFamily="'Geist Mono', monospace"
                  letterSpacing="0.4"
                >
                  {n.label}
                </text>
              </motion.g>
            );
          })}
        </g>
      ))}

      {connectors
        .filter((_, i) => i % 3 === 0)
        .slice(0, 8)
        .map((c, i) => {
          const path = `path('M${c.x1} ${c.y1} L${c.x2} ${c.y2}')`;
          return (
            <motion.circle
              key={`pkt-${i}`}
              r="2.5"
              fill="#00F5C4"
              filter="url(#glow)"
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: 2 + i * 0.35,
                ease: "linear",
              }}
              style={{ offsetPath: path }}
            />
          );
        })}
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
