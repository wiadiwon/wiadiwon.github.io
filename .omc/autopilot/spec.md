# Autopilot Spec — wiadiwon.github.io

Generated: 2026-04-17

## 1. Tech Stack (Resolved)

| Item | Decision | Note |
|------|----------|------|
| Framework | Astro 6.x (latest, ~6.1.7) | CLAUDE.md said 4.x but latest is 6.x; new content API |
| Styling | Tailwind CSS 4.x + `@tailwindcss/vite` | CLAUDE.md said v3 but latest is 4.x; CSS-first config |
| Content | Astro Content Collections (`src/content.config.ts`) | Astro 5/6 new API location |
| MDX | `@astrojs/mdx` | Project detail pages only |
| i18n | Astro built-in i18n routing | Manual page duplication under `pages/ko/` |
| Deploy | GitHub Actions → GitHub Pages | `actions/deploy-pages` |
| Package Manager | npm | Node 20 |

## 2. Design System — Palette B

### Dark Mode (default)
```css
--bg: #111111
--surface: #1A1A2E
--surface-2: #232342
--accent: #818CF8        /* indigo-400 */
--accent-hover: #6366F1  /* indigo-500 */
--text: #F1F5F9
--text-muted: #94A3B8
--border: #2D2D50
```

### Light Mode
```css
--bg: #FFFFFF
--surface: #F8FAFC
--surface-2: #F1F5F9
--accent: #6366F1        /* indigo-500, darker for contrast */
--accent-hover: #4F46E5  /* indigo-600 */
--text: #1E293B
--text-muted: #64748B
--border: #E2E8F0
```

### Typography
- EN: `Inter` (Google Fonts)
- KO: `Pretendard` (CDN)
- Body: 16px / line-height 1.7
- Headings: `clamp(1.5rem, 4vw, 3rem)`

### Spacing
- Max width: `max-w-5xl` (64rem)
- Section: `py-16 md:py-24`
- Container padding: `px-6 md:px-8`

### Animation Strategy
- **Mechanism**: CSS transitions + Intersection Observer API (no heavy libs)
- **Effects**: scroll fade-in-up (opacity 0→1, translateY 20px→0), hover glow (box-shadow), card stagger (delay 0.1s per card), hero text slide-in
- **Performance**: transform/opacity only (GPU-composited), `prefers-reduced-motion: reduce` disables all
- **JS budget**: < 10KB gzipped total client-side JS

## 3. Pages & Routes

```
EN (default):
  /                    → index.astro (Home)
  /publications        → publications.astro
  /projects            → projects/index.astro
  /projects/[slug]     → projects/[slug].astro
  /cv                  → cv.astro

KO:
  /ko                  → ko/index.astro
  /ko/publications     → ko/publications.astro
  /ko/projects         → ko/projects/index.astro
  /ko/projects/[slug]  → ko/projects/[slug].astro
  /ko/cv               → ko/cv.astro
```

## 4. Content Collections (Astro 5/6 API)

File: `src/content.config.ts`

### publications
```ts
{
  title: string
  authors: string[]          // co-first: "Name*"
  year: number
  venue: string
  status: "published" | "under_review" | "preprint"
  featured: boolean
  keywords: string[]
  abstract: string
  pdf?: string
  code?: string
  doi?: string
  bibtex?: string            // YAML block scalar
  image?: string
}
```

### projects
```ts
{
  title: string
  category: "funded" | "academic" | "industry"
  role: string
  period: string
  teamSize?: number
  summary: string
  keywords: string[]
  featured: boolean
  heroImage: string          // gradient CSS string or path
  relatedPublications?: string[]
}
```

## 5. Components

```
BaseLayout.astro       — head, dark/light script, fonts, Nav, Footer
Nav.astro              — logo + links + mobile hamburger
LangToggle.astro       — /path ↔ /ko/path swap
ThemeToggle.astro      — localStorage + prefers-color-scheme
Footer.astro           — email, GitHub, Scholar links
SectionHeading.astro   — h2 + optional subtitle
PublicationCard.astro  — venue badge, authors (bold Lee), keywords, links
ProjectCard.astro      — category badge, period, summary, hero gradient
ScrollReveal.astro     — Intersection Observer wrapper for fade-in-up
```

## 6. Content Decisions

### Featured Publications (Home, 3 items)
1. VIPCGRL (01) — flagship, co-first author
2. ACD (04) — IEEE Access, human-AI coordination
3. Smart Insole (05) — NeurIPS Workshop, hardware

### Featured Projects (Home, 3 items)
1. VIPCGRL — funded/academic
2. Smart Insole — funded/GIST-MIT
3. ACD — academic

### Thesis (00_HL-PCGRL)
Excluded from publications list. Referenced in VIPCGRL project page as prior work.

### Publications Count: 6
Papers 01–06 only.

### CV PDFs
Single PDF `CV_SeoyoungLee.pdf` for now. Both EN/KO download buttons point to same file.
KO version button labeled "CV (한국어)" but links same file. Note in UI: "KO version coming soon" if desired.

### Profile Photo
Not available → styled gradient avatar with initials "SL" as placeholder.

### Project Hero Images
Not available → CSS gradient backgrounds per project (unique color per category).

### Samsung C-Lab Project
Minimal card with summary from CLAUDE.md. No MDX detail page; `hasDetail: false` field.

## 7. i18n Rules

- Default locale: `en` (no prefix)
- KO locale: `/ko/` prefix
- Content: `src/content/publications/en/` + `src/content/publications/ko/`
- Same slug across languages
- Publication title/authors/venue: English always
- UI strings: `src/i18n/en.json` + `src/i18n/ko.json`
- Lang toggle: swap prefix, same path
- Missing KO translation → fall back to EN with "(EN)" badge

## 8. Author Name Variants (for bolding)
Match any of: `"Seo-Young Lee"`, `"Seoyoung Lee"`, `"S.-Y. Lee"`, `"S. Lee"`

## 9. Keyword Filter (Publications)
- Multi-select, OR logic
- URL query param: `?keywords=rl,pcg`
- "Clear all" button
- Empty results: "No matching publications" message

## 10. Mobile Nav
Viewport < 768px → hamburger toggle, slide-in panel from right, backdrop blur overlay.

## 11. FOUC Prevention
Inline blocking `<script>` in `<head>` before stylesheets: reads localStorage `theme`, falls back to `prefers-color-scheme`, defaults to `dark`.

## 12. 404 Page
`src/pages/404.astro` — styled, links to home, respects theme.

## 13. OG Image
Single shared `public/og-default.png` (dark bg, name + title). Set in BaseLayout.

## 14. What NOT To Do
- No CMS, no SSR, no auth
- No heavy animation libs (Framer Motion, GSAP)
- No new npm packages without documenting reason
- No PDF commits (papers)
- No phone number in UI
- No auto-crawling Google Scholar
