import { forwardRef } from "react";
import { motion } from "framer-motion";

const SectionWrapper = forwardRef(function SectionWrapper(
  { id, label, title, children, className = "", noPadding = false },
  ref,
) {
  return (
    <motion.section
      ref={ref}
      id={id}
      data-section={id}
      className={`relative ${noPadding ? "" : "section-padding"} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container-tight">
        {(label || title) && (
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 flex flex-col gap-3 sm:mb-20"
          >
            {label && (
              <span className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent)]">
                <span className="size-1.5 rounded-full bg-[var(--color-accent)] shadow-glow-soft" />
                {label}
              </span>
            )}
            {title && (
              <h2 className="max-w-4xl text-balance text-3xl font-medium leading-[1.05] tracking-tight text-[var(--color-text-primary)] sm:text-5xl md:text-6xl">
                {title}
              </h2>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </motion.section>
  );
});

export default SectionWrapper;
