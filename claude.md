# Harsh Sharma — Interactive Portfolio · `claude.md`

> **Build guide for Claude Code.** Feed this file to Claude Code (or any AI coding agent) to scaffold a fully animated, scroll-driven personal portfolio for Harsh Sharma — Backend Engineer specializing in Distributed Systems & Fintech.

---

## 0. Project Overview

A **single-page, scroll-driven portfolio** built with **React + Vite + Framer Motion** (or GSAP + ScrollTrigger as an alternative). The design language is **dark, terminal-brutalist meets editorial** — think Bloomberg Terminal crossed with a high-end dev blog. Monospaced type, data-pipeline aesthetics, glowing accent colours (electric cyan `#00F5C4` on near-black `#0A0A0F`).

The page tells a single continuous story:

```
Hero (Intro) → About → Tech Stack → Experience Timeline → Projects → GitHub Contributions → Contact
```

Every section transitions via orchestrated scroll animations — no jarring cuts, the user feels they are scrolling through a living résumé.

---

## 1. Tech Stack (Implementation)

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 18 + Vite | Fast HMR, ESM native |
| Animation | **Framer Motion 11** | `useScroll`, `useTransform`, `motion.*`, `AnimatePresence` |
| Scroll orchestration | Framer Motion `useScroll` + `whileInView` | Replaces need for GSAP ScrollTrigger unless preferred |
| Styling | **Tailwind CSS v3** + CSS custom properties | Utility-first, variables for theme tokens |
| GitHub data | **GitHub REST API v3** (public, no auth needed) | Fetch repos + contribution calendar |
| Fonts | `Geist Mono` (headings/code) + `Instrument Serif` (accent quotes) | via Google Fonts or `fontsource` |
| Icons | `lucide-react` | Clean SVG icons |
| Deployment | Vercel / Netlify (static) | |

### Alternative: GSAP route
If using GSAP instead of Framer Motion, use:
- `gsap` + `@gsap/react` + `ScrollTrigger` plugin
- `gsap.context()` inside `useLayoutEffect` for React cleanup
- `ScrollTrigger.refresh()` after DOM mutations

---

## 2. Design Tokens

Define these as CSS custom properties in `src/styles/tokens.css`:

```css
:root {
  /* Colors */
  --color-bg:          #0A0A0F;
  --color-surface:     #111118;
  --color-border:      #1E1E2E;
  --color-accent:      #00F5C4;   /* Electric cyan — primary glow */
  --color-accent-dim:  #00F5C420; /* accent at 12% opacity for backgrounds */
  --color-text-primary:#E8E8F0;
  --color-text-muted:  #6B6B80;
  --color-rust:        #F97316;   /* Rust lang accent */
  --color-go:          #00ADD8;   /* Go lang accent */
  --color-python:      #3776AB;   /* Python accent */

  /* Typography */
  --font-mono:   'Geist Mono', 'Fira Code', monospace;
  --font-serif:  'Instrument Serif', Georgia, serif;

  /* Spacing scale */
  --section-gap: clamp(6rem, 12vw, 12rem);

  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 0.3s;
  --duration-med:  0.6s;
  --duration-slow: 1.2s;
}
```

---

## 3. File Structure

```
portfolio/
├── public/
│   └── og-image.png
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Floating top-bar with section dots
│   │   │   └── SectionWrapper.jsx  # Scroll reveal wrapper HOC
│   │   ├── sections/
│   │   │   ├── Hero.jsx            # Full-screen intro with typewriter
│   │   │   ├── About.jsx           # Short bio + key numbers
│   │   │   ├── TechStack.jsx       # Skill orbit / grid
│   │   │   ├── Experience.jsx      # Vertical timeline
│   │   │   ├── Projects.jsx        # Card grid
│   │   │   ├── GitHub.jsx          # Live contribution graph + repos
│   │   │   └── Contact.jsx         # CTA section
│   │   ├── ui/
│   │   │   ├── GlowCard.jsx        # Reusable card with hover glow
│   │   │   ├── Terminal.jsx        # Fake terminal window component
│   │   │   ├── Badge.jsx           # Tech tag badge
│   │   │   ├── CountUp.jsx         # Animated number counter
│   │   │   └── GrainOverlay.jsx    # Film grain texture overlay
│   ├── hooks/
│   │   ├── useGitHub.js            # Fetch GitHub data
│   │   └── useScrollProgress.js    # Page scroll % hook
│   ├── data/
│   │   └── portfolio.js            # All static content (see below)
│   ├── styles/
│   │   ├── tokens.css
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
└── claude.md
```

---

## 4. Static Data File (`src/data/portfolio.js`)

```js
export const personal = {
  name: "Harsh Sharma",
  title: "Senior Backend Engineer",
  subtitle: "Microservices & Distributed Systems",
  email: "harshsharma.ext@gmail.com",
  phone: "+91 93142 22527",
  linkedin: "https://linkedin.com/in/harshsharma",
  github: "https://github.com/HarshSharma009",
  location: "Bangalore, India",
  summary: "Backend Engineer with 5+ years designing high-throughput, resilient distributed systems in fintech and banking. Building production-grade microservices serving millions of transactions daily.",
};

export const stats = [
  { label: "Years Experience",     value: 5,     suffix: "+" },
  { label: "Daily Payment Events", value: 5,     suffix: "M+" },
  { label: "Delivery Accuracy",    value: 99.99, suffix: "%" },
  { label: "Processing Time Cut",  value: 99,    suffix: "%" },
  { label: "Customers Served",     value: 1,     suffix: "M+" },
];

export const experience = [
  {
    id: "idfc",
    company: "IDFC FIRST Bank",
    role: "Software Engineer",
    location: "Bangalore, KA",
    period: "Dec 2025 – Present",
    current: true,
    color: "#00F5C4",
    highlights: [
      "Shipped Nominee Management & Audit Service from scratch to production in under 1 week, serving 1M+ customers on day one",
      "Built Interest Calculator service handling complex computation across multiple product types with full audit trail",
      "Maintained strict regulatory compliance and data integrity standards throughout rapid delivery cycles",
      "Accelerated delivery using AI-assisted development with Claude Code",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL", "Microservices", "Claude Code"],
  },
  {
    id: "kotak",
    company: "Kotak Mahindra Bank",
    role: "Software Engineer II",
    location: "Bangalore, KA",
    period: "May 2024 – Nov 2025",
    current: false,
    color: "#F97316",
    highlights: [
      "Redesigned legacy report pipeline with NumPy/Pandas — cut processing from 35–55 days to under 5 minutes on 1M+ records",
      "Built FastAPI backend for Risk-Central platform with JWT auth + WebSocket real-time feedback (300+ MAU)",
      "Instrumented 100+ API endpoints with Prometheus; Grafana dashboards for daily SLA tracking",
      "Authored reusable Python SDK adopted by 7+ internal microservices, reducing redundant code by 30%",
      "Automated CI/CD for 20+ services via Azure DevOps — reduced deployment time by 70%",
      "Designed dependency-aware Airflow DAGs across 5+ RISK modules",
    ],
    tags: ["Python", "FastAPI", "NumPy", "Pandas", "Prometheus", "Grafana", "Airflow", "Azure DevOps"],
  },
  {
    id: "juspay",
    company: "Juspay",
    role: "Software Engineer – Integration",
    location: "Bangalore, KA",
    period: "Apr 2022 – Feb 2024",
    current: false,
    color: "#A855F7",
    highlights: [
      "Real-time Rust/Kafka payment pipeline — 5M+ events/day, 99.99% delivery accuracy",
      "ClickHouse materialized views for 10,000+ merchants with sub-500ms query latency",
      "Feature Flag platform (FastAPI + Trie) — 100K+ daily evaluations, zero-downtime config changes",
      "Kong API Gateway integration — 65% auth latency reduction, 40% throughput improvement",
      "Stripe + Bamboo integrations supporting ₹10 Cr+ monthly transaction volume",
    ],
    tags: ["Rust", "Kafka", "ClickHouse", "FastAPI", "Kong", "Stripe", "ZooKeeper"],
  },
  {
    id: "apisero",
    company: "Apisero",
    role: "Software Engineer",
    location: "Remote",
    period: "May 2021 – Jan 2022",
    current: false,
    color: "#00ADD8",
    highlights: [
      "OTP-based 2FA in Java Spring Boot securing 100K+ enterprise users",
      "Go (Gin) internal APIs adopted by 3+ teams for secure service communication",
      "FHIR-compliant healthcare APIs on MuleSoft CloudHub — 50% better HL7 interoperability",
      "DataWeave Salesforce scheduler optimization — 100% sync accuracy across 1M+ records",
    ],
    tags: ["Java", "Spring Boot", "Go", "MuleSoft", "FHIR", "Salesforce"],
  },
];

export const techStack = {
  languages: [
    { name: "Python", icon: "🐍", color: "#3776AB", level: 95 },
    { name: "Rust",   icon: "⚙️", color: "#F97316", level: 80 },
    { name: "Go",     icon: "🔵", color: "#00ADD8", level: 75 },
    { name: "Java",   icon: "☕", color: "#ED8B00", level: 70 },
  ],
  distributed: ["Apache Kafka", "Apache Airflow", "ClickHouse", "Redis", "Kong API Gateway", "ZooKeeper"],
  cloud: ["AWS EC2", "S3", "Glue", "Lambda", "EKS", "VPC", "Route53", "Docker", "Kubernetes", "Azure DevOps"],
  databases: ["PostgreSQL", "ClickHouse"],
  observability: ["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Promtail"],
  frameworks: ["FastAPI", "Flask", "Django", "SQLAlchemy", "Actix", "Gin", "Spring Boot"],
};

export const projects = [
  {
    id: "stock-predictor",
    title: "Stock Price Predictor",
    description: "Django + LSTM neural network web app forecasting stock prices from 5 years of historical data.",
    tags: ["Python", "Django", "LSTM", "TensorFlow"],
    github: "https://github.com/HarshSharma009/StockMarketPredictor",
    icon: "📈",
  },
  {
    id: "spacex-game",
    title: "Space X — 3D Interactive Game",
    description: "3D space game built with Unity Engine. Spacecraft assets modelled in Blender.",
    tags: ["Unity", "C#", "Blender", "3D"],
    github: null,
    icon: "🚀",
  },
  {
    id: "code-review-graph",
    title: "Code Review Graph",
    description: "Graph-based code review tool in Go — visualise code review dependencies and relationships.",
    tags: ["Go", "Graph Theory"],
    github: "https://github.com/HarshSharma009/code-review-graph-go",
    icon: "🔗",
  },
];

export const githubUsername = "HarshSharma009";
```

---

## 5. Section-by-Section Build Instructions

### 5.1 `Hero.jsx` — Full Screen Intro

**Layout**: Full-viewport (`100dvh`). Split into two zones:
- **Left (60%)**: Animated text content
- **Right (40%)**: Abstract SVG data-pipeline illustration (animated flowing nodes representing Kafka events)

**Animation sequence** (Framer Motion, staggered entry):

| Delay | Element | Effect |
|---|---|---|
| 0.0s | Thin horizontal rule | Sweeps left-to-right across viewport |
| 0.3s | Role tag `< Senior Backend Engineer />` | Fade + slide up, monospace, muted |
| 0.6s | `HARSH SHARMA` | Slide up with blur-to-sharp, large display |
| 0.9s | Typewriter subtitle | Cycles: `Distributed Systems` → `Fintech Infrastructure` → `Rust · Python · Go` |
| 1.2s | CTA buttons | Fade: `[View My Work ↓]` (filled) + `[GitHub]` (ghost) |
| 1.5s | Metrics strip | `5M+ events/day · 99.99% accuracy · 1M+ customers` |

**Background**: CSS `radial-gradient` dot grid with very slow parallax drift (CSS only, no WebGL).

**Scroll indicator**: Pulsing `↓` arrow with `bounce` animation.

```jsx
// Key Framer Motion patterns for Hero:
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)",
            transition: { duration: 0.7, ease: [0.16,1,0.3,1] } }
};

// Typewriter: useEffect with setInterval cycling through phrases array
// On each tick, setState with next phrase; animate with AnimatePresence + exit
```

---

### 5.2 `About.jsx` — Quick Stats & Bio

**Layout**: Two-column on desktop, single column mobile.

**Left**: Bio paragraph + contact links row (email, LinkedIn, GitHub, location).

**Right**: `4` animated `CountUp` cards in a 2×2 grid — each with a label and animated number.

**Animation**: `whileInView` with `viewport={{ once: true, margin: "-100px" }}`. Cards stagger in with `y: 40 → 0`.

```jsx
// CountUp: fires when card enters viewport
// useEffect + requestAnimationFrame to animate 0 → target value
// Props: value, suffix, duration (default 1.5s), decimals
```

---

### 5.3 `TechStack.jsx` — Skills Grid

**Layout**: Two-zone layout:
1. **Language cards** (top row): Python · Rust · Go · Java — each with color, skill bar, and level %
2. **Category tag clouds** (below): Distributed Systems / Cloud / Databases / Observability / Frameworks

**Skill bar animation**: On scroll into view, bars animate `width: 0% → level%` using Framer Motion spring.

**Badge hover**: `scale(1.05)` + border glow in `--color-accent`.

**Color coding**: Each language uses its canonical brand color from `techStack.languages`.

---

### 5.4 `Experience.jsx` — Vertical Timeline

**Layout**: Centred vertical spine (2px line, accent color) with alternating left/right cards on desktop, single-column on mobile.

**Spine draw animation** (scroll-driven):
```jsx
const { scrollYProgress } = useScroll({ target: timelineRef });
const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
// Apply to motion.div with style={{ scaleY, transformOrigin: "top" }}
```

**Each card** (`GlowCard`):
- Company name + role (large mono)
- Period badge (outlined, top-right)
- Max 3 bullet highlights visible + `[+N more]` expand toggle
- Tag row at bottom
- Card color accent from `experience[n].color`

**Card entry**: `x: -60 → 0` for left cards, `x: 60 → 0` for right, triggered by `whileInView`.

**Current role** (IDFC FIRST Bank): Shows `● CURRENT` badge with blinking cursor `▌`.

**Dot on spine**: Pulses with a `scale: [1, 1.4, 1]` repeat animation when card is active.

---

### 5.5 `Projects.jsx` — Work Showcase

**Layout**: 3-column card grid (2 on tablet, 1 on mobile).

**Each card**:
- Large emoji icon top-left
- Title + 1-line description
- Tag badges row
- GitHub icon link (conditionally shown)
- Hover: `y: -8`, glow border

**Animation**: `whileInView` stagger — each card delayed by `index * 0.1s`.

---

### 5.6 `GitHub.jsx` — Live Contributions

**Data fetching** (`src/hooks/useGitHub.js`):
```js
const GITHUB_API = "https://api.github.com";
const USERNAME = "HarshSharma009";

export async function fetchRepos() {
  // Check localStorage cache first (1hr TTL)
  const cached = localStorage.getItem("gh_repos");
  if (cached) {
    const { data, ts } = JSON.parse(cached);
    if (Date.now() - ts < 3_600_000) return data;
  }
  const res = await fetch(
    `${GITHUB_API}/users/${USERNAME}/repos?sort=stars&per_page=6`
  );
  const data = await res.json();
  localStorage.setItem("gh_repos", JSON.stringify({ data, ts: Date.now() }));
  return data;
}
```

**Contribution Graph**: Embed via public service (no auth needed):
```jsx
// Option A: ghchart.rshah.org SVG embed
<img
  src="https://ghchart.rshah.org/00F5C4/HarshSharma009"
  alt="Harsh Sharma GitHub contribution graph"
  style={{ width: "100%", filter: "brightness(0.9)" }}
/>

// Option B: github-readme-stats
<img src="https://github-readme-stats.vercel.app/api?username=HarshSharma009&theme=dark&hide_border=true" />
```

**Layout**:
1. Section header + GitHub profile stats strip (10 repos, Arctic Code Vault achievement)
2. Contribution heatmap (full width)
3. Top 4 repo cards (name, language dot, star count, description)

**Repo card animation**: Stagger in from bottom, hover shows language-color border glow.

---

### 5.7 `Contact.jsx` — CTA Terminal

**Layout**: Full-width centred. Terminal-style text block.

**Content rendered as terminal output**:
```
> whoami
  Harsh Sharma — Backend Engineer
> status
  Available for senior backend / distributed systems roles
> contact
  harshsharma.ext@gmail.com
  linkedin.com/in/harshsharma
  github.com/HarshSharma009
> _
```

**Animation**: Lines type out sequentially when section enters viewport using `Terminal.jsx` component.

**Background**: Faint grid lines + radial accent glow from bottom centre.

---

## 6. Reusable UI Components

### `GlowCard.jsx`
```jsx
// Card with animated gradient border glow on hover
// Technique: position: relative + ::before pseudo with
//   background: conic-gradient or linear-gradient using card's accent color
//   opacity: 0 → 1 on hover (Framer Motion whileHover)
// Props: children, accentColor, className
```

### `Terminal.jsx`
```jsx
// Fake terminal window
// Props: lines (string[]), typingSpeed (ms, default 30)
// Renders: macOS traffic lights (red/yellow/green dots) + typed output
// useEffect + setTimeout chain to reveal each character sequentially
// Shows blinking cursor at active line
```

### `Badge.jsx`
```jsx
// Tech tag pill: font-mono, text-xs, rounded-full
// Props: label, color (optional)
// Default: accent border + accent text at low opacity bg
// Hover: scale(1.05) + full accent bg
```

### `CountUp.jsx`
```jsx
// Animates from 0 to `value` on `isActive` = true
// Props: value (number), suffix (string), duration (ms), decimals
// Uses requestAnimationFrame with easeOutExpo timing function
```

### `GrainOverlay.jsx`
```jsx
// Film grain via SVG feTurbulence filter
// position: fixed, inset: 0, pointer-events: none
// mix-blend-mode: overlay, opacity: 0.03–0.05
// Adds premium tactile texture — subtle but effective
```

### `SectionWrapper.jsx`
```jsx
// Wraps each section with:
// - id prop for anchor nav
// - motion.section with initial/whileInView/viewport
// - consistent py-[var(--section-gap)] padding
// - ref forwarding for scroll tracking
```

---

## 7. Navbar

**Style**: Floating pill, fixed top, centred. `backdrop-filter: blur(12px)` + semi-transparent `--color-surface`.

**Content**:
- Left: `HS` monogram (scrolls to top on click)
- Centre: Section nav dots — small circles, filled when section is active
- Right: `Hire Me →` button (links to Contact section)

**Active section detection**: `IntersectionObserver` on each `SectionWrapper` ref, updates active index state in App.

**Entry animation**: `y: -60 → 0` after 2s delay (lets hero load first).

**Scroll behaviour**: Background opacity `0 → 1` as user scrolls past hero.

---

## 8. Scroll Architecture

```
Page scroll drives:
├── Navbar: transparent → frosted glass (useScroll + useTransform opacity)
├── Hero bg: parallax drift at 30% scroll speed (useTransform y)
├── Timeline spine: scaleY 0→1 over timeline section height
├── Section reveals: whileInView stagger (each section independent)
└── Progress bar: thin accent line at viewport top (scrollYProgress → scaleX)
```

**Global scroll progress** — in `App.jsx`:
```jsx
const { scrollYProgress } = useScroll();
// Pass to Navbar + Progress bar
```

**Section-local scroll** — in each section:
```jsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
```

---

## 9. Performance Guidelines

- `LazyMotion` + `domAnimation` features bundle for smaller Framer Motion footprint
- Lazy-load `GitHub.jsx` with React `Suspense` + `React.lazy()`
- GitHub API: `localStorage` cache with 1hr TTL (see §5.6)
- `will-change: transform` only on the timeline spine `motion.div`
- No heavy images — SVG illustrations only
- Fonts: `font-display: swap` + `<link rel="preload">` for Geist Mono
- `useReducedMotion()` check — skip translate animations, keep opacity fades

---

## 10. Responsive Breakpoints

| Breakpoint | Layout behaviour |
|---|---|
| `< 640px` (mobile) | Single column, reduced stagger durations, no parallax, timeline single-column |
| `640–1024px` (tablet) | 2-col cards, timeline single-column, reduced hero split |
| `> 1024px` (desktop) | Full layout, alternating timeline, 3-col projects grid |

---

## 11. `index.html` Meta Tags

```html
<title>Harsh Sharma — Backend Engineer</title>
<meta name="description" content="Senior Backend Engineer specializing in distributed systems, Rust, Python, and fintech infrastructure. 5M+ events/day, 99.99% accuracy." />
<meta property="og:title" content="Harsh Sharma — Backend Engineer" />
<meta property="og:description" content="Distributed systems, Kafka, ClickHouse, Rust, Python, Go." />
<meta property="og:image" content="/og-image.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
```

---

## 12. Build & Deploy Commands

```bash
# Scaffold
npm create vite@latest harsh-portfolio -- --template react
cd harsh-portfolio

# Install
npm install framer-motion tailwindcss @tailwindcss/vite lucide-react

# Dev server
npm run dev

# Production build
npm run build

# Deploy (Vercel)
npx vercel --prod
```

---

## 13. Claude Code Prompt Templates

Use these when building section by section with Claude Code:

**Hero section:**
> Build `src/components/sections/Hero.jsx`. Use data from `src/data/portfolio.js` (`personal`, `stats`). Implement Framer Motion staggered entry: role tag → name → typewriter subtitle → CTA buttons → metrics strip. Typewriter cycles through `["Distributed Systems", "Fintech Infrastructure", "Rust · Python · Go"]`. Dark terminal aesthetic, `--color-accent` (#00F5C4) glows. Include animated dot-grid background via CSS only.

**Experience Timeline:**
> Build `src/components/sections/Experience.jsx`. Render `experience[]` from `portfolio.js` as a vertical timeline. Centred spine line uses `useScroll` + `useTransform` to `scaleY` from 0→1 as user scrolls through section. Cards alternate left/right on desktop (`>1024px`), single column on mobile. Each card uses its `color` field for accent. Current role (id: "idfc") shows blinking `CURRENT` badge.

**GitHub section:**
> Build `src/components/sections/GitHub.jsx`. Use the `useGitHub` hook to fetch repos for `HarshSharma009` from GitHub REST API with localStorage caching (1hr TTL). Display top 4 repos as cards. Embed contribution heatmap as `<img src="https://ghchart.rshah.org/00F5C4/HarshSharma009">`. Stagger repo cards in with `whileInView`.

**Tech Stack:**
> Build `src/components/sections/TechStack.jsx`. Top row: language cards for Python/Rust/Go/Java with animated skill bars (`whileInView` width animation). Below: badge tag clouds grouped by category (Distributed, Cloud, Databases, Observability, Frameworks) from `portfolio.js`. Badge hover: `scale(1.05)` + `--color-accent` border glow.

**Contact Terminal:**
> Build `src/components/sections/Contact.jsx`. Render a fake terminal window using `Terminal.jsx` that types out lines sequentially on scroll into view: whoami, status (available for roles), contact details. Include functional mailto link on email. Radial glow behind terminal from `--color-accent` at very low opacity.

---

## 14. Final Ship Checklist

- [ ] All 7 sections render correctly: Hero → About → TechStack → Experience → Projects → GitHub → Contact
- [ ] Navbar scroll-spy active dot updates correctly
- [ ] CountUp numbers animate on scroll into view
- [ ] Timeline spine draws as user scrolls
- [ ] GitHub repos load + contribution graph displays
- [ ] `prefers-reduced-motion` respected (`useReducedMotion()`)
- [ ] Mobile layout correct at 375px viewport
- [ ] Tablet layout correct at 768px
- [ ] Meta/OG tags set in `index.html`
- [ ] `mailto:` on email, `target="_blank" rel="noreferrer"` on all external links
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 95
- [ ] No console errors in production build

---

*Generated for Harsh Sharma's portfolio build — April 2026*
*GitHub: github.com/HarshSharma009*
