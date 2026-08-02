# Progress

## V1 — Completed

### Scaffold & Templates
- [x] Eleventy v3 async config — Shiki, RSS plugin, collections, filters, passthrough
- [x] `base.njk` — nav, head, OG/Twitter meta, JSON-LD, canonical URL, conditional Mermaid
- [x] `page.njk` — static page layout (about, now) with `.prose` wrapper (ADR-002)
- [x] `post.njk` — layout chaining via frontmatter, no broken extends/block
- [x] `post-list.njk` — shared partial, `data-tags` all-tags attribute, consistent use
- [x] `posts.11tydata.json` — auto-applies `post.njk` to all posts, no per-post boilerplate

### Pages
- [x] `/` — positioning statement + 10 most recent posts across all types
- [x] `/writing/` — all posts, type + tag filter (vanilla JS, label-prefixed selects)
- [x] `/artifacts/` — filtered to build-log, model, interactive
- [x] `/about/` — systems craftsman framing, `.prose` wrapper
- [x] `/now/` — current work, June 2026, `.prose` wrapper
- [x] `/feed.xml` — Atom, rssFeed collection, escaped, absolute URLs
- [x] `/sitemap.xml` — all posts + static pages

### CSS
- [x] Serif body (Georgia), mono headers/meta/tags, slate accent `#5c7a9e`
- [x] Full dark mode via `@media (prefers-color-scheme: dark)` + CSS custom properties
- [x] Lobotomized owl heading margins (`* + h1` pattern — no top margin on first headings)
- [x] Post-item titles: Georgia serif 1rem, not mono, for better readability
- [x] Visited link state
- [x] Filter UI with `type:` / `tag:` label prefixes

### Features
- [x] Shiki syntax highlighting — build-time, `dark-plus`, mermaid bypass (ADR-004)
- [x] Mermaid diagrams — CDN, dark-mode aware, opt-in via `mermaid: true` (ADR-003)
- [x] Post-local asset passthrough (`src/posts/**/*.{jpg,...}`)
- [x] Asset folders scaffolded: images, diagrams, plots, data, demos
- [x] Post navigation — prev/next links + RSS/all-posts footer on every post
- [x] SEO meta — OG tags, Twitter card, canonical URL, JSON-LD BlogPosting schema

### Content & Docs
- [x] 3 starter posts: note, mechanism (Mermaid + table), build-log (Shiki + table)
- [x] `persona_library.md` — 40+ reviewer/agent personas across 8 categories
- [x] SPECS.md, AGENTS.md, PROGRESS.md, ADR-001 through ADR-004

### Infrastructure
- [x] `.gitignore` — includes `.codex-*`, `public/`, `node_modules/`
- [x] `netlify.toml` — `npm run build` → `public/`

## Open

- [ ] Connect potpuoy.com domain to Netlify
- [ ] Accessibility audit findings — implement fixes (agent running)
- [ ] Mobile review findings — implement fixes (agent running)
- [ ] Reading flow — post-end navigation (next/prev or type-filtered suggestions)
- [ ] Write real posts

## V2 (deferred)

- Math rendering (KaTeX)
- Python plot pipeline build integration
- Observable / Vega-Lite embeds
- Newsletter / email subscription
- Series / sequence pages
- Search
