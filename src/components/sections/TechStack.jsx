import { motion } from "framer-motion";
import SectionWrapper from "../layout/SectionWrapper.jsx";
import Badge from "../ui/Badge.jsx";
import { techStack } from "../../data/portfolio.js";

export default function TechStack() {
  return (
    <SectionWrapper id="stack" label="02 · Stack" title="The toolchain I ship with.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {techStack.languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
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
                <span
                  className="font-mono text-xs"
                  style={{ color: lang.color }}
                >
                  {lang.level}%
                </span>
              </div>
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.level}%` }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + i * 0.1,
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
