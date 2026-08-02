# ADR 003: Conditional Mermaid Loading

## Status

Accepted

## Context

Mermaid is loaded from CDN (`cdn.jsdelivr.net/npm/mermaid@11`). The script is approximately 200KB. Loading it unconditionally on every page — including listing pages, the about page, and the now page, which never contain diagrams — adds unnecessary network cost that grows as the archive scales.

The alternative (embedding Mermaid in the build pipeline) adds build complexity and requires running a headless browser or Node-based SVG renderer.

## Decision

Load the Mermaid CDN script conditionally: only on pages that declare `mermaid: true` in their frontmatter.

In `base.njk`:
```njk
{% if mermaid %}
<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  mermaid.initialize({ startOnLoad: true, theme: dark ? "dark" : "default" });
</script>
{% endif %}
```

Posts that contain Mermaid diagrams must include `mermaid: true` in frontmatter:
```yaml
mermaid: true
```

Posts without this flag load no Mermaid script at all.

## Consequences

- Mermaid is only loaded when a post actually uses it.
- Authors must remember to add `mermaid: true` when writing a post with a diagram. Forgetting it means the diagram renders as a plain `<pre>` block instead of a diagram.
- Mermaid renders at runtime (client-side), so diagrams are invisible in RSS readers and when JS is disabled. This is an acceptable tradeoff for a writing-first blog.
- The Mermaid theme switches with the OS color scheme at page load. It does not re-render if the user changes their OS theme after the page loads.

## Agent Notes

- When adding Mermaid diagrams to a post, always add `mermaid: true` to the post's frontmatter.
- Do not move the Mermaid script to `base.njk` unconditionally. The conditional is intentional.
- If a build-time SVG rendering pipeline is added in a future ADR, this ADR should be superseded.
