import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";
import SectionWrapper from "../layout/SectionWrapper.jsx";
import Badge from "../ui/Badge.jsx";
import { experience } from "../../data/portfolio.js";

function ExperienceCard({ exp, index }) {
  const [expanded, setExpanded] = useState(false);
  const isLeft = index % 2 === 0;
  const visible = expanded ? exp.highlights : exp.highlights.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-[color:var(--card-accent)]/60 sm:p-7"
      style={{ "--card-accent": exp.color }}
    >
      <div>
        <div
          className="absolute -right-16 -top-16 size-40 rounded-full opacity-[0.06] blur-3xl transition-opacity duration-500 group-hover:opacity-20"
          style={{ backgroundColor: exp.color }}
        />

        <div className="relative">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  className="font-mono text-lg font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-xl"
                  style={{ color: exp.color }}
                >
                  {exp.company}
                </h3>
                {exp.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)]/60 bg-[var(--color-accent-dim)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-accent)]">
                    <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
                    Current<span className="cursor-blink">▌</span>
                  </span>
                )}
              </div>
              <div className="mt-1 font-mono text-sm text-[var(--color-text-primary)]">
                {exp.role}
              </div>
              <div className="mt-1 flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-muted)]">
                <MapPin className="size-3" />
                {exp.location}
              </div>
            </div>
            <span
              className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider"
              style={{
                borderColor: `${exp.color}55`,
                color: exp.color,
              }}
            >
              {exp.period}
            </span>
          </div>

          <ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {visible.map((h, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: exp.color }}
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {exp.highlights.length > 3 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-accent)]"
            >
              <ChevronDown
                className={`size-3.5 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
              {expanded
                ? "show less"
                : `+${exp.highlights.length - 3} more`}
            </button>
          )}

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {exp.tags.map((t) => (
              <li key={t}>
                <Badge label={t} color={exp.color} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <SectionWrapper
      id="experience"
      label="03 · Experience"
      title="Where I've shipped code."
    >
      <div ref={ref} className="relative">
        <div
          aria-hidden
          className="absolute left-4 top-0 h-full w-px bg-[var(--color-border)] lg:left-1/2 lg:-translate-x-1/2"
        />
        <motion.div
          aria-hidden
          style={{ scaleY, transformOrigin: "top", willChange: "transform" }}
          className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent)] to-transparent lg:left-1/2 lg:-translate-x-1/2"
        />

        <div className="flex flex-col gap-12 lg:gap-16">
          {experience.map((exp, i) => (
            <div
              key={exp.id}
              className="relative pl-12 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:pl-0"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute left-4 top-8 z-10 -translate-x-1/2 lg:left-1/2"
              >
                <span
                  className="block size-3 rounded-full ring-4 ring-[var(--color-bg)]"
                  style={{
                    backgroundColor: exp.color,
                    boxShadow: `0 0 18px ${exp.color}`,
                  }}
                />
                {exp.current && (
                  <span
                    className="absolute inset-0 block size-3 rounded-full"
                    style={{
                      backgroundColor: exp.color,
                      animation: "pulse-dot 2s ease-in-out infinite",
                    }}
                  />
                )}
              </motion.div>

              <div
                className={i % 2 === 0 ? "lg:col-start-1 lg:pr-4" : "lg:col-start-2 lg:pl-4"}
              >
                <ExperienceCard exp={exp} index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
