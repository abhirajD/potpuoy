import pluginRss from "@11ty/eleventy-plugin-rss";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { createHighlighter } from "shiki";

// Content contract — SPECS §4. Enforced here rather than described in prose
// because prose did not prevent `tool` vs `tools`, nor method tags leaking
// into what is a domain-only vocabulary.
const TYPES = ["note", "mechanism", "build-log", "model", "interactive"];
const DOMAIN_TAGS = [
  "ai", "cognition", "markets", "finance", "craft",
  "food", "systems", "tools", "macro", "software",
];

function validatePosts(posts) {
  const errors = [];

  for (const post of posts) {
    const where = post.inputPath;
    const { type, tags, summary } = post.data;

    if (!TYPES.includes(type)) {
      errors.push(`${where}\n      type "${type}" is not one of: ${TYPES.join(", ")}`);
    }
    if (!summary) {
      errors.push(`${where}\n      missing "summary"`);
    }

    const list = tags || [];
    if (list.length < 2 || list.length > 4) {
      errors.push(`${where}\n      ${list.length} tag(s) — SPECS §4 expects 2-4`);
    }
    for (const tag of list) {
      if (!DOMAIN_TAGS.includes(tag)) {
        errors.push(
          `${where}\n      tag "${tag}" is not a domain tag. Tags are subject only —` +
          ` form is carried by "type".\n      Allowed: ${DOMAIN_TAGS.join(", ")}`
        );
      }
    }
  }

  if (errors.length) {
    throw new Error(
      `\n\nContent contract violations (${errors.length}):\n\n    ` +
      errors.join("\n\n    ") + "\n"
    );
  }
}

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginRss);

  // Collections — all reverse-chronological, drafts excluded.
  // Drafts skip validation so work in progress can be incomplete.
  eleventyConfig.addCollection("posts", (api) => {
    const posts = api.getFilteredByGlob("src/posts/**/*.md").filter((p) => !p.data.draft);
    validatePosts(posts);
    return posts.reverse();
  });

  eleventyConfig.addCollection("artifacts", (api) =>
    api.getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => !p.data.draft && ["build-log", "model", "interactive"].includes(p.data.type))
      .reverse()
  );

  eleventyConfig.addCollection("rssFeed", (api) =>
    api.getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => !p.data.draft)
      .reverse()
      .slice(0, 20)
  );

  // Filters
  eleventyConfig.addFilter("humanDate", (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
    })
  );

  eleventyConfig.addFilter("machineDate", (date) =>
    new Date(date).toISOString().split("T")[0]
  );

  eleventyConfig.addFilter("htmlDateString", (date) =>
    new Date(date).toISOString()
  );

  eleventyConfig.addFilter("filterByType", (items, type) =>
    items.filter((p) => p.data.type === type)
  );

  eleventyConfig.addFilter("filterByTag", (items, tag) =>
    items.filter((p) => p.data.tags && p.data.tags.includes(tag))
  );

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  // Passthrough
  eleventyConfig.addPassthroughCopy({ "src/style.css": "/style.css" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "/robots.txt" });
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/demos": "demos" });
  // Post-local assets (images, diagrams, etc. beside their post)
  eleventyConfig.addPassthroughCopy("src/posts/**/*.{jpg,jpeg,png,gif,svg,webp,avif,mp4,webm,pdf}");

  // Shiki syntax highlighting (build-time, zero runtime cost)
  const highlighter = await createHighlighter({
    themes: ["github-light", "dark-plus"],
    langs: ["js", "jsx", "ts", "tsx", "html", "css", "json", "yaml", "python", "bash", "sh", "md", "diff", "sql", "text"],
  });

  eleventyConfig.amendLibrary("md", (md) => {
    md.set({
      highlight: (code, lang) => {
        // Let Mermaid's CDN script handle these at runtime
        if (lang === "mermaid") {
          return `<pre class="mermaid">${code}</pre>`;
        }
        const loaded = highlighter.getLoadedLanguages();
        const useLang = loaded.includes(lang) ? lang : "text";
        // Dual theme: emits --shiki-light / --shiki-dark custom properties so
        // code blocks follow prefers-color-scheme instead of being locked dark.
        return highlighter.codeToHtml(code, {
          lang: useLang,
          themes: { light: "github-light", dark: "dark-plus" },
          defaultColor: false,
        });
      },
    });
  });

  return {
    dir: { input: "src", output: "public", includes: "_includes", data: "_data" },
  };
}
