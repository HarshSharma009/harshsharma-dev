import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import useActiveSection from "../../hooks/useActiveSection.js";
import { navSections } from "../../data/portfolio.js";

export default function Navbar() {
  const ids = navSections.map((s) => s.id);
  const active = useActiveSection(ids);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
    >
      <motion.nav
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(17, 17, 24, ${v})`,
          ),
          borderColor: useTransform(
            borderOpacity,
            (v) => `rgba(30, 30, 46, ${v})`,
          ),
        }}
        className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-full border px-4 py-2 backdrop-blur-xl sm:px-5 sm:py-2.5"
      >
        <a
          href="#hero"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-accent)]"
        >
          <span className="flex size-7 items-center justify-center rounded-md border border-[var(--color-accent)]/40 bg-[var(--color-accent-dim)] text-[var(--color-accent)]">
            HS
          </span>
          <span className="hidden sm:inline">harsh.sh</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navSections.slice(1, -1).map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-300 ${
                  active === s.id
                    ? "bg-[var(--color-accent-dim)] text-[var(--color-accent)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="flex items-center gap-1 md:hidden">
          {navSections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-label={s.label}
                className={`block size-2 rounded-full transition-all duration-300 ${
                  active === s.id
                    ? "bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]"
                    : "bg-[var(--color-border)]"
                }`}
              />
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/60 bg-[var(--color-accent-dim)] px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] sm:px-4"
        >
          Hire me
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.nav>
    </motion.header>
  );
}
