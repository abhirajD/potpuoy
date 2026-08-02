# ADR 004: Shiki and Mermaid Coexistence

## Status

Accepted

## Context

Shiki is configured as Eleventy's Markdown-It syntax highlighter. It intercepts all fenced code blocks at build time — including ` ```mermaid ` blocks — and wraps them in `<pre class="shiki ...">` with inline color styles.

Mermaid's CDN script looks for `<pre class="mermaid">` elements at runtime to render diagrams. If Shiki processes a mermaid block first, Mermaid never sees it — the block renders as styled plaintext code instead of a diagram.

## Decision

In `.eleventy.js`, detect `lang === "mermaid"` in the Shiki `highlight` callback and return a `<pre class="mermaid">` element directly, bypassing Shiki:

```js
eleventyConfig.amendLibrary("md", (md) => {
  md.set({
    highlight: (code, lang) => {
      if (lang === "mermaid") {
        return `<pre class="mermaid">${code}</pre>`;
      }
      const loaded = highlighter.getLoadedLanguages();
      const useLang = loaded.includes(lang) ? lang : "text";
      return highlighter.codeToHtml(code, {
        lang: useLang,
        themes: { light: "github-light", dark: "dark-plus" },
        defaultColor: false,
      });
    },
  });
});
```

Shiki runs in dual-theme mode (`defaultColor: false`), emitting `--shiki-light`
and `--shiki-dark` custom properties that `style.css` resolves per
`prefers-color-scheme`. The mermaid bypass is unaffected — it returns before
`codeToHtml` is reached.

Mermaid's runtime script then finds and renders these elements normally.

## Consequences

- Mermaid diagrams render correctly at runtime on pages with `mermaid: true`.
- Mermaid syntax is not syntax-highlighted — it appears unstyled until Mermaid renders it.
- The `mermaid` language identifier is reserved: using ` ```mermaid ` in a post always produces a rendered diagram, never a code listing. If a post needs to display Mermaid source code as text (e.g., a tutorial about Mermaid), use a different fence like ` ```text `.
- "mermaid" does not need to be in Shiki's `langs` list.

## Agent Notes

- Do not add `"mermaid"` to the Shiki `langs` array in `.eleventy.js`. The bypass handles it before Shiki is invoked.
- Do not remove the `if (lang === "mermaid")` branch from the `highlight` callback. Without it, diagram blocks silently become styled code listings.
