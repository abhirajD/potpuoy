# ADR 001: Blog Asset Structure

## Status

Accepted

## Context

`SPECS.md` defines a minimal Eleventy blog with content in `src/posts/`, static assets under `src/assets/`, standalone demos under `src/demos/`, generated plot scripts under `scripts/plots/`, and build output in `public/`.

The V1 scaffold is fully implemented. The project needs an asset layout that works for human contributors and multiple AI coding agents, including Codex, Claude Code, and OpenCode. It should make ownership obvious, reduce accidental cross-post edits, and avoid tool-specific conventions.

## Decision

Use a hybrid asset structure:

- Keep reusable site-wide assets in `src/assets/`:
  - `src/assets/images/` for shared photos and screenshots.
  - `src/assets/diagrams/` for shared SVG and Excalidraw exports.
  - `src/assets/plots/` for shared generated charts.
  - `src/assets/data/` for shared CSV and JSON data.
- Keep post-specific assets beside the post in a same-slug directory:
  - Post: `src/posts/YYYYMMDD-short-slug.md`
  - Assets: `src/posts/YYYYMMDD-short-slug/`
- Keep standalone interactive demos in `src/demos/`.
- Keep source scripts and notebooks out of the publishable asset tree:
  - `scripts/plots/` for reproducible plot generation.
  - `notebooks/` for exploratory or source notebooks.

Use relative Markdown links for same-post assets and root-relative links for shared assets:

```md
![local diagram](./YYYYMMDD-short-slug/diagram.svg)
![shared chart](/assets/plots/shared-chart.svg)
```

Eleventy passthrough should include both `src/assets/**` and post-local asset directories under `src/posts/**/`.

## Consequences

Post-specific files have a clear owner and can be reviewed, moved, or deleted with the post. This helps AI agents avoid editing shared assets when a change only belongs to one article.

Shared assets remain available for common diagrams, reusable data, site imagery, and cross-post references. Shared files should have descriptive names and should not be silently repurposed for a single post.

The spec's current shared asset folders remain valid, but they are not the only place assets may live. The Eleventy passthrough in `.eleventy.js` copies both `src/assets/**` and `src/posts/**/*.{jpg,jpeg,png,gif,svg,webp,avif,mp4,webm,pdf}` to `public/`, supporting both shared and post-local assets.

The repo does not need an `llm wiki` yet. At this stage, `SPECS.md` plus ADRs provide enough durable context. Add a small `docs/agent-guide.md` later only if repeated agent handoffs reveal recurring setup or architecture mistakes that ADRs cannot capture cleanly.

## Agent Notes

Before making code or content changes, agents should read `SPECS.md` and the ADRs in `docs/adr/`. Treat `SPECS.md` as the product and stack contract, and ADRs as durable implementation decisions.

Use agent-agnostic project documentation. Do not add or require `CLAUDE.md`, `.cursorrules`, Codex-only instructions, or OpenCode-only instructions unless the user explicitly asks for tool-specific setup. If tool-specific helper files are added later, they must point back to canonical docs instead of becoming the source of truth.

Recommended collaboration conventions:

- Keep generated build output out of source control unless the hosting flow requires it.
- Check `git status --short` before and after edits.
- Avoid changing unrelated files in a dirty worktree.
- Record durable decisions as ADRs, not as chat-only notes.
- Track implementation progress in a neutral file such as `docs/progress.md` only after work begins; do not use ADRs as task lists.

Current repo state: V1 scaffold is complete. `SPECS.md`, `PROGRESS.md`, and `docs/adr/` are the durable reference points. See `PROGRESS.md` for implementation status.
