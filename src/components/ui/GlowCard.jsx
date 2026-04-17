import { motion } from "framer-motion";

export default function GlowCard({
  children,
  accentColor = "var(--color-accent)",
  className = "",
  as: Tag = motion.div,
  ...rest
}) {
  return (
    <Tag
      className={`group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-sm transition-colors duration-500 ${className}`}
      style={{ "--card-accent": accentColor }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mx,50%) var(--my,0%), ${accentColor}14, transparent 40%)`,
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${accentColor}40, 0 0 40px -10px ${accentColor}50`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
