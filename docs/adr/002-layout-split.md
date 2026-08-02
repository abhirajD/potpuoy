# ADR 002: Layout Split — page.njk vs post.njk

## Status

Accepted

## Context

All Markdown content files need an HTML shell (nav, head, body). Two distinct content shapes exist:

- **Posts** (`src/posts/`): have structured metadata — title, date, type, tags, summary. Need a header section with this metadata rendered before the prose body.
- **Static pages** (`about.md`, `now.md`): are free-form prose with no date, type, or tag metadata. They only need a `.prose` wrapper for correct table, blockquote, and code styling.

Initially both used `layout: base.njk` directly, which meant static pages had no `.prose` wrapper — tables, blockquotes, and code blocks in those pages did not pick up the correct CSS selectors.

## Decision

Use two intermediate layouts between content and `base.njk`:

- `src/_includes/post.njk` — for posts. Renders a `.post-header` block (title, date, type, summary, tags), then wraps body content in `<section class="prose">`. Has `layout: base.njk` in its own frontmatter.
- `src/_includes/page.njk` — for static pages. Wraps body content in `<div class="prose">` only. Has `layout: base.njk` in its own frontmatter.

Posts in `src/posts/` automatically get `post.njk` via `src/posts/posts.11tydata.json` without any per-file declaration. Static pages declare `layout: page.njk` in their own frontmatter.

`base.njk` remains the root shell: nav, head, OG/Twitter meta, conditional Mermaid script, closing body.

## Consequences

- `.prose` CSS selectors (`table`, `blockquote`, `code`, `img`) apply correctly to all Markdown-rendered content.
- Posts and static pages are visually distinct without duplicating nav or head markup.
- Adding a new static page requires only `layout: page.njk` in frontmatter — no template duplication.
- Adding a new post requires no frontmatter layout declaration at all.

## Agent Notes

- Do not add layout declarations to files in `src/posts/` — `posts.11tydata.json` handles this.
- Do not use `{% extends %}` / `{% block %}` Nunjucks syntax in layout files. Eleventy's layout chaining via frontmatter `layout:` is the correct pattern and is already in use.
- If a new static page needs special post-like metadata rendering, use `post.njk` directly and add the metadata frontmatter fields.
