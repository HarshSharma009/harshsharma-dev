# Harsh Sharma — Interactive Portfolio

Scroll-driven personal portfolio for **Harsh Sharma**, Senior Backend Engineer building distributed systems and fintech infrastructure.

Built with **React 18 + Vite**, animated with **Framer Motion**, styled with **Tailwind CSS v3**, and designed in a terminal-brutalist aesthetic (electric cyan `#00F5C4` on near-black `#0A0A0F`).

Live repo content is pulled directly from the **GitHub REST API** and cached in `localStorage` (1hr TTL). The contribution heatmap is embedded via [ghchart.rshah.org](https://ghchart.rshah.org).

---

## Stack

| Layer         | Tech                                                                 |
| ------------- | -------------------------------------------------------------------- |
| Framework     | React 18, Vite 7                                                     |
| Animation     | Framer Motion 11 (`LazyMotion` + `domAnimation`)                     |
| Styling       | Tailwind CSS v3, CSS custom properties for theme tokens              |
| Icons         | lucide-react                                                         |
| Fonts         | Geist Mono, Instrument Serif (via Google Fonts)                      |
| Data          | GitHub REST API v3 (public, no auth), localStorage cache             |
| Code quality  | ESLint 9, React hooks / refresh plugins                              |

---

## Sections

`Hero → About → TechStack → Experience → Projects → GitHub → Contact`

Each section uses `whileInView` for staggered reveal animations. The experience timeline draws its central spine using `useScroll` → `useTransform` on `scaleY`. A film-grain SVG overlay and a fixed scroll-progress bar add tactile polish.

---

## Develop

```bash
npm install
npm run dev      # vite dev server
npm run build    # production bundle -> dist/
npm run preview  # preview production build
npm run lint     # eslint
```

Requires Node 18+ (built & tested on Node 20).

---

## Customising

All static content lives in `src/data/portfolio.js` — personal info, stats, experience timeline, tech stack, projects, GitHub username. Edit that file and the whole site updates.

Design tokens (colors, fonts, spacing, easing) are defined as CSS custom properties in `src/styles/tokens.css` and mirrored into Tailwind via `tailwind.config.js`.

---

## Deploy

Zero-config static deploy works on **Vercel** / **Netlify** / **GitHub Pages**:

```bash
npx vercel --prod
# or
npm run build && npx netlify deploy --prod --dir=dist
```

---

## License

© Harsh Sharma. All rights reserved.
