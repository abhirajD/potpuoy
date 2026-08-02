---
title: "Building this site: Eleventy and the discipline of not over-engineering"
date: 2026-06-26
type: build-log
tags: [craft, software, tool]
summary: "Notes on the decisions that kept potpuoy.com simple — and the temptations that were worth resisting."
draft: false
---

This site is built with [Eleventy](https://www.11ty.dev), plain CSS, and almost no JavaScript. Here are the decisions worth documenting.

## The constraint that shaped everything

Every tool decision was filtered through one question: does this reduce writing friction or increase it?

A complex build system increases friction. A framework that requires understanding its mental model before writing a post increases friction. A template I have to maintain increases friction.

The reference was [StackDiver](https://stackdiver.com) — Chuanqi Sun's blog, which is essentially: Eleventy, Markdown, one CSS file, done. The goal was something like that, but extended to support diagrams, plots, and interactive demos when the content warrants it.

## Stack decisions

| Layer | Choice | Why |
|---|---|---|
| Generator | Eleventy v3 | Markdown-first, zero framework, fast builds |
| Templates | Nunjucks | Expressive enough, no lock-in |
| Styling | Plain CSS | ~200 lines, no build step, no framework to upgrade |
| Code highlighting | Shiki | Build-time, zero runtime cost |
| Diagrams | Mermaid (CDN) | Write structure in Markdown, renders in browser |
| Hosting | Netlify | Git push → publish, free |

## Content types

One non-obvious decision: a `type` field in frontmatter rather than separate content directories.

```yaml
---
type: note | mechanism | build-log | model | interactive
---
```

This keeps all content in `src/posts/` while letting the `/artifacts` page filter for build logs, models, and interactive posts automatically. One collection, multiple views.

## Asset structure

Post-local assets live beside the post in a same-slug folder:

```
src/posts/20260626-building-potpuoy.md
src/posts/20260626-building-potpuoy/diagram.svg
```

Shared assets (reused across posts) live in `src/assets/`. The distinction makes ownership clear and prevents one post's cleanup from accidentally affecting another.

## What was deliberately skipped

- Search — not needed at this scale; RSS and tags are enough
- Comments — not the interaction model I want
- Analytics — not worth the complexity or privacy cost
- A JavaScript framework — any framework adds a lock-in cost that doesn't pay off for a writing-first site

The goal: a site that is boring to maintain and useful to read.

## What comes next

The scaffold supports diagrams, Python-generated plots, and interactive demos via iframe — none of which exist yet. Those get added post by post, only when the content actually needs them.

That's the discipline: build what's needed for the first post, then extend for the second.
