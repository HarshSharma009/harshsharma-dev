import { motion } from "framer-motion";
import SectionWrapper from "../layout/SectionWrapper.jsx";
import Badge from "../ui/Badge.jsx";
import { useRevealOnce } from "../../hooks/useRevealOnce.js";
import { techStack } from "../../data/portfolio.js";

/**
 * Skill bar used nested whileInView on a ~4px-tall strip; mobile WebKit often
 * never intersected it, so width stayed 0%. useRevealOnce observes the card
 * (native IO + geometry fallback) and drives the fill with animate.
 */
function LanguageSkillCard({ lang, index }) {
  const [rootRef, inView] = useRevealOnce();

  return (
    <div ref={rootRef} className="min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 0.7,
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-5 backdrop-blur-sm transition-colors duration-500 hover:border-[color:var(--card-accent)]/70 sm:p-6"
        style={{ "--card-accent": lang.color }}
      >
        <div
          className="absolute -right-10 -top-10 size-32 rounded-full opacity-[0.08] blur-2xl transition-opacity duration-500 group-hover:opacity-20"
          style={{ backgroundColor: lang.color }}
        />
        <div className="relative flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-lg font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-xl">
              {lang.name}
            </span>
            <span className="font-mono text-xs" style={{ color: lang.color }}>
              {lang.level}%
            </span>
          </div>
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
            <motion.div
              initial={false}
              animate={{ width: inView ? `${lang.level}%` : "0%" }}
              transition={{
                duration: 1.2,
                delay: 0.25 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${lang.color}66, ${lang.color})`,
                boxShadow: `0 0 12px ${lang.color}`,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TechStack() {
  return (
    <SectionWrapper id="stack" label="02 · Stack" title="The toolchain I ship with.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {techStack.languages.map((lang, i) => (
          <LanguageSkillCard key={lang.name} lang={lang} index={i} />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {techStack.categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 p-5 backdrop-blur-sm"
          >
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-accent)]">
              {cat.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li key={item}>
                  <Badge label={item} />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
