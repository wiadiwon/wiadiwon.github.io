# Implementation Plan — wiadiwon.github.io

Created: 2026-04-17
Status: IN PROGRESS

## Phase A — Project Bootstrap

### A1. Initialize Astro 6 project
```bash
cd /c/github/wiadiwon.github.io
npm create astro@latest . -- --template minimal --no-install --no-git
npm install
```

### A2. Add integrations
```bash
npx astro add tailwind --yes   # @astrojs/tailwind (Tailwind 4 via vite plugin)
npx astro add mdx --yes
```
Check: if @astrojs/tailwind installs Tailwind v3, manually switch to tailwindcss@latest + @tailwindcss/vite.

### A3. Configure astro.config.mjs
- site: "https://wiadiwon.github.io"
- i18n: { locales: ["en", "ko"], defaultLocale: "en" }
- MDX integration
- Tailwind integration

### A4. Configure .gitignore, tsconfig.json

---

## Phase B — Design Foundation

### B1. src/styles/globals.css
- CSS custom properties for dark/light palette B
- @layer base: html, body defaults
- @layer utilities: .prose, .container helpers
- Google Fonts (Inter) + Pretendard CDN import

### B2. tailwind.config (CSS-based for v4)
In globals.css @theme block: define color tokens as Tailwind theme vars

---

## Phase C — Content Collections

### C1. src/content.config.ts
- publications collection with Zod schema
- projects collection with Zod schema

### C2. Publication content files (EN) — 6 papers
- src/content/publications/en/2025-vipcgrl.md
- src/content/publications/en/2025-ipcgrl.md
- src/content/publications/en/2025-mipcgrl.md
- src/content/publications/en/2025-acd.md
- src/content/publications/en/2024-smart-insole.md
- src/content/publications/en/2025-scotti.md

### C3. Publication content files (KO) — 6 papers (same slugs)
- src/content/publications/ko/*.md (keywords + summary translated)

### C4. Project content files (EN) — 4 projects
- src/content/projects/en/vipcgrl.mdx
- src/content/projects/en/smart-insole.mdx
- src/content/projects/en/acd.mdx
- src/content/projects/en/samsung-clab.md (no MDX, minimal)

### C5. Project content files (KO) — 4 projects
- src/content/projects/ko/*.mdx

---

## Phase D — Components

### D1. BaseLayout.astro
- FOUC-prevention inline script (dark mode default)
- Google Fonts + Pretendard links
- Meta tags (title, description, OG)
- Nav + slot + Footer

### D2. Nav.astro
- Logo (name)
- Links: Publications, Projects, CV
- LangToggle + ThemeToggle
- Mobile: hamburger + slide-in panel

### D3. LangToggle.astro + ThemeToggle.astro

### D4. Footer.astro
- Email, GitHub, Google Scholar links
- Copyright

### D5. SectionHeading.astro

### D6. PublicationCard.astro
- Venue badge, year, status badge
- Authors with bold "Seo-Young Lee" variants
- Co-first * superscript
- Keywords chips
- PDF / Code / DOI links

### D7. ProjectCard.astro
- Category badge
- Gradient hero (CSS)
- Period, role, teamSize
- Keywords

### D8. ScrollReveal.astro (Intersection Observer)

---

## Phase E — Pages

### E1. src/pages/index.astro (EN Home)
- Hero: name, title "AI Engineer", research interests, avatar, CTA buttons
- Featured Publications (3)
- Featured Projects (3)
- News section (3 hardcoded entries)

### E2. src/pages/publications.astro (EN)
- All 6 publications, year desc sort
- Keyword filter UI (multi-select, URL params)

### E3. src/pages/projects/index.astro (EN)
- 4 project cards, category tabs/badges

### E4. src/pages/projects/[slug].astro (EN)
- MDX render
- Sidebar: meta info
- Related publications links

### E5. src/pages/cv.astro (EN)
- Education, Experience, Publications list, Skills
- 2 PDF download buttons

### E6. KO mirrors (ko/index, ko/publications, ko/projects/*, ko/cv)

### E7. src/pages/404.astro

---

## Phase F — Assets & Config

### F1. public/ structure
- cv/CV_SeoyoungLee.pdf (copy from _assets)
- favicon.svg
- og-default.png (generate simple dark card)

### F2. .github/workflows/deploy.yml
- trigger: push main
- Node 20, npm ci, npm run build
- actions/deploy-pages

### F3. src/i18n/en.json + ko.json
- All UI strings

---

## Phase G — Polish

### G1. Animations
- globals.css: @keyframes fadeInUp
- ScrollReveal component: IntersectionObserver
- Card hover effects

### G2. SEO
- Per-page title/description
- sitemap (@astrojs/sitemap)
- robots.txt

### G3. Responsive check
- Mobile nav
- Card grid breakpoints

---

## Execution Order

Parallel groups:
- [A1→A2→A3→A4] sequential bootstrap
- [B, C] parallel after A
- [D] parallel after B
- [E] parallel after C+D
- [F, G] parallel after E

Total estimated files: ~80
