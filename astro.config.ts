import { unified } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import { rehypeFigures } from "./src/lib/rehype-figures.ts";

export default defineConfig({
  integrations: [react()],
  // Prefetch internal links on hover so page changes (and their view transitions) feel instant.
  prefetch: { defaultStrategy: "hover", prefetchAll: true },
  markdown: {
    processor: unified({ rehypePlugins: [rehypeFigures] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
