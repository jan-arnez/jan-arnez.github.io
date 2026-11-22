import { unified } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import { rehypeFigures } from "./src/lib/rehype-figures.ts";

export default defineConfig({
  site: "https://jan-arnez.github.io",
  // The 404 page is noindex, so it stays out of the sitemap too.
  integrations: [react(), sitemap({ filter: (page) => !page.includes("/404") })],
  // Prefetch internal links on hover so page changes (and their view transitions) feel instant.
  prefetch: { defaultStrategy: "hover", prefetchAll: true },
  markdown: {
    processor: unified({ rehypePlugins: [rehypeFigures] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
