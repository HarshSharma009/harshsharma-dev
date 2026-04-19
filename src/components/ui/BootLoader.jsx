import { motion } from "framer-motion";

const LINES = [
  { label: "kernel", value: "portfolio_static/1.0" },
  { label: "sections", value: "hydrating" },
  { label: "fonts", value: "binding" },
  { label: "state", value: "warming caches" },
];

const lineContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const lineItem = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function BootLoader() {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[var(--color-bg)] px-4"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "blur(12px)",
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 dot-grid-bg opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,var(--color-accent-dim),transparent_55%)]"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-6 shadow-[0_0_0_1px_rgba(0,245,196,0.08),0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-8"
      >
        <div className="mb-6 flex items-center justify-between border-b border-[var(--color-border)] pb-4">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]/90" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/90" />
            <span className="size-2.5 rounded-full bg-[#28c840]/90" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-text-muted)]">
            portfolio_boot
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-accent)]">
            <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
            RUN
          </span>
        </div>

        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
          {"//"} init sequence
        </div>

        <motion.ul
          className="mb-8 space-y-2.5 font-mono text-sm text-[var(--color-text-muted)]"
          variants={lineContainer}
          initial="hidden"
          animate="show"
        >
          {LINES.map((row) => (
            <motion.li
              key={row.label}
              variants={lineItem}
              className="flex items-baseline justify-between gap-4 border-l-2 border-[var(--color-accent)]/25 pl-3"
            >
              <span className="text-[var(--color-text-primary)]">
                <span className="text-[var(--color-accent)]">&gt;</span> {row.label}
              </span>
              <span className="shrink-0 text-right text-[11px] text-[var(--color-text-muted)]">
                {row.value}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="relative h-1 overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="boot-loader-shimmer absolute inset-y-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-90"
            style={{ boxShadow: "0 0 16px var(--color-accent)" }}
          />
        </div>

        <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
          static layer · settling
        </p>
      </motion.div>
    </motion.div>
  );
}
