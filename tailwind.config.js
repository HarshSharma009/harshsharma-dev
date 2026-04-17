/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        "accent-dim": "var(--color-accent-dim)",
        "text-primary": "var(--color-text-primary)",
        "text-muted": "var(--color-text-muted)",
        rust: "var(--color-rust)",
        go: "var(--color-go)",
        python: "var(--color-python)",
      },
      fontFamily: {
        mono: ["Geist Mono", "Fira Code", "ui-monospace", "monospace"],
        serif: ["Instrument Serif", "Georgia", "serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px var(--color-accent), 0 0 24px -4px var(--color-accent)",
        "glow-soft": "0 0 40px -8px var(--color-accent)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
