import { motion } from "framer-motion";
import { TrendingUp, Rocket, Share2, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../ui/BrandIcons.jsx";
import SectionWrapper from "../layout/SectionWrapper.jsx";
import Badge from "../ui/Badge.jsx";
import { projects } from "../../data/portfolio.js";

const ICONS = { TrendingUp, Rocket, Share2 };

export default function Projects() {
  return (
    <SectionWrapper
      id="projects"
      label="04 · Projects"
      title="Side quests & experiments."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const Icon = ICONS[p.icon] ?? Rocket;
          const Tag = p.github ? motion.a : motion.div;
          const linkProps = p.github
            ? { href: p.github, target: "_blank", rel: "noreferrer" }
            : {};
          return (
            <Tag
              key={p.id}
              {...linkProps}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-[color:var(--card-accent)]/60"
              style={{ "--card-accent": p.accent }}
            >
              <div
                className="absolute -right-16 -top-16 size-40 rounded-full opacity-[0.06] blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ backgroundColor: p.accent }}
              />

              <div className="relative flex flex-1 flex-col">
                <div className="mb-5 flex items-start justify-between">
                  <span
                    className="flex size-12 items-center justify-center rounded-lg border"
                    style={{
                      borderColor: `${p.accent}55`,
                      backgroundColor: `${p.accent}15`,
                      color: p.accent,
                    }}
                  >
                    <Icon className="size-5" />
                  </span>
                  {p.github ? (
                    <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                      <GithubIcon className="size-3.5" />
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                      private
                    </span>
                  )}
                </div>

                <h3 className="mb-2 font-mono text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
                  {p.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {p.description}
                </p>

                <ul className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li key={t}>
                      <Badge label={t} color={p.accent} />
                    </li>
                  ))}
                </ul>
              </div>
            </Tag>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
