# AGENTS.md

This is the canonical working guide for AI agents contributing to `potpuoy.com`.

## Project

`potpuoy.com` is an Eleventy v3 blog for mechanism-first essays, artifacts, models, and notes. It is a systems-craftsman public lab notebook: observe -> model -> artifact. Not a portfolio, marketing site, tutorial site, or AI commentary blog.

Reference direction: `SPECS.md` + `docs/adr/001-asset-structure.md`. Treat them as the source of truth for product, stack, and asset decisions.

## Required Reading

Before code, content-structure, or asset changes, read:
1. `SPECS.md` — product and stack contract
2. `PROGRESS.md` — current implementation status
3. All ADRs in `docs/adr/` — durable implementation decisions:
   - `001-asset-structure.md` — hybrid shared/post-local asset layout
   - `002-layout-split.md` — page.njk vs post.njk, when to use each
   - `003-conditional-mermaid.md` — mermaid: true frontmatter flag
   - `004-shiki-mermaid-coexistence.md` — Shiki bypass for mermaid fences

If SPECS.md and an ADR conflict, the ADR wins. ADRs capture implementation decisions made after the spec was written.

## What This Repo Is and Isn't

- It is an end-to-end blog system: content authoring, theme, rendering pipeline, asset management, and deployment-friendly output.
- Atomic unit of content is a post at `src/posts/YYYYMMDD-short-slug.md`, owned with an optional same-slug asset folder.
- Theme and content tuning are expected concerns: CSS belongs in `src/style.css`; site metadata in `src/_data/site.json`; template hierarchy in `src/_includes/`.
- Content ingestion means Markdown with frontmatter: `title`, `date`, `type`, `tags`, `summary`, `draft`. Posts of type `build-log`, `model`, and `interactive` are artifacts.

## Hard Constraints

- Do not draft blog post content.
- Use Eleventy v3, Nunjucks, plain CSS, Shiki, Mermaid client-side, and the Eleventy RSS plugin.
- Do not add React, Tailwind, a bundler, comments, social widgets, analytics, search, or animation-heavy UI unless explicitly requested.
- Keep CSS compact and typographic.
- Preserve the hybrid asset model:
  - Shared assets: `src/assets/`
  - Post-specific assets: same-slug folders beside posts in `src/posts/`
  - Demos: `src/demos/`
  - Source scripts/notebooks outside publishable assets: `scripts/`, `notebooks/`

## Collaboration Rules

- Check `git status --short` before and after edits.
- Do not revert unrelated changes.
- Keep generated output out of source control unless hosting requires it.
- Record durable architecture decisions as ADRs.
- Keep tool-specific files as redirects to this file, not as competing sources of truth.
