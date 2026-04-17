import { motion } from "framer-motion";

export default function Badge({ label, color, className = "" }) {
  const accent = color || "var(--color-accent)";
  return (
    <motion.span
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider transition-colors duration-300 ${className}`}
      style={{
        borderColor: `${accent}55`,
        color: accent,
        backgroundColor: `${accent}10`,
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: accent }}
      />
      {label}
    </motion.span>
  );
}
