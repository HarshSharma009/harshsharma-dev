import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons.jsx";
import SectionWrapper from "../layout/SectionWrapper.jsx";
import CountUp from "../ui/CountUp.jsx";
import { personal, stats } from "../../data/portfolio.js";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const CONTACTS = [
  {
    icon: Mail,
    label: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: personal.linkedin,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    href: personal.github,
  },
  {
    icon: MapPin,
    label: personal.location,
    href: null,
  },
];

export default function About() {
  return (
    <SectionWrapper id="about" label="01 · About" title="Backend engineer obsessed with resilient systems.">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <p className="text-pretty text-lg leading-relaxed text-[var(--color-text-muted)] sm:text-xl">
            I&apos;ve spent the last <span className="text-[var(--color-text-primary)]">5+ years</span> building the
            plumbing behind fintech products — real-time payment pipelines on
            Kafka, low-latency warehouses on ClickHouse, and API gateways that
            squeeze every millisecond out of the stack.
          </p>
          <p className="text-pretty leading-relaxed text-[var(--color-text-muted)]">
            Currently at{" "}
            <span className="text-[var(--color-accent)]">IDFC FIRST Bank</span>{" "}
            shipping regulated microservices from zero to production, previously
            at Kotak Mahindra, Juspay and Apisero. I care about clean
            observability, honest SLAs, and code that still makes sense at 3am.
          </p>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CONTACTS.map((c) => {
              const Icon = c.icon;
              const inner = (
                <span className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/50 px-4 py-3 text-sm text-[var(--color-text-muted)] transition-all duration-300 hover:border-[var(--color-accent)]/60 hover:text-[var(--color-text-primary)]">
                  <Icon className="size-4 text-[var(--color-accent)]" />
                  <span className="truncate">{c.label}</span>
                </span>
              );
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-5 backdrop-blur-sm transition-colors duration-500 hover:border-[var(--color-accent)]/60 sm:p-6"
            >
              <div className="absolute -right-8 -top-8 size-24 rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.12]" />
              <div className="relative">
                <div className="font-mono text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                  <CountUp
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals || 0}
                  />
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
