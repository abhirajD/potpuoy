import pluginRss from "@11ty/eleventy-plugin-rss";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { createHighlighter } from "shiki";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginRss);

  // Collections — all reverse-chronological, drafts excluded
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/**/*.md")
      .filter((p) => !p.data.draft)
      .reverse()
  );

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
