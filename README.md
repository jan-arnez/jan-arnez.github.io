# portfolio

Personal portfolio built with [Astro](https://astro.build), [React 19](https://react.dev) components,
[Tailwind CSS 4](https://tailwindcss.com), and [Vite+](https://viteplus.dev) for linting,
formatting and type checking.

Every page is generated as static HTML. React components render at build time; only the project
section index is hydrated in the browser (`client:load`). Page changes use native cross-document
view transitions (the cover video morphs from card to hero) with no client-side router.

## Scripts

| Command        | What it does                                                |
| -------------- | ----------------------------------------------------------- |
| `pnpm dev`     | Start the dev server (`astro dev`)                          |
| `pnpm build`   | Build static pages into `dist/` (`astro build`)             |
| `pnpm preview` | Serve the production build locally                          |
| `pnpm check`   | Format + lint + type check (`vp check`), then `astro check` |
| `pnpm fix`     | Format and apply safe lint fixes (`vp check --fix`)         |

## Tooling

- **Astro** config: [`astro.config.ts`](./astro.config.ts). Markdown goes through the remark/rehype
  pipeline with [`src/lib/rehype-figures.ts`](./src/lib/rehype-figures.ts).
- **Lint, format, type check**: the `lint` and `fmt` blocks in [`vite.config.ts`](./vite.config.ts)
  (Oxlint with `correctness`, `suspicious`, `perf` and `pedantic` as errors, type-aware rules, React
  rules; Oxfmt with import and Tailwind class sorting). Oxlint checks the script part of `.astro`
  files; Oxfmt does not format `.astro` files, and `astro check` type-checks them.

## Writing a project

Each file in [`src/content/projects/`](./src/content/projects) is one project; the filename is the
URL slug (`openai.md` → `/projects/openai/`). Frontmatter is validated by the schema in
[`src/content.config.ts`](./src/content.config.ts), so a missing or mistyped field fails the build.

```md
---
title: OpenAI x Hardware # card and "next project"
headline: The future of AI & hardware # big heading on the project page
category: Concept
year: 2025
timeline: August – September 2025
role: Product Designer
scope: [Product Design, Product Strategy]
collaborators: [Someone, Someone Else] # optional
cover: { src: /openai.mp4, aspect: video, hue: 0 } # aspect: square | video
column: 1 # home grid column (1 or 2)
order: 1 # sort order
---

Optional intro paragraph.

## Overview <- section label + entry in the sidebar index

### Big statement heading

Body text, **bold**, _italic_, [links](https://example.com), lists, > quotes, tables.

![Alt text](/media/image.png "Caption shown under the figure") <- .mp4/.webm autoplay as video
```
